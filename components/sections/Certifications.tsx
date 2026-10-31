"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certifications } from "@/data/certifications";
import { ExternalLink, ShieldCheck, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Certifications() {
  const [activeId, setActiveId] = useState<string>(certifications[0].id);

  const sectionRef = useRef<HTMLElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

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

      // 2. High-Resolution Artwork Expansion (Crisp, zero blur, clear transform on complete)
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
          clearProps: "scale",
        },
        0
      );

      // 3. Volumetric Crimson Mist Bloom
      tl.fromTo(
        mistRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 0.5, scale: 1.0, duration: 0.9, ease: "power2.out" },
        0.15
      );

      // 4. Golden Light Sweep across the stage
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

      // 6. Cascading Slate Reveal for Credential Tiles (Fast & Snappy)
      const tiles = stackRef.current?.querySelectorAll(".cert-tile");
      if (tiles && tiles.length > 0) {
        tl.fromTo(
          tiles,
          { x: 35, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, duration: 0.45, ease: "power3.out" },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative min-h-[100svh] pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-labelledby="certsTitle"
    >
      {/* ── 1. Master High-Resolution Artwork (Sayeed Standing in Suit with Glowing 3D CERTIFICATES) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center will-change-transform">
        <img
          ref={bgImgRef}
          src="/media/certificates-clean-throne.jpg"
          alt="Sayeed Ibne Saif — Verified Credentials & Certificates"
          className="w-full h-full object-cover object-[50%_20%] sm:object-[50%_25%] lg:object-center select-none cinematic-backdrop-img saturate-[0.80] filter contrast-105 brightness-100 will-change-transform"
          style={{ clipPath: "inset(0% 50% 0% 50%)" }}
          loading="eager"
        />

        {/* Ambient Pulsing Crimson & Gold Aura */}
        <div
          ref={mistRef}
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200, 56, 43, 0.45) 0%, rgba(212, 175, 55, 0.18) 45%, transparent 80%)",
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
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-amber-200/80 uppercase tracking-[0.25em] pb-4 border-b border-amber-500/20"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
          SCENE 05 // VERIFIED CREDENTIALS
        </span>

        {/* Letterspaced Title */}
        <p className="text-center text-amber-100 font-mono tracking-[0.22em] text-[11px] sm:text-xs">
          INDUSTRY CERTIFICATIONS · <span className="text-amber-400 font-bold">AKAMAI · IBM · SCRIMBA</span>
        </p>

        <span className="text-amber-400 font-semibold tracking-widest hidden sm:inline">
          {certifications.length} VERIFIED CREDENTIALS
        </span>
      </div>

      {/* ── 3. Main Stage: Left/Center Open (Sayeed & CERTIFICATES) + Sleek Names Stack on Right ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full mt-auto lg:my-auto py-2 sm:py-3 lg:py-4 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        {/* Left Side spacer: leaves Sayeed and "CERTIFICATES" text 100% open and visible */}
        <div className="hidden lg:block lg:flex-1 pointer-events-none" />

        {/* Right Side: Creative Compact Typography Stack of Certificate Names (Sleek for Laptop & Mobile) */}
        <div className="w-full max-w-sm sm:max-w-md lg:w-[310px] xl:w-[350px] 2xl:w-[400px] lg:ml-auto flex flex-col items-center lg:items-end space-y-1.5 sm:space-y-2">
          {/* Header pill above the list */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-amber-500/35 backdrop-blur-xl shadow-lg">
            <Award size={11} className="text-amber-400 animate-pulse" />
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-amber-300 uppercase tracking-widest">
              CERTIFICATION DOSSIER // VERIFIED CREDENTIALS
            </span>
          </div>

          {/* Mobile View (< lg): Sleek Segmented Pill Selector + Single Focused Certificate Card */}
          <div className="lg:hidden w-full space-y-2">
            {/* Quick Segmented Pill Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/80 border border-amber-500/30 backdrop-blur-xl shadow-lg overflow-x-auto no-scrollbar">
              {certifications.map((cert, idx) => {
                const isSelected = activeId === cert.id;
                return (
                  <button
                    key={cert.id}
                    onClick={() => setActiveId(cert.id)}
                    className={`relative flex-1 min-w-[44px] py-1 px-1 rounded-xl text-[9px] font-mono tracking-wider transition-all duration-300 uppercase truncate text-center ${
                      isSelected ? "text-white font-bold" : "text-gray-400 hover:text-amber-200"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="mobileActiveCertPill"
                        className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-xl shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Single Card on Mobile */}
            <AnimatePresence mode="wait">
              {(() => {
                const activeCert = certifications.find((c) => c.id === activeId) || certifications[0];
                return (
                  <motion.div
                    key={activeCert.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-2xl p-2.5 sm:p-3 bg-[#140407]/92 border border-amber-400/70 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.95)] flex items-center justify-between gap-3 text-left"
                  >
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[8px] sm:text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                          {activeCert.issuerShort}
                        </span>
                        <span className="text-gray-500 text-[8px]">•</span>
                        <span className="text-[8px] sm:text-[9px] font-mono text-gray-400 truncate">
                          {activeCert.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-[11px] sm:text-xs font-sans uppercase tracking-tight text-white truncate">
                        {activeCert.name}
                      </h3>
                    </div>

                    {activeCert.verifyUrl && (
                      <a
                        href={activeCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-red-600 to-amber-600 text-white shadow shrink-0 hover:scale-105 transition-all"
                      >
                        <span>VERIFY</span>
                        <ExternalLink size={9} />
                      </a>
                    )}
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Desktop/Laptop View (lg+): Full Sleek Compact Dossier Stack on Far Right */}
          <div ref={stackRef} className="hidden lg:flex flex-col w-full space-y-1.5 xl:space-y-2">
            {certifications.map((cert, idx) => {
              const isSelected = activeId === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  onClick={() => setActiveId(cert.id)}
                  whileHover={{ scale: 1.02, x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className={`cert-tile relative w-full rounded-xl p-2 lg:p-2.5 transition-all duration-300 cursor-pointer backdrop-blur-2xl flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? "bg-[#180408]/96 border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5),0_0_12px_rgba(220,38,38,0.4)] ring-1 ring-amber-400/50"
                      : "bg-[#0d0205]/88 border border-white/10 hover:border-amber-400/70 hover:bg-[#140307]/90 shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  {/* Left: Index + Certificate Name + Issuer */}
                  <div className="flex items-center gap-2 overflow-hidden text-left">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isSelected
                          ? "bg-amber-400 text-black shadow"
                          : "bg-white/5 text-amber-300/80 border border-white/10"
                      }`}
                    >
                      0{idx + 1}
                    </span>

                    <div className="overflow-hidden">
                      <h3
                        className={`text-[11px] lg:text-xs font-bold font-sans uppercase tracking-wide truncate transition-colors ${
                          isSelected ? "text-white" : "text-gray-200 group-hover:text-white"
                        }`}
                      >
                        {cert.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[8px] font-mono font-bold text-amber-400/90 uppercase tracking-wider">
                          {cert.issuerShort}
                        </span>
                        <span className="text-gray-500 text-[8px]">•</span>
                        <span className="text-[8px] font-mono text-gray-400 truncate">
                          {cert.categoryLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Direct External Verification Link */}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider shrink-0 transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow hover:scale-105"
                          : "bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10"
                      }`}
                      title={`Verify ${cert.name}`}
                    >
                      <span>VERIFY</span>
                      <ExternalLink size={9} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Telemetry Strip ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] font-mono text-gray-400 tracking-wider pt-3 px-2 border-t border-white/5">
        <span className="flex items-center gap-1.5 text-amber-300/80">
          <ShieldCheck size={12} className="text-emerald-400" />
          VERIFIED INDUSTRY CREDENTIALS & SPECIALIZATIONS
        </span>
        <span className="hidden sm:inline text-amber-400/70">
          AKAMAI · IBM · SCRIMBA · REPLY
        </span>
      </div>
    </section>
  );
}
