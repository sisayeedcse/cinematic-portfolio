"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import TextEngine from "spring-text-engine";
import ElectricLogo from "@/components/ui/ElectricLogo";
import {
  Crown,
  Users,
  Trophy,
  Award,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Building2,
  Presentation,
  ShieldCheck,
  Flame,
  Camera,
} from "lucide-react";

type LeadershipPillar = {
  id: string;
  tabLabel: string;
  badge: string;
  role: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  keyHighlights: string[];
  photos: { src: string; caption: string; position?: string }[];
  link?: string;
  linkText?: string;
};

const leadershipPillars: LeadershipPillar[] = [
  {
    id: "ieee-chairperson",
    tabLabel: "IEEE CS CHAIRPERSON",
    badge: "EXECUTIVE OFFICE",
    role: "Chairperson",
    title: "IEEE Computer Society Student Branch Chapter",
    organization: "Premier University · IEEE Bangladesh Section",
    period: "2024 — Present",
    description:
      "Spearheading technical education, workshops, AI/ML bootcamps, and career mentoring programs across the university. Directing student branch chapter executive operations, liaising with IEEE section officials, and empowering 500+ aspiring engineers with practical software and cloud capabilities.",
    impactMetrics: [
      { label: "ENGINEERS MENTORED", value: "500+" },
      { label: "TECHNICAL INITIATIVES", value: "12+" },
      { label: "COMMUNITY ENGAGEMENT", value: "100%" },
      { label: "DOMAIN COVERAGE", value: "AI, Cloud & POSIX" },
    ],
    keyHighlights: [
      "Directed the premier AI/ML Technical Bootcamp, training students on applied neural networks & edge computing.",
      "Curated industry webinars with senior software architects and engineering leaders across Bangladesh.",
      "Established peer mentoring tracks connecting junior CSE students with production software practices.",
      "Strengthened IEEE Computer Society membership through hands-on hackathon coaching and code review circles.",
    ],
    photos: [
      { src: "/activities/bootcamp.png", caption: "IEEE AI/ML Technical Bootcamp", position: "95% 30%" },
      { src: "/activities/webinar.png", caption: "IEEE Technical Webinars & Knowledge Transfer", position: "85% center" },
      { src: "/activities/workshop.png", caption: "Student Technology Hands-on Workshop", position: "95% 20%" },
    ],
  },
  {
    id: "iconeect-2026",
    tabLabel: "iCONEECT 2026 CONFERENCE",
    badge: "INTERNATIONAL FLAGSHIP",
    role: "Session Coordinator & Conference Lead Volunteer",
    title: "IEEE iCONEECT 2026 & iCONCLAVE 2026",
    organization: "Premier University · IEEE Conference Directorate",
    period: "2026",
    description:
      "Coordinated critical operational pipelines for IEEE iCONEECT 2026 — managing Physical Paper Presentation Sessions 02 & 06 on Day 01, Virtual Session 08, and the high-stakes iCONCLAVE AI/ML competitive hackathon on Day 02. Facilitated international keynote researchers and multidisciplinary research panels.",
    impactMetrics: [
      { label: "SESSIONS COORDINATED", value: "3 Major Tracks" },
      { label: "RESEARCH FACILITATION", value: "International Tier" },
      { label: "EVENT DELEGATES", value: "200+ Researchers" },
      { label: "SPECIALTY", value: "AI/ML Research & NLP" },
    ],
    keyHighlights: [
      "Operational leadership managing physical session presentation protocols and timekeeper governance.",
      "Facilitated virtual track technical infrastructure ensuring zero dropouts for overseas conference delegates.",
      "Supervised iCONCLAVE hackathon problem evaluation pipelines, scoring validation, and podium announcements.",
      "Recognized by conference general chairs for flawless logistical execution and technical precision.",
    ],
    photos: [
      { src: "/activities/iconeect-team.jpg", caption: "IEEE iCONEECT Conference Organizing Directorate", position: "center top" },
      { src: "/activities/iconeect-award.png", caption: "Official Certificate of Recognition & Conference Honor", position: "center" },
    ],
  },
  {
    id: "competitive-podiums",
    tabLabel: "COMPETITIVE PODIUMS & HACKATHONS",
    badge: "NATIONAL PODIUM FINISHES",
    role: "Team Lead & Core Engineer",
    title: "3rd Chattogram ICT Fair · AppQuest · Televerse 1.0",
    organization: "ISPB Chattogram · Banglalink HQ · CUET ETE",
    period: "2024 — 2025",
    description:
      "Led multidisciplinary engineering squads through intense 8-hour to 72-hour pressure-cooker hackathons. Built resilient full-stack systems, mobile applications with Kotlin, and microservice architectures with Docker and CI/CD pipelines under tight deadlines.",
    impactMetrics: [
      { label: "CHATTOGRAM ICT FAIR", value: "Podium Runner-Up" },
      { label: "APPQUEST HACKATHON", value: "Top 5 Nationally" },
      { label: "TELEVERSE 1.0", value: "Top 30 Finalist" },
      { label: "TEAMS OUTPERFORMED", value: "100+ Squads" },
    ],
    keyHighlights: [
      "Awarded 2nd Place Runner-Up at the 3rd Chattogram ICT Fair 2025 tech competition at GEC Convention Center.",
      "Ranked 5th among 42 national teams at Banglalink HQ Dhaka with 'MaidMatch' on-demand platform.",
      "Top 30 Finalist across all Bangladeshi universities at CUET Televerse 1.0 building microservices in Docker.",
      "Demonstrated fast-paced problem formulation, live technical pitching, and rapid deployment under pressure.",
    ],
    photos: [
      { src: "/activities/podium-gec.jpg", caption: "ICT Fair 2025 Runner-Up Podium Ceremony", position: "center 20%" },
      { src: "/activities/prize-gec.jpg", caption: "Official Trophy & Recognition Award at GEC", position: "center" },
      { src: "/activities/applink-hackathon.jpg", caption: "AppQuest Hackathon Finalists at Banglalink HQ", position: "center" },
      { src: "/activities/televerse-hackathon.jpg", caption: "Televerse 1.0 Microservice Challenge at CUET", position: "center 30%" },
    ],
    link: "https://github.com/sisayeedcse/MaidMatch-App",
    linkText: "View MaidMatch GitHub Repo",
  },
];

export default function Leadership() {
  const [mounted, setMounted] = useState(false);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [activePhotoModal, setActivePhotoModal] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation for photo evidence modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhotoModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activePillar = leadershipPillars[activePillarIndex];

  return (
    <section
      id="leadership"
      className="relative w-full bg-[#050102] text-white py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="leadershipTitle"
    >
      {/* ── 1. Top Cinema Header Bar ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 04 // Executive Leadership
            </p>
          </div>
          <TextEngine
            tag="h2"
            mode="once"
            lineOut={{ opacity: 0, filter: "blur(10px)" }}
            lineIn={{ opacity: 1, filter: "blur(0px)" }}
            lineConfig={{ tension: 190, friction: 26 }}
            lineStagger={90}
            id="leadershipTitle"
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase font-sans text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            style={{ justifyContent: "flex-start" }}
          >
            Leadership & Creed
          </TextEngine>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-2 max-w-xl font-sans tracking-wide">
            Chairpersonship, international conference coordination, and competitive podium engineering under pressure.
          </p>
        </div>

        {/* Live Executive Status Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/75 border border-amber-500/35 backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-200/90 font-bold">
            IEEE CS CHAIRPERSON · ACTIVE TENURE
          </span>
        </div>
      </div>

      {/* ── 2. Cinematic Royal Spotlight Frame (Sayeed Seated on Throne with IEEE Flags & ElectricLogo) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-10 sm:mb-14">
        <motion.div
          initial={{ scale: 1.08, opacity: 0, filter: "blur(14px) brightness(0.65)" }}
          whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1.0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] min-h-[280px] sm:min-h-[380px] md:min-h-[460px] rounded-3xl overflow-hidden border border-amber-500/35 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(200,56,43,0.3)] group"
        >
          {/* Layer 1: Master Visible Leadership Portrait */}
          <img
            src="/media/leadership-hero-bg.jpg"
            alt="Sayeed Ibne Saif — Leadership & IEEE Chairperson"
            className="w-full h-full object-cover object-[center_35%] filter contrast-105 brightness-100 transition-transform duration-700 group-hover:scale-[1.01]"
            loading="eager"
          />

          {/* Layer 2: Animated Electric Silhouette Outline via React Bits ElectricLogo (WebGL OGL) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="absolute inset-0 z-10 w-full h-full pointer-events-auto mix-blend-screen"
          >
            <ElectricLogo
              src="/media/leadership-silhouette.png"
              color="#c8382b"
              glowColor="#8f1714"
              scale={0.85}
              intensity={1.15}
              glow={1.5}
              thickness={1.8}
              strands={4}
              bend={0.55}
              crackle={1.1}
              arcs={0.8}
              flicker={0.35}
              fill={0.05}
              speed={1.5}
              interactive={true}
              cursorIntensity={0.8}
              cursorRadius={110}
              theme="dark"
              className="w-full h-full"
            />
          </motion.div>

          {/* Layer 3: Warm Ambient Pulsing Ember Aura */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(220, 38, 38, 0.45) 0%, rgba(212, 175, 55, 0.16) 42%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Layer 4: Anamorphic Light Sweep on Viewport Reveal */}
          <motion.div
            initial={{ x: "-100%", opacity: 0.75 }}
            whileInView={{ x: "200%", opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent pointer-events-none mix-blend-screen -skew-x-12 z-10"
          />

          {/* Layer 5: Vignette Depth Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050102] via-transparent to-[#050102]/60 pointer-events-none z-10" />

          {/* Layer 6: Royal Telemetry Banner on the image frame */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/85 border border-amber-500/40 backdrop-blur-md shadow-lg">
              <Crown size={13} className="text-amber-400" />
              <span className="text-[10px] sm:text-[11px] font-mono text-amber-200 font-bold tracking-[0.2em] uppercase">
                EXECUTIVE OFFICE · PREMIER UNIVERSITY STUDENT BRANCH
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 border border-[#c8382b]/50 text-[10px] font-mono text-amber-200 font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(200,56,43,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8382b] animate-ping" />
              <span className="text-red-400">ELECTRIC CORONA</span>
              <span className="text-amber-400/50">·</span>
              <span className="text-amber-300">INTERACTIVE OGL</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-[10px] font-mono text-red-200 font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={13} className="text-amber-300" />
              <span>TENURE MMXXIV — MMXXVI</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3. Clean Executive Leadership Command Console (Breathable & Jargon-Free) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Leadership Pillar Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-amber-500/30 backdrop-blur-xl mb-6">
          {leadershipPillars.map((pillar, pIdx) => {
            const isTabActive = activePillarIndex === pIdx;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarIndex(pIdx)}
                className={`relative flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 focus-royal ${
                  isTabActive
                    ? "text-white font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-amber-200"
                }`}
              >
                {isTabActive && (
                  <motion.div
                    layoutId="leadershipPillarHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 uppercase flex items-center justify-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isTabActive ? "bg-white" : "bg-amber-500/60"
                    }`}
                  />
                  {pillar.tabLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Executive Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-amber-500/30 bg-[#0e0306]/92 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (7 cols): Role, Narrative, and Impact Metrics */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-[10px] font-mono text-red-300 font-bold uppercase tracking-wider">
                      {activePillar.badge}
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-semibold">
                      • {activePillar.period}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight font-sans text-white leading-tight">
                    {activePillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-amber-200/90 mt-1">
                    {activePillar.role} · {activePillar.organization}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                  {activePillar.description}
                </p>

                {/* 4-Stat High-Impact KPI Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {activePillar.impactMetrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-xl bg-black/60 border border-amber-500/25 flex flex-col justify-between"
                    >
                      <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400/80 block">
                        {metric.label}
                      </span>
                      <span className="text-lg sm:text-xl font-extrabold font-sans text-white tracking-wide mt-1 block">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Highlights */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 font-bold block">
                    KEY STRATEGIC DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activePillar.keyHighlights.map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 text-xs text-gray-300 p-2 rounded-lg bg-white/[0.03] border border-white/5"
                      >
                        <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {activePillar.link && (
                  <div className="pt-2">
                    <a
                      href={activePillar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>{activePillar.linkText || "View Technical Repository"}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column (5 cols): Photographic Evidence Gallery */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 font-bold flex items-center gap-1.5">
                    <Camera size={13} className="text-amber-400" />
                    PHOTOGRAPHIC EVIDENCE ARCHIVE
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    {activePillar.photos.length} PHOTOGRAPHS
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {activePillar.photos.map((photo, pIdx) => (
                    <motion.div
                      key={pIdx}
                      onClick={() => setActivePhotoModal(photo)}
                      className="group relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-amber-500/25 bg-black cursor-pointer shadow-lg hover:border-amber-400/70 transition-all duration-300"
                    >
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        style={{ objectPosition: photo.position || "center" }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between p-3.5">
                        <span className="text-xs font-mono text-white font-medium drop-shadow truncate pr-2">
                          {photo.caption}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-black/80 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/40 shrink-0 flex items-center gap-1">
                          <Maximize2 size={10} /> INSPECT
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── 4. Full-Screen Photographic Evidence Lightbox Modal (Portal) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activePhotoModal && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
                role="dialog"
                aria-modal="true"
                aria-label="Photographic Evidence Lightbox"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActivePhotoModal(null)}
                  className="absolute inset-0 bg-black/94 backdrop-blur-2xl"
                />

                {/* Dialog Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-4xl flex flex-col rounded-3xl border border-amber-500/50 bg-[#0d0205] shadow-[0_0_80px_rgba(220,38,38,0.45)] overflow-hidden text-white max-h-[92vh]"
                >
                  <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <Camera size={16} className="text-amber-400" />
                      <span className="text-xs sm:text-sm font-mono text-amber-200 font-bold uppercase tracking-wider">
                        {activePhotoModal.caption}
                      </span>
                    </div>
                    <button
                      onClick={() => setActivePhotoModal(null)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
                      aria-label="Close photo evidence"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-4 sm:p-6 bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src={activePhotoModal.src}
                      alt={activePhotoModal.caption}
                      className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                    />
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
