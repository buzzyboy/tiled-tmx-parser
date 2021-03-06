import {ITiledObject} from './ITiledObject';
import {Properties} from '../types/Properties';

export interface IEllipseObject<T = Properties> extends ITiledObject<T> {
	objectType: 'ellipse';
	width: number;
	height: number;
}
