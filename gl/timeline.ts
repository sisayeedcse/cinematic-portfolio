// Timeline beats and easing curves for Sayeed's opening sequence

import {
  clamp,
  span,
  lerp,
  easeOutCubic,
  easeOutExpo,
  easeOutQuint,
  smoothstep,
} from "../lib/ease";

export const T = {
  heroIn: 0.30,
  heroInDur: 2.05,
  letters: 2.10,
  letterStagger: 0.145,
  letterDur: 1.65,
  ember: 2.45,
  welcome: 2.90,
  chip1: 3.18,
  chip2: 3.32,
  arrows: 3.46,
  dots: 3.62,
  header: 4.45,
  settled: 6.25,
};

export interface HeroSample {
  reveal: number;
  opacity: number;
  scale: number;
  dy: number;
  shadow: number;
}

export interface LetterSample {
  reveal: number;
  opacity: number;
  dy: number;
  soften: number;
  edge: number;
}

export interface TimelineState {
  hero: HeroSample;
  letters: LetterSample[];
  ember: number;
  flash: number;
  grain: number;
  settled: boolean;
  progress: number;
}

/** Reveal order: centre outward so SAYEED grows around the figure */
export function letterOrder(letters: { u0: number; u1: number }[]): number[] {
  return letters
    .map((l, i) => ({ i, d: Math.abs((l.u0 + l.u1) / 2 - 0.5) }))
    .sort((a, b) => a.d - b.d)
    .map((x, rank) => ({ i: x.i, rank }))
    .reduce((acc, x) => {
      acc[x.i] = x.rank;
      return acc;
    }, [] as number[]);
}

function bell(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  return Math.sin(p * Math.PI) ** 2;
}

export function sampleTimeline(
  t: number,
  nLetters: number,
  order: number[]
): TimelineState {
  const hp = span(t, T.heroIn, T.heroIn + T.heroInDur);
  const heroEase = easeOutQuint(hp);
  const hero: HeroSample = {
    reveal: hp,
    opacity: smoothstep(0, 0.35, hp),
    scale: lerp(0.885, 1, heroEase),
    dy: lerp(0.045, 0, heroEase),
    shadow: smoothstep(0.25, 0.9, hp),
  };

  const letters: LetterSample[] = [];
  for (let i = 0; i < nLetters; i++) {
    const t0 = T.letters + (order[i] ?? i) * T.letterStagger;
    const p = span(t, t0, t0 + T.letterDur);
    const e = easeOutExpo(p);
    letters.push({
      reveal: span(t, t0, t0 + T.letterDur * 0.82),
      opacity: smoothstep(0, 0.18, p),
      dy: lerp(0.34, 0, e),
      soften: lerp(1, 0, easeOutCubic(clamp(p * 1.15))),
      edge: smoothstep(0.35, 1, p),
    });
  }

  const ember = smoothstep(0, 1, span(t, T.ember, T.ember + 2.2));
  const flash = Math.max(
    0.17 * bell(span(t, T.letters + 0.25, T.letters + 1.25)),
    0.10 * bell(span(t, T.welcome, T.welcome + 0.5))
  );
  const grain = lerp(0.075, 0.034, smoothstep(0, 1, span(t, 0.2, 3.2)));

  return {
    hero,
    letters,
    ember,
    flash,
    grain,
    settled: t >= T.settled,
    progress: clamp(t / T.settled),
  };
}

export const CUES: [number, string][] = [
  [T.welcome, "welcome"],
  [T.chip1, "chip1"],
  [T.chip2, "chip2"],
  [T.arrows, "arrows"],
  [T.dots, "dots"],
  [T.header, "header"],
  [T.settled, "settled"],
];
