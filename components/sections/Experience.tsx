"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { experience, ExperienceItem } from "@/data/experience";
import {
  Briefcase,
  Award,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  ArrowRight,
  Layers,
} from "lucide-react";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"focused" | "all">("focused");

  const current = experience[activeIndex];

  const nextExperience = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % experience.length);
  }, []);

  const prevExperience = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + experience.length) % experience.length);
  }, []);

  const selectExperience = useCallback(
    (idx: number) => {
      setDirection(idx > activeIndex ? 1 : -1);
      setActiveIndex(idx);
    },
    [activeIndex]
  );

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextExperience();
      if (e.key === "ArrowLeft") prevExperience();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextExperience, prevExperience]);

  return (
    <section
      id="experience"
      className="relative min-h-[100svh] py-24 sm:py-32 px-4 sm:px-6 md:px-10 bg-black text-white flex flex-col justify-between overflow-hidden border-t border-white/10 select-none"
      aria-labelledby="expTitle"
    >
      {/* 1. Master "Work Section Image" Background Artwork */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* The high-resolution Sayeed stone/red typography artwork */}
        <img
          src="/media/work-bg.png"
          alt="Engineering Experience — Sayeed Ibne Saif"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
          loading="eager"
        />

        {/* Top vignette to seamlessly transition from projects section */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black via-black/75 to-transparent" />

        {/* Center atmospheric contrast mask: preserves the glowing red SAYEED typography while giving HUD cards perfect legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 95% 75% at 50% 50%, rgba(0, 0, 0, 0.45) 0%, rgba(6, 4, 4, 0.78) 75%, rgba(0, 0, 0, 0.94) 100%)",
          }}
        />

        {/* Bottom vignette to transition into Scene 06 Certifications */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black via-black/85 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-grow">
        {/* 2. Editorial Chapter Header + Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
                Scene 05 // Professional Record
              </p>
            </div>
            <h2
              id="expTitle"
              className="font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none uppercase font-[Anton] text-white"
            >
              Engineering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-red-500">
                Experience
              </span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-2.5 max-w-xl font-sans tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Hands-on delivery across client products, production e-commerce infrastructure, and technical chapter leadership.
            </p>
          </div>

          {/* View Mode Toggle & Telemetry */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setViewMode("focused")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all active:scale-[0.98] focus-royal ${
                  viewMode === "focused"
                    ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                FOCUSED HUD
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all active:scale-[0.98] focus-royal ${
                  viewMode === "all"
                    ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EXPANDED (ALL 3)
              </button>
            </div>
          </div>
        </div>

        {/* 3. Role Selector Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {experience.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => selectExperience(idx)}
                className={`group relative text-left p-4 sm:p-5 rounded-xl border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between active:scale-[0.98] focus-royal ${
                  isActive
                    ? "border-amber-400/80 bg-gradient-to-r from-red-950/70 to-black/80 shadow-[0_0_30px_rgba(245,158,11,0.3)] ring-1 ring-amber-500/30 scale-[1.02]"
                    : "border-white/10 bg-black/50 hover:border-amber-500/30 hover:bg-black/70 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Active Indicator Top Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeRoleBar"
                    className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-rose-400 rounded-t-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      0{idx + 1} //
                      <span className="uppercase text-amber-200">
                        {item.type}
                      </span>
                    </span>
                    <span>{item.period}</span>
                  </div>

                  <h3
                    className={`font-bold text-base sm:text-lg tracking-tight font-sans transition-colors ${
                      isActive ? "text-amber-100" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-gray-400 mt-0.5 truncate">
                    {item.organization}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[10px] font-mono">
                  <span className="text-gray-500">{item.location}</span>
                  <span
                    className={`transition-colors ${
                      isActive ? "text-amber-400 font-bold" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {isActive ? "ACTIVE VIEWING" : "SELECT ROLE →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 4. Display Area: Either Focused HUD or Expanded All-3 */}
        {viewMode === "focused" ? (
          /* Focused Single Role Master-Detail HUD Card */
          <div className="relative w-full mb-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 60 : -60,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -60 : 60,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-2xl border border-red-500/40 bg-gradient-to-b from-[#14080a]/90 via-[#0a0506]/95 to-[#040203]/98 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(239,68,68,0.2)] p-6 sm:p-8 md:p-10 overflow-hidden"
              >
                {/* Giant ambient watermark numeral */}
                <span
                  className="absolute right-4 sm:right-10 bottom-2 text-7xl sm:text-9xl md:text-[160px] font-black font-[Anton] text-white/[0.03] select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  0{activeIndex + 1}
                </span>

                {/* Corner crimson aura */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-red-600/15 via-rose-500/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-2 h-16 bg-gradient-to-b from-red-500 to-transparent" />

                {/* Card Top Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10 border-b border-white/[0.08] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      {current.type === "leadership" ? (
                        <Award className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-red-400 block">
                        RECORD 0{activeIndex + 1} // 0{experience.length}
                      </span>
                      <span className="text-xs text-gray-300 font-mono tracking-wider">
                        {current.organization}
                      </span>
                    </div>
                  </div>

                  {/* Period & Location Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300">
                      <Calendar size={12} className="text-red-400" />
                      <span>{current.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-400">
                      <MapPin size={12} className="text-rose-400" />
                      <span>{current.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role Title */}
                <div className="mb-6 relative z-10">
                  <h3 className="font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight font-[Anton] text-white">
                    {current.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed font-sans">
                    {current.description}
                  </p>
                </div>

                {/* Delivery Highlights Grid */}
                <div className="relative z-10 mb-8">
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Key Deliverables & Responsibilities
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {current.highlights.map((h, hi) => (
                      <div
                        key={hi}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/30 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <span className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips if available */}
                {current.tech && current.tech.length > 0 && (
                  <div className="relative z-10 pt-4 border-t border-white/[0.08] mb-6">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-2.5">
                      Tooling, Protocols & Environments
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {current.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-rose-300 font-mono text-xs hover:border-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Bottom Scrub Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08] relative z-10">
                  <button
                    onClick={prevExperience}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 text-xs font-mono tracking-wider transition-all hover:text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    PREVIOUS ROLE
                  </button>

                  <div className="flex items-center gap-2">
                    {experience.map((_, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => selectExperience(pIdx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          pIdx === activeIndex
                            ? "w-8 bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                            : "w-3 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Jump to experience 0${pIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextExperience}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                  >
                    NEXT ROLE
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Expanded All-3 Role Stack */
          <div className="space-y-6 mb-8">
            {experience.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-red-500/30 bg-[#0c0507]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                    {item.organization} · {item.location}
                  </span>
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    <Calendar size={12} className="text-red-400" /> {item.period}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-[Anton] uppercase text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-4 font-sans leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {item.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-red-400 mt-0.5">▹</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {item.tech && item.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-rose-300 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* 5. Editorial Bottom Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-400 pt-4 border-t border-white/10 tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
            [ REAL WORLD DELIVERY · TECHNICAL EXECUTION ]
          </span>
          <span className="hidden sm:inline">“GOOD DESIGN SMOKES LOUDER”</span>
          <span>[ RECORD: 0{activeIndex + 1} / 0{experience.length} ]</span>
        </div>
      </div>
    </section>
  );
}
