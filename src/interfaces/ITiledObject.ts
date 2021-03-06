import {Properties} from '../types/Properties';

export interface ITiledObject<T=Properties> {
	id: number;
	x: number;
	y: number;
	name?: string;
	objectType: string;
	type?: string;
	visible?: boolean;
	properties?: T;
}
