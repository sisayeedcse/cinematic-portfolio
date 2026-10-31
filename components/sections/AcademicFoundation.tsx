"use client";

import { motion } from "motion/react";
import { Award, Sparkles, ShieldCheck } from "lucide-react";

export default function AcademicFoundation() {
  return (
    <section
      id="academic"
      className="relative min-h-[100svh] pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-labelledby="academicTitle"
    >
      {/* ── 1. Master High-Resolution Artwork (Sayeed in Sunglasses on Gold Throne with Red Cape & 3D ACADEMIC FOUNDATION) ── */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0, filter: "blur(14px) brightness(0.65)" }}
        whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
      >
        <img
          src="/media/academic-foundation-throne.jpg"
          alt="Sayeed Ibne Saif — Academic Foundation"
          className="w-full h-full object-cover object-[center_35%] sm:object-[35%_center] select-none filter contrast-105 brightness-100"
          loading="eager"
        />

        {/* Ambient Pulsing Crimson & Imperial Gold Aura */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200, 56, 43, 0.4) 0%, rgba(212, 175, 55, 0.18) 45%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Anamorphic Golden Light Sweep on Viewport Reveal */}
        <motion.div
          initial={{ x: "-100%", opacity: 0.8 }}
          whileInView={{ x: "200%", opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none mix-blend-screen -skew-x-12"
        />

        {/* Edge Vignette Shading for Royal Contrast */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#050102] via-[#050102]/85 to-transparent pointer-events-none" />
      </motion.div>

      {/* ── 2. Top Cinema Marquee HUD ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
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
      </motion.div>

      {/* ── 3. Main Stage: Unobstructed Left/Center (Sayeed & 3D Typography) + Creative CG Card on Right ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto lg:my-auto py-4 sm:py-6 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 lg:gap-8">
        {/* Left Side spacer: leaves Sayeed and "ACADEMIC FOUNDATION" text 100% open and visible */}
        <div className="hidden lg:block lg:flex-1 pointer-events-none" />

        {/* Right Side: Creative Academic CGPA Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-auto lg:max-w-md xl:max-w-lg flex flex-col items-center lg:items-end"
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
        </motion.div>
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
