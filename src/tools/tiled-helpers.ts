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
    tileset.name = tileset.name.replace('@1', `@${pixelRatio}`);
  }
}
