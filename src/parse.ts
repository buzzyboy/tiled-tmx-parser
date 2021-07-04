import axios from 'axios';
import xmlParser from 'fast-xml-parser';
import {TiledMap} from './classes/TiledMap';
import {Properties} from './types/Properties';
import {TileSet} from './classes/TileSet';
import {Image} from './classes/Image';
import {Tile} from './classes/Tile';

import path from 'path-browserify';
import {TileLayer} from './classes/TileLayer';
import {csvDataParser} from './data-parsers/csvDataParser';
import {ObjectLayer} from './classes/ObjectLayer';
import {ImageLayer} from './classes/ImageLayer';
import {base64DataParse} from './data-parsers/base64DataParser';
import {BaseLayer} from './classes/BaseLayer';

let nodePath;
try {
	nodePath = require('path');
} catch (ex) {
}

console.clear();

class TiledParser {
	map?: TiledMap;
	rootUrlOrPath: string;
	pendingObjectsWithObjectProperty: { object: any, key: string }[] = [];
	isUrl: boolean;

	resolvePath(relativePath: string): string {
		if (this.isUrl) {
			return `${this.rootUrlOrPath}/${relativePath}`;
		} else {
			return (nodePath || path).join(this.rootUrlOrPath, relativePath);
		}
	}
}

export async function parse(filePathOrUrl: string): Promise<TiledMap | TileSet> {
	const parser = new TiledParser();

	let fileContent: string;
	let normalizedPath: string;
	let rootPathOrUrl: string;

	if (filePathOrUrl.startsWith('http')) {
		// It's a url, let's fetch it
		fileContent = (await axios.get<string>(filePathOrUrl)).data;
		parser.isUrl = true;
		normalizedPath = filePathOrUrl;
		rootPathOrUrl = normalizedPath.substr(0, normalizedPath.lastIndexOf('/'));
	} else {
		let fs = require('fs');
		fileContent = fs.readFileSync(filePathOrUrl).toString();
		parser.isUrl = false;
		normalizedPath = path.normalize(filePathOrUrl);
		rootPathOrUrl = normalizedPath.substr(0, normalizedPath.lastIndexOf('\\'));
	}

	const rootObj = xmlParser.parse(fileContent, {
		attributeNamePrefix: '__',
		ignoreAttributes: false,
	});
	parser.rootUrlOrPath = rootPathOrUrl;
	const parsedObj = await parseXmlObj(rootObj, parser);
	if ((parsedObj as any).map) {
		parser.pendingObjectsWithObjectProperty.forEach((obj) => {
			obj.object[obj.key] = ((parsedObj as any).map as TiledMap).getObjectById(obj.object[obj.key]);
		});
	}
	// @ts-ignore
	return (parsedObj.map || parsedObj.tileSets[0]) as TiledMap | TileSet;
}

function parseLayer(xmlObj, layer: BaseLayer) {
	if (xmlObj.__tintcolor) {
		layer.tintColor = xmlObj.__tintcolor;
	}
	if (xmlObj.__offsetx) {
		layer.offsetX = parseInt(xmlObj.__offsetx);
	}
	if (xmlObj.__offsety) {
		layer.offsetY = parseInt(xmlObj.__offsety);
	}
	if (xmlObj.__name) {
		layer.name = xmlObj.__name;
	}
	if (xmlObj.__opacity) {
		layer.opacity = parseFloat(xmlObj.__opacity);
	}
	if (xmlObj.__visible) {
		layer.visible = xmlObj.__visible !== '0';
	}
	if (xmlObj.__parallaxx) {
		layer.parallaxX = parseInt(xmlObj.__parallaxx);
	}
	if (xmlObj.__parallaxy) {
		layer.parallaxY = parseInt(xmlObj.__parallaxy);
	}
	if (xmlObj.__locked) {
		layer.locked = (xmlObj.__locked) === '1';
	}
}

async function parseXmlObj(xmlObj, parser: TiledParser, resultObj: any = {}): Promise<TiledMap | Properties | TileSet> {
	for (const key in xmlObj) {
		const child = xmlObj[key];
		const isChildArray = Array.isArray(child);
		switch (key) {
			case 'map': {
				const map = new TiledMap();
				map.version = child.__version;
				map.width = parseInt(child.__width);
				map.height = parseInt(child.__height);
				map.tileWidth = parseInt(child.__tilewidth);
				map.tileHeight = parseInt(child.__tileheight);
				map.orientation = child.__orientation;
				map.renderOrder = child.__renderorder;
				map.backgroundColor = child.__backgroundcolor;
				resultObj[key] = map;
				parser.map = map;
				await parseXmlObj(child, parser, map);
				break;
			}
			case 'properties': {
				const properties: Properties = {};
				const childProperties = Array.isArray(child.property) ? child.property : [child.property];
				childProperties.forEach((property: ({ __name: string, __type?: string, __value: string })) => {
					switch (property.__type) {
						case 'bool':
							properties[property.__name] = property.__value === 'true';
							break;
						case 'int':
							properties[property.__name] = parseInt(property.__value);
							break;
						case 'float':
							properties[property.__name] = parseFloat(property.__value);
							break;
						case 'object':
							properties[property.__name] = parseInt(property.__value);
							parser.pendingObjectsWithObjectProperty.push({
								object: properties,
								key: property.__name,
							});
							break;
						case 'color':
						case 'string':
						default:
							properties[property.__name] = property.__value;
							break;
					}
				});
				resultObj[key] = properties;
				break;
			}
			case 'tileset': {
				const childArr: any[] = isChildArray ? child : [child];
				const tilesets = await Promise.all(childArr.map(async (obj) => {
					if (obj.__source) {
						const urlOrPath = parser.resolvePath(obj.__source);
						console.log('resolved path', urlOrPath, 'from', obj.__source);
						const parsedObj = await parse(urlOrPath);
						const tileset = parsedObj as TileSet;
						tileset.source = obj.__source;
						tileset.firstGid = parseInt(obj.__firstgid);
						tileset.tiles.forEach((t) => t.id += tileset.firstGid);
						return tileset;
					} else {
						const tileset = new TileSet();
						tileset.name = obj.__name;
						tileset.tileWidth = parseInt(obj.__tilewidth);
						tileset.tileHeight = parseInt(obj.__tileheight);
						if (obj.__firstgid) {
							tileset.firstGid = parseInt(obj.__firstgid);
						}
						tileset.tileCount = parseInt(obj.__tilecount) || obj.tile.length;
						tileset.columns = parseInt(obj.__columns);
						tileset.tiles = new Array<Tile>(tileset.tileCount);
						for (let i = 0; i < tileset.tiles.length; i++) {
							const tile = new Tile();
							tile.id = i;
							if (obj.__firstgid) {
								tile.id += tileset.firstGid - 1;
							}
							tileset.tiles[i] = tile;
						}
						await parseXmlObj(obj, parser, tileset);
						return tileset;
					}
				}));
				tilesets.push();
				resultObj.tileSets = tilesets;
				break;
			}
			case 'image': {
				const image = new Image();
				image.width = parseInt(child.__width);
				image.height = parseInt(child.__height);
				image.source = child.__source;
				resultObj[key] = image;
				break;
			}
			case 'tile': {
				const plainObjTiles = isChildArray ? child : [child];
				await Promise.all(plainObjTiles.map(async (tileObj) => {
					const tile = new Tile();
					tile.tileSet = resultObj;
					const index = parseInt(tileObj.__id);
					tile.id = index;
					tile.type = tileObj.__type;
					await parseXmlObj(tileObj, parser, tile);
					resultObj['tiles'][index] = tile;
				}));
				break;
			}
			case 'layer': {
				const tileLayersObjs = isChildArray ? child : [child];
				const tileLayers = await Promise.all(tileLayersObjs.map(async (layerData) => {
					const tileLayer = new TileLayer();
					parseLayer(layerData, tileLayer);
					tileLayer.width = parseInt(layerData.__width);
					tileLayer.height = parseInt(layerData.__height);
					await parseXmlObj(layerData, parser, tileLayer);
					return tileLayer;
				}))

				resultObj['layers'].push(...tileLayers);
				break;
			}
			case 'imagelayer': {
				const layers = isChildArray ? child : [child];
				const imageLayers = await Promise.all(layers.map(async (layer) => {
					const imageLayer = new ImageLayer();
					parseLayer(layer, imageLayer);
					await parseXmlObj(layer, parser, imageLayer);
					return imageLayer;
				})) as ImageLayer[];
				resultObj.layers.push(...imageLayers);
				break;
			}
			case 'objectgroup': {
				const layers = isChildArray ? child : [child];
				const objectLayers = await Promise.all(layers.map(async (layer) => {
					const objectLayer = new ObjectLayer();
					objectLayer.visible = layer.__visible !== '0';
					if (layer.__draworder) {
						objectLayer.drawOrder = layer.__draworder;
					}
					if (layer.__color) {
						objectLayer.color = layer.__color;
					}
					parseLayer(layer, objectLayer);
					await parseXmlObj(layer, parser, objectLayer);
					return objectLayer;
				})) as ObjectLayer[];
				resultObj.layers.push(...objectLayers);
				break;
			}
			case 'object': {
				const objects = isChildArray ? child : [child];
				(resultObj as ObjectLayer).objects = await Promise.all(objects.map(async (obj) => {
					let tiledObj: any = {
						id: parseInt(obj.__id),
						name: obj.__name || '',
						x: parseInt(obj.__x),
						y: parseInt(obj.__y),
						type: obj.__type,
						visible: obj.__visible !== '0',
						properties: {},
					};
					await parseXmlObj(obj, parser, tiledObj);
					if (obj.ellipse === '') {
						tiledObj.objectType = 'ellipse';
						tiledObj.width = parseInt(obj.__width);
						tiledObj.height = parseInt(obj.__height);
					} else if (obj.polyline) {
						tiledObj.objectType = 'polygon';
					} else if (obj.text) {
						tiledObj.objectType = 'text';
					} else if (Object.prototype.hasOwnProperty.call(obj, 'point')) {
						tiledObj.objectType = 'point';
					} else if (obj.__gid) {
						tiledObj.objectType = 'tile';
						tiledObj.gid = parseInt(obj.__gid);
						tiledObj.width = parseInt(obj.__width);
						tiledObj.height = parseInt(obj.__height);
					} else if (obj.__width && obj.__height) {
						tiledObj.objectType = 'rectangle';
						tiledObj.width = parseInt(obj.__width);
						tiledObj.height = parseInt(obj.__height);
					} else {
						throw new Error(`Unidentified object. ${JSON.stringify(obj, null, 2)}`);
					}
					switch (obj.__type) {
						case 'rectangle': {
							return {
								id: parseInt(obj.__id),
								type: obj.__type,
								x: parseInt(obj.__x),
								y: parseInt(obj.__y),
							}
							break;
						}
					}
					return tiledObj;
				}));
				break;
			}
			case 'point': {
				// Get's ignored because point is empty
				// tmx file looks like this:
				//   <object id="8" name="namePoint" x="32" y="128">
				//    <point/>
				//   </object>
				break;
			}
			case 'ellipse': {
				// Get's ignored because ellipse is empty
				//  <object id="3" name="nameEllipse" x="32" y="32" width="32" height="32">
				//    <ellipse/>
				//   </object>
				break;
			}
			case 'editorsettings': {
				// Ignore this since it's only relevant to the editor
				break;
			}
			case 'polyline': {
				resultObj.polyline = child.__points.split(' ').map(xyStr => {
					const [xStr, yStr] = xyStr.split(',');
					return {
						x: parseInt(xStr),
						y: parseInt(yStr),
					};
				});
				break;
			}
			case 'text': {
				if (typeof (child) === 'string') {
					resultObj.text = {text: child, wordWrap: false};
				} else {
					resultObj.text = {text: child['#text'], wordWrap: child.__wrap === '1'};
				}
				break;
			}
			case 'data': {
				const encoding = child.__encoding;
				const compression = child.__compression;
				switch (encoding) {
					case 'base64':
						resultObj.tiles = await base64DataParse(parser.map, child['#text'], compression);
						break;
					case 'csv':
						resultObj['tiles'] = csvDataParser(parser.map, child['#text']);
						break;
					default:
						throw new Error(`Unsupported data encoding type: ${encoding}`);
				}
				break;
			}
			default: {
				if (!key.startsWith('__')) {
					throw new Error(`Unable to parse tag with name ${key}`);
				}
			}
		}
	}
	return resultObj;
}
