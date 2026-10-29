"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { Mail, FileText, ArrowUpRight, MapPin, Sparkles, Check, Copy } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import TextEngine from "spring-text-engine";

// Infinite scrolling marquee words
const MARQUEE_WORDS = [
  "Linux", "•", "Nginx", "•", "Cloud", "•", "Next.js", "•", "MySQL", "•",
  "Docker", "•", "PHP", "•", "WordPress", "•", "Python", "•", "Bash", "•",
  "IEEE CS", "•", "Infrastructure", "•", "WordPress", "•", "Networking", "•",
];
const MARQUEE_DUP = [...MARQUEE_WORDS, ...MARQUEE_WORDS]; // duplicate for seamless loop

export default function CinematicFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="relative min-h-[100svh] pt-24 sm:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-label="Closing"
    >
      {/* 1. Master High-Resolution Sayeed Artwork (100% Solid & Highlighted) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <img
          src="/media/footer-sayeed.png"
          alt="Sayeed Ibne Saif — Finale"
          className="w-full h-full object-cover object-center select-none filter contrast-105 brightness-100"
          loading="eager"
        />

        {/* Ambient Pulsing Ember Aura that breathes behind the artwork */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(220, 38, 38, 0.35) 0%, rgba(212, 175, 55, 0.12) 40%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Soft edge blend at top to connect with previous section */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none" />

        {/* Subtle bottom edge shadow to frame the action dock */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050102] via-[#050102]/70 to-transparent pointer-events-none" />
      </div>

      {/* 2. Top Cinema Marquee HUD (Elevated to top edge, keeping center completely clear) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-amber-200/80 uppercase tracking-[0.25em] pb-5 border-b border-amber-500/20 backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
          SCENE 02 // THE CLOSING FINALE
        </span>

        {/* Delicate letterspaced quote placed softly on top bar */}
        <p className="text-center text-amber-100/90 font-mono tracking-[0.2em] text-[11px] sm:text-xs">
          “BUILDING THE PATH FROM <span className="text-amber-400 font-bold">SOFTWARE</span> TO{" "}
          <span className="text-red-500 font-bold">CLOUD</span> INFRASTRUCTURE”
        </p>

        <span className="text-amber-400 font-semibold">MMXXVI // SAYEED</span>
      </div>

      {/* 3. Lateral Floating Role Badges (Positioned on the dark outer margins, framing Sayeed) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto hidden lg:flex items-center justify-between pointer-events-none my-auto px-4">
        {/* Left Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <div className="px-4 py-2 rounded-full bg-[#18060a]/85 border border-amber-500/40 text-amber-300 font-mono text-[11px] uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105 transition-all">
            <span>• IEEE CS CHAIRPERSON •</span>
          </div>
        </motion.div>

        {/* Right Badge */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <div className="px-4 py-2 rounded-full bg-[#18060a]/85 border border-amber-500/40 text-amber-300 font-mono text-[11px] uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105 transition-all">
            <span>• CLOUD ENGINEER •</span>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Sleek Action Dock (Docked at bottom edge — zero occlusion of face or typography) */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-4">

        {/* ── Marcus Vane–style infinite skills marquee ── */}
        <div
          className="relative overflow-hidden w-full mb-6 py-2 border-y border-amber-500/20"
          aria-label="Skills marquee"
        >
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#050102] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#050102] to-transparent z-10 pointer-events-none" />
          <div
            className="flex items-center gap-5 whitespace-nowrap"
            style={{ animation: "marquee-scroll 28s linear infinite", width: "max-content" }}
            aria-hidden="true"
          >
            {MARQUEE_DUP.map((word, i) => (
              <span
                key={i}
                className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
                  word === "•" ? "text-[#c8382b] text-[8px]" : "text-amber-200/60"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marquee-scroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
            @media (prefers-reduced-motion:reduce) { [style*="marquee-scroll"] { animation:none !important; } }
          `}</style>
        </div>

        {/* Glassmorphic Luxury Command Dock */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-[#18070b]/92 via-[#0e0306]/95 to-[#18070b]/92 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(200,56,43,0.35)] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Left: Contact CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            {/* Email Button */}
            <a
              href={`mailto:${profile.email}`}
              className="royal-sheen flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5),0_0_10px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] focus-royal"
            >
              <Mail size={14} className="text-amber-200" />
              <span>Contact Sayeed</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Copy Email Quick Action */}
            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-amber-500/30 text-amber-200 hover:text-white font-mono text-xs tracking-wider transition-all"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-amber-400" />
                  <span className="hidden sm:inline">{profile.email}</span>
                  <span className="sm:hidden">Copy Email</span>
                </>
              )}
            </button>

            {/* Resume Button */}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-red-950/40 border border-amber-500/30 text-amber-200 hover:text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all hover:border-amber-400/60"
            >
              <FileText size={14} className="text-amber-400" />
              <span>Resume PDF</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Right: Social Presence & Telemetry */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-300 font-mono text-xs uppercase tracking-wider transition-all hover:border-amber-500/40"
              aria-label="Sayeed on LinkedIn"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-300 font-mono text-xs uppercase tracking-wider transition-all hover:border-amber-500/40"
              aria-label="Sayeed on GitHub"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/40 border border-amber-500/20 text-amber-200/80 font-mono text-xs tracking-wider">
              <MapPin size={13} className="text-red-400" />
              <span>{profile.location}</span>
            </div>
          </div>
        </motion.div>

        {/* 5. Minimalist Bottom Copyright & Engineering Credits */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-amber-200/50 uppercase tracking-widest">
          <p>© 2026 SAYEED IBNE SAIF — ALL RIGHTS RESERVED</p>
          <p className="flex items-center gap-2">
            <span>WEBGL & NEXT.JS 16 ARCHITECTURE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
            <span className="text-amber-300/80">CHATTOGRAM, BD</span>
          </p>
        </div>
      </div>
    </footer>
  );
}