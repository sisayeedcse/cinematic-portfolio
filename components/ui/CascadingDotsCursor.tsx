"use client";

import { useEffect, useRef } from "react";

/**
 * CascadingDotsCursor
 * ---------------------
 * A 14-node chain cursor overlay. The head chases the pointer; each
 * subsequent node eases (spring-like lerp) toward the node ahead of it.
 * Rendered on a full-viewport canvas as an additive overlay.
 *
 * Accessibility rules (strictly enforced):
 * - NO cursor:none anywhere — native cursor always visible
 * - position:fixed, pointer-events:none, aria-hidden="true"
 * - Respects prefers-reduced-motion: doesn't mount at all
 * - Only mounts for hover:hover + pointer:fine (no touch / coarse)
 */

const NODES = 14;
const EASE = 0.34;          // chain lerp factor per frame
const HEAD_SIZE = 24;       // px, head diameter
const TAPER = 0.8;          // size multiplier per step
const DPR_CAP = 2;

// Royal Crimson → Imperial Gold gradient along the chain
const CRIMSON = [200, 56, 43] as const;   // #c8382b
const GOLD    = [212, 175, 55] as const;  // #d4af37

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAt(t: number): string {
  // t ∈ [0,1] — 0 is head (crimson), 1 is tail (gold, faded)
  const r = Math.round(lerp(CRIMSON[0], GOLD[0], t));
  const g = Math.round(lerp(CRIMSON[1], GOLD[1], t));
  const b = Math.round(lerp(CRIMSON[2], GOLD[2], t));
  const a = lerp(1, 0.08, t);   // tail fades to near-transparent
  return `rgba(${r},${g},${b},${a})`;
}

function colorGlowAt(t: number): string {
  const r = Math.round(lerp(CRIMSON[0], GOLD[0], t));
  const g = Math.round(lerp(CRIMSON[1], GOLD[1], t));
  const b = Math.round(lerp(CRIMSON[2], GOLD[2], t));
  const a = lerp(0.35, 0, t);   // glow halo, fades quickly
  return `rgba(${r},${g},${b},${a})`;
}

export default function CascadingDotsCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Prefers-reduced-motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 2. Hover + fine pointer check
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Node positions: array of [x, y]
    const nodes: [number, number][] = Array.from({ length: NODES }, () => [
      window.innerWidth / 2,
      window.innerHeight / 2,
    ]);

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let hovering = false; // cursor over interactive element?
    let raf = 0;
    let alive = true;

    // Resize canvas to full viewport at capped DPR
    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    function onPointerMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Detect interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      hovering = !!(el?.closest("a, button, input, [role='button']"));
    }

    function onPointerLeave() {
      // When pointer leaves window, slowly let nodes rest
    }

    function draw() {
      if (!alive || !canvas || !ctx) return;
      raf = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update node positions (chain lerp)
      nodes[0][0] = lerp(nodes[0][0], mouse.x, EASE);
      nodes[0][1] = lerp(nodes[0][1], mouse.y, EASE);
      for (let i = 1; i < NODES; i++) {
        nodes[i][0] = lerp(nodes[i][0], nodes[i - 1][0], EASE);
        nodes[i][1] = lerp(nodes[i][1], nodes[i - 1][1], EASE);
      }

      // Draw nodes from tail → head so head renders on top
      for (let i = NODES - 1; i >= 0; i--) {
        const t = i / (NODES - 1);              // 0 = head, 1 = tail
        const size = HEAD_SIZE * Math.pow(TAPER, i); // shrink along chain
        const hoverScale = i === 0 && hovering ? 1.5 : 1;
        const r = (size / 2) * hoverScale;

        const [x, y] = nodes[i];
        const color = colorAt(t);
        const glow  = colorGlowAt(t);

        // Outer glow halo (only for head + first few nodes)
        if (i < 5 && r > 1) {
          const grad = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 2.8);
          grad.addColorStop(0, glow);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(x, y, r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Solid dot
        if (r >= 0.5) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    }

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(document.documentElement);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    raf = requestAnimationFrame(draw);

    // Re-check mq on change (e.g. external mouse plugged into tablet)
    const mqChange = () => {
      if (!mq.matches) {
        alive = false;
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    mq.addEventListener("change", mqChange);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      resizeObs.disconnect();
      mq.removeEventListener("change", mqChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
