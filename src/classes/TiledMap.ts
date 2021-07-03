import {Properties} from '../types/Properties';
import {TileLayer} from './TileLayer';
import {ObjectLayer} from './ObjectLayer';
import {ImageLayer} from './ImageLayer';
import {TileSet} from './TileSet';
import {Tile} from './Tile';
import {ITiledObject} from '../interfaces/ITiledObject';
import {IRectangleObject} from '../interfaces/IRectangleObject';
import {IEllipseObject} from '../interfaces/IEllipseObject';
import {ITileObject} from '../interfaces/ITileObject';
import {ITextObject} from '../interfaces/ITextObject';
import {IPointObject} from '../interfaces/IPointObject';
import {IPolygonObject} from '../interfaces/IPolygonObject';
import {AnyTiledObject} from '../types/AnyTiledObject';

export class TiledMap {
	public version: string;
	public orientation: 'orthogonal' | 'isometric' | 'staggered' | 'hexagonal' | string;
	public width: number;
	public height: number;
	public tileWidth: number;
	public tileHeight: number;
	public backgroundColor: string | null;
	public layers: (TileLayer | ObjectLayer | ImageLayer)[] = [];
	public properties: Properties;
	public tileSets: TileSet[];

	getTileSetByGid(gid: number): TileSet | undefined {
		return this.tileSets.find((ts) => {
			const minGid = ts.firstGid;
			const maxGid = ts.firstGid + ts.tiles.length - 1;
			return gid >= minGid && gid <= maxGid;
		});
	}

	getTileById(id: number): Tile | undefined {
		const tileSet = this.getTileSetByGid(id);
		if (tileSet) {
			return tileSet.tiles.find(x => x.id === id);
		}
		return;
	}

	getObjectById(id: number): AnyTiledObject | undefined {
		let object;
		for (let i = 0; i < this.layers.length; i++) {
			const layer = this.layers[i];
			if (layer instanceof ObjectLayer) {
				object = layer.objects.find(x => x.id === id);
				if (object) {
					return object;
				}
			}
		}
		return object;
	}
}
