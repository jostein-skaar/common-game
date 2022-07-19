export function calculateSidescrollerWidth(
  height: number,
  maxWidth: number,
  maxHeight: number,
  availableWidth: number,
  availableHeight: number
): number {
  if (availableWidth === availableHeight) {
    return height;
  }

  // Limit available space
  if (availableHeight > maxHeight) {
    availableHeight = maxHeight;
  }
  if (availableWidth > maxWidth) {
    availableWidth = maxWidth;
  }

  const isPortrait = availableWidth < availableHeight;

  const scale = availableHeight / height;

  let width = availableWidth / scale;

  if (isPortrait) {
    return width;
  }

  if (width > maxWidth) {
    width = maxWidth;
  }

  return width;
}
