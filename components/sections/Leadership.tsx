"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import TextEngine from "spring-text-engine";
import { activities, Activity } from "@/data/activities";
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
  Terminal,
  Cpu,
  Flame,
  Building2,
  Presentation,
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
      "Spearheading technical education, workshops, AI/ML bootcamps, and career mentoring programs across the university. Directing student branch chapter executive operations, liaising with IEEE section officials, and empowering 500+ aspiring engineers with practical hands-on software and cloud capabilities.",
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
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhotoModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 4, y: x * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activePillar = leadershipPillars[activePillarIndex];

  return (
    <section
      id="leadership"
      className="relative w-full bg-[#050102] text-white overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="leadershipTitle"
    >
      {/* ── 1. Top Cinema Telemetry Header Bar ── */}
      <header className="relative z-20 pt-24 sm:pt-28 pb-4 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 03 // Executive Command
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
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase font-sans"
            style={{ justifyContent: "flex-start" }}
          >
            Leadership & Creed
          </TextEngine>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-1.5 max-w-lg font-sans tracking-wide">
            Chairpersonship, international conference coordination, and competitive podium engineering under pressure.
          </p>
        </div>

        {/* Live Executive Status Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/75 border border-amber-500/35 backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-200/90 font-bold">
            IEEE CS CHAIRPERSON // ACTIVE TENURE
          </span>
        </div>
      </header>

      {/* ── 2. Master Throne Experience with 3D Parallax & Royal Flare ── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1400px" }}
        className="relative z-10 w-full max-w-[1920px] mx-auto hidden lg:flex items-center justify-center aspect-[2/1] min-h-[820px] px-6 my-auto"
      >
        {/* Kinetic 3D Tilt Wrapper */}
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full h-full flex items-center justify-between"
        >
          {/* Master Royal Leadership Artwork (Sayeed seated on throne with IEEE & IEEE CS Flags) */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0, filter: "blur(14px) brightness(0.6)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
          >
            <img
              src="/media/leadership-hero-bg.jpg"
              alt="Sayeed Ibne Saif — Leadership & IEEE Chairperson"
              className="w-full h-full object-cover object-center select-none filter contrast-105 brightness-100"
              loading="eager"
            />

            {/* Ambient Volumetric Warm Crimson & Gold Aura */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(220, 38, 38, 0.45) 0%, rgba(212, 175, 55, 0.16) 42%, transparent 75%)",
              }}
              aria-hidden="true"
            />

            {/* Cinematic Anamorphic Light Sweep on Viewport Reveal */}
            <motion.div
              initial={{ x: "-100%", opacity: 0.75 }}
              whileInView={{ x: "200%", opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none mix-blend-screen -skew-x-12"
            />

            {/* Top & Bottom Seamless Obsidian Feathering */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#050102] via-[#050102]/70 to-transparent pointer-events-none" />
          </motion.div>

          {/* =================================================================
              LEFT FLANK: IEEE Command Monolith & Executive Directives
              Frames the left IEEE flag with crystal clarity
              ================================================================= */}
          <div className="relative z-20 w-[30%] xl:w-[28%] pl-3 xl:pl-6 flex flex-col justify-center gap-2.5 my-auto">
            {/* Executive Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-3.5 xl:p-4 rounded-2xl bg-[#0e0306]/90 border border-amber-500/35 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative group"
            >
              {/* Telemetry laser line pointing to Sayeed on hover */}
              <div className="absolute top-1/2 -right-12 h-[1.5px] w-12 bg-gradient-to-r from-amber-400 via-red-500 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden xl:block" />

              <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/10">
                <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-amber-400 font-bold flex items-center gap-1.5">
                  <Crown size={12} className="text-amber-400" />
                  TENURE MMXXIV — MMXXVI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
              </div>

              <h3 className="text-sm xl:text-base font-extrabold font-sans uppercase text-white tracking-wide leading-tight">
                IEEE Computer Society Chapter
              </h3>
              <p className="text-[10px] font-mono text-amber-300/90 mt-0.5">
                Chairperson · Premier University Student Branch
              </p>

              <p className="text-[11px] xl:text-xs text-gray-300 font-sans leading-relaxed mt-2">
                Orchestrating technical education, community mentorship pipelines, and AI/ML bootcamps for student engineers.
              </p>

              {/* 2 Core Metric Badges */}
              <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-white/10">
                <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider block">MENTORED</span>
                  <span className="text-xs xl:text-sm font-bold font-sans text-amber-300">500+ STUDENTS</span>
                </div>
                <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider block">INITIATIVES</span>
                  <span className="text-xs xl:text-sm font-bold font-sans text-amber-300">12+ PROGRAMS</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Trigger to Unveil Full Dossier */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <button
                onClick={() => setActivePhotoModal(activePillar.photos[0])}
                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-red-950/80 to-[#18050a] hover:from-red-900/90 hover:to-amber-950/80 border border-amber-500/40 text-amber-200 hover:text-white font-mono text-[9.5px] uppercase tracking-[0.2em] font-bold flex items-center justify-between transition-all shadow-[0_0_20px_rgba(200,56,43,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={12} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>UNVEIL PHOTO EVIDENCE</span>
                </span>
                <Maximize2 size={12} className="text-amber-300" />
              </button>
            </motion.div>
          </div>

          {/* =================================================================
              CENTER STAGE: SAYEED (Commander in Chief on Leather Throne)
              Completely clear and unobstructed with golden floor aura
              ================================================================= */}
          <div className="relative z-10 w-[36%] xl:w-[40%] flex flex-col items-center justify-end h-full pb-8 pointer-events-none">
            {/* Ambient Floor Glow under Throne */}
            <div className="w-56 h-12 rounded-full bg-gradient-to-r from-red-600/30 via-amber-500/35 to-red-600/30 blur-xl mb-2" />
            
            {/* Commander Plaque */}
            <div className="pointer-events-auto px-4 py-1.5 rounded-full bg-black/85 border border-amber-500/40 backdrop-blur-md text-center shadow-[0_0_20px_rgba(200,56,43,0.35)]">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300 font-bold">
                SUPREME DIRECTIVE // BUILD & INSPIRE
              </span>
            </div>
          </div>

          {/* =================================================================
              RIGHT FLANK: Interactive Leadership Chapter Dossier & Switcher
              Frames the right IEEE Computer Society flag
              ================================================================= */}
          <div className="relative z-20 w-[30%] xl:w-[28%] pr-3 xl:pr-6 flex flex-col justify-center gap-2.5 my-auto">
            {/* Chapter Selector Tabs */}
            <div className="flex flex-col gap-1 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
              {leadershipPillars.map((pillar, pIdx) => (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(pIdx)}
                  className={`px-3 py-1.5 rounded-lg text-left font-mono text-[9px] xl:text-[9.5px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between ${
                    activePillarIndex === pIdx
                      ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "text-gray-400 hover:text-amber-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="truncate">{pillar.tabLabel}</span>
                  {activePillarIndex === pIdx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,1)] shrink-0 ml-1" />
                  )}
                </button>
              ))}
            </div>

            {/* Active Chapter Revealed Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-3.5 xl:p-4 rounded-2xl bg-[#0e0306]/90 border border-amber-500/35 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative group"
              >
                {/* Telemetry laser line pointing to Sayeed on hover */}
                <div className="absolute top-1/2 -left-12 h-[1.5px] w-12 bg-gradient-to-l from-amber-400 via-red-500 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden xl:block" />

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8.5px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {activePillar.badge}
                  </span>
                  <span className="text-[8.5px] font-mono text-gray-400">
                    {activePillar.period}
                  </span>
                </div>

                <h4 className="text-xs xl:text-sm font-bold text-white uppercase leading-snug">
                  {activePillar.title}
                </h4>

                <p className="text-[11px] text-gray-300 font-sans leading-relaxed mt-1.5 line-clamp-3">
                  {activePillar.description}
                </p>

                {/* Evidence Photo Strip */}
                <div className="mt-3 pt-2.5 border-t border-white/10">
                  <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                    VERIFIED EVIDENCE ({activePillar.photos.length} PHOTOGRAPHS)
                  </span>
                  <div className="flex items-center gap-2">
                    {activePillar.photos.map((photo, phIdx) => (
                      <button
                        key={phIdx}
                        onClick={() => setActivePhotoModal(photo)}
                        className="relative w-14 h-10 rounded-lg overflow-hidden border border-amber-500/30 hover:border-amber-400 transition-all hover:scale-105 cursor-pointer shadow-md group"
                        title={photo.caption}
                      >
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full h-full object-cover object-center"
                          style={{ objectPosition: photo.position || "center" }}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                          <Maximize2 size={10} className="text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* External link if available */}
                {activePillar.link && (
                  <a
                    href={activePillar.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-amber-300 hover:text-white transition-colors"
                  >
                    <span>{activePillar.linkText || "View Repository"}</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── 3. Mobile / Tablet Responsive Experience (< 1024px) ── */}
      <div className="lg:hidden relative z-10 px-4 py-8 flex flex-col gap-6 max-w-2xl mx-auto">
        {/* Banner with master throne artwork */}
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_10px_35px_rgba(200,56,43,0.3)]">
          <img
            src="/media/leadership-hero-bg.jpg"
            alt="Sayeed Ibne Saif — Leadership"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050102] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-amber-300 uppercase tracking-wider">
            <span>IEEE CS CHAIRPERSON</span>
            <span>MMXXIV — MMXXVI</span>
          </div>
        </div>

        {/* Mobile Pillar Tabs */}
        <div className="flex flex-col gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
          {leadershipPillars.map((pillar, pIdx) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillarIndex(pIdx)}
              className={`p-2.5 rounded-lg text-left font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between ${
                activePillarIndex === pIdx
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold"
                  : "text-gray-400 hover:text-amber-200"
              }`}
            >
              <span>{pillar.tabLabel}</span>
              {activePillarIndex === pIdx && (
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,1)]" />
              )}
            </button>
          ))}
        </div>

        {/* Active Mobile Dossier */}
        <div className="p-4 rounded-xl border border-amber-500/30 bg-[#0e0306]/92 backdrop-blur-xl space-y-3">
          <div className="flex items-center justify-between text-[9px] font-mono text-amber-400">
            <span>{activePillar.badge}</span>
            <span>{activePillar.period}</span>
          </div>

          <h3 className="text-sm font-bold text-white uppercase">
            {activePillar.title}
          </h3>

          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            {activePillar.description}
          </p>

          {/* Photo gallery preview */}
          <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
            {activePillar.photos.map((photo, phIdx) => (
              <button
                key={phIdx}
                onClick={() => setActivePhotoModal(photo)}
                className="relative w-16 h-12 rounded-lg overflow-hidden border border-amber-500/30 shrink-0"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Directive Bar & Navigation Cue ── */}
      <div className="relative z-20 pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-3">
        <div className="rounded-2xl border border-amber-500/30 bg-[#0e0306]/94 backdrop-blur-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(200,56,43,0.25)]">
          {/* Directive status */}
          <div className="flex items-center gap-2 text-xs font-mono text-amber-200/80">
            <Flame size={14} className="text-red-500 animate-pulse" />
            <span className="font-bold text-white">LEADERSHIP CREED:</span>
            <span>Empowering Engineers, Driving Research & Podiums</span>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-4 text-xs font-mono text-amber-300">
            <span>500+ Mentored</span>
            <span className="text-white/20">•</span>
            <span>12+ Events</span>
            <span className="text-white/20">•</span>
            <span>3 National Podiums</span>
          </div>
        </div>

        {/* Scroll Cue to Closing Finale */}
        <div className="flex justify-center pt-1">
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 hover:bg-red-950/70 border border-amber-500/30 text-amber-200/80 hover:text-white font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span>SCROLL TO CLOSING FINALE</span>
            <ChevronDown size={12} className="text-amber-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ── 5. Full-Screen Photo Evidence Lightbox Modal ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activePhotoModal && (
              <div
                key="photo-modal-root"
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8"
              >
                {/* Dark Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActivePhotoModal(null)}
                  className="absolute inset-0 bg-black/94 backdrop-blur-2xl"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-3xl flex flex-col rounded-3xl border border-amber-500/50 bg-[#0c0205] shadow-[0_0_80px_rgba(200,56,43,0.45)] overflow-hidden text-white"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5">
                      <Sparkles size={16} className="text-amber-400" />
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-300 font-bold">
                        LEADERSHIP EVIDENCE // {activePhotoModal.caption}
                      </span>
                    </div>

                    <button
                      onClick={() => setActivePhotoModal(null)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950/80 hover:border-red-500 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                      aria-label="Close photo preview"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Photo Display */}
                  <div className="p-3 sm:p-6 flex items-center justify-center bg-black/80">
                    <img
                      src={activePhotoModal.src}
                      alt={activePhotoModal.caption}
                      className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                    />
                  </div>

                  {/* Caption Footer */}
                  <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
                    <p className="text-xs font-mono text-gray-300">
                      {activePhotoModal.caption}
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      VERIFIED PHOTOGRAPHIC RECORD
                    </span>
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
