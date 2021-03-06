import {ITiledObject} from './ITiledObject';
import {Properties} from '../types/Properties';

export interface IPointObject<T = Properties> extends ITiledObject<T> {
	objectType: 'point';
}
