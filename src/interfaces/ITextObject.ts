import {ITiledObject} from './ITiledObject';
import {Properties} from '../types/Properties';

export interface ITextObject<T = Properties> extends ITiledObject<T> {
	objectType: 'text';
	text: { text: string, wordWrap: boolean };
}
