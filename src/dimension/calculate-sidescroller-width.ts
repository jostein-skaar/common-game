export function calculateSidescrollerWidth(
  height: number,
  maxWidth: number,
  maxWidthMap: number,
  availableWidth: number,
  availableHeight: number
): number {
  if (availableWidth === availableHeight) {
    return height;
  }

  const isLandscape = availableWidth > availableHeight;
  const isPortrait = availableWidth < availableHeight;
  const scale = availableHeight / height;

  console.log('scale', scale, availableHeight, height);

  if (scale < 1 && isLandscape) {
    let width = availableWidth * scale;
    const maxWidthScaled = maxWidth * scale;
    if (width > maxWidthScaled) {
      width = maxWidthScaled;
    }
    if (width > maxWidthMap) {
      width = maxWidthMap;
    }
    return width;
  }

  if (scale < 1 && isPortrait) {
    const maxWidthScaled = maxWidth * scale;
    let width = availableWidth * scale;
    if (width > maxWidthScaled) {
      width = maxWidthScaled;
    }
    if (width > maxWidthMap) {
      width = maxWidthMap;
    }
    return width;
  }

  if (scale > 1 && isLandscape) {
    let width = availableWidth / scale;

    if (width > maxWidth) {
      width = maxWidth;
    }
    if (width > maxWidthMap) {
      width = maxWidthMap;
    }
    return width;
  }

  if (scale > 1 && isPortrait) {
    let width = availableWidth / scale;
    if (width > maxWidth) {
      width = maxWidth;
    }
    if (width > maxWidthMap) {
      width = maxWidthMap;
    }
    return width;
  }

  return NaN;

  // let width =  availableWidth / scale;

  // if (isLandscape) {
  //   console.log('calc w:', width);
  //   width = (height / availableHeight) * width;
  //   if (width > maxWidthMap) {
  //     width = maxWidthMap;
  //   }
  // }

  // if (width > maxWidthScaled) {
  //   width = maxWidthScaled;
  // }
  // if (width > maxWidthMap) {
  //   width = maxWidthMap;
  // }

  // return width;
}
