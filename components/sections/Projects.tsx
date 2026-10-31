"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { projects, projectCategories, Project } from "@/data/projects";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  X,
  Cpu,
  Layers,
  Terminal,
  Gauge,
  Flame,
  Check,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import OrbitImages from "@/components/ui/OrbitImages";

export default function Projects() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter projects based on activeCategory
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  // Keep activeIdx safe
  const activeProject = filteredProjects[activeIdx] || filteredProjects[0] || projects[0];

  const selectProject = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  // Global keyboard shortcuts (Left/Right arrow to cycle, Escape to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) {
        if (e.key === "Escape") setModalProject(null);
        if (e.key === "ArrowRight") {
          const currIdx = filteredProjects.findIndex((p) => p.id === modalProject.id);
          const nextIdx = (currIdx + 1) % filteredProjects.length;
          setModalProject(filteredProjects[nextIdx]);
        }
        if (e.key === "ArrowLeft") {
          const currIdx = filteredProjects.findIndex((p) => p.id === modalProject.id);
          const prevIdx = (currIdx - 1 + filteredProjects.length) % filteredProjects.length;
          setModalProject(filteredProjects[prevIdx]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalProject, filteredProjects]);

  return (
    <section
      id="projects"
      className="relative min-h-[100svh] pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 px-4 sm:px-6 md:px-12 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-labelledby="projectsTitle"
    >
      {/* ── 1. Master High-Resolution Artwork (Sayeed Leaning on Red Ferrari F40) ── */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0, filter: "blur(14px) brightness(0.65)" }}
        whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
      >
        <img
          src="/media/projects-ferrari-clean.jpg"
          alt="Sayeed Ibne Saif — Engineering High-Performance Systems"
          className="w-full h-full object-cover object-[55%_center] sm:object-[center_35%] select-none filter contrast-105 brightness-100"
          loading="eager"
        />

        {/* Floor Glow Under Sayeed & The Ferrari F40 */}
        <div
          className="absolute bottom-0 inset-x-0 h-44 pointer-events-none opacity-60 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(200, 56, 43, 0.55) 0%, rgba(212, 175, 55, 0.2) 40%, transparent 80%)",
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
        className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-amber-200/80 uppercase tracking-[0.25em] pb-4 border-b border-amber-500/20 backdrop-blur-sm"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
          SCENE 03 // PRODUCTION SYSTEMS
        </span>

        {/* Letterspaced Title */}
        <p className="text-center text-amber-100 font-mono tracking-[0.22em] text-[11px] sm:text-xs">
          ORBITAL SHOWCASE · <span className="text-amber-400 font-bold">FULL-STACK & CLOUD</span> · RELEASES
        </p>

        <span className="text-amber-400 font-semibold tracking-widest hidden sm:inline">
          {filteredProjects.length} SYSTEMS IN ORBIT
        </span>
      </motion.div>

      {/* ── 3. Central Orbital Stage (All Project Cards Orbiting Around Sayeed & The Ferrari) ── */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center py-1 sm:py-4">
        <div className="relative w-full max-w-7xl h-[420px] sm:h-[580px] lg:h-[640px] flex items-center justify-center">
          <OrbitImages<Project>
            key={`${isMobile ? "mobile" : "desktop"}-${activeCategory}`}
            itemsData={filteredProjects}
            shape="ellipse"
            baseWidth={isMobile ? 540 : 1240}
            radiusX={isMobile ? 190 : 480}
            radiusY={isMobile ? 105 : 165}
            rotation={isMobile ? -3 : -6}
            depth={isMobile ? 0.65 : 0.74}
            itemWidth={isMobile ? 115 : 250}
            itemHeight={isMobile ? 75 : 165}
            itemRadius={isMobile ? 10 : 16}
            duration={isMobile ? 36 : 42}
            hoverSpeed={0.12}
            draggable={true}
            clickToFront={true}
            intro={true}
            showPath={true}
            pathColor="rgba(212, 175, 55, 0.3)"
            pathWidth={1.5}
            pathDash={7}
            className="w-full h-full"
            onItemClick={(idx) => {
              selectProject(idx);
            }}
            centerContent={
              <div className="pointer-events-none flex flex-col items-center justify-center text-center px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-black/75 border border-amber-500/40 backdrop-blur-xl shadow-[0_0_35px_rgba(200,56,43,0.4)]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Flame size={12} className="text-red-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-amber-300 font-bold uppercase tracking-[0.24em]">
                    PRODUCTION ORBIT
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white font-sans">
                  DRAG · HOVER · SELECT SYSTEM
                </span>
              </div>
            }
            renderItem={(project: Project, index: number) => {
              const isSelected = activeProject.id === project.id;

              if (isMobile) {
                return (
                  <div
                    onClick={() => selectProject(index)}
                    className={`relative w-full h-full rounded-xl overflow-hidden border transition-all duration-300 text-left flex flex-col justify-between p-1.5 select-none cursor-pointer backdrop-blur-md ${
                      isSelected
                        ? "border-amber-400 bg-[#160307] shadow-[0_0_20px_rgba(245,158,11,0.65)] ring-2 ring-amber-400"
                        : "border-amber-500/35 bg-[#0e0306]/92 hover:border-amber-400/80 shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
                    }`}
                  >
                    <div className="relative h-[55%] w-full rounded-lg overflow-hidden bg-black/80">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-black/85 text-[7px] font-mono text-amber-300 font-bold">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-1 mt-0.5">
                      <span className="text-[8px] font-bold text-white uppercase tracking-tight truncate leading-tight font-sans">
                        {project.title}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  onClick={() => selectProject(index)}
                  className={`relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 text-left flex flex-col justify-between group/orbit select-none cursor-pointer backdrop-blur-xl ${
                    isSelected
                      ? "border-amber-400 bg-[#160307]/95 shadow-[0_0_30px_rgba(245,158,11,0.6),0_0_20px_rgba(220,38,38,0.4)] ring-2 ring-amber-400/80"
                      : "border-amber-500/25 bg-[#0e0306]/92 hover:border-amber-400/70 hover:bg-[#180409]/95 shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
                  }`}
                >
                  {/* Top 52%: Cover image preview */}
                  <div className="relative h-[52%] w-full overflow-hidden bg-black/80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/orbit:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0306] via-transparent to-black/40" />

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/85 border border-amber-500/40 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[8px] font-mono font-bold text-amber-200 uppercase tracking-wider">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* System # */}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/85 border border-white/20 text-[8px] font-mono text-amber-300 font-bold">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Bottom 48%: Info & Action */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[12px] font-bold text-white uppercase tracking-tight truncate font-sans group-hover/orbit:text-amber-200 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-[9px] font-mono text-amber-400/80 truncate">
                        {project.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-white/10 mt-1">
                      <div className="flex items-center gap-1 overflow-hidden">
                        {project.tech.slice(0, 2).map((t: string) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[8px] font-mono text-gray-300 truncate"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProject(project);
                        }}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-[8px] font-mono font-bold uppercase tracking-wider shrink-0 transition-transform hover:scale-105 shadow cursor-pointer"
                        title="Inspect System Blueprint"
                      >
                        <Maximize2 size={9} />
                        <span>OPEN</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>

      {/* ── 4. Bottom Telemetry Bar & Controls ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 px-2 border-t border-white/10 backdrop-blur-sm">
        {/* Active project quick summary */}
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          <div className="flex items-center gap-2 truncate">
            <span className="text-white font-extrabold text-xs sm:text-sm font-sans uppercase tracking-wide truncate">
              0{activeIdx + 1} // {activeProject.title}
            </span>
            <span className="text-[9px] font-mono text-amber-400/90 uppercase px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 shrink-0 hidden sm:inline">
              {activeProject.categoryLabel}
            </span>
          </div>
        </div>

        {/* Category Filter Pills & Open Modal Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/70 border border-amber-500/25">
            {projectCategories.map((cat) => {
              const isCatActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveIdx(0);
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isCatActive
                      ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat.id === "all" ? "ALL" : cat.id.split("-")[0].toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Inspect Blueprint Modal Trigger */}
          <button
            onClick={() => setModalProject(activeProject)}
            className="flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-transform hover:scale-105 shrink-0 cursor-pointer"
          >
            <Maximize2 size={12} />
            <span>INSPECT BLUEPRINT</span>
          </button>
        </div>
      </div>

      {/* ── 5. Fullscreen Cinematic Project Blueprint Modal ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {modalProject && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalProjectTitle"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setModalProject(null)}
                  className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ scale: 0.94, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0b0204]/96 border border-amber-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.98),0_0_50px_rgba(200,56,43,0.35)] overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-[#170308] to-transparent">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]" />
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
                        className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close project blueprint"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
                    {/* Widescreen Screenshot */}
                    <div className="w-full rounded-2xl overflow-hidden border border-amber-500/30 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                      <img
                        src={modalProject.image}
                        alt={modalProject.title}
                        className="w-full h-auto object-cover max-h-[50vh]"
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

                    {/* Specifications & Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                      <div className="md:col-span-7 space-y-3">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/90 flex items-center gap-2">
                          <Layers size={13} className="text-amber-400" />
                          PRODUCTION SPECIFICATIONS & CONTEXT
                        </h4>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                          {modalProject.fullDescription}
                        </p>
                      </div>

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

                    {/* Tech Stack */}
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

                  {/* Modal Footer Actions */}
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
