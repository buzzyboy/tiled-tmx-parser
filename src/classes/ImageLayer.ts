import {Image} from './Image';
import {BaseLayer} from './BaseLayer';

export class ImageLayer extends BaseLayer {
	name?: string;
	opacity?: number;
	type = 'image';
	image?: Image;
	horizontalOffset: number = 0;
	verticalOffset: number = 0;
}
