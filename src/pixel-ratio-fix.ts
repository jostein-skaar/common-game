declare global {
  var pixelRatio: number;
}

let pixelRatio = 1;
// Check for window because this lib may be run in NodeJS as well.
if (typeof window !== 'undefined') {
  pixelRatio = Math.ceil(window.devicePixelRatio);
  if (pixelRatio < 1) {
    pixelRatio = 1;
  } else if (pixelRatio > 3) {
    pixelRatio = 3;
  }
}

globalThis.pixelRatio = pixelRatio;

export function adjustForPixelRatio(size: number): number {
  return size * globalThis.pixelRatio;
}
