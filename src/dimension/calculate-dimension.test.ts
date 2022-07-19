import { assert, describe, expect, it, test } from 'vitest';
import { calculateDimension } from './calculate-dimension.js';
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

describe('calculateDimension', () => {
  const begrensninger: DimensionLimits = {
    minsteRatio: 0.4,
    storsteRatio: 0.8,
    minsteBredde: 320,
    storsteBredde: 768,
    minsteHoyde: 800,
    storsteHoyde: 1024,
  };

  const dimensjoner = [
    [375, 812, 375, 812, ScaleMode.Ingen], // iPhone XS
    [812, 375, 640, 800, ScaleMode.Tilpass], // iPhone XS liggende
    [768, 1024, 768, 1024, ScaleMode.Ingen], // iPad stående
    [1024, 768, 640, 800, ScaleMode.Tilpass], // iPad liggende
    [1280, 800, 640, 800, ScaleMode.Ingen], // Nest mest populær tablet
    [800, 1280, 768, 1024, ScaleMode.Ingen], // Nest mest populær tablet liggende
    [1920, 1080, 768, 1024, ScaleMode.Ingen], // PC
    [1366, 700, 640, 800, ScaleMode.Tilpass], // Mammas Chromebook
    [1366, 768, 640, 800, ScaleMode.Tilpass], // Mest populær desktop-størrelse
    [360, 640, 450, 800, ScaleMode.Tilpass], // Mest populær mobil-størrelse
    [375, 667, 449.7751124437781, 800, ScaleMode.Tilpass], // Nest mest populær mobil-størrelse
    [2000, 300, 640, 800, ScaleMode.Tilpass], // Halvsprø tilfeller
    [300, 2000, 320, 800, ScaleMode.Tilpass], // Halvsprø tilfeller
    [2000, 10, 640, 800, ScaleMode.Tilpass], // Sprø tilfeller
    [10, 2000, 320, 800, ScaleMode.Tilpass], // Sprø tilfeller
    [2000, 600, 640, 800, ScaleMode.Tilpass], //
    [768, 1004, 768, 1004, ScaleMode.Ingen], // Faktisk iPad stående (har jo statuslinje)
    [1004, 768, 640, 800, ScaleMode.Tilpass], // Faktisk iPad liggende (har jo statuslinje)
    [768, 954, 763.2, 954, ScaleMode.Ingen], // Faktisk iPad stående i Safari (har jo statuslinje og navbar?)
    [954, 768, 640, 800, ScaleMode.Tilpass], // Faktisk iPad liggende i Safari (har jo statuslinje og navbar?)
  ];

  test.each(dimensjoner)(
    'gitt %p og %p som argumenter, returnerer %p, %p og %p',
    (tilgjengeligBredde, tilgjengeligHoyde, forventetBredde, forventetHoyde, forventetSkaleringsmetode) => {
      const resultat = calculateDimension(begrensninger, tilgjengeligBredde, tilgjengeligHoyde);
      expect(resultat.bredde).toEqual(forventetBredde);
      expect(resultat.hoyde).toEqual(forventetHoyde);
      expect(resultat.skaleringsmetode).toEqual(forventetSkaleringsmetode);
    }
  );
});
