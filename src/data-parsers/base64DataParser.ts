import {TiledMap} from '../classes/TiledMap';
import {Tile} from '../classes/Tile';
import pako from 'pako';
import zlib from 'zlib';

export async function base64DataParse(
	map: TiledMap,
	text: string,
	compression?: 'gzip' | 'zlib' | 'zstd',
): Promise<Tile[]> {

	const tiles: Tile[] = [];
	let buffer = Buffer.alloc(map.width * map.height * 4, text.trim(), 'base64');
	if (compression === 'gzip' || compression === 'zlib') {
		buffer = Buffer.from(text.trim(), 'base64');
		buffer = Buffer.from(pako.inflate(buffer));
	} else if (compression) {
		throw new Error(`Unsupported data compression type: ${compression}`);
	}

	const expectedCount = map.width * map.height * 4;
	if (buffer.length !== expectedCount) {
		throw new Error(`Expected ${expectedCount} bytes of tile data; received ${buffer.length}`);
	}
	for (let i = 0; i < expectedCount; i += 4) {
		const gid = buffer.readUInt32LE(i);
		if (gid > 0) {
			tiles[i / 4] = map.getTileById(gid);
		}
	}

	return tiles;
}
