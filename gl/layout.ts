// Composition geometry for Sayeed Ibne Saif — fitting "SAYEED" into viewport

import { TARGET_RATIO } from "./type";

export const REF = {
  wordWidth: 0.92,       // fraction of viewport width
  capHeight: 0.52,       // fraction of viewport height
  vCentre: 0.5361,       // vertical center
  chip1: { x: 0.88, y: 0.26, h: 0.042 }, // Cloud Engineer
  chip2: { x: 0.02, y: 0.68, h: 0.038 }, // IEEE Chairperson
  dotsBR: { x: 0.9844, y: 0.95 },
  arrows: { left: 0.0181, right: 0.975, top: 0.345, bottom: 0.625, count: 5 },
};

export interface LayoutComputed {
  w: number;
  h: number;
  dpr: number;
  portrait: boolean;
  narrow: boolean;
  word: {
    x: number;
    y: number;
    w: number;
    h: number;
    capH: number;
    baseline: number;
  };
  hero: {
    h: number;
    cx: number;
    feet: number;
  };
  welcomeY: number;
  chip1: { x: number; y: number; h: number; alignRight?: boolean };
  chip2: { x: number; y: number; h: number };
  ember: { x: number; y: number };
}

export function computeLayout(w: number, h: number): LayoutComputed {
  const portrait = h / w > 1.05;
  const narrow = w < 760;

  const byWidth = (REF.wordWidth * w) / TARGET_RATIO;
  const byHeight = REF.capHeight * h;
  let capH = Math.min(byWidth, byHeight);

  if (portrait) capH = Math.min(byWidth * 1.0, h * 0.30);

  const wordW = capH * TARGET_RATIO;
  const cx = w * 0.5;
  const vCentre = portrait ? h * 0.50 : h * REF.vCentre;
  const capTop = vCentre - capH * 0.5;
  const baseline = vCentre + capH * 0.5;

  const word = {
    x: cx - wordW * 0.5,
    y: capTop,
    w: wordW,
    h: capH,
    capH,
    baseline,
  };

  let heroH = capH * 1.35;
  let feet = baseline + capH * 0.22;

  if (portrait) {
    heroH = h * 0.54;
    feet = h * 0.885;
  }

  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  return {
    w,
    h,
    dpr,
    portrait,
    narrow,
    word,
    hero: { h: heroH, cx, feet },
    welcomeY: portrait ? feet - heroH - h * 0.075 : h * 0.175,
    chip1: portrait
      ? { x: w * 0.95, y: capTop - h * 0.05, h: 20, alignRight: true }
      : { x: w * REF.chip1.x, y: h * REF.chip1.y, h: Math.max(18, h * REF.chip1.h) },
    chip2: portrait
      ? { x: w * 0.05, y: baseline + h * 0.055, h: 19 }
      : { x: w * REF.chip2.x, y: h * REF.chip2.y, h: Math.max(16, h * REF.chip2.h) },
    ember: { x: 0.5, y: vCentre / h },
  };
}
