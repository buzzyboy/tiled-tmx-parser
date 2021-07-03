import {Properties} from '../types/Properties';
import {Image} from './Image';
import {Tile} from './Tile';

export class TileSet {
	firstGid: number = 0;
	source: string;
	name: string;
	tileWidth: number;
	tileHeight: number;
	spacing: number;
	margin: number;
	tileOffset: { x: number, y: number };
	properties: Properties;
	image: Image;
	tiles: Tile[] = [];
	terrainTypes: [] = [];
	tileCount: number;
	columns: number;
}
