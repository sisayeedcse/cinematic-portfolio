"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import TextEngine from "spring-text-engine";
import {
  techStack,
  techCategories,
  TechItem,
  SkillCategory,
} from "@/data/techStack";
import {
  Cpu,
  Layers,
  Sparkles,
  Maximize2,
  X,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Flame,
  ArrowRight,
  Terminal,
  Cloud,
  Code2,
  Database,
  Eye,
} from "lucide-react";

export default function Skills() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<"all" | SkillCategory>("all");
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTech =
    activeCategory === "all"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full bg-[#050102] text-white py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="skillsTitle"
    >
      {/* ── 1. Top Cinema Header Bar ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 02 // Core Capabilities
            </p>
          </div>
          <TextEngine
            tag="h2"
            mode="once"
            lineOut={{ opacity: 0, filter: "blur(10px)" }}
            lineIn={{ opacity: 1, filter: "blur(0px)" }}
            lineConfig={{ tension: 190, friction: 26 }}
            lineStagger={90}
            id="skillsTitle"
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase font-sans text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            style={{ justifyContent: "flex-start" }}
          >
            Technical Arsenal
          </TextEngine>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-2 max-w-xl font-sans tracking-wide">
            Enterprise cloud infrastructure, container orchestration, systems programming, and production engineering primitives.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-black/70 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(200,56,43,0.2)]">
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] font-mono tracking-wider transition-all duration-300 focus-royal ${
                activeCategory === cat.id
                  ? "text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "text-gray-400 hover:text-amber-200"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="skillsCategoryHighlight"
                  className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-xl"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. Cinematic Showcase: Throne Master Artwork + Right-Side Holographic Tech Deck ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-12 sm:mb-16">
        <motion.div
          initial={{ scale: 1.05, opacity: 0, filter: "blur(14px) brightness(0.65)" }}
          whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1.0)" }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden border border-amber-500/35 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(200,56,43,0.3)] bg-[#070103] group min-h-[480px] lg:min-h-[640px]"
        >
          {/* Master Artwork Image */}
          <img
            src="/media/skills-throne-bg.jpg"
            alt="Sayeed Ibne Saif — Technical Arsenal & Skills"
            className="w-full h-full object-cover object-[center_35%] lg:object-[25%_center] filter contrast-105 brightness-100 transition-transform duration-700 group-hover:scale-[1.01]"
            loading="eager"
          />

          {/* Ambient Warm Crimson/Amber Glow */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 30% 48%, rgba(220, 38, 38, 0.45) 0%, rgba(212, 175, 55, 0.16) 42%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Anamorphic Light Sweep on Viewport Reveal */}
          <motion.div
            initial={{ x: "-100%", opacity: 0.75 }}
            whileInView={{ x: "200%", opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/25 to-transparent pointer-events-none mix-blend-screen -skew-x-12"
          />

          {/* Dark Vignette to guarantee high contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050102] via-transparent to-[#050102]/60 pointer-events-none" />

          {/* Desktop Right-Side Gradient Shade to blend behind the holographic deck */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-[55%] bg-gradient-to-l from-[#050102] via-[#050102]/85 to-transparent pointer-events-none" />

          {/* Bottom Telemetry Strip across the artwork frame (Left side) */}
          <div className="absolute bottom-4 left-4 sm:left-8 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-500/40 backdrop-blur-md shadow-lg pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,1)]" />
            <span className="text-[10px] sm:text-[11px] font-mono text-amber-200 font-bold tracking-[0.2em] uppercase">
              TOOLS THAT TURN IDEAS INTO REALITY · SAYEED
            </span>
          </div>

          {/* ── Desktop Right-Side Holographic Deck Overlay ── */}
          <div className="hidden lg:flex absolute top-5 bottom-5 right-5 w-[50%] xl:w-[46%] z-20 flex-col justify-between rounded-2xl bg-[#090205]/90 backdrop-blur-2xl border border-amber-500/35 p-5 shadow-[0_0_50px_rgba(200,56,43,0.3)]">
            {/* Deck Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
                <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-[0.2em]">
                  COMMAND ARSENAL
                </span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-[10px] font-mono text-gray-300 uppercase">
                  {filteredTech.length} ACTIVE TOOLS
                </span>
              </div>
              <span className="text-[9px] font-mono text-amber-400/80 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25">
                CLICK TO INSPECT
              </span>
            </div>

            {/* Deck Scrollable Grid */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[460px] custom-scrollbar">
              <div className="grid grid-cols-2 gap-2.5">
                {filteredTech.map((item, idx) => {
                  const isHovered = hoveredId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedTech(item)}
                      className={`group relative rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all duration-200 border ${
                        isHovered
                          ? "bg-[#180408] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]"
                          : "bg-black/60 border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Logo Container */}
                      <div className="w-10 h-10 rounded-lg bg-black/80 border border-white/10 flex items-center justify-center p-2 shrink-0 group-hover:border-amber-400/50 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.3)] transition-all">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className={`w-6 h-6 object-contain ${
                            item.invertDark ? "brightness-0 invert" : ""
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* Tech Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-sm font-sans uppercase text-white tracking-wide group-hover:text-amber-200 truncate">
                            {item.name}
                          </h4>
                          {item.featured && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          )}
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 truncate mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Deck Bottom Status Bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-amber-200">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>BENCHMARK PROFICIENCY</span>
              </span>
              <span className="text-gray-400 uppercase tracking-wider">
                SELECT PRIMITIVE FOR SPECS
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3. Mobile Tech Deck (Displays seamlessly below artwork on <1024px screens) ── */}
      <div className="lg:hidden relative z-10 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl border border-amber-500/30 bg-[#0e0306]/94 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
              <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                COMMAND ARSENAL ({filteredTech.length})
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">
              TAP ICON TO INSPECT
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredTech.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                onClick={() => setSelectedTech(item)}
                className="group relative rounded-xl p-3 bg-black/70 border border-white/10 active:border-amber-400 active:bg-[#180408] flex items-center gap-2.5 cursor-pointer shadow-md"
              >
                <div className="w-9 h-9 rounded-lg bg-black/80 border border-white/10 flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`w-5 h-5 object-contain ${
                      item.invertDark ? "brightness-0 invert" : ""
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-xs font-sans uppercase text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-[9px] font-mono text-gray-400 truncate mt-0.5">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Cinematic Technical Spec Modal Lightbox (Portal to document.body) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedTech && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTechTitle"
              >
                {/* Dark Liquid Glass Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedTech(null)}
                  className="absolute inset-0 bg-black/94 backdrop-blur-2xl"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 25 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-amber-500/50 bg-[#0d0205] shadow-[0_0_80px_rgba(220,38,38,0.45)] overflow-hidden text-white"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-black/80 border border-amber-400/40 flex items-center justify-center p-2.5 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                        <img
                          src={selectedTech.icon}
                          alt={selectedTech.name}
                          className={`w-7 h-7 object-contain ${
                            selectedTech.invertDark ? "brightness-0 invert" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block font-bold">
                          TECH SPEC // {selectedTech.categoryLabel}
                        </span>
                        <h3
                          id="modalTechTitle"
                          className="text-xl sm:text-2xl font-extrabold font-sans uppercase text-white leading-tight"
                        >
                          {selectedTech.name}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTech(null)}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
                      aria-label="Close tech inspector"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
                    {/* Role & Level Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs uppercase tracking-wider">
                        ROLE: {selectedTech.role}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs uppercase tracking-wider">
                        LEVEL: {selectedTech.level}
                      </span>
                    </div>

                    {/* Architectural Overview */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-2 font-bold">
                        Architectural Overview
                      </h4>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                        {selectedTech.description}
                      </p>
                    </div>

                    {/* Technical Specifications */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-3 font-bold">
                        Technical Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedTech.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="p-3.5 rounded-xl bg-black/60 border border-amber-500/25"
                          >
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                              {spec.label}
                            </span>
                            <span className="text-sm sm:text-base font-mono font-bold text-amber-100 mt-1 block">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Workloads & Tags */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-3 font-bold">
                        Verified Workloads & Implementations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTech.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5"
                          >
                            <CheckCircle2 size={12} className="text-amber-400" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 sm:p-6 border-t border-white/10 bg-[#070103] flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      VERIFIED PRODUCTION PRIMITIVE
                    </span>

                    <button
                      onClick={() => setSelectedTech(null)}
                      className="royal-sheen px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                    >
                      Done Inspecting
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
