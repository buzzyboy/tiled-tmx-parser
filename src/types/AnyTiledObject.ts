import {IRectangleObject} from '../interfaces/IRectangleObject';
import {IEllipseObject} from '../interfaces/IEllipseObject';
import {ITileObject} from '../interfaces/ITileObject';
import {IPointObject} from '../interfaces/IPointObject';
import {ITextObject} from '../interfaces/ITextObject';
import {IPolygonObject} from '../interfaces/IPolygonObject';

export type AnyTiledObject = IRectangleObject | IEllipseObject | ITileObject | IPointObject | ITextObject | IPolygonObject;
