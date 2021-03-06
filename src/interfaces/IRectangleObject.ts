import {ITiledObject} from './ITiledObject';
import {Properties} from '../types/Properties';

export interface IRectangleObject<T = Properties> extends ITiledObject<T> {
	objectType: 'rectangle';
	width: number;
	height: number;
}
