import {Properties} from '../types/Properties';

export class TmxObject {
	id: number;
	name?: string;
	type?: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	properties: Properties;
	gid?: number;
	visible: boolean;
	ellipse: boolean;
	polygon?: any;
	polyline?: any;
}
