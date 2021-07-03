import path from 'path';
import {parse} from '../src/parse';
import {TiledMap, TileLayer} from '../src';
import {runTestsOnCsv3by3} from './runTestsOnCsv3by3';

const TILED_FOLDER_PATH = path.join(__dirname, './tiled');

describe('CSV', () => {
	it('Should load a map CSV map', async () => {
		const mapPath = path.join(TILED_FOLDER_PATH, './csv3x3.tmx');
		const map = await parse(mapPath) as TiledMap;
		runTestsOnCsv3by3(map);
	});

	it('Should load a map base64 map', async () => {
		const mapPath = path.join(TILED_FOLDER_PATH, './base64-3x3.tmx');
		const map = await parse(mapPath) as TiledMap;
		runTestsOnCsv3by3(map);
	});

	it('Should load a map base64-zlib map', async () => {
		const mapPath = path.join(TILED_FOLDER_PATH, './base64-zlib-3x3.tmx');
		const map = await parse(mapPath) as TiledMap;
		runTestsOnCsv3by3(map);
	});

	it('Should load a map base64-gzip map', async () => {
		const mapPath = path.join(TILED_FOLDER_PATH, './base64-gzip-3x3.tmx');
		const map = await parse(mapPath) as TiledMap;
		runTestsOnCsv3by3(map);
	});
});

require('./object-groups.spec');
require('./load-by-url.spec');
require('./multiple-tile-sets.spec');
require('./layer-properties.spec');
