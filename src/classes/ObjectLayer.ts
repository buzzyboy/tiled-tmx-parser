import {Properties} from '../types/Properties';
import {AnyTiledObject} from '../types/AnyTiledObject';

export class ObjectLayer {
	properties: Properties;
	visible: boolean;
	objects: AnyTiledObject[] = [];
}
