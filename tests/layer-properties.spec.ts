import path from 'path';
import {parse} from '../src/parse';
import {ObjectLayer, TiledMap, TileLayer} from '../src';

describe('Layer Properties', () => {
	it('Should get all changed properties for every layer', async () => {
		const map = await parse(path.join(__dirname, './tiled/all-properties-csv-3x3.tmx')) as TiledMap;
		expect(map).toBeDefined();
		expect(map.backgroundColor).toBe('#080000');
		expect(map.renderOrder).toBe('left-up');
		const tileLayer = map.layers[0] as TileLayer;
		expect(tileLayer.offsetX).toBe(9);
		expect(tileLayer.offsetY).toBe(44);
		expect(tileLayer.tintColor).toBe('#f50000');
		const objectLayer = map.layers[1] as ObjectLayer;
		expect(objectLayer.visible).toBeFalsy();
		expect(objectLayer.color).toBe('#003400');
		expect(objectLayer.drawOrder).toBe('index');
		expect(objectLayer.opacity).toBe(0.8);
		expect(objectLayer.offsetX).toBe(-2);
		expect(objectLayer.offsetY).toBe(-2);
		expect(objectLayer.parallaxX).toBe(2);
		expect(objectLayer.parallaxY).toBe(2);
		expect(objectLayer.locked).toBeTruthy();
	});
});
