import {parse, TileSet} from '../src';
import * as path from 'path';

describe('Animation', () => {
	it('Should load animation on animated tiles', async () => {
		const tileset = await parse(path.join(__dirname, './tiled/animation.tsx')) as TileSet;
		expect(tileset).toBeDefined();
		expect(tileset.tiles).toHaveLength(12);
		expect(tileset.tiles[1].animations).toHaveLength(4);
		expect(tileset.tiles[1].animations[0].duration).toBe(120);
		expect(tileset.tiles[1].animations[0].tile).toBeDefined();
		expect(tileset.tiles[1].animations[0].tile.id).toBe(1);
		expect(tileset.tiles[1].animations[1].tile.id).toBe(2);
		expect(tileset.tiles[1].animations[1].tile).toBeDefined();
		expect(tileset.tiles[1].animations[2].tile.id).toBe(1);
		expect(tileset.tiles[1].animations[2].tile).toBeDefined();
		expect(tileset.tiles[1].animations[3].tile.id).toBe(0);
		expect(tileset.tiles[1].animations[3].tile).toBeDefined();

		expect(tileset.tiles[4].animations).toHaveLength(4);
		expect(tileset.tiles[4].animations[0].duration).toBe(120);
		expect(tileset.tiles[4].animations[0].tile).toBeDefined();
		expect(tileset.tiles[4].animations[0].tile.id).toBe(4);
		expect(tileset.tiles[4].animations[1].tile).toBeDefined();
		expect(tileset.tiles[4].animations[1].tile.id).toBe(5);
		expect(tileset.tiles[4].animations[2].tile).toBeDefined();
		expect(tileset.tiles[4].animations[2].tile.id).toBe(4);
		expect(tileset.tiles[4].animations[3].tile).toBeDefined();
		expect(tileset.tiles[4].animations[3].tile.id).toBe(3);

		expect(tileset.tiles[10].animations).toHaveLength(1);
		expect(tileset.tiles[10].animations[0].tile).toBeDefined();
		expect(tileset.tiles[10].animations[0].tile.id).toBe(10);
	});
});
