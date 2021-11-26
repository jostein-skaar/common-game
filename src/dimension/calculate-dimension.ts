import { DimensionLimits } from './dimension-limits.model';
import { DimensionResult } from './dimension-result.model';
import { ScaleMode } from './scale-mode.enum';

export function calculateDimension(begrensninger: DimensionLimits, tilgjengeligBredde: number, tilgjengeligHoyde: number): DimensionResult {
  let bredde = tilgjengeligBredde;
  let hoyde = tilgjengeligHoyde;

  let info = '';

  // Endre bredde dersom den er utenfor begrensningen.
  if (bredde > begrensninger.storsteBredde) {
    bredde = begrensninger.storsteBredde;
    info += 'Bredde settes til storsteBredde. ';
  } else if (bredde < begrensninger.minsteBredde) {
    bredde = begrensninger.minsteBredde;
    info += 'Bredde settes til minsteBredde. ';
  }

  // Endre hoyde dersom den er utenfor begrensningen.
  if (hoyde > begrensninger.storsteHoyde) {
    hoyde = begrensninger.storsteHoyde;
    info += 'Hoyde settes til storsteHoyde. ';
  } else if (hoyde < begrensninger.minsteHoyde) {
    hoyde = begrensninger.minsteHoyde;
    info += 'Hoyde settes til minsteHoyde. ';
  }

  const opprinneligRatio = tilgjengeligBredde / tilgjengeligHoyde;

  // Dette løser problemet for små skjermer som skal fylles helt.
  // TODO: Kan det være problemer hvis vi er liggende og vil fylle skjermen helt? Finner ut av det senere.
  if (opprinneligRatio >= begrensninger.minsteRatio && opprinneligRatio <= begrensninger.storsteRatio) {
    if (hoyde === begrensninger.minsteHoyde) {
      bredde = hoyde * opprinneligRatio;
      info += 'Bredde var minsteBredde - juster for tilpass. ';
    }
  }

  // Endre hoyde eller berdde dersom ratio er utenfor begrensningen.
  const ratio = bredde / hoyde;
  if (ratio < begrensninger.minsteRatio) {
    hoyde = bredde / begrensninger.minsteRatio;
    info += 'Ratio < minsteRatio. ';
  } else if (ratio > begrensninger.storsteRatio) {
    bredde = hoyde * begrensninger.storsteRatio;
    info += 'Ratio > storsteRatio. ';
  }

  let skaleringsmetode = ScaleMode.Ingen;

  if (hoyde > tilgjengeligHoyde) {
    skaleringsmetode = ScaleMode.Tilpass;
  }
  if (bredde > tilgjengeligBredde) {
    skaleringsmetode = ScaleMode.Tilpass;
  }

  console.log('beregnDimensjon info:', info);

  console.table({
    vindu: [tilgjengeligBredde, tilgjengeligHoyde],
    beregnet: [bredde, hoyde],
    skaleringsmetode,
  });

  return { bredde, hoyde, skaleringsmetode };
}
