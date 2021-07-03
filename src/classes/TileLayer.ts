import {Tile} from './Tile';
import {Properties} from '../types/Properties';
import {BaseLayer} from './BaseLayer';

export class TileLayer extends BaseLayer {
	type = 'tile';
	tiles: Tile[] = [];
	width: number;
	height: number;
	opacity?: number;
	visible?: boolean;
	properties: Properties;
	name: string;

	tileAt(x: number, y: number): Tile {
		return this.tiles[y * this.width + x];
	}
}
