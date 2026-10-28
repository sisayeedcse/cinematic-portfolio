"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { activities, Activity } from "@/data/activities";
import {
  Trophy,
  Calendar,
  ExternalLink,
  ZoomIn,
  Award,
  Sparkles,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FolderGit2,
  CheckCircle2,
  Users,
  Grid,
  Tv,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";

export default function Activities() {
  const [filter, setFilter] = useState<"all" | "hackathons" | "ieee">("all");
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"stage" | "archive">("stage");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [stageImageIndex, setStageImageIndex] = useState<number>(0);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  // Filtered list
  const filteredActivities = activities.filter((act) => {
    if (filter === "hackathons") {
      return (
        act.tags.includes("Hackathon") ||
        act.tags.includes("Competition") ||
        act.tags.includes("Runner-up") ||
        act.tags.includes("Finalist")
      );
    }
    if (filter === "ieee") {
      return (
        act.tags.includes("IEEE") ||
        act.tags.includes("Leadership") ||
        act.tags.includes("Bootcamp") ||
        act.tags.includes("Webinars")
      );
    }
    return true;
  });

  // Ensure activeIdx stays in range of filtered list
  const current = filteredActivities[activeIdx] || filteredActivities[0] || activities[0];

  const nextHonor = useCallback(() => {
    setDirection(1);
    setStageImageIndex(0);
    setActiveIdx((prev) => (prev + 1) % filteredActivities.length);
  }, [filteredActivities.length]);

  const prevHonor = useCallback(() => {
    setDirection(-1);
    setStageImageIndex(0);
    setActiveIdx((prev) => (prev - 1 + filteredActivities.length) % filteredActivities.length);
  }, [filteredActivities.length]);

  const selectHonor = useCallback(
    (idx: number) => {
      setDirection(idx > activeIdx ? 1 : -1);
      setStageImageIndex(0);
      setActiveIdx(idx);
    },
    [activeIdx]
  );

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextHonor();
      if (e.key === "ArrowLeft") prevHonor();
      if (e.key === "Escape") setSelectedActivity(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextHonor, prevHonor]);

  const openModal = (act: Activity, imgIdx: number = 0) => {
    setSelectedActivity(act);
    setModalImageIndex(imgIdx);
  };

  return (
    <section
      id="activities"
      className="relative min-h-[100svh] py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#060204] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-labelledby="activitiesTitle"
    >
      {/* 1. Volumetric Spotlight & Ambient Radiant Embers */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 50% at 50% 15%, rgba(200, 56, 43, 0.28) 0%, transparent 75%),
              radial-gradient(circle 480px at 80% 80%, rgba(212, 175, 55, 0.14) 0%, transparent 75%)
            `,
          }}
        />

        {/* Ambient perspective floor reflection lines */}
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] origin-bottom opacity-20"
          style={{
            perspective: "550px",
            background:
              "linear-gradient(to top, rgba(212, 175, 55, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(200, 56, 43, 0.08) 1px, transparent 1px)",
            backgroundSize: "60px 40px",
            transform: "rotateX(60deg)",
            maskImage: "linear-gradient(to top, black 10%, transparent 90%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-grow">
        {/* 2. Editorial Top Chapter Header + View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
                Scene 07 // The Hall of Honors & Leadership
              </p>
            </div>
            <h2
              id="activitiesTitle"
              className="font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none uppercase font-[Anton]"
            >
              Honors &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-red-500">
                Activities
              </span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-2.5 max-w-2xl font-sans tracking-wide">
              Podium placements, national hackathons, IEEE executive leadership, and engineering community building across Bangladesh.
            </p>
          </div>

          {/* Mode Switcher & Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-amber-500/30 backdrop-blur-md">
              <button
                onClick={() => setViewMode("stage")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  viewMode === "stage"
                    ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Tv size={13} className={viewMode === "stage" ? "text-amber-200" : "text-gray-400"} />
                <span>CINEMATIC STAGE</span>
              </button>
              <button
                onClick={() => setViewMode("archive")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  viewMode === "archive"
                    ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid size={13} className={viewMode === "archive" ? "text-amber-200" : "text-gray-400"} />
                <span>ARCHIVE (ALL 7)</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {[
                { id: "all", label: "All (7)" },
                { id: "hackathons", label: "Hackathons (4)" },
                { id: "ieee", label: "IEEE (3)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setFilter(tab.id as any);
                    setActiveIdx(0);
                    setStageImageIndex(0);
                  }}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                    filter === tab.id
                      ? "text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      : "text-gray-400 hover:text-amber-200"
                  }`}
                >
                  {filter === tab.id && (
                    <motion.div
                      layoutId="activityFilterPill"
                      className="absolute inset-0 bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 rounded-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. PRIMARY VIEW: The Spotlight Theater Stage (Focused Cinema Presentation) */}
        {viewMode === "stage" ? (
          <div className="w-full flex flex-col justify-between flex-grow mb-8">
            {/* The Main Stage Console */}
            <div className="relative w-full mb-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
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
                  className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#18070b]/95 via-[#0e0306]/98 to-[#050102]/98 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(200,56,43,0.3)] overflow-hidden"
                >
                  {/* Stage Top Bar: Honor Rank & Venue Telemetry */}
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] text-amber-400 font-mono ml-2 uppercase tracking-wider font-semibold">
                        {current.badge || "VERIFIED ACHIEVEMENT"} // HONORS_NODE 0{activeIdx + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {current.period && (
                        <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5 hidden sm:inline-flex">
                          <Calendar size={12} className="text-amber-400" />
                          <span>{current.period}</span>
                        </span>
                      )}

                      <button
                        onClick={() => openModal(current, stageImageIndex)}
                        className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-amber-300 transition-colors"
                        aria-label="Expand photo to fullscreen lightbox"
                      >
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Two Column Layout: Widescreen Theater Photo on Left, Telemetry & Narrative on Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left (7 cols): High-Definition Photo Showcase with Dual-Photo Switcher */}
                    <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-black/60 group border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                      {/* Active Photo */}
                      <div
                        onClick={() => openModal(current, stageImageIndex)}
                        className="relative w-full h-full cursor-pointer overflow-hidden"
                      >
                        <img
                          src={
                            stageImageIndex === 1 && current.image2
                              ? current.image2
                              : current.image
                          }
                          alt={current.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{
                            objectPosition:
                              stageImageIndex === 1 && current.image2Position
                                ? current.image2Position
                                : current.imagePosition || "center",
                          }}
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                        {/* Top Right Click to Expand Pill */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-amber-400/60 text-amber-200 text-[10px] font-mono font-bold shadow-lg">
                            <ZoomIn size={12} className="text-amber-400" />
                            EXPAND THEATRE
                          </span>
                        </div>
                      </div>

                      {/* Dual-Photo Gallery Switcher Overlay (When activity has 2 photos) */}
                      {current.image2 && (
                        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between gap-2 p-1.5 rounded-xl bg-black/85 backdrop-blur-xl border border-amber-500/40 shadow-xl">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold ml-2 hidden sm:inline">
                            [ DUAL PERSPECTIVE ]
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setStageImageIndex(0)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all ${
                                stageImageIndex === 0
                                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              <Users size={12} />
                              <span>PHOTO 1: EVENT / TEAM</span>
                            </button>

                            <button
                              onClick={() => setStageImageIndex(1)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all ${
                                stageImageIndex === 1
                                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              <Award size={12} />
                              <span>PHOTO 2: AWARD CREST</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right (5 cols): Podium Telemetry, Narrative & Action Links */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between relative">
                      <div>
                        {/* Organization Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                            {current.organization}
                          </span>
                          <span className="text-[11px] font-mono text-amber-200/80 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            VERIFIED CITATION
                          </span>
                        </div>

                        {/* Honor Title */}
                        <h3 className="font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight font-[Anton] text-white">
                          {current.title}
                        </h3>

                        {/* Narrative Description */}
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mt-3 mb-6">
                          {current.description}
                        </p>

                        {/* Tags */}
                        <div className="mb-6">
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-2.5">
                            Competency & Focus Domains
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {current.tags.map((t) => (
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

                      {/* Action Links & Inspection Button */}
                      <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => openModal(current, stageImageIndex)}
                          className="royal-sheen flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5),0_0_10px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] focus-royal"
                        >
                          <Maximize2 size={14} />
                          <span>View Full Photo</span>
                        </button>

                        {current.link && (
                          <a
                            href={current.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-200 font-mono font-semibold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] focus-royal"
                          >
                            <GitHubIcon className="w-4 h-4 text-amber-400" />
                            <span>{current.linkText || "Repo"}</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The 3D Podium Carousel Deck (Selector) */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/80">
                <span>PODIUM CAROUSEL // SELECT ACHIEVEMENT TO STAGE</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevHonor}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-200 transition-colors"
                    aria-label="Previous honor"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextHonor}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-200 transition-colors"
                    aria-label="Next honor"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* 7 Horizontal Podium Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {filteredActivities.map((act, aIdx) => {
                  const isSelected = current.id === act.id;
                  return (
                    <button
                      key={act.id}
                      onClick={() => selectHonor(aIdx)}
                      className={`group relative rounded-xl border text-left overflow-hidden transition-all duration-300 focus:outline-none flex flex-col justify-between ${
                        isSelected
                          ? "border-amber-400/90 bg-red-950/40 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-[1.03] ring-2 ring-amber-500/50"
                          : "border-white/10 bg-black/50 hover:border-amber-500/30 hover:bg-black/70 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Select ${act.title}`}
                    >
                      {/* Thumbnail Preview */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                        <img
                          src={act.image}
                          alt={act.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <span className="absolute top-1.5 left-1.5 font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/85 text-amber-400 font-bold border border-amber-500/20">
                          0{aIdx + 1}
                        </span>
                      </div>

                      {/* Card Label */}
                      <div className="p-2 sm:p-2.5">
                        <h4
                          className={`text-xs font-bold font-sans truncate transition-colors ${
                            isSelected ? "text-amber-100 font-bold" : "text-gray-300 group-hover:text-white"
                          }`}
                        >
                          {act.title}
                        </h4>
                        <p className="text-[10px] font-mono text-gray-500 truncate uppercase mt-0.5">
                          {act.organization}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* 4. SECONDARY VIEW: The Full Multi-Column Gallery Archive */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 mb-10">
            {filteredActivities.map((act, i) => {
              const hasDualImage = !!act.image && !!act.image2;
              const isFeatured = act.id === "ict-fair-runner-up" || act.id === "iconeect-2026";
              const colSpan = isFeatured ? "lg:col-span-12" : "lg:col-span-6";

              return (
                <motion.article
                  key={act.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className={`${colSpan} group relative rounded-2xl border border-amber-500/25 hover:border-amber-400/60 bg-gradient-to-b from-[#18070b]/90 via-[#0e0306]/95 to-[#050102]/98 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_60px_rgba(200,56,43,0.25)] transition-all duration-500 overflow-hidden flex flex-col justify-between`}
                >
                  <div>
                    {/* Image Presentation */}
                    {hasDualImage ? (
                      <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden border-b border-white/10 bg-black/60 flex">
                        <button
                          onClick={() => openModal(act, 0)}
                          className="relative w-[60%] h-full overflow-hidden text-left focus:outline-none group/img1 border-r border-white/10"
                        >
                          <img
                            src={act.image}
                            alt={`${act.title} — Main Stage`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img1:scale-105 opacity-85 group-hover/img1:opacity-100"
                            style={{ objectPosition: act.imagePosition || "center" }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono text-amber-200">
                            <Users size={11} className="text-amber-400" />
                            <span>EVENT / TEAM</span>
                          </div>
                        </button>

                        <button
                          onClick={() => openModal(act, 1)}
                          className="relative w-[40%] h-full overflow-hidden text-left focus:outline-none group/img2"
                        >
                          <img
                            src={act.image2}
                            alt={`${act.title} — Crest / Certificate`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img2:scale-105 opacity-85 group-hover/img2:opacity-100"
                            style={{ objectPosition: act.image2Position || "center" }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono text-amber-200">
                            <Award size={11} className="text-amber-400" />
                            <span>AWARD CREST</span>
                          </div>
                        </button>
                      </div>
                    ) : act.image ? (
                      <button
                        onClick={() => openModal(act, 0)}
                        className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-black/50 text-left focus:outline-none block group/single"
                      >
                        <img
                          src={act.image}
                          alt={act.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/single:scale-105 opacity-85 group-hover/single:opacity-100"
                          style={{ objectPosition: act.imagePosition || "center" }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      </button>
                    ) : null}

                    {/* Card Content Body */}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <p className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                          {act.organization}
                        </p>
                        {act.period && (
                          <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                            <Calendar size={12} className="text-amber-500/70" /> {act.period}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-sans text-white group-hover:text-amber-200 transition-colors tracking-tight mb-3">
                        {act.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-5">
                        {act.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {act.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-gray-300 text-[10px] font-mono tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-white/[0.08] text-xs font-mono">
                    <button
                      onClick={() => openModal(act, 0)}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider font-semibold"
                    >
                      <span>Inspect Photo</span>
                      <Maximize2 size={13} />
                    </button>

                    {act.link && (
                      <a
                        href={act.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all hover:text-white"
                      >
                        <GitHubIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Source</span>
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* 5. Editorial Bottom Telemetry Colophon */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500 pt-3 border-t border-white/10 tracking-widest uppercase">
          <span>[ LEADERSHIP · HACKATHON PODIUMS · TECHNICAL SERVICE ]</span>
          <span className="hidden sm:inline">KEYBOARD: USE ← / → TO CYCLE</span>
          <span>[ STAGE: 07 / 07 — HONORS & ACTIVITIES ]</span>
        </div>
      </div>

      {/* 6. Fullscreen Cinematic Lightbox Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
            />

            {/* Modal Box */}
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
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 block font-semibold">
                    {selectedActivity.organization} {selectedActivity.period ? `// ${selectedActivity.period}` : ""}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold font-sans text-white leading-tight mt-0.5">
                    {selectedActivity.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedActivity(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body: Active Image Display */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center bg-black/60 relative">
                {/* Current Active Image */}
                <div className="w-full max-w-4xl rounded-xl overflow-hidden border border-amber-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.95)] bg-black flex items-center justify-center min-h-[300px]">
                  <img
                    src={
                      modalImageIndex === 1 && selectedActivity.image2
                        ? selectedActivity.image2
                        : selectedActivity.image!
                    }
                    alt={selectedActivity.title}
                    className="w-full h-auto object-contain max-h-[58vh] mx-auto select-none"
                  />
                </div>

                {/* Dual Image Gallery Selector Tabs */}
                {selectedActivity.image2 && (
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => setModalImageIndex(0)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                        modalImageIndex === 0
                          ? "bg-gradient-to-r from-red-700 to-rose-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.7)] border border-amber-400/50"
                          : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <Users size={13} />
                      <span>PHOTO 1: EVENT / TEAM</span>
                    </button>

                    <button
                      onClick={() => setModalImageIndex(1)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                        modalImageIndex === 1
                          ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.7)] border border-amber-300"
                          : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <Award size={13} />
                      <span>PHOTO 2: AWARD / CREST</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-[#070103] flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  {selectedActivity.description}
                </p>

                {selectedActivity.link && (
                  <a
                    href={selectedActivity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                  >
                    <GitHubIcon className="w-4 h-4 text-white" />
                    <span>{selectedActivity.linkText || "View Repository"}</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}