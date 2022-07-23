declare global {
  var pixelRatio: number;
}

let pixelRatio = 1;
// Check fow window because this lib may be run in NodeJS as well.
if (typeof window !== 'undefined') {
  pixelRatio = window.devicePixelRatio;
  if (pixelRatio !== 1 && pixelRatio !== 2 && pixelRatio !== 3) {
    pixelRatio = 1;
  }
}
// globalThis.pixelRatio = pixelRatio;
globalThis.pixelRatio = 3;

export function adjustForPixelRatio(size: number): number {
  return size * globalThis.pixelRatio;
}
