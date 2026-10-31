"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
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

      // 1. Heroic Character Silhouette & Mist Expansion (Technique A + F)
      tl.fromTo(
        bgImgRef.current,
        {
          scale: 1.14,
          filter: "blur(12px) brightness(0.55) contrast(1.2)",
        },
        {
          scale: 1.0,
          filter: "blur(0px) brightness(1.0) contrast(1.05)",
          duration: 1.4,
          ease: "expo.out",
        },
        0
      );

      // 2. Volumetric Crimson Mist Bloom
      tl.fromTo(
        mistRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 0.5, scale: 1.05, duration: 1.5, ease: "power2.out" },
        0.2
      );

      // 3. Golden Light Sweep across the stage
      tl.fromTo(
        sweepRef.current,
        { x: "-100%", opacity: 0.85 },
        { x: "200%", opacity: 0, duration: 1.6, ease: "power2.inOut" },
        0.3
      );

      // 4. Marquee HUD Unroll
      tl.fromTo(
        hudRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.35
      );

      // 5. Cascading Slate Reveal for Credential Tiles
      const tiles = stackRef.current?.querySelectorAll(".cert-tile");
      if (tiles && tiles.length > 0) {
        tl.fromTo(
          tiles,
          { x: 45, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05, duration: 0.65, ease: "power3.out" },
          0.45
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
          src="/media/certificates-clean-throne.png"
          alt="Sayeed Ibne Saif — Verified Credentials & Certificates"
          className="w-full h-full object-cover object-[center_35%] sm:object-[35%_center] select-none filter contrast-105 brightness-100 will-change-transform"
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
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none mix-blend-screen -skew-x-12"
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
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto lg:my-auto py-3 sm:py-6 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4 sm:gap-6 lg:gap-8">
        {/* Left Side spacer: leaves Sayeed and "CERTIFICATES" text 100% open and visible */}
        <div className="hidden lg:block lg:flex-1 pointer-events-none" />

        {/* Right Side: Creative Minimalist Typography Stack of Certificate Names */}
        <div className="w-full lg:w-auto lg:max-w-lg xl:max-w-xl flex flex-col items-center lg:items-end space-y-2 sm:space-y-2.5">
          {/* Header pill above the list */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-500/35 backdrop-blur-xl shadow-lg">
            <Award size={12} className="text-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">
              CERTIFICATION DOSSIER // VERIFIED CREDENTIALS
            </span>
          </div>

          {/* Interactive Stack of Certificate Names */}
          <div ref={stackRef} className="w-full space-y-2 sm:space-y-2.5">
            {certifications.map((cert, idx) => {
              const isSelected = activeId === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  onClick={() => setActiveId(cert.id)}
                  whileHover={{ scale: 1.02, x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`cert-tile relative w-full rounded-2xl p-3 sm:p-3.5 transition-all duration-300 cursor-pointer backdrop-blur-2xl flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-[#180408]/96 border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5),0_0_15px_rgba(220,38,38,0.4)] ring-1 ring-amber-400/50"
                      : "bg-[#0d0205]/88 border border-white/10 hover:border-amber-400/70 hover:bg-[#140307]/90 shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  {/* Left: Index + Certificate Name + Issuer */}
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                        isSelected
                          ? "bg-amber-400 text-black shadow"
                          : "bg-white/5 text-amber-300/80 border border-white/10"
                      }`}
                    >
                      0{idx + 1}
                    </span>

                    <div className="overflow-hidden">
                      <h3
                        className={`text-xs sm:text-sm font-bold font-sans uppercase tracking-wide truncate transition-colors ${
                          isSelected ? "text-white" : "text-gray-200 group-hover:text-white"
                        }`}
                      >
                        {cert.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-400/90 uppercase tracking-wider">
                          {cert.issuerShort}
                        </span>
                        <span className="text-gray-500 text-[10px]">•</span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 truncate">
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
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider shrink-0 transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow hover:scale-105"
                          : "bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10"
                      }`}
                      title={`Verify ${cert.name}`}
                    >
                      <span>VERIFY</span>
                      <ExternalLink size={10} />
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
