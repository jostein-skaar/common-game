declare global {
  var pixelRatio: number;
}

let pixelRatio = window.devicePixelRatio;
if (pixelRatio !== 1 && pixelRatio !== 2 && pixelRatio !== 3) {
  pixelRatio = 1;
}

globalThis.pixelRatio = pixelRatio;

export function adjustForPixelRatio(size: number): number {
  return size * globalThis.pixelRatio;
}
