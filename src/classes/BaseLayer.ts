import {Properties} from '../types/Properties';

export abstract class BaseLayer<T = Properties> {
	name?: string;
	visible?: boolean;
	type: 'image' | 'object' | 'tile' | string;
	offsetX?: number;
	offsetY?: number;
	x: number;
	y: number;
	properties: T;
	tintColor?: string;
	opacity?: number;
	parallaxX?: number;
	parallaxY?: number;
	locked?: boolean;
}
