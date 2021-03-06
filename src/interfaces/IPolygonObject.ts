import {ITiledObject} from './ITiledObject';
import {Properties} from '../types/Properties';

export interface IPolygonObject<T = Properties> extends ITiledObject<T> {
	objectType: 'polygon';
	polyline: {x: number, y: number}[];
}
