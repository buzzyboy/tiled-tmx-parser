import {Properties} from '../types/Properties';
import {TileLayer} from './TileLayer';
import {ObjectLayer} from './ObjectLayer';
import {ImageLayer} from './ImageLayer';
import {TileSet} from './TileSet';
import {Tile} from './Tile';
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
	public renderOrder: string | 'right-down' | 'right-up' | 'left-down' | 'left-up';

	constructor(public urlOrPath?: string) {
	}

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
