declare global {
  var pixelRatio: number;
}

// Check fow window because this lib may be run in NodeJS as well.
let pixelRatio = window ? window.devicePixelRatio : 1;
if (pixelRatio !== 1 && pixelRatio !== 2 && pixelRatio !== 3) {
  pixelRatio = 1;
}

globalThis.pixelRatio = pixelRatio;

export function adjustForPixelRatio(size: number): number {
  return size * globalThis.pixelRatio;
}
