import {Image} from './Image';
import {Properties} from '../types/Properties';

export class ImageLayer {
	name: string | null;
	opacity?: number;
	properties: Properties;
	type = 'image';
	visible?: boolean;
	image?: Image;
	x: number;
	y: number;
}
