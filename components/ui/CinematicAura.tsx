"use client";

import { useEffect, useState, useRef } from "react";

export default function CinematicAura() {
  const auraRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only activate on pointer-fine devices without reduced-motion
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    setMounted(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animFrame: number;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible && auraRef.current) {
        isVisible = true;
        auraRef.current.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (auraRef.current) {
        auraRef.current.style.opacity = "0";
      }
    };

    const render = () => {
      // Smooth linear interpolation (lerp)
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={auraRef}
      className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-30 transition-opacity duration-500 ease-out opacity-0 select-none mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle closest-side, rgba(200, 56, 43, 0.14) 0%, rgba(212, 175, 55, 0.08) 35%, rgba(245, 158, 11, 0.02) 65%, transparent 100%)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
