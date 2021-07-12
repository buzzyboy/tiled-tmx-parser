import path from 'path';

import {parse} from '../src';
import {ObjectLayer, TiledMap} from '../src';
import {IRectangleObject} from '../src';
import {IEllipseObject} from '../src';
import {IPolygonObject} from '../src';
import {ITileObject} from '../src';
import {ITextObject} from '../src';

const TILED_FOLDER_PATH = path.join(__dirname, './tiled');

describe('Object Layer', () => {
	it('Should load all types of objects', async () => {
		const map = await parse(path.join(TILED_FOLDER_PATH, './objectgroups-csv-3x3.tmx')) as TiledMap;
		expect(map).toBeDefined();
		expect(map).toBeInstanceOf(TiledMap);
		expect(map.layers.find(x => x instanceof ObjectLayer)).toBeDefined();
		const objectLayer: ObjectLayer = map.layers.find(x => x instanceof ObjectLayer) as ObjectLayer;
		expect(objectLayer.objects).toHaveLength(6);
		// Rectangle
		expect(objectLayer.objects[0].id).toBe(1);
		expect(objectLayer.objects[0].name).toBe('rectangle');
		expect(objectLayer.objects[0].objectType).toBe('rectangle');
		expect(objectLayer.objects[0].x).toBe(0);
		expect(objectLayer.objects[0].y).toBe(0);
		expect((objectLayer.objects[0] as IRectangleObject).width).toBe(32);
		expect((objectLayer.objects[0] as IRectangleObject).height).toBe(32);
		// Point
		expect(objectLayer.objects[1].id).toBe(2);
		expect(objectLayer.objects[1].name).toBe('point');
		expect(objectLayer.objects[1].objectType).toBe('point');
		expect(objectLayer.objects[1].x).toBe(64);
		expect(objectLayer.objects[1].y).toBe(32);
		// Ellipse
		expect(objectLayer.objects[2].name).toBe('ellipse');
		expect(objectLayer.objects[2].objectType).toBe('ellipse');
		expect(objectLayer.objects[2].x).toBe(32);
		expect(objectLayer.objects[2].y).toBe(32);
		expect((objectLayer.objects[2] as IEllipseObject).width).toBe(32);
		expect((objectLayer.objects[2] as IEllipseObject).height).toBe(32);
		// Polygon
		expect(objectLayer.objects[3].name).toBe('polygon');
		expect(objectLayer.objects[3].objectType).toBe('polygon');
		expect(objectLayer.objects[3].x).toBe(0);
		expect(objectLayer.objects[3].y).toBe(32);
		expect((objectLayer.objects[3] as IPolygonObject).polyline).toBeDefined();
		expect((objectLayer.objects[3] as IPolygonObject).polyline).toHaveLength(4);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[0].x).toBe(0);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[0].y).toBe(0);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[1].x).toBe(32);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[1].y).toBe(0);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[2].x).toBe(32);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[2].y).toBe(32);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[3].x).toBe(0);
		expect((objectLayer.objects[3] as IPolygonObject).polyline[3].y).toBe(0);
		// Tile
		expect(objectLayer.objects[4].name).toBe('tile');
		expect(objectLayer.objects[4].objectType).toBe('tile');
		expect(objectLayer.objects[4].x).toBe(32);
		expect(objectLayer.objects[4].y).toBe(96);
		expect((objectLayer.objects[4] as ITileObject).gid).toBe(132);
		// Text
		expect(objectLayer.objects[5].name).toBe('text');
		expect(objectLayer.objects[5].objectType).toBe('text');
		expect((objectLayer.objects[5] as ITextObject).text.text).toBe('Hello World');
		expect((objectLayer.objects[5] as ITextObject).text.wordWrap).toBeTruthy();

		objectLayer.objects.forEach((obj) => {
			expect(obj.properties.boolProp).toBeDefined();
			expect(obj.properties.boolProp).toBeTruthy();
			expect(obj.properties.colorProp).toBeDefined();
			expect(obj.properties.colorProp).toBe('#ff000000');
			expect(obj.properties.stringProp).toBeDefined();

			expect(obj.properties.stringProp).toBe('string');
			expect(obj.properties.intProp).toBeDefined();
			expect(obj.properties.intProp).toBe(50);
			expect(obj.properties.objProp).toBeDefined();
			expect(obj.properties.objProp).toBe(objectLayer.objects[2]);
			expect(obj.properties.floatProp).toBeDefined();
			expect(obj.properties.floatProp).toBe(1.113);
		});
	});
});
