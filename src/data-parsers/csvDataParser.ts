import {Tile} from '../classes/Tile';
import {TiledMap} from '../classes/TiledMap';

export function csvDataParser(map: TiledMap, data: string): Tile[] {
	data = data.replace(/(\r\n|\n|\r)/gm, '');
	const tiles: Tile[] = new Array(map.width * map.height);
	const idStrings = data.split(',');
	idStrings.forEach((idStr, index) => {
		const id = parseInt(idStr);
		if (id > 0) {
			tiles[index] = map.getTileById(id);
			if (!tiles[index]) {
				// throw new Error(`Was unable to locate tile with gid: ${id}`);
			}
		}
	});
	return tiles;
}
