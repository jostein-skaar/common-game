import * as fs from 'fs';

export function changePixelRatioInTiledJson(pixelRatio: number, srcPath: string, dstPath: string) {
  console.log('changePixelRatioInTiledJson for: ', pixelRatio);
  let mapContent = fs.readFileSync(srcPath);
  let map = JSON.parse(mapContent.toString());
  changeToPixelRatio(map, pixelRatio);

  let newMapContent = JSON.stringify(map, null, 2);
  fs.writeFileSync(dstPath, newMapContent);
}

function changeToPixelRatio(map: any, pixelRatio: number) {
  map.tilewidth *= pixelRatio;
  map.tileheight *= pixelRatio;

  for (const tileset of map.tilesets) {
    tileset.imagewidth *= pixelRatio;
    tileset.imageheight *= pixelRatio;
    tileset.tilewidth *= pixelRatio;
    tileset.tileheight *= pixelRatio;
    tileset.margin *= pixelRatio;
    tileset.spacing *= pixelRatio;
    tileset.image = tileset.image.replace('@1', `@${pixelRatio}`);
  }

  for (const group of map.layers) {
    for (const layer of group.layers) {
      if (layer.type === 'objectgroup') {
        for (const object of layer.objects) {
          object.height *= pixelRatio;
          object.width *= pixelRatio;
          object.x *= pixelRatio;
          object.y *= pixelRatio;
          if (object.polyline !== undefined) {
            for (const point of object.polyline) {
              point.x *= pixelRatio;
              point.y *= pixelRatio;
            }
          }
        }
      }
    }
  }
}
