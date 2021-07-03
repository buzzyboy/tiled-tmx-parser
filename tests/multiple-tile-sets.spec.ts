import {parse} from '../src/parse';
import * as path from 'path';
import {TiledMap, TileLayer, TileSet} from '../src';

describe('Multiple Tilesets', () => {
	it('Should correctly load all tiles', async () => {
		const map = await parse(path.join(__dirname, './tiled/multiple-tilesets-csv-3x3.tmx')) as TiledMap;
		expect(map).toBeDefined();
		const tileLayer = map.layers[0] as TileLayer;
		const tileSet: TileSet = map.tileSets[0];
		expect(tileSet.tiles[0].id).toBe(1);
		expect(tileLayer.tiles).toHaveLength(9);
		expect(tileLayer.tileAt(0,0).id).toBe(201);
		expect(tileLayer.tileAt(1,0).id).toBe(1);
		expect(tileLayer.tileAt(2,0).id).toBe(1);
		expect(tileLayer.tileAt(0,1).id).toBe(1);
		expect(tileLayer.tileAt(1,1).id).toBe(325);
		expect(tileLayer.tileAt(2,1).id).toBe(1);
		expect(tileLayer.tileAt(0,2).id).toBe(1);
		expect(tileLayer.tileAt(1,2).id).toBe(1);
		expect(tileLayer.tileAt(2,2).id).toBe(550);
	});
});
