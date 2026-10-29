"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextEngine from "spring-text-engine";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Code2,
  TrendingUp,
  RotateCw,
  Sparkles,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  BookmarkCheck,
  Layers,
  ArrowRight,
  Terminal,
} from "lucide-react";

type Course = {
  name: string;
  category: "core" | "systems" | "ai" | "dev";
  categoryLabel: string;
};

const courses: Course[] = [
  { name: "Data Structures & Algorithms", category: "core", categoryLabel: "Core CS" },
  { name: "Database Systems", category: "core", categoryLabel: "Core CS" },
  { name: "Computer Networks", category: "systems", categoryLabel: "Systems & Cloud" },
  { name: "Operating Systems", category: "systems", categoryLabel: "Systems & Cloud" },
  { name: "Computer Architecture", category: "systems", categoryLabel: "Systems & Cloud" },
  { name: "Cybersecurity", category: "systems", categoryLabel: "Systems & Cloud" },
  { name: "Software Engineering", category: "dev", categoryLabel: "Development" },
  { name: "Artificial Intelligence", category: "ai", categoryLabel: "AI & ML" },
  { name: "Machine Learning", category: "ai", categoryLabel: "AI & ML" },
  { name: "IoT", category: "systems", categoryLabel: "Systems & Cloud" },
  { name: "Web Application Development", category: "dev", categoryLabel: "Development" },
  { name: "Mobile Application Development", category: "dev", categoryLabel: "Development" },
];

const pillars = [
  { icon: Code2, label: "BUILD", desc: "Production systems & resilient architectures" },
  { icon: BookOpen, label: "LEARN", desc: "Continuous deep mastery of CS fundamentals" },
  { icon: TrendingUp, label: "IMPROVE", desc: "Iterative optimization & benchmark rigor" },
  { icon: RotateCw, label: "REPEAT", desc: "Disciplined execution & relentless delivery" },
];

const books = [
  { title: "CLOUD & DEVOPS", desc: "Kubernetes, Docker, CI/CD, AWS & Linux kernel internals" },
  { title: "NETWORK SECURITY", desc: "TCP/IP, Firewalls, TLS/SSL hardening & Zero-Trust" },
  { title: "SOFTWARE ENGINEERING", desc: "Clean architecture, distributed patterns & design systems" },
  { title: "AI & MACHINE LEARNING", desc: "Neural networks, NLP models, PyTorch & edge deployment" },
];

export default function AcademicFoundation() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  const filteredCourses =
    activeCategory === "all"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const scrollToCertifications = () => {
    const el = document.getElementById("certifications");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="academic"
      className="relative w-full bg-[#050102] text-white overflow-hidden border-t border-amber-500/20 select-none"
      aria-label="Academic Foundation"
    >
      {/* ── 1. Desktop & Tablet: Full-Bleed 16:9 Master Poster Experience ── */}
      <div className="relative w-full max-w-[1920px] mx-auto hidden lg:block aspect-[16/9] min-h-[900px] overflow-hidden">
        {/* Master Royal Imperial Court Background */}
        <img
          src="/media/academic-foundation-bg.jpg"
          alt="Sayeed Ibne Saif — Academic Foundation"
          className="w-full h-full object-cover object-center pointer-events-none select-none filter contrast-105 brightness-100"
          loading="eager"
        />

        {/* Ambient Pulsing Warm Ember Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 45%, rgba(200, 56, 43, 0.3) 0%, rgba(212, 175, 55, 0.12) 40%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Seamless edge blend top & bottom */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050102] via-[#050102]/80 to-transparent pointer-events-none z-10" />

        {/* Right-Side Obsidian Shade: cleanly hides the baked AI graphics behind the live interactive HUD */}
        <div
          className="absolute inset-y-0 right-0 w-[50%] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(5,1,2,0.8) 10%, rgba(5,1,2,0.98) 22%, #050102 42%, #050102 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top Cinema Telemetry Bar */}
        <div className="absolute top-20 sm:top-24 inset-x-8 z-20 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/80 border-b border-amber-500/20 pb-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <span className="font-bold text-amber-300">SCENE 03 // HIGHER EDUCATION</span>
          </div>

          <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-widest">
            <GraduationCap size={14} className="text-amber-400" />
            <span>PREMIER UNIVERSITY // CSE</span>
          </div>

          <span className="text-red-400 font-mono">EST. MMXXII — MMXXVI</span>
        </div>

        {/* Scroll Cue Button */}
        <div className="absolute bottom-[3%] left-[46%] -translate-x-1/2 z-20">
          <button
            onClick={scrollToCertifications}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 hover:bg-red-950/80 border border-amber-500/40 text-amber-200 hover:text-white font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span>SCROLL TO CERTIFICATIONS</span>
            <ChevronDown size={13} className="text-amber-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* ── Right Side Interactive Glass HUD (Overlaying the Academic Dossier) ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[13%] right-[2.5%] bottom-[7%] w-[36%] max-w-[505px] z-20 pointer-events-auto flex flex-col justify-center"
        >
          <div className="relative rounded-2xl border border-amber-500/50 bg-gradient-to-b from-[#18070c]/98 via-[#0e0306]/98 to-[#18070c]/98 backdrop-blur-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.98),0_0_35px_rgba(200,56,43,0.3)] flex flex-col gap-3.5">
            {/* Header: Graduation Cap + Premier University */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/40 to-amber-600/30 border border-amber-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                  <GraduationCap size={22} className="text-amber-300" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                    ACADEMIC FOUNDATION
                  </h3>
                  <p className="text-xs text-amber-200/80 font-mono">
                    Premier University · Department of CSE
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-[9px] uppercase tracking-wider font-bold animate-pulse">
                Active Student
              </span>
            </div>

            {/* Chips Row: Timeline, Location, Expected Grad */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-amber-200/90">
              <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-amber-500/25 flex items-center gap-1.5">
                <Calendar size={11} className="text-amber-400" />
                Nov 2022 – Nov 2026
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-amber-500/25 flex items-center gap-1.5">
                <MapPin size={11} className="text-red-400" />
                Chattogram, BD
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 font-bold">
                Grad: Nov 2026
              </span>
            </div>

            {/* Coursework Filter & Pills Grid */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                <span>RELEVANT COURSEWORK ({courses.length})</span>
                <div className="flex items-center gap-1 text-[9px]">
                  {["all", "core", "systems", "ai", "dev"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-1.5 py-0.5 rounded transition-all uppercase ${
                        activeCategory === cat
                          ? "bg-amber-400 text-black font-bold"
                          : "text-amber-200/60 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pills Wrap */}
              <div className="flex flex-wrap gap-1.5 max-h-[145px] overflow-y-auto pr-1">
                {filteredCourses.map((c) => (
                  <span
                    key={c.name}
                    onMouseEnter={() => setHoveredCourse(c.name)}
                    onMouseLeave={() => setHoveredCourse(null)}
                    className="px-2 py-1 rounded-md text-[9.5px] font-mono tracking-tight bg-black/60 hover:bg-red-950/60 border border-amber-500/30 hover:border-amber-400 text-gray-200 hover:text-white transition-all cursor-default shadow-sm hover:shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:scale-[1.02]"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CGPA Highlight Metric Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#20080d]/80 via-[#140407]/90 to-[#20080d]/80 border border-amber-500/40 flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(200,56,43,0.2)]">
              <div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold mb-1">
                  <Award size={12} className="text-amber-400" />
                  CURRENT CGPA
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-[Anton] text-3xl sm:text-4xl text-white tracking-tight leading-none drop-shadow-md">
                    3.79
                  </span>
                  <span className="font-mono text-xs text-amber-300/80">/ 4.00</span>
                </div>
              </div>
              <p className="text-[10px] text-amber-100/75 font-sans leading-relaxed max-w-[210px] text-right">
                Maintaining high academic distinction while engineering production infrastructure & client systems.
              </p>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    className="group relative p-2 rounded-xl bg-black/50 hover:bg-[#20080d] border border-amber-500/30 hover:border-amber-400 flex flex-col items-center justify-center text-center transition-all hover:scale-105 cursor-default shadow-sm"
                  >
                    <Icon size={16} className="text-amber-400 group-hover:text-amber-300 transition-colors mb-1" />
                    <span className="text-[9px] font-mono font-bold tracking-wider text-white">
                      {p.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Signature Tag */}
            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px] font-mono text-amber-200/60 uppercase tracking-widest">
              <span className="font-serif italic text-amber-300 font-semibold text-xs">Sayeed</span>
              <span>DREAM • CODE • IMPACT</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 2. Mobile & Tablet Card Layout (< 1024px) ── */}
      <div className="block lg:hidden px-4 sm:px-6 py-12 sm:py-16 relative">
        {/* Ambient Dark Canvas Backdrop with Blurred Master Poster */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
          <img
            src="/media/academic-foundation-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-center filter blur-md"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#050102]/85" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto flex flex-col gap-6">
          {/* Section Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400">
                SCENE 03 // HIGHER EDUCATION
              </p>
            </div>
            <TextEngine
              tag="h2"
              mode="once"
              lineOut={{ opacity: 0, filter: "blur(10px)" }}
              lineIn={{ opacity: 1, filter: "blur(0px)" }}
              lineConfig={{ tension: 190, friction: 26 }}
              lineStagger={90}
              className="font-[Anton] text-3xl sm:text-4xl uppercase tracking-tight text-white"
              style={{ justifyContent: "center" }}
            >
              Academic Foundation
            </TextEngine>
            <p className="text-xs text-amber-200/70 mt-1.5 font-mono">
              Premier University · Department of Computer Science & Engineering
            </p>
          </div>

          {/* Quote Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 to-amber-950/50 border border-amber-500/40 backdrop-blur-xl text-center">
            <p className="font-serif italic text-sm text-amber-100">
              “Not just a student, but a builder.”
            </p>
            <p className="text-[10px] font-mono text-amber-400 mt-1 font-bold">
              — Sayeed Ibne Saif
            </p>
          </div>

          {/* CGPA Hero Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1c060b] to-[#0c0205] border border-amber-500/50 backdrop-blur-xl flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold block mb-1">
                CURRENT CGPA
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-[Anton] text-4xl sm:text-5xl text-white">3.79</span>
                <span className="font-mono text-sm text-amber-400">/ 4.00</span>
              </div>
            </div>
            <div className="text-right max-w-[180px]">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold uppercase">
                Active Student
              </span>
              <p className="text-[10px] text-gray-300 font-mono mt-1.5">
                Expected Grad: Nov 2026
              </p>
            </div>
          </div>

          {/* Coursework Card */}
          <div className="p-5 rounded-2xl bg-[#0e0306]/90 border border-amber-500/35 backdrop-blur-xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                RELEVANT COURSEWORK
              </span>
              <span className="text-[10px] font-mono text-gray-400">12 Courses</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {courses.map((c) => (
                <span
                  key={c.name}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-black/60 border border-amber-500/30 text-amber-100/90"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* 4 Pillars Mobile */}
          <div className="grid grid-cols-2 gap-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="p-3 rounded-xl bg-black/60 border border-amber-500/30 flex items-center gap-3"
                >
                  <Icon size={18} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">
                      {p.label}
                    </span>
                    <span className="text-[9px] text-gray-400 font-sans block leading-tight">
                      {p.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
