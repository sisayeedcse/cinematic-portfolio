"use client";

import { useEffect, useRef, useState } from "react";

// Spline Control Point
type Point = { x: number; y: number };

// Trailing Ember Particle
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
};

// Catmull-Rom Spline Interpolation for smooth organic curves
function getCatmullRomPoint(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point {
  const t2 = t * t;
  const t3 = t2 * t;

  const f0 = -0.5 * t3 + t2 - 0.5 * t;
  const f1 = 1.5 * t3 - 2.5 * t2 + 1.0;
  const f2 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
  const f3 = 0.5 * t3 - 0.5 * t2;

  return {
    x: p0.x * f0 + p1.x * f1 + p2.x * f2 + p3.x * f3,
    y: p0.y * f0 + p1.y * f1 + p2.y * f2 + p3.y * f3,
  };
}

export default function RoyalNeonLightTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsActive(false);
      return;
    }

    // 2. Refresh vs Session Check: Allow deliberate replay on page refresh
    try {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const isReload = navEntry?.type === "reload";

      if (isReload) {
        sessionStorage.removeItem("hero_neon_trail_played");
      }

      if (sessionStorage.getItem("hero_neon_trail_played") === "true") {
        setIsActive(false);
        return;
      }
    } catch {
      // Fallback if sessionStorage is restricted
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Build control points dynamically based on viewport dimensions
    // Specifically contours around the silhouette of Sayeed & the royal throne chair
    const getControlPoints = (): Point[] => {
      const isMobile = width < 768;
      if (isMobile) {
        return [
          { x: -50, y: height * 0.98 },
          { x: -20, y: height * 0.94 },
          { x: width * 0.14, y: height * 0.74 },
          { x: width * 0.22, y: height * 0.50 },
          { x: width * 0.26, y: height * 0.26 },
          { x: width * 0.50, y: height * 0.14 },
          { x: width * 0.74, y: height * 0.26 },
          { x: width * 0.78, y: height * 0.50 },
          { x: width * 0.88, y: height * 0.36 },
          { x: width * 1.08, y: height * 0.08 },
          { x: width * 1.15, y: height * 0.05 },
        ];
      }
      return [
        { x: -70, y: height * 0.98 },
        { x: -30, y: height * 0.94 },
        { x: width * 0.16, y: height * 0.76 },
        { x: width * 0.28, y: height * 0.54 },
        { x: width * 0.34, y: height * 0.28 },
        { x: width * 0.50, y: height * 0.14 },
        { x: width * 0.66, y: height * 0.28 },
        { x: width * 0.72, y: height * 0.54 },
        { x: width * 0.86, y: height * 0.38 },
        { x: width * 1.08, y: height * 0.08 },
        { x: width * 1.15, y: height * 0.05 },
      ];
    };

    // Evaluate spline at global parameter u in [0, 1]
    const evaluateSpline = (u: number): Point => {
      const pts = getControlPoints();
      const numSegments = pts.length - 3;
      const clampedU = Math.max(0, Math.min(u, 0.9999));
      const scaled = clampedU * numSegments;
      const segIndex = Math.floor(scaled);
      const segT = scaled - segIndex;

      const p0 = pts[segIndex];
      const p1 = pts[segIndex + 1];
      const p2 = pts[segIndex + 2];
      const p3 = pts[segIndex + 3];

      return getCatmullRomPoint(p0, p1, p2, p3, segT);
    };

    // Animation State
    let startTime = 0;
    const trailHistory: { x: number; y: number; time: number }[] = [];
    const particles: Particle[] = [];
    const colors = {
      crimson: "#C8382B",
      crimsonGlow: "rgba(200, 56, 43, 0.65)",
      imperialGold: "#D4AF37",
      goldHighlight: "#FBBF24",
      whiteCore: "#FFFDF5",
    };

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000; // in seconds

      // ── Timeline Easing & Mapping (Total duration: 5.0s) ──
      let u = 0;
      let phase = 1;
      let globalFade = 1.0;

      if (elapsed < 1.2) {
        // Phase 1 (0 – 1.2s): Initial entrance from bottom-left
        phase = 1;
        const progress = elapsed / 1.2;
        // Smooth quadratic ease-out
        u = 0.28 * (1 - Math.pow(1 - progress, 2));
      } else if (elapsed < 3.0) {
        // Phase 2 (1.2 – 3.0s): Royal cinematic orbit around silhouette & chair
        phase = 2;
        const progress = (elapsed - 1.2) / 1.8;
        // Organic sinusoidal ease-in-out
        const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);
        u = 0.28 + 0.44 * ease;
      } else if (elapsed < 4.2) {
        // Phase 3 (3.0 – 4.2s): Exit sweep accelerating toward upper-right
        phase = 3;
        const progress = (elapsed - 3.0) / 1.2;
        // Power-in acceleration
        const ease = progress * progress;
        u = 0.72 + 0.28 * ease;
      } else if (elapsed < 5.0) {
        // Phase 4 (4.2 – 5.0s): Fade out
        phase = 4;
        u = 1.05;
        const fadeProgress = (elapsed - 4.2) / 0.8;
        globalFade = Math.max(0, 1.0 - fadeProgress);
      } else {
        // Finished! Clean up
        try {
          sessionStorage.setItem("hero_neon_trail_played", "true");
        } catch {
          // Ignore
        }
        setIsActive(false);
        return;
      }

      // Compute current head coordinate
      const head = evaluateSpline(u);

      // Record to trail history
      if (elapsed < 4.4) {
        trailHistory.push({ x: head.x, y: head.y, time: elapsed });
      }

      // Prune old trail points (keep last ~0.38s of trail)
      while (
        trailHistory.length > 0 &&
        elapsed - trailHistory[0].time > 0.38
      ) {
        trailHistory.shift();
      }

      // Spawn subtle trailing particles / sparks during movement
      if (elapsed < 4.1 && Math.random() < 0.75) {
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.4 + 0.3;
          particles.push({
            x: head.x + (Math.random() - 0.5) * 6,
            y: head.y + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed + 0.3, // slight gravity drift
            radius: Math.random() * 1.5 + 0.8,
            color: Math.random() > 0.4 ? colors.goldHighlight : colors.crimson,
            alpha: 1.0,
            life: 0,
            maxLife: Math.random() * 0.5 + 0.3,
          });
        }
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // ── 1. Gentle Ambient Illumination on Chair & Environment (Phase 2) ──
      if (phase === 2 && globalFade > 0.05) {
        const ambientRadius = width < 768 ? 160 : 230;
        const ambientGlow = ctx.createRadialGradient(
          head.x,
          head.y,
          0,
          head.x,
          head.y,
          ambientRadius
        );
        ambientGlow.addColorStop(0, `rgba(200, 56, 43, ${0.16 * globalFade})`);
        ambientGlow.addColorStop(0.4, `rgba(212, 175, 55, ${0.07 * globalFade})`);
        ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.save();
        ctx.fillStyle = ambientGlow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, ambientRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── 2. Layered Neon Light Trail ──
      if (trailHistory.length > 2 && globalFade > 0.01) {
        const len = trailHistory.length;

        // Outer Soft Crimson Bloom Pass
        ctx.save();
        ctx.shadowColor = colors.crimson;
        ctx.shadowBlur = 26;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < len; i++) {
          const progress = i / len; // 0 at tail, 1 at head
          const pPrev = trailHistory[i - 1];
          const pCurr = trailHistory[i];

          ctx.beginPath();
          ctx.strokeStyle = `rgba(200, 56, 43, ${progress * 0.75 * globalFade})`;
          ctx.lineWidth = (1 + progress * 6.5);
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.lineTo(pCurr.x, pCurr.y);
          ctx.stroke();
        }
        ctx.restore();

        // Inner Imperial Gold Neon Core Pass
        ctx.save();
        ctx.shadowColor = colors.goldHighlight;
        ctx.shadowBlur = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < len; i++) {
          const progress = i / len;
          const pPrev = trailHistory[i - 1];
          const pCurr = trailHistory[i];

          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 175, 55, ${progress * 0.95 * globalFade})`;
          ctx.lineWidth = (0.8 + progress * 2.8);
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.lineTo(pCurr.x, pCurr.y);
          ctx.stroke();
        }
        ctx.restore();

        // Central Hot White Streak Pass
        ctx.save();
        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = Math.max(1, Math.floor(len * 0.35)); i < len; i++) {
          const progress = (i - len * 0.35) / (len * 0.65);
          const pPrev = trailHistory[i - 1];
          const pCurr = trailHistory[i];

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 253, 245, ${progress * 0.98 * globalFade})`;
          ctx.lineWidth = (0.6 + progress * 1.4);
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.lineTo(pCurr.x, pCurr.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── 3. Head Luminous Core & Cross Flare (When on-screen) ──
      if (elapsed < 4.2 && head.x > -20 && head.x < width + 30 && head.y > -20 && head.y < height + 30) {
        ctx.save();
        // Head glow
        ctx.shadowColor = colors.goldHighlight;
        ctx.shadowBlur = 18;
        ctx.fillStyle = colors.whiteCore;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Subtle horizontal anamorphic streak at the head
        ctx.fillStyle = `rgba(255, 250, 235, ${0.85 * globalFade})`;
        ctx.fillRect(head.x - 14, head.y - 0.75, 28, 1.5);
        ctx.restore();
      }

      // ── 4. Exit Anamorphic Lens Flare (Phase 3: 3.8s – 4.3s) ──
      if (elapsed >= 3.8 && elapsed <= 4.4) {
        const flareProgress = (elapsed - 3.8) / 0.6;
        const flareAlpha = Math.sin(flareProgress * Math.PI); // 0 -> 1 -> 0

        ctx.save();
        const flareX = width * 0.98;
        const flareY = height * 0.12;

        // Anamorphic horizontal flare beam
        const beamGrad = ctx.createLinearGradient(flareX - 180, flareY, flareX + 180, flareY);
        beamGrad.addColorStop(0, "rgba(200, 56, 43, 0)");
        beamGrad.addColorStop(0.5, `rgba(255, 250, 235, ${flareAlpha * 0.95})`);
        beamGrad.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.fillStyle = beamGrad;
        ctx.fillRect(flareX - 180, flareY - 1.5, 360, 3);

        // Radial diamond star
        const starGrad = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, 50);
        starGrad.addColorStop(0, `rgba(255, 255, 255, ${flareAlpha})`);
        starGrad.addColorStop(0.3, `rgba(245, 158, 11, ${flareAlpha * 0.75})`);
        starGrad.addColorStop(0.7, `rgba(200, 56, 43, ${flareAlpha * 0.35})`);
        starGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = starGrad;
        ctx.beginPath();
        ctx.arc(flareX, flareY, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── 5. Render Trailing Ember Particles ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 0.016;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.alpha = (1.0 - p.life / p.maxLife) * globalFade;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    // Coordinate start with hero boot completion
    let started = false;
    const startLoop = () => {
      if (started) return;
      started = true;
      animId = requestAnimationFrame(render);
    };

    if (!document.documentElement.classList.contains("is-booting")) {
      startLoop();
    } else {
      const onHeroReady = () => {
        window.removeEventListener("hero-ready", onHeroReady);
        startLoop();
      };
      window.addEventListener("hero-ready", onHeroReady);

      const observer = new MutationObserver(() => {
        if (!document.documentElement.classList.contains("is-booting")) {
          observer.disconnect();
          startLoop();
        }
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      const timer = setTimeout(() => {
        observer.disconnect();
        startLoop();
      }, 2500);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[105]"
      aria-hidden="true"
    />
  );
}
