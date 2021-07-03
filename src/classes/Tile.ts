import {Properties} from '../types/Properties';
import {TileSet} from './TileSet';

export class Tile {
	/**
	 * The id of this tile for this map.
	 */
	id = 0;
	terrain = [];
	probability? = null;
	animations = [];
	objectGroups = [];
	image?: string;
	properties: Properties = {};
	tileSet: TileSet;
}
