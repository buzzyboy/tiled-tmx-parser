import {ITiledObject} from './ITiledObject';
import {Properties} from '../types/Properties';
import {Tile} from '../classes/Tile';

export interface ITileObject<T = Properties> extends ITiledObject<T> {
	gid: number;
	objectType: 'tile';
	width: number;
	height: number;
	tile: Tile;
}
