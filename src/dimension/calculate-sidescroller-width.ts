export function calculateSidescrollerWidth(
  height: number,
  maxWidth: number,
  maxWidthMap: number,
  availableWidth: number,
  availableHeight: number
): number {
  const isLandscape = availableWidth > availableHeight;

  let width = (height / availableHeight) * availableWidth;
  if (width > maxWidth) {
    width = maxWidth;
  }

  if (isLandscape) {
    console.log('calc w:', width);
    width = (height / availableHeight) * width;
    if (width > maxWidthMap) {
      width = maxWidthMap;
    }
  }

  return width;
}
