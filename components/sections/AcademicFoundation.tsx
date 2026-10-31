"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AcademicFoundation() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 1. Dual Royal Curtain Parting with 2 Golden Lines (Zero Blur, Snappy)
      tl.fromTo(
        leftCurtainRef.current,
        { xPercent: 0 },
        { xPercent: -101, duration: 0.85, ease: "power3.inOut" },
        0
      );
      tl.fromTo(
        rightCurtainRef.current,
        { xPercent: 0 },
        { xPercent: 101, duration: 0.85, ease: "power3.inOut" },
        0
      );

      // 2. High-Resolution Artwork Expansion (Crisp, zero blur)
      tl.fromTo(
        bgImgRef.current,
        {
          clipPath: "inset(0% 50% 0% 50%)",
          scale: 1.08,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1.0,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0
      );

      // 3. Halo Aura Breathing Behind Sunglasses & Crown
      tl.fromTo(
        haloRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 0.5, scale: 1.0, duration: 1.0, ease: "power2.out" },
        0.15
      );

      // 4. Golden Light Sweep across the throne
      tl.fromTo(
        sweepRef.current,
        { x: "-100%", opacity: 0.85 },
        { x: "200%", opacity: 0, duration: 1.0, ease: "power2.inOut" },
        0.2
      );

      // 5. Marquee HUD Entrance
      tl.fromTo(
        hudRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0.25
      );

      // 6. CGPA Distinction Card Slide-in (Snappy)
      tl.fromTo(
        cardRef.current,
        { x: 45, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.3
      );

      // 7. Circular Radial Gauge Stroke Fill (0% -> 94.75%)
      if (gaugeRef.current) {
        tl.fromTo(
          gaugeRef.current,
          { strokeDasharray: "0, 100" },
          { strokeDasharray: "94.75, 100", duration: 1.0, ease: "power2.out" },
          0.4
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="academic"
      className="relative min-h-[100svh] pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-labelledby="academicTitle"
    >
      {/* ── 1. Master High-Resolution Artwork (Sayeed in Sunglasses on Gold Throne with Red Cape & 3D ACADEMIC FOUNDATION) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center will-change-transform">
        <img
          ref={bgImgRef}
          src="/media/academic-foundation-throne.jpg"
          alt="Sayeed Ibne Saif — Academic Foundation"
          className="w-full h-full object-cover object-[center_35%] sm:object-[35%_center] select-none filter contrast-105 brightness-100 will-change-transform"
          style={{ clipPath: "inset(0% 50% 0% 50%)" }}
          loading="eager"
        />

        {/* Ambient Pulsing Crimson & Imperial Gold Aura */}
        <div
          ref={haloRef}
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200, 56, 43, 0.45) 0%, rgba(212, 175, 55, 0.2) 45%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Anamorphic Golden Light Sweep on Viewport Reveal */}
        <div
          ref={sweepRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none mix-blend-screen -skew-x-12 opacity-0"
        />

        {/* ── Royal Dual-Curtain Split Reveal with 2 Parting Golden Lines (Zero Blur) ── */}
        <div
          ref={leftCurtainRef}
          className="absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none bg-gradient-to-r from-[#050102] via-[#0d0205] to-[#120306] border-r border-[#d4af37] shadow-[2px_0_15px_rgba(212,175,55,0.5)] will-change-transform"
        />
        <div
          ref={rightCurtainRef}
          className="absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none bg-gradient-to-l from-[#050102] via-[#0d0205] to-[#120306] border-l border-[#d4af37] shadow-[-2px_0_15px_rgba(212,175,55,0.5)] will-change-transform"
        />

        {/* Edge Vignette Shading for Royal Contrast */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#050102] via-[#050102]/85 to-transparent pointer-events-none" />
      </div>

      {/* ── 2. Top Cinema Marquee HUD ── */}
      <div
        ref={hudRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-amber-200/80 uppercase tracking-[0.25em] pb-4 border-b border-amber-500/20 backdrop-blur-sm"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
          SCENE 04 // ACADEMIC FOUNDATION
        </span>

        {/* Letterspaced Title */}
        <p className="text-center text-amber-100 font-mono tracking-[0.22em] text-[11px] sm:text-xs">
          HIGHER EDUCATION · <span className="text-amber-400 font-bold">PREMIER UNIVERSITY</span> · CSE
        </p>

        <span className="text-amber-400 font-semibold tracking-widest hidden sm:inline">
          HONORS & DISTINCTION
        </span>
      </div>

      {/* ── 3. Main Stage: Unobstructed Left/Center (Sayeed & 3D Typography) + Creative CG Card on Right ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto lg:my-auto py-4 sm:py-6 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 lg:gap-8">
        {/* Left Side spacer: leaves Sayeed and "ACADEMIC FOUNDATION" text 100% open and visible */}
        <div className="hidden lg:block lg:flex-1 pointer-events-none" />

        {/* Right Side: Creative Academic CGPA Card */}
        <div
          ref={cardRef}
          className="w-full lg:w-auto lg:max-w-md xl:max-w-lg flex flex-col items-center lg:items-end will-change-transform"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative w-full rounded-3xl p-6 sm:p-8 bg-[#0d0205]/90 border border-amber-500/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(200,56,43,0.35)] flex flex-col gap-5 text-left group"
          >
            {/* Ambient Corner Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

            {/* Header: Label with Amber Glow */}
            <div className="flex items-center justify-between border-b border-amber-500/25 pb-3">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.22em] text-amber-300">
                  Current CGPA
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[9px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DISTINCTION
              </span>
            </div>

            {/* Core Metric Display: 3.79 / 4.00 */}
            <div className="flex items-center justify-between gap-4 py-1">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 tracking-tight drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                  3.79
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-mono text-amber-400/80 font-bold tracking-wider">
                  /4.00
                </span>
              </div>

              {/* Circular Radial Distinction Gauge (94.75%) */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <path
                    className="text-white/10"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Glowing Progress Arc (3.79/4.00 = 94.75%) */}
                  <path
                    ref={gaugeRef}
                    className="text-amber-400"
                    strokeDasharray="94.75, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.8))" }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-amber-200">
                    94.8%
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Description Text (Exact wording requested) */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs sm:text-sm font-sans text-amber-100/90 leading-relaxed tracking-wide">
                Maintaining high academic performance while building practical infrastructure skills.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 4. Bottom Telemetry Strip ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] font-mono text-gray-400 tracking-wider pt-3 px-2 border-t border-white/5">
        <span className="flex items-center gap-1.5 text-amber-300/80">
          <ShieldCheck size={12} className="text-emerald-400" />
          DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
        </span>
        <span className="hidden sm:inline text-amber-400/70">
          PREMIER UNIVERSITY · CHATTOGRAM
        </span>
      </div>
    </section>
  );
}
