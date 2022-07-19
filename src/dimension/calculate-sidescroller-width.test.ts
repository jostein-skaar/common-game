import { assert, describe, expect, it, test } from 'vitest';

import { calculateSidescrollerWidth } from './calculate-sidescroller-width.js';
import { DimensionLimits } from './dimension-limits.model.js';
import { ScaleMode } from './scale-mode.enum.js';

/*
Desktop Screen
1366x768 (22.98%)
1920x1080 (20.7%)
1536x864 (7.92%)
1440x900 (7.23%)
1280x720 (4.46%)

Mobile Screen
360x640 (18.7%)
375x667 (7.34%)
414x896 (6.76%)
360x780 (5.31%)
375x812 (5.01%)

Tablet Screen
768x1024 (51.43%)
1280x800 (7.28%)
800x1280 (5.26%)
601x962 (4.32%)
962x601 (2.99%)

  // iPad:
  // 768 - 20 (status bar)
  // height: 748,
  // width: 1024,


  https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/Displays/Displays.html
*/

describe('calculateSidescrollerWidth', () => {
  // Height is bound to the number of tiles in a sidescroller. 18 tiles x 32 px = 576 px.
  const height = 576;
  const maxWidth = 1024;
  const maxHeight = 1024;
  const maxWidthMap = 100 * 32;

  const dimensjoner = [
    [300, 300, height],
    [1000, 1000, height],
    [2000, 2000, height],

    // Portrait
    [100, 288, 50],
    [375, 812, 266.00985221674875], // iPhone XS
    [768, 1024, 432], // iPad stående
    [360, 640, 324], // Mest populær mobil-størrelse
    [375, 667, 323.8380809595202], // Nest mest populær mobil-størrelse
    [800, 1280, 450], // Nest mest populær tablet
    [300, 2000, 168.75], // Halvsprø tilfeller
    [50, 2000, 28.125], // Sprø tilfeller
    [768, 1004, 440.60557768924303], // Faktisk iPad stående (har jo statuslinje)
    [768, 954, 463.6981132075472], // Faktisk iPad stående i Safari (har jo statuslinje og navbar?)

    // Landscape
    [1200, 288, 512],
    [1920, 1080, 576], // PC
    [1800, 1000, 589.824],
    // [1366, 768, 768], // Landscape. Mest populær desktop-størrelse
    // [1366, 700, 640, 800, ScaleMode.Fit], // Mammas Chromebook
    // [812, 375, 640, 800, ScaleMode.Fit], // iPhone XS liggende
    // [1024, 768, 640, 800, ScaleMode.Fit], // iPad liggende
    // [1280, 800, 640, 800, ScaleMode.None], // Nest mest populær tablet
    [300, 301, 576],
    // [568, 320, 315.55555555555554], //
    // [2000, 300, 640, 800, ScaleMode.Fit], // Halvsprø tilfeller

    // [2000, 10, 640, 800, ScaleMode.Fit], // Sprø tilfeller
    // [2000, 600, 640, 800, ScaleMode.Fit], //

    // [1004, 768, 640, 800, ScaleMode.Fit], // Faktisk iPad liggende (har jo statuslinje)

    // [954, 768, 640, 800, ScaleMode.Fit], // Faktisk iPad liggende i Safari (har jo statuslinje og navbar?)
  ];

  test.each(dimensjoner)('gitt %p og %p som argumenter, returnerer %p, %p og %p', (availableWidth, availableHeight, expectedWidth) => {
    const actualWidth = calculateSidescrollerWidth(height, maxWidth, maxHeight, maxWidthMap, availableWidth, availableHeight);
    expect(actualWidth).toEqual(expectedWidth);
  });
});
