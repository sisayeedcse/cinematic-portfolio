"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import TextEngine from "spring-text-engine";
import { projects, projectCategories, Project } from "@/data/projects";
import {
  ExternalLink,
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
  Cpu,
  Layers,
  Terminal,
  ArrowRight,
  Gauge,
  TrendingUp,
  Flame,
  Check,
  Eye,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";

type RevealTab = "summary" | "metrics" | "architecture";

export default function Projects() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<RevealTab>("summary");
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter projects based on activeCategory
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  // Keep activeIdx safe
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

  // Global keyboard shortcuts (Left/Right arrow to cycle, Escape to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) {
        if (e.key === "Escape") setModalProject(null);
        if (e.key === "ArrowRight") {
          const currModalIdx = projects.findIndex((p) => p.id === modalProject.id);
          const nextIdx = (currModalIdx + 1) % projects.length;
          setModalProject(projects[nextIdx]);
        }
        if (e.key === "ArrowLeft") {
          const currModalIdx = projects.findIndex((p) => p.id === modalProject.id);
          const prevIdx = (currModalIdx - 1 + projects.length) % projects.length;
          setModalProject(projects[prevIdx]);
        }
        return;
      }

      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalProject, nextProject, prevProject]);

  // Mouse 3D tilt tracking for stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 3.5, y: x * 5 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="projects"
      className="relative min-h-[100svh] py-24 sm:py-28 md:py-32 px-4 sm:px-6 md:px-10 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="projectsTitle"
    >
      {/* ── 1. Top Cinema Telemetry Header Bar ── */}
      <header className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 04 // Production Systems
            </p>
          </div>

          <TextEngine
            tag="h2"
            mode="once"
            lineOut={{ opacity: 0, filter: "blur(10px)" }}
            lineIn={{ opacity: 1, filter: "blur(0px)" }}
            lineConfig={{ tension: 190, friction: 26 }}
            lineStagger={90}
            id="projectsTitle"
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase font-sans"
            style={{ justifyContent: "flex-start" }}
          >
            Featured Productions
          </TextEngine>

          <p className="text-amber-100/80 text-xs sm:text-sm mt-2 max-w-xl font-sans tracking-wide">
            Commercial ERP systems, client e-commerce platforms, and full-stack software built for production environments.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-black/70 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(200,56,43,0.2)]">
          {projectCategories.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIdx(0);
                }}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] font-mono tracking-wider transition-all duration-300 focus-royal ${
                  isCatActive
                    ? "text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-amber-200"
                }`}
              >
                {isCatActive && (
                  <motion.div
                    layoutId="projectCategoryHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 uppercase">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ── 2. Desktop Royal Master Stage (Sayeed Leaning on Classic Red Ferrari) ── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1400px" }}
        className="relative z-10 w-full max-w-[1920px] mx-auto hidden lg:flex flex-col justify-between aspect-[16/9] min-h-[760px] max-h-[900px] rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(220,38,38,0.25)] p-6 sm:p-8 mb-6"
      >
        {/* Master Ferrari Artwork Backdrop — Animates sliding in smoothly from the right like a sports car! */}
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        >
          <motion.div
            initial={{ x: "16%", scale: 1.05, opacity: 0, filter: "blur(10px) brightness(0.7)" }}
            whileInView={{ x: "0%", scale: 1, opacity: 1, filter: "blur(0px) brightness(0.98)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.4, ease: [0.18, 1, 0.28, 1] }}
            className="w-full h-full relative"
          >
            <img
              src="/media/projects-ferrari-bg.jpg"
              alt="Sayeed Ibne Saif — Engineering High Performance"
              className="w-full h-full object-cover object-center filter contrast-105 brightness-[0.98]"
              loading="eager"
            />

            {/* Automotive Floor Reflection Underglow sliding in synchronously with the car */}
            <motion.div
              initial={{ x: "20%", opacity: 0 }}
              whileInView={{ x: "0%", opacity: 0.55 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.18, 1, 0.28, 1] }}
              className="absolute bottom-2 right-12 w-[65%] h-28 bg-gradient-to-t from-red-600/40 via-red-600/15 to-transparent blur-2xl pointer-events-none mix-blend-screen"
            />

            {/* Ambient Breathing Crimson & Gold Aura around Sayeed & Ferrari */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 55% at 65% 55%, rgba(220, 38, 38, 0.45) 0%, rgba(212, 175, 55, 0.2) 45%, transparent 80%)",
              }}
              aria-hidden="true"
            />

            {/* Cinematic Headlight / Anamorphic Flare Sweep on Arrival */}
            <motion.div
              initial={{ x: "-100%", opacity: 0.8 }}
              whileInView={{ x: "200%", opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent pointer-events-none mix-blend-screen -skew-x-12"
            />

            {/* Top subtle vignette */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none" />

            {/* Dark floor reflection enhancer */}
            <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#050102] via-[#050102]/70 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* ── 2A. LEFT FLANK (Upper-Left ivory/cream negative space): Interactive Project Command Dossier ── */}
        <div className="relative z-20 w-full max-w-xl flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProject.id}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 30 : -30,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -30 : 30,
                filter: "blur(6px)",
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-amber-500/40 bg-[#0d0306]/92 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(200,56,43,0.35)] p-5 sm:p-6 flex flex-col gap-3.5 text-white"
            >
              {/* Dossier Header: Badge, Status, Node Counter */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600/30 border border-red-500/50 text-[10px] font-mono text-red-300 font-bold uppercase tracking-wider">
                    {activeProject.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300/90 hidden sm:inline">
                    • {activeProject.tier}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                    PRODUCTION · 0{activeIdx + 1}/0{filteredProjects.length}
                  </span>
                </div>
              </div>

              {/* Title & Client Attribution */}
              <div>
                <h3 className="font-extrabold text-2xl sm:text-3xl xl:text-4xl uppercase tracking-tight font-sans text-white leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-amber-200/90 mt-1">
                  {activeProject.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-gray-400">
                  <span className="text-amber-400/90 uppercase tracking-wider">CLIENT / DOMAIN:</span>
                  <span className="text-gray-200 font-medium">{activeProject.client}</span>
                </div>
              </div>

              {/* ── 2B. Interactive Reveal Tabs (Giving user 3 distinct perspectives) ── */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10">
                {[
                  { id: "summary", label: "EXECUTIVE SUMMARY", icon: Eye },
                  { id: "metrics", label: "PERFORMANCE METRICS", icon: Gauge },
                  { id: "architecture", label: "TECH BLUEPRINT", icon: Cpu },
                ].map((tab) => {
                  const isTabActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as RevealTab)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${
                        isTabActive
                          ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                          : "text-gray-400 hover:text-amber-200"
                      }`}
                    >
                      <Icon size={12} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ── 2C. Dynamic Tab Content View ── */}
              <div className="min-h-[120px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeTab === "summary" && (
                    <motion.div
                      key="tab-summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans"
                    >
                      {activeProject.description}
                    </motion.div>
                  )}

                  {activeTab === "metrics" && (
                    <motion.div
                      key="tab-metrics"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-2 gap-2"
                    >
                      {activeProject.impactMetrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-amber-500/20 flex flex-col justify-between"
                        >
                          <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400/80">
                            {m.label}
                          </span>
                          <span className="text-base sm:text-lg font-extrabold font-sans text-white tracking-wide">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "architecture" && (
                    <motion.div
                      key="tab-architecture"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-1.5"
                    >
                      {activeProject.architectureHighlights.slice(0, 3).map((arch, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{arch}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {activeProject.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-[10px] hover:border-amber-500/40 hover:text-amber-200 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Inspect Blueprint + External Links */}
              <div className="pt-2 flex items-center gap-2.5">
                {/* Master Blueprint Inspector Trigger */}
                <button
                  onClick={() => setModalProject(activeProject)}
                  className="royal-sheen flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5),0_0_10px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] focus-royal"
                >
                  <Maximize2 size={13} />
                  <span>INSPECT SYSTEM BLUEPRINT</span>
                </button>

                {activeProject.links?.live && (
                  <a
                    href={activeProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/15 text-gray-200 hover:text-amber-300 transition-all focus-royal"
                    title="Launch Live Production Site"
                  >
                    <Globe size={16} />
                  </a>
                )}

                {activeProject.links?.github && (
                  <a
                    href={activeProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/15 text-gray-200 hover:text-amber-300 transition-all focus-royal"
                    title="View GitHub Repository"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 2D. BOTTOM HORIZON (Reflective floor dock): Amphitheater Filmstrip Selector ── */}
        <div className="relative z-20 w-full mt-auto pt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300/80 px-2">
            <span>PRODUCTION REGISTRY · SELECT TO INSPECT BLUEPRINT</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 hidden xl:inline">USE ← / → ARROWS</span>
              <button
                onClick={prevProject}
                className="p-1 rounded-lg bg-black/60 hover:bg-black/90 border border-amber-500/30 text-amber-200 hover:text-white transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextProject}
                className="p-1 rounded-lg bg-black/60 hover:bg-black/90 border border-amber-500/30 text-amber-200 hover:text-white transition-colors"
                aria-label="Next project"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Filmstrip cards */}
          <div className="grid grid-cols-7 gap-2.5">
            {filteredProjects.map((p, idx) => {
              const isSelected = activeProject.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => selectProject(idx)}
                  className={`group relative rounded-2xl border text-left overflow-hidden transition-all duration-300 focus:outline-none flex flex-col justify-between backdrop-blur-xl ${
                    isSelected
                      ? "border-amber-400/90 bg-[#160408]/90 shadow-[0_0_25px_rgba(245,158,11,0.5),0_0_15px_rgba(220,38,38,0.4)] scale-[1.03] ring-2 ring-amber-500/60"
                      : "border-white/10 bg-black/60 hover:border-amber-500/40 hover:bg-black/80 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Select ${p.title}`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <span className="absolute top-1.5 left-1.5 font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/80 text-amber-400 font-bold border border-amber-500/20">
                      0{idx + 1}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,1)] animate-pulse" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="p-2 sm:p-2.5">
                    <h4
                      className={`text-xs font-bold font-sans truncate transition-colors ${
                        isSelected ? "text-amber-100 font-bold" : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {p.title}
                    </h4>
                    <p className="text-[9px] font-mono text-gray-500 truncate uppercase mt-0.5">
                      {p.categoryLabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. Mobile Dedicated Presentation (< 1024px) ── */}
      <div className="lg:hidden flex flex-col gap-6">
        {/* Mobile Ferrari Visual Banner — Sliding in from the right */}
        <motion.div
          initial={{ x: "20%", opacity: 0, filter: "blur(10px)" }}
          whileInView={{ x: "0%", opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3, ease: [0.18, 1, 0.28, 1] }}
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
        >
          <img
            src="/media/projects-ferrari-bg.jpg"
            alt="Sayeed Ibne Saif — Engineering High Performance"
            className="w-full h-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050102] via-[#050102]/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-black/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
              HIGH-PERFORMANCE ARCHITECTURE
            </span>
            <span className="text-[10px] font-mono text-gray-300">
              0{activeIdx + 1} / 0{filteredProjects.length}
            </span>
          </div>
        </motion.div>

        {/* Mobile Active Project Card */}
        <div className="rounded-2xl border border-amber-500/40 bg-[#0d0306]/95 backdrop-blur-xl p-5 flex flex-col gap-4 text-white shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="px-2 py-0.5 rounded-full bg-red-600/30 border border-red-500/50 text-[10px] font-mono text-red-300 font-bold uppercase">
              {activeProject.categoryLabel}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE PRODUCTION
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-2xl uppercase tracking-tight font-sans text-white">
              {activeProject.title}
            </h3>
            <p className="text-xs font-mono text-amber-200/90 mt-0.5">
              {activeProject.subtitle}
            </p>
          </div>

          {/* Screenshot Preview */}
          <div
            onClick={() => setModalProject(activeProject)}
            className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10 group cursor-pointer"
          >
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-3 py-1.5 rounded-lg bg-black/80 text-amber-300 font-mono text-xs font-bold border border-amber-400/50 flex items-center gap-1.5">
                <Maximize2 size={12} /> TAP TO EXPAND
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            {activeProject.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2">
            {activeProject.impactMetrics.slice(0, 2).map((m, mIdx) => (
              <div
                key={mIdx}
                className="p-2 rounded-lg bg-black/60 border border-amber-500/20 text-center"
              >
                <span className="text-[9px] font-mono text-amber-400/80 block uppercase">
                  {m.label}
                </span>
                <span className="text-sm font-extrabold font-sans text-white">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setModalProject(activeProject)}
              className="royal-sheen w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              <Maximize2 size={13} />
              <span>INSPECT FULL SYSTEM BLUEPRINT</span>
            </button>

            <div className="flex items-center gap-2">
              {activeProject.links?.live && (
                <a
                  href={activeProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-gray-200 text-xs font-mono font-bold uppercase"
                >
                  <Globe size={13} />
                  <span>Live Site</span>
                  <ExternalLink size={12} />
                </a>
              )}
              {activeProject.links?.github && (
                <a
                  href={activeProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-gray-200 text-xs font-mono font-bold uppercase"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredProjects.map((p, idx) => {
            const isSelected = activeProject.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => selectProject(idx)}
                className={`flex-shrink-0 w-36 rounded-xl border text-left p-2.5 transition-all ${
                  isSelected
                    ? "border-amber-400 bg-red-950/60 shadow-lg ring-1 ring-amber-400"
                    : "border-white/10 bg-black/60 opacity-60"
                }`}
              >
                <span className="text-[9px] font-mono text-amber-400 font-bold block mb-1">
                  0{idx + 1} // {p.categoryLabel}
                </span>
                <h4 className="text-xs font-bold font-sans text-white truncate">
                  {p.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. Bottom Colophon & Navigation Legend ── */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full pt-8 sm:pt-10 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500 border-t border-amber-500/20 uppercase tracking-widest">
        <span>[ ARCHITECTURE · RESILIENT FULL-STACK PRODUCTION ]</span>
        <span className="hidden sm:inline">CYCLE: USE ← / → ARROWS · ESC TO CLOSE MODAL</span>
        <span>[ SCENE: 04 / 05 — THE PROJECT UNIVERSE ]</span>
      </footer>

      {/* ── 5. Full-Screen Deep-Dive Modal Inspector (Mounted at document.body via Portal) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {modalProject && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalProjectTitle"
              >
                {/* Dark Liquid Glass Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setModalProject(null)}
                  className="absolute inset-0 bg-black/94 backdrop-blur-2xl"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 25 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-6xl max-h-[94vh] flex flex-col rounded-3xl border border-amber-500/50 bg-[#0e0307] shadow-[0_0_80px_rgba(220,38,38,0.35),0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden text-white"
                >
                  {/* Top Header Bar */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-amber-400 font-bold">
                            {modalProject.categoryLabel}
                          </span>
                          <span className="text-gray-500 text-xs">•</span>
                          <span className="text-[10px] sm:text-[11px] font-mono text-gray-400">
                            {modalProject.client}
                          </span>
                        </div>
                        <h3
                          id="modalProjectTitle"
                          className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans uppercase text-white leading-tight mt-0.5"
                        >
                          {modalProject.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalProject(null)}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close project blueprint"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Blueprint Content */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
                    {/* Widescreen Screenshot Showcase */}
                    <div className="w-full rounded-2xl overflow-hidden border border-amber-500/30 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                      <img
                        src={modalProject.image}
                        alt={modalProject.title}
                        className="w-full h-auto object-cover max-h-[55vh]"
                      />
                    </div>

                    {/* Impact Telemetry Matrix */}
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-3 flex items-center gap-2">
                        <Gauge size={13} className="text-amber-400" />
                        KEY PERFORMANCE TELEMETRY
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {modalProject.impactMetrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-black/60 border border-amber-500/25 flex flex-col justify-between"
                          >
                            <span className="text-[9.5px] font-mono uppercase tracking-wider text-amber-300/80">
                              {metric.label}
                            </span>
                            <span className="text-xl sm:text-2xl font-extrabold font-sans text-white tracking-wide mt-1">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Production Narrative & Architecture Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                      {/* Left: Narrative (7 cols) */}
                      <div className="md:col-span-7 space-y-3">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/90 flex items-center gap-2">
                          <Layers size={13} className="text-amber-400" />
                          PRODUCTION SPECIFICATIONS & CONTEXT
                        </h4>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                          {modalProject.fullDescription}
                        </p>
                      </div>

                      {/* Right: Architecture Highlights (5 cols) */}
                      <div className="md:col-span-5 space-y-3">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/90 flex items-center gap-2">
                          <Cpu size={13} className="text-amber-400" />
                          ARCHITECTURAL HIGHLIGHTS
                        </h4>
                        <div className="space-y-2">
                          {modalProject.architectureHighlights.map((arch, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-gray-300"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-amber-400 shrink-0 mt-0.5"
                              />
                              <span>{arch}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Full Technical Stack Matrix */}
                    <div className="pt-2 border-t border-white/10">
                      <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-2.5 flex items-center gap-2">
                        <Terminal size={13} className="text-amber-400" />
                        ENGINEERING STACK & TOOLCHAIN
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {modalProject.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer: Live Deployment Actions */}
                  <div className="p-4 sm:p-6 border-t border-white/10 bg-[#070103] flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      DEPLOYMENT STATUS: VERIFIED PRODUCTION
                    </span>

                    <div className="flex items-center gap-3">
                      {modalProject.links?.live && (
                        <a
                          href={modalProject.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="royal-sheen flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                        >
                          <Globe size={14} />
                          <span>Launch Live Production</span>
                          <ExternalLink size={14} />
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
                          <span>GitHub Repo</span>
                        </a>
                      )}
                    </div>
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
