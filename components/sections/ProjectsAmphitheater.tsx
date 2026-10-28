"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, Project } from "@/data/projects";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Globe,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  X,
  Code2,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";

export default function ProjectsAmphitheater() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [filter, setFilter] = useState<string>("all");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  // Ensure activeIdx stays within bounds of filtered list
  const activeProject = filteredProjects[activeIdx] || filteredProjects[0] || projects[0];

  const nextProject = useCallback(() => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  const selectProject = useCallback(
    (idx: number) => {
      setDirection(idx > activeIdx ? 1 : -1);
      setActiveIdx(idx);
    },
    [activeIdx]
  );

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "Escape") setModalProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject]);

  return (
    <section
      id="projects"
      className="relative min-h-[100svh] py-24 sm:py-32 px-4 sm:px-6 md:px-10 bg-[#060204] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="projectsTitle"
    >
      {/* 1. Master Cinematic Ferrari Background Artwork (Slightly Highlighted) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* The high-resolution Sayeed & Ferrari master artwork */}
        <img
          src="/media/project-universe-bg.jpg"
          alt="The Project Universe — Sayeed Ibne Saif"
          className="w-full h-full object-cover object-[center_35%] filter contrast-105 brightness-[0.85] transition-all duration-700"
          loading="eager"
        />

        {/* Ambient Pulsing Crimson & Imperial Gold Aura highlighting Sayeed & Ferrari */}
        <div
          className="absolute inset-0 opacity-45 mix-blend-screen pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 60% at 60% 48%, rgba(220, 38, 38, 0.45) 0%, rgba(212, 175, 55, 0.18) 45%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Top vignette to seamlessly transition from Scene 03 Journey */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#060204] via-[#060204]/75 to-transparent pointer-events-none" />

        {/* Soft atmospheric depth mask: keeps Sayeed & the red Ferrari clearly highlighted while preserving 100% crisp contrast for all HUD cards & text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 50% 50%, rgba(6, 2, 4, 0.35) 0%, rgba(6, 2, 4, 0.65) 60%, rgba(6, 2, 4, 0.94) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom perspective floor grid overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%] origin-bottom opacity-20 pointer-events-none"
          style={{
            perspective: "550px",
            background:
              "linear-gradient(to top, rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(200, 56, 43, 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 40px",
            transform: "rotateX(60deg)",
            maskImage: "linear-gradient(to top, black 10%, transparent 90%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom vignette to seamlessly transition into Scene 05 Experience */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#060204] via-[#060204]/80 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-grow">
        {/* 2. Editorial Header + Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
                Scene 04 // Featured Productions
              </p>
            </div>
            <h2
              id="projectsTitle"
              className="font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none uppercase font-[Anton] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
            >
              The Project{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-red-500">
                Universe
              </span>
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base mt-2.5 max-w-xl font-sans tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Real systems, client e-commerce platforms, and full-stack software applications built for production environments.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white/[0.03] border border-amber-500/30 backdrop-blur-md">
            {[
              { id: "all", label: "All (7)" },
              { id: "web", label: "Web Platforms (4)" },
              { id: "software", label: "Software Systems (3)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id);
                  setActiveIdx(0);
                }}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                  filter === tab.id
                    ? "text-white font-bold shadow-[0_0_18px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-amber-200"
                }`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="projectFilterHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-lg"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Hero Amphitheater Stage (Cinematic Widescreen Command Screen) */}
        <div className="relative w-full mb-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProject.id}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 80 : -80,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -80 : 80,
                scale: 0.96,
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#18070b]/95 via-[#0e0306]/98 to-[#050102]/98 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(200,56,43,0.25)] overflow-hidden"
            >
              {/* Browser Chrome Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] text-gray-500 font-mono ml-2 hidden sm:inline">
                    production-screen // node_0{activeIdx + 1}
                  </span>
                </div>

                {/* Simulated URL Bar */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-amber-500/20 text-[11px] font-mono text-amber-200/80 max-w-xs sm:max-w-md w-full truncate">
                  <Lock size={11} className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">
                    {activeProject.links?.live || `https://sayeed.cloud/projects/${activeProject.id}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 hidden sm:inline">
                    [{activeProject.category}]
                  </span>
                  <button
                    onClick={() => setModalProject(activeProject)}
                    className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-amber-300 transition-colors"
                    aria-label="Expand project view"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Two Column Layout: Widescreen Image on Left, Details & Links on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left (7 cols): Full 16:10 Screenshot Showcase */}
                <div
                  onClick={() => setModalProject(activeProject)}
                  className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-black/60 group cursor-pointer border-b lg:border-b-0 lg:border-r border-white/10"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Click to inspect overlay pill */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/50 text-amber-200 font-mono text-xs font-bold shadow-lg">
                    <Maximize2 size={12} className="text-amber-400" />
                    <span>CLICK TO EXPAND INSPECTION</span>
                  </div>
                </div>

                {/* Right (5 cols): Project Telemetry, Narrative & Live Links */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between relative">
                  <div>
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                        {activeProject.category}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE PRODUCTION
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight font-[Anton] text-white">
                      {activeProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-amber-200/90 mt-1 mb-4">
                      {activeProject.subtitle}
                    </p>

                    {/* Narrative Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-6">
                      {activeProject.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mb-6">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-2.5">
                        Technical Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-xs hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-200 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                    {activeProject.links?.live && (
                      <a
                        href={activeProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="royal-sheen flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5),0_0_10px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] focus-royal"
                      >
                        <Globe size={14} />
                        <span>Visit Live Site</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}

                    {activeProject.links?.github && (
                      <a
                        href={activeProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-200 font-mono font-semibold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] focus-royal"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. The 3D Amphitheater Holographic Project Deck (Interactive Selector) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/80">
              AMPHITHEATER DECK // SELECT PROJECT TO PROJECT ON SCREEN
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-200 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextProject}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-200 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal Amphitheater Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {filteredProjects.map((p, pIdx) => {
              const isSelected = activeProject.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => selectProject(pIdx)}
                  className={`group relative rounded-xl border text-left overflow-hidden transition-all duration-300 focus:outline-none flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-400/80 bg-red-950/40 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-[1.03] ring-2 ring-amber-500/50"
                      : "border-white/10 bg-black/50 hover:border-amber-500/30 hover:bg-black/70 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Select ${p.title}`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <span className="absolute top-1.5 left-1.5 font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/80 text-amber-400 font-bold border border-amber-500/20">
                      0{pIdx + 1}
                    </span>
                  </div>

                  {/* Card Label */}
                  <div className="p-2 sm:p-2.5">
                    <h4
                      className={`text-xs font-bold font-sans truncate transition-colors ${
                        isSelected ? "text-amber-100 font-bold" : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {p.title}
                    </h4>
                    <p className="text-[10px] font-mono text-gray-500 truncate uppercase">
                      {p.category}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Editorial Bottom Colophon */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500 pt-3 border-t border-white/10 tracking-widest uppercase">
          <span>[ PRODUCTION ARCHITECTURE · REAL CLIENT SYSTEMS ]</span>
          <span className="hidden sm:inline">KEYBOARD: USE ← / → TO CYCLE</span>
          <span>[ STAGE: 04 / 07 — PROJECT UNIVERSE ]</span>
        </div>
      </div>

      {/* 6. Cinematic Full Modal Inspector */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProject(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-amber-500/40 bg-[#0e0306] shadow-[0_0_60px_rgba(200,56,43,0.35)] overflow-hidden text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 block">
                    {modalProject.category} // {modalProject.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-[Anton] uppercase text-white leading-tight">
                    {modalProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setModalProject(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body: Scrollable High-Res Screenshot */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black/60 flex flex-col items-center">
                <div className="w-full max-w-4xl rounded-xl overflow-hidden border border-amber-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)] bg-black">
                  <img
                    src={modalProject.image}
                    alt={modalProject.title}
                    className="w-full h-auto object-cover max-h-[60vh] select-none"
                  />
                </div>

                <p className="text-sm text-gray-300 max-w-3xl mt-6 leading-relaxed font-sans">
                  {modalProject.description}
                </p>

                <div className="flex flex-wrap gap-2 max-w-3xl w-full mt-4">
                  {modalProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer: Live Links */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-[#070103] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-mono text-gray-400">
                  Status: Full Production Deployment
                </span>

                <div className="flex items-center gap-3">
                  {modalProject.links?.live && (
                    <a
                      href={modalProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                    >
                      <Globe size={14} />
                      <span>Launch Live Site</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {modalProject.links?.github && (
                    <a
                      href={modalProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}