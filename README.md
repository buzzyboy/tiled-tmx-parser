# Tiled TMX Parser

Loads tmx and tsx files created by the Tiled Map Editor.
Works with both embedded and referenced tilesets.

https://www.mapeditor.org/

Example usage

    import {parse} from 'tiled-tmx-parser';
    
    async function loadMap() {
        // Must be an absolute uri
        const map = await parse('http://{YOUR_SITE}/my-map.tmx');
    }

## Notes

Does not support Base64 ZStandard compression
