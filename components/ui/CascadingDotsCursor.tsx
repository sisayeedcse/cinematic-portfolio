"use client";

import { useEffect, useRef } from "react";

/**
 * Cascading Dots Cursor Effect (Trail-Class Cursor)
 * Vanilla JS + CSS DOM nodes, no canvas, no external library.
 *
 * Parameters:
 * - Nodes: 14
 * - Chain ease: 0.34
 * - Head size: 24px
 * - Taper: 0.8
 * - Theme colors: Royal Crimson (#c8382b) to Imperial Gold (#d4af37)
 *
 * Accessibility:
 * - Native cursor is NEVER hidden (no cursor:none anywhere)
 * - Additive overlay: position: fixed, pointer-events: none, aria-hidden="true"
 * - Respects prefers-reduced-motion: reduce (does not mount effect)
 * - Disabled on touch/coarse pointers: only mounts when (hover: hover) and (pointer: fine)
 * - Single rAF loop with full teardown cleanup
 * - Interactive hover detection: element.closest("a, button, input, [role='button']")
 */

const NODES_COUNT = 14;
const CHAIN_EASE = 0.34;
const HEAD_SIZE = 24; // px
const TAPER = 0.8;

// Royal theme colors
const COLOR_CRIMSON = [200, 56, 43];  // #c8382b
const COLOR_GOLD = [212, 175, 55];    // #d4af37

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CascadingDotsCursor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility: prefers-reduced-motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 2. Accessibility: fine pointer & hover check (disables on touch / mobile)
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointerQuery.matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Create 14 DOM nodes
    const nodeElements: HTMLDivElement[] = [];
    const positions: { x: number; y: number }[] = [];

    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;

    for (let i = 0; i < NODES_COUNT; i++) {
      const dot = document.createElement("div");
      dot.setAttribute("aria-hidden", "true");

      const t = i / (NODES_COUNT - 1); // 0 at head, 1 at tail
      const r = Math.round(lerp(COLOR_CRIMSON[0], COLOR_GOLD[0], t));
      const g = Math.round(lerp(COLOR_CRIMSON[1], COLOR_GOLD[1], t));
      const b = Math.round(lerp(COLOR_CRIMSON[2], COLOR_GOLD[2], t));
      const alpha = lerp(0.95, 0.1, t);

      // Node size with 0.8 taper
      const size = Math.max(HEAD_SIZE * Math.pow(TAPER, i), 2);

      dot.style.position = "fixed";
      dot.style.top = "0";
      dot.style.left = "0";
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.borderRadius = "50%";
      dot.style.pointerEvents = "none";
      dot.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      dot.style.zIndex = `${99990 - i}`;
      dot.style.willChange = "transform";
      dot.style.transform = `translate3d(${initX - size / 2}px, ${initY - size / 2}px, 0)`;

      if (i === 0) {
        dot.style.boxShadow = `0 0 16px rgba(200, 56, 43, 0.8), 0 0 28px rgba(212, 175, 55, 0.4)`;
      } else if (i < 4) {
        dot.style.boxShadow = `0 0 10px rgba(200, 56, 43, 0.4)`;
      }

      container.appendChild(dot);
      nodeElements.push(dot);
      positions.push({ x: initX, y: initY });
    }

    let targetX = initX;
    let targetY = initY;
    let isHovering = false;
    let isVisible = false;
    let rafId = 0;
    let isRunning = true;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        container.style.opacity = "1";
      }

      // Check if interactive element is under pointer
      const target = document.elementFromPoint(e.clientX, e.clientY);
      isHovering = !!target?.closest("a, button, input, [role='button']");
    };

    const onPointerLeave = () => {
      isVisible = false;
      container.style.opacity = "0";
    };

    // Single rAF loop for math & transformation
    const loop = () => {
      if (!isRunning) return;

      // Head eases toward pointer
      positions[0].x = lerp(positions[0].x, targetX, CHAIN_EASE);
      positions[0].y = lerp(positions[0].y, targetY, CHAIN_EASE);

      // Subsequent nodes ease toward the node in front
      for (let i = 1; i < NODES_COUNT; i++) {
        positions[i].x = lerp(positions[i].x, positions[i - 1].x, CHAIN_EASE);
        positions[i].y = lerp(positions[i].y, positions[i - 1].y, CHAIN_EASE);
      }

      // Apply transforms
      for (let i = 0; i < NODES_COUNT; i++) {
        const size = Math.max(HEAD_SIZE * Math.pow(TAPER, i), 2);
        const scale = i === 0 && isHovering ? 1.4 : 1;
        const x = positions[i].x - (size * scale) / 2;
        const y = positions[i].y - (size * scale) / 2;

        nodeElements[i].style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }

      rafId = requestAnimationFrame(loop);
    };

    container.style.opacity = "0";
    container.style.transition = "opacity 0.3s ease";

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    rafId = requestAnimationFrame(loop);

    // Dynamic listener for pointer change (e.g. tablet unplug)
    const onPointerQueryChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        container.style.display = "none";
      } else {
        container.style.display = "block";
      }
    };
    pointerQuery.addEventListener("change", onPointerQueryChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      pointerQuery.removeEventListener("change", onPointerQueryChange);
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99990,
      }}
    />
  );
}
