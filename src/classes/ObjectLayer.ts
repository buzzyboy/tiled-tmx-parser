import {AnyTiledObject} from '../types/AnyTiledObject';
import {BaseLayer} from './BaseLayer';

export class ObjectLayer extends BaseLayer {
	objects: AnyTiledObject[] = [];
	color?: string;
}
