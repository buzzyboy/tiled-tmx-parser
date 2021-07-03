import express from 'express';
import {Server} from 'http';
import path from 'path';
import {parse} from '../src/parse';
import {runTestsOnCsv3by3} from './runTestsOnCsv3by3';
import {TiledMap} from '../src';

describe('Load by url', () => {
	let app: express.Application;
	let server: Server;
	beforeAll(async () => {
		app = express();
		app.use(express.static(path.join(__dirname, './tiled')));
		server = await app.listen(5151);
	});

	it('Should parse a map by url', async () => {
		const map = await parse('http://localhost:5151/csv3x3.tmx') as TiledMap;
		expect(map).toBeDefined();
		runTestsOnCsv3by3(map);
	});

	afterAll(async () => {
		await server.close();
	});
});
