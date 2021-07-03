# Tiled TMX Parser

Loads tmx and tsx files created by the Tiled Map Editor.
Works with both embedded and referenced tilesets.

https://www.mapeditor.org/

### Example usage by URI

    import {parse} from 'tiled-tmx-parser';
    
    async function loadMap() {
        // Must be an absolute uri
        const map = await parse('http://{YOUR_SITE}/my-map.tmx');
    }

### Example usage by path

    import {parse} from 'tiled-tmx-parser';
    
    async function loadMap() {
        // Must be an absolute uri
        const map = await parse(path.join(__dirname, './maps/my-map.tmx');
    }

### Example TiledMap api

    import {parse} from 'tiled-tmx-parser';
    
    async function loadMap() {
        // Must be an absolute uri
        const map = await parse(path.join(__dirname, './maps/my-map.tmx');
        const tileLayer = map.layers.find(x => x instanceof TileLayer) // as TileLayer;
        const firstTile = tileLayer.tileAt(0, 0);
        const firstObject = map.getObjectById(1);
        const firstTileInTileSet = map.getTileById(1);
        const firstTileSet = map.getTileSetByGid(1);
    }

## Notes

* Does not support Base64 ZStandard compression
* Does not support "Output Chunk Width/Height"
* Does not currently support Group Layer
