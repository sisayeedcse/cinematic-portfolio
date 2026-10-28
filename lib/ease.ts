// Easing & spring utilities — ported from cinematic-portofilo/src/lib/ease.js

export const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Normalise t in [start, end] → 0..1 */
export const span = (t: number, start: number, end: number) =>
  clamp((t - start) / (end - start));

export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
export const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;
export const smoothstep = (lo: number, hi: number, x: number) => {
  const t = clamp((x - lo) / (hi - lo));
  return t * t * (3 - 2 * t);
};
export const smootherstep = (lo: number, hi: number, x: number) => {
  const t = clamp((x - lo) / (hi - lo));
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/**
 * Damped spring — frame-rate-independent approach toward target.
 * k controls stiffness (higher = faster response).
 */
export const damp = (v: number, to: number, k: number, dt: number) =>
  v + (to - v) * (1 - Math.exp(-k * dt));
