"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextEngine from "spring-text-engine";
import { certifications, Certification } from "@/data/certifications";
import {
  ShieldCheck,
  ExternalLink,
  Award,
  X,
  Sparkles,
  Maximize2,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// Hotspot positions precisely aligned with the royal throne artwork monitors in certifications-royal-bg.jpg
const certHotspots = [
  {
    id: "network-fundamentals",
    name: "Networking Fundamentals",
    issuer: "Akamai Technologies via Coursera",
    date: "May 4, 2025",
    left: "5.5%",
    top: "20.5%",
    width: "25.0%",
    height: "23.5%",
    tilt: "-rotate-[1deg]",
  },
  {
    id: "hands-on-linux",
    name: "Hands-on Introduction to Linux Commands and Shell Scripting",
    issuer: "IBM via Coursera",
    date: "May 10, 2025",
    left: "5.5%",
    top: "45.5%",
    width: "25.0%",
    height: "23.5%",
    tilt: "-rotate-[1deg]",
  },
  {
    id: "command-line-basics",
    name: "Command Line Basics",
    issuer: "Scrimba",
    date: "July 13, 2025",
    left: "5.5%",
    top: "70.0%",
    width: "25.0%",
    height: "23.5%",
    tilt: "-rotate-[1deg]",
  },
  {
    id: "learn-python",
    name: "Learn Python",
    issuer: "Scrimba",
    date: "July 13, 2025",
    left: "69.5%",
    top: "22.5%",
    width: "25.0%",
    height: "23.5%",
    tilt: "rotate-[1deg]",
  },
  {
    id: "app-development-kotlin",
    name: "Android App Development with Kotlin",
    issuer: "FutureNation · Creative IT Institute",
    date: "December 8, 2024",
    left: "69.5%",
    top: "47.5%",
    width: "25.0%",
    height: "23.5%",
    tilt: "rotate-[1deg]",
  },
  {
    id: "hack-the-code-challenge",
    name: "Hack the Code Challenge — Standard Edition",
    issuer: "Reply · Team QuantumX · Position 164",
    date: "March 12, 2025",
    left: "69.5%",
    top: "71.5%",
    width: "25.0%",
    height: "23.5%",
    tilt: "rotate-[1deg]",
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openCertModal = (id: string) => {
    const found = certifications.find((c) => c.id === id);
    if (found) setSelectedCert(found);
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="certifications"
      className="relative w-full bg-[#050102] text-white overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="certsTitle"
    >
      {/* ── 1. Desktop & Tablet: Full-Bleed 16:9 Master Poster Stage ── */}
      <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden hidden lg:block aspect-[1024/571] min-h-[900px]">
        {/* The Master Royal Artwork */}
        <img
          src="/media/certifications-royal-bg.jpg"
          alt="Certifications — Sayeed Ibne Saif"
          className="w-full h-full object-cover object-center pointer-events-none select-none filter contrast-105 brightness-100"
          loading="eager"
        />

        {/* Ambient Royal Crimson & Imperial Gold Volumetric Aura */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(220, 38, 38, 0.4) 0%, rgba(212, 175, 55, 0.2) 40%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient Gold & Crimson Floor Reflection Sheen */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none opacity-30 mix-blend-color-dodge"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 88%, rgba(245, 158, 11, 0.35) 0%, rgba(220, 38, 38, 0.25) 50%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Top & Bottom seamless feathering */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050102] via-[#050102]/80 to-transparent pointer-events-none z-10" />

        {/* Top Cinema Telemetry Bar */}
        <div className="absolute top-20 sm:top-24 inset-x-8 z-20 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/80 border-b border-amber-500/20 pb-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <span className="font-bold text-amber-300">SCENE 04 // PROOF OF PROGRESS</span>
          </div>

          <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-widest">
            <Award size={14} className="text-amber-400" />
            <span>VERIFIED INDUSTRY CREDENTIALS</span>
          </div>

          <span className="text-red-400 font-mono">6 CERTIFIED NODES</span>
        </div>

        {/* 6 Interactive Hotspot Overlays (Royal Gold & Crimson Auras) */}
        {certHotspots.map((spot) => {
          const isHovered = hoveredId === spot.id;

          return (
            <button
              key={spot.id}
              onClick={() => openCertModal(spot.id)}
              onMouseEnter={() => setHoveredId(spot.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "absolute",
                left: spot.left,
                top: spot.top,
                width: spot.width,
                height: spot.height,
              }}
              className={`group z-20 rounded-xl transition-all duration-300 focus-royal flex flex-col justify-end p-2.5 cursor-pointer ${spot.tilt}`}
              aria-label={`Inspect ${spot.name} certificate`}
            >
              {/* Glowing Royal Gold & Crimson Rim on Hover */}
              <div
                className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
                  isHovered
                    ? "border-2 border-amber-400 bg-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.95),0_0_25px_rgba(220,38,38,0.6),inset_0_0_25px_rgba(245,158,11,0.35)] scale-[1.03]"
                    : "border border-amber-500/20 hover:border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                }`}
              />

              {/* Floating Action Pill appearing on hover */}
              <div
                className={`royal-sheen relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/92 backdrop-blur-md border border-amber-400 text-amber-200 font-mono text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.7)] ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <Maximize2 size={12} className="text-amber-400" />
                <span>INSPECT CREDENTIAL</span>
              </div>
            </button>
          );
        })}

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 hover:bg-red-950/80 border border-amber-500/40 text-amber-200 hover:text-white font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span>PROCEED TO FINALE</span>
            <ChevronDown size={13} className="text-amber-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ── 2. Mobile & Tablet (< 1024px): Dedicated Responsive Showcase ── */}
      <div className="block lg:hidden px-4 sm:px-6 py-12 sm:py-16 bg-[#080204] relative">
        {/* Mobile Background Ambient Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
          <img
            src="/media/certifications-royal-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-center filter blur-md"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#050102]/85" />
        </div>

        {/* Header */}
        <div className="mb-10 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400">
              SCENE 04 // PROOF OF PROGRESS
            </p>
          </div>
          <TextEngine
            tag="h2"
            mode="once"
            lineOut={{ opacity: 0, filter: "blur(10px)" }}
            lineIn={{ opacity: 1, filter: "blur(0px)" }}
            lineConfig={{ tension: 190, friction: 26 }}
            lineStagger={90}
            id="certsTitle"
            className="font-black text-3xl sm:text-4xl uppercase tracking-tight font-[Anton] text-white"
            style={{ justifyContent: "center" }}
          >
            Certifications
          </TextEngine>
          <p className="text-xs text-amber-200/70 mt-2 max-w-xs mx-auto font-mono tracking-wide">
            Learning today for a better tomorrow. Skills backed by verified credibility.
          </p>
        </div>

        {/* 6 Responsive 3D Cyber Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 max-w-4xl mx-auto">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#18070b]/90 to-[#080204]/95 p-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)] transition-all active:scale-[0.98] cursor-pointer"
            >
              {/* Certificate Image Frame */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-amber-400/30 bg-black/40">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                  <ShieldCheck size={12} className="text-amber-400" />
                  VERIFIED
                </div>
              </div>

              {/* Title & Issuer */}
              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                {cert.issuer}
              </p>
              <h3 className="text-sm font-bold text-white font-sans tracking-tight">
                {cert.name}
              </h3>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[11px] font-mono text-gray-400">
                <span>{cert.date}</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  INSPECT <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Cinematic Certificate Modal Inspector ── */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-amber-500/40 bg-[#0e0306] shadow-[0_0_60px_rgba(200,56,43,0.35)] overflow-hidden text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 block">
                      VERIFIED CREDENTIAL INSPECTION
                    </span>
                    <h3 className="text-base sm:text-xl font-bold font-sans text-white leading-tight">
                      {selectedCert.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body: Large Certificate Image Preview */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center bg-black/40">
                <div className="w-full max-w-3xl rounded-xl overflow-hidden border border-amber-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.9)] bg-black">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    className="w-full h-auto object-contain max-h-[55vh] mx-auto"
                  />
                </div>
              </div>

              {/* Modal Footer: Issuer, Date & Direct Verification Button */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-[#070103] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Building size={14} className="text-amber-400" />
                    <span className="text-gray-300">{selectedCert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-amber-400" />
                    <span>{selectedCert.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {selectedCert.verifyUrl ? (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="royal-sheen flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5),0_0_10px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] focus-royal"
                    >
                      <span>Verify on Official Issuer</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-mono text-xs">
                      Credential ID Verified
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 4. Screen Reader / Accessibility Index ── */}
      <div className="sr-only">
        <h2>Certified Competencies & Credentials</h2>
        <ul>
          {certifications.map((c) => (
            <li key={c.id}>
              <h3>{c.name}</h3>
              <p>Issuer: {c.issuer}</p>
              <p>Date: {c.date}</p>
              {c.verifyUrl && <a href={c.verifyUrl}>Verify Credential</a>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
