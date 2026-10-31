"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Crown, Globe, ShieldCheck, Sparkles, CheckCircle2, Calendar } from "lucide-react";
import TextEngine from "spring-text-engine";

interface LeadershipRole {
  id: string;
  index: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  chapter: string;
  organization: string;
  summary: string;
  tag: string;
}

const leadershipRoles: LeadershipRole[] = [
  {
    id: "chairperson",
    index: "01",
    role: "Chairperson",
    period: "Present",
    isCurrent: true,
    chapter: "IEEE Computer Society Chapter",
    organization: "Premier University Student Branch Chapter",
    summary: "Leading chapter governance, strategic vision, international conferences, and multidisciplinary student engineering initiatives.",
    tag: "EXECUTIVE HEAD",
  },
  {
    id: "general-secretary",
    index: "02",
    role: "General Secretary",
    period: "2025",
    isCurrent: false,
    chapter: "IEEE Computer Society Chapter",
    organization: "Premier University Student Branch Chapter",
    summary: "Coordinated cross-functional operations, event orchestration, executive communications, and national engineering workshops.",
    tag: "ADMINISTRATIVE LEAD",
  },
  {
    id: "webmaster",
    index: "03",
    role: "Additional Webmaster",
    period: "2025",
    isCurrent: false,
    chapter: "IEEE Student Branch",
    organization: "Premier University Student Branch",
    summary: "Architected digital web infrastructure, event registration engines, portal uptime, and branch technical systems.",
    tag: "INFRASTRUCTURE & WEB",
  },
];

export default function Leadership() {
  const [activeId, setActiveId] = useState<string>("chairperson");

  return (
    <section
      id="leadership"
      className="relative min-h-[100svh] pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-labelledby="leadershipTitle"
    >
      {/* ── 1. Master High-Resolution Artwork (Sayeed Centered on Throne with Glowing 3D LEADERSHIP) ── */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0, filter: "blur(14px) brightness(0.65)" }}
        whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
      >
        <img
          src="/media/leadership-clean-throne.png"
          alt="Sayeed Ibne Saif — Executive Leadership"
          className="w-full h-full object-cover object-[center_30%] sm:object-center select-none filter contrast-105 brightness-100"
          loading="eager"
        />

        {/* Ambient Pulsing Crimson & Gold Ember Aura */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200, 56, 43, 0.4) 0%, rgba(212, 175, 55, 0.15) 45%, transparent 80%)",
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

      {/* ── 2. Top Cinema Marquee HUD (Elevated to top, keeping central portrait clear) ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-amber-200/80 uppercase tracking-[0.25em] pb-4 border-b border-amber-500/20 backdrop-blur-sm"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
          SCENE 06 // EXECUTIVE LEADERSHIP
        </span>

        {/* Minimal letterspaced title */}
        <p className="text-center text-amber-100 font-mono tracking-[0.22em] text-[11px] sm:text-xs">
          LEADERSHIP JOURNEY · <span className="text-amber-400 font-bold">PREMIER UNIVERSITY</span>
        </p>

        <span className="text-amber-400 font-semibold tracking-widest hidden sm:inline">
          3 MILESTONES // GOVERNANCE
        </span>
      </motion.div>

      {/* ── 3. Subtle Lateral Accents (Frames Sayeed without touching his body or the typography) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto hidden xl:flex items-center justify-between pointer-events-none my-auto px-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pointer-events-auto"
        >
          <div className="px-4 py-2 rounded-full bg-[#140407]/85 border border-amber-500/35 text-amber-300 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.3)]">
            <span>• IEEE COMPUTER SOCIETY •</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pointer-events-auto"
        >
          <div className="px-4 py-2 rounded-full bg-[#140407]/85 border border-amber-500/35 text-amber-300 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.3)]">
            <span>• EXECUTIVE LEADERSHIP •</span>
          </div>
        </motion.div>
      </div>

      {/* ── 4. Bottom Sleek Milestone Dock (Sleek, Minimal, Zero Jargon) ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4">
        {/* Mobile View (< md): Sleek 3-Tab Selector + Single Compact Active Card */}
        <div className="md:hidden space-y-2.5">
          {/* Quick Segmented Controller */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/80 border border-amber-500/30 backdrop-blur-xl shadow-lg">
            {leadershipRoles.map((item) => {
              const isSelected = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`relative flex-1 py-1.5 px-1.5 rounded-xl text-[10px] font-mono tracking-wider transition-all duration-300 uppercase truncate text-center ${
                    isSelected ? "text-white font-bold" : "text-gray-400 hover:text-amber-200"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="mobileActiveLeadershipPill"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.role.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card */}
          <AnimatePresence mode="wait">
            {(() => {
              const activeRole = leadershipRoles.find((r) => r.id === activeId) || leadershipRoles[0];
              return (
                <motion.div
                  key={activeRole.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-4 bg-[#140407]/92 border border-amber-400/70 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.95)]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-amber-400 tracking-widest uppercase">
                      {activeRole.index} // {activeRole.tag}
                    </span>
                    {activeRole.isCurrent ? (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {activeRole.period}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-200/80 font-mono text-[9px] font-bold uppercase tracking-wider">
                        {activeRole.period}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base font-sans uppercase tracking-tight text-white leading-tight">
                    {activeRole.role}
                  </h3>

                  <p className="text-[11px] font-mono text-amber-300/90 mt-0.5 truncate">
                    {activeRole.organization}
                  </p>

                  <p className="text-[11px] font-sans text-gray-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {activeRole.summary}
                  </p>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Desktop View (md+): 3-Column Side-by-Side Milestone Deck */}
        <div className="hidden md:grid grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
          {leadershipRoles.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ y: 35, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveId(item.id)}
                className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer select-none border backdrop-blur-xl group ${
                  isActive
                    ? "bg-[#160408]/92 border-amber-400 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/60 -translate-y-1"
                    : "bg-[#0b0204]/80 border-amber-500/25 hover:border-amber-400/70 hover:bg-[#120407]/90 hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Active Top Glow Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeRoleBar"
                    className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                  />
                )}

                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono font-bold text-amber-400 tracking-widest uppercase">
                    {item.index} // {item.tag}
                  </span>

                  {item.isCurrent ? (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,1)]" />
                      {item.period}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-200/80 font-mono text-[9px] font-bold uppercase tracking-wider">
                      {item.period}
                    </span>
                  )}
                </div>

                {/* Main Role Title */}
                <h3 className="font-extrabold text-lg sm:text-xl font-sans uppercase tracking-tight text-white group-hover:text-amber-200 transition-colors leading-tight">
                  {item.role}
                </h3>

                {/* Organization Subtitle */}
                <p className="text-[11px] sm:text-xs font-mono text-amber-300/90 mt-1 line-clamp-1">
                  {item.organization}
                </p>

                {/* Refined Minimal Summary (No jargon, crystal clear) */}
                <p className="text-[11px] font-sans text-gray-300/90 mt-2 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                {/* Subtle Bottom Accent Indicator */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[9px] font-mono text-gray-400">
                  <span className="truncate">{item.chapter}</span>
                  <span className={`uppercase font-bold tracking-wider transition-colors ${isActive ? "text-amber-300" : "text-gray-500 group-hover:text-amber-200"}`}>
                    TENURE // {item.period.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Telemetry Strip ── */}
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 tracking-wider pt-4 px-2">
          <span className="flex items-center gap-1.5 text-amber-300/80">
            <ShieldCheck size={12} className="text-emerald-400" />
            AUTHENTICATED IEEE STUDENT BRANCH EXECUTIVE RECORDS
          </span>
          <span className="hidden sm:inline text-amber-400/70">
            PREMIER UNIVERSITY · CHATTOGRAM
          </span>
        </div>
      </div>
    </section>
  );
}
