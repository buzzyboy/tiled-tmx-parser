import {Properties} from '../types/Properties';
import {TileSet} from './TileSet';
import {IAnimationFrame} from '../interfaces/IAnimationFrame';

export class Tile {
	/**
	 * The id of this tile for this map.
	 */
	id = 0;
	terrain = [];
	probability? = null;
	animations: IAnimationFrame[] = [];
	objectGroups = [];
	type?: string;
	image?: string;
	properties: Properties = {};
	tileSet: TileSet;
}
