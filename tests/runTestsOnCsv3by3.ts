import {TiledMap, TileLayer} from '../src';

export function runTestsOnCsv3by3(map: TiledMap) {
	expect(map.width).toBe(3);
	expect(map.height).toBe(3);
	expect(map.tileWidth).toBe(32);
	expect(map.tileHeight).toBe(32);
	expect(map.tileSets).toHaveLength(1);
	expect(map.tileSets[0].firstGid).toBe(1);
	expect(map.tileSets[0].tileCount).toBe(200);
	expect(map.layers).toHaveLength(1);
	const layer = map.layers[0] as TileLayer;
	expect(layer.tiles).toHaveLength(9);

	expect(layer.tiles[0].id).toBe(51);
	expect(layer.tileAt(0, 0).id).toBe(51);

	expect(layer.tiles[1].id).toBe(52);
	expect(layer.tileAt(1, 0).id).toBe(52);

	expect(layer.tiles[2].id).toBe(53);
	expect(layer.tileAt(2, 0).id).toBe(53);

	expect(layer.tiles[3].id).toBe(61);
	expect(layer.tileAt(0, 1).id).toBe(61);

	expect(layer.tiles[4].id).toBe(62);
	expect(layer.tileAt(1, 1).id).toBe(62);

	expect(layer.tiles[5].id).toBe(63);
	expect(layer.tileAt(2, 1).id).toBe(63);

	expect(layer.tiles[6].id).toBe(71);
	expect(layer.tileAt(0, 2).id).toBe(71);

	expect(layer.tiles[7].id).toBe(72);
	expect(layer.tileAt(1, 2).id).toBe(72);

	expect(layer.tiles[8].id).toBe(73);
	expect(layer.tileAt(2, 2).id).toBe(73);
}
