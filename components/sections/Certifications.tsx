"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  ChevronLeft,
  ChevronRight,
  Terminal,
  Cpu,
  Layers,
  Flame,
} from "lucide-react";

export default function Certifications() {
  const [mounted, setMounted] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter logic
  const filteredCerts =
    activeFilter === "all"
      ? certifications
      : certifications.filter((c) => c.category === activeFilter);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCertIndex === null) return;
      if (e.key === "Escape") {
        setSelectedCertIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedCertIndex((prev) =>
          prev === null ? 0 : (prev - 1 + certifications.length) % certifications.length
        );
      } else if (e.key === "ArrowRight") {
        setSelectedCertIndex((prev) =>
          prev === null ? 0 : (prev + 1) % certifications.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertIndex]);

  // Subtle 3D mouse parallax tracking
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

  const activeModalCert =
    selectedCertIndex !== null ? certifications[selectedCertIndex] : null;

  // Split certificates: 3 on left flank, 3 on right flank for desktop
  const leftCerts = certifications.slice(0, 3);
  const rightCerts = certifications.slice(3, 6);

  return (
    <section
      id="certificates"
      className="relative w-full bg-[#050102] text-white overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="certsTitle"
    >
      {/* ── 1. Top Cinema Telemetry Header Bar ── */}
      <header className="relative z-20 pt-24 sm:pt-28 pb-4 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 02 // Proof of Progress
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
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase font-sans"
            style={{ justifyContent: "flex-start" }}
          >
            Verified Credentials
          </TextEngine>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-1.5 max-w-lg font-sans tracking-wide">
            Enterprise industry credentials spanning Cloud & Edge Networking, IBM Linux Systems, Scrimba Python, and Global Competitive Engineering.
          </p>
        </div>

        {/* Live Verified Telemetry Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/75 border border-amber-500/35 backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-200/90 font-bold">
            6 VERIFIED INDUSTRY CREDENTIALS
          </span>
        </div>
      </header>

      {/* ── 2. Desktop Royal Holographic Stage (Sayeed Centered + Flanking Monoliths) ── */}
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
          {/* Master Royal Artwork (Sayeed standing centered in 3D "CERTIFICATES" atmosphere) */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0, filter: "blur(14px) brightness(0.6)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
          >
            <img
              src="/media/certificates-hero-bg.png"
              alt="Sayeed Ibne Saif — Royal Certificates"
              className="w-full h-full object-cover object-center select-none filter contrast-105 brightness-100"
              loading="eager"
            />

            {/* Ambient Pulsing Warm Ember Glow Behind Sayeed */}
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
              LEFT FLANK: 3 Holographic Royal Credential Cards
              Framing the left side of Sayeed ("CERTI" zone)
              ================================================================= */}
          <div className="relative z-20 w-[30%] xl:w-[28%] pl-3 xl:pl-6 flex flex-col justify-center gap-2.5 xl:gap-3 my-auto">
            {leftCerts.map((cert, idx) => {
              const globalIndex = idx;
              const matchesFilter =
                activeFilter === "all" || cert.category === activeFilter;
              const isHovered = hoveredId === cert.id;

              return (
                <motion.button
                  type="button"
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  onMouseEnter={() => setHoveredId(cert.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedCertIndex(globalIndex)}
                  className={`group text-left w-full relative p-3 xl:p-3.5 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-xl focus-royal ${
                    matchesFilter
                      ? "opacity-100"
                      : "opacity-25 filter blur-[1px] grayscale-[0.5]"
                  } ${
                    isHovered
                      ? "bg-[#18050a]/95 border-amber-400 shadow-[0_15px_40px_rgba(200,56,43,0.45),0_0_25px_rgba(245,158,11,0.5)] -translate-y-1 scale-[1.02]"
                      : "bg-[#0d0205]/85 border-amber-500/25 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
                  } border`}
                >
                  {/* Laser Telemetry Beam pointing to Sayeed on Hover */}
                  <div
                    className={`absolute top-1/2 -right-12 h-[1.5px] w-12 bg-gradient-to-r from-amber-400 via-red-500 to-transparent pointer-events-none transition-all duration-300 ${
                      isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    } origin-left hidden xl:block`}
                  />

                  {/* Laser Corner Brackets on Hover */}
                  {isHovered && (
                    <>
                      <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
                      <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300 pointer-events-none" />
                    </>
                  )}

                  <div className="flex items-center gap-3">
                    {/* Certificate Real Preview Thumbnail */}
                    <div className="relative w-16 xl:w-20 h-12 xl:h-14 rounded-lg overflow-hidden shrink-0 border border-amber-500/40 bg-black/60 shadow-md">
                      <img
                        src={cert.localImage || cert.image}
                        alt={cert.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          if (e.currentTarget.src !== cert.image) {
                            e.currentTarget.src = cert.image;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1">
                        <span className="text-[7.5px] font-mono text-amber-300 uppercase tracking-wider font-bold">
                          {cert.issuerShort}
                        </span>
                      </div>
                    </div>

                    {/* Meta & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="inline-flex items-center gap-1.5 text-[8.5px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
                          VERIFIED
                        </span>
                        <span className="text-[8px] font-mono text-gray-400">
                          {cert.date}
                        </span>
                      </div>

                      <h3 className="text-[11px] xl:text-xs font-bold text-white group-hover:text-amber-200 transition-colors leading-snug line-clamp-2">
                        {cert.name}
                      </h3>

                      <p className="text-[9px] font-mono text-amber-400/90 truncate mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Skills Mini Badges */}
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 2).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[8px] font-mono text-gray-300 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span className="text-[8.5px] font-mono text-amber-300 group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
                      <span>INSPECT</span>
                      <Maximize2 size={9} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* =================================================================
              CENTER STAGE: SAYEED (Unobstructed Royal Portrait Zone)
              With interactive centering telemetry
              ================================================================= */}
          <div className="relative z-10 w-[36%] xl:w-[40%] flex flex-col items-center justify-end h-full pb-8 pointer-events-none">
            {/* Soft Ambient Spotlight Ring */}
            <div className="w-48 h-12 rounded-full bg-gradient-to-r from-red-600/30 via-amber-500/40 to-red-600/30 blur-xl mb-2" />
            
            {/* Center Status Emblem */}
            <div className="pointer-events-auto px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/40 backdrop-blur-md text-center shadow-[0_0_20px_rgba(200,56,43,0.35)]">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300 font-bold">
                COMMANDER IN CREED // SAYEED
              </span>
            </div>
          </div>

          {/* =================================================================
              RIGHT FLANK: 3 Holographic Royal Credential Cards
              Framing the right side of Sayeed ("CATES" zone)
              ================================================================= */}
          <div className="relative z-20 w-[30%] xl:w-[28%] pr-3 xl:pr-6 flex flex-col justify-center gap-2.5 xl:gap-3 my-auto">
            {rightCerts.map((cert, idx) => {
              const globalIndex = idx + 3;
              const matchesFilter =
                activeFilter === "all" || cert.category === activeFilter;
              const isHovered = hoveredId === cert.id;

              return (
                <motion.button
                  type="button"
                  key={cert.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  onMouseEnter={() => setHoveredId(cert.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedCertIndex(globalIndex)}
                  className={`group text-left w-full relative p-3 xl:p-3.5 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-xl focus-royal ${
                    matchesFilter
                      ? "opacity-100"
                      : "opacity-25 filter blur-[1px] grayscale-[0.5]"
                  } ${
                    isHovered
                      ? "bg-[#18050a]/95 border-amber-400 shadow-[0_15px_40px_rgba(200,56,43,0.45),0_0_25px_rgba(245,158,11,0.5)] -translate-y-1 scale-[1.02]"
                      : "bg-[#0d0205]/85 border-amber-500/25 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
                  } border`}
                >
                  {/* Laser Telemetry Beam pointing to Sayeed on Hover */}
                  <div
                    className={`absolute top-1/2 -left-12 h-[1.5px] w-12 bg-gradient-to-l from-amber-400 via-red-500 to-transparent pointer-events-none transition-all duration-300 ${
                      isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    } origin-right hidden xl:block`}
                  />

                  {/* Laser Corner Brackets on Hover */}
                  {isHovered && (
                    <>
                      <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
                      <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300 pointer-events-none" />
                    </>
                  )}

                  <div className="flex items-center gap-3">
                    {/* Certificate Real Preview Thumbnail */}
                    <div className="relative w-16 xl:w-20 h-12 xl:h-14 rounded-lg overflow-hidden shrink-0 border border-amber-500/40 bg-black/60 shadow-md">
                      <img
                        src={cert.localImage || cert.image}
                        alt={cert.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          if (e.currentTarget.src !== cert.image) {
                            e.currentTarget.src = cert.image;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1">
                        <span className="text-[7.5px] font-mono text-amber-300 uppercase tracking-wider font-bold">
                          {cert.issuerShort}
                        </span>
                      </div>
                    </div>

                    {/* Meta & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="inline-flex items-center gap-1.5 text-[8.5px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
                          VERIFIED
                        </span>
                        <span className="text-[8px] font-mono text-gray-400">
                          {cert.date}
                        </span>
                      </div>

                      <h3 className="text-[11px] xl:text-xs font-bold text-white group-hover:text-amber-200 transition-colors leading-snug line-clamp-2">
                        {cert.name}
                      </h3>

                      <p className="text-[9px] font-mono text-amber-400/90 truncate mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Skills Mini Badges */}
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 2).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[8px] font-mono text-gray-300 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span className="text-[8.5px] font-mono text-amber-300 group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-1">
                      <span>INSPECT</span>
                      <Maximize2 size={9} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. Mobile / Tablet Responsive Showcase (< 1024px) ── */}
      <div className="lg:hidden relative z-10 px-4 py-8 flex flex-col gap-6 max-w-2xl mx-auto">
        {/* Banner with master image */}
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_10px_35px_rgba(200,56,43,0.3)]">
          <img
            src="/media/certificates-hero-bg.png"
            alt="Sayeed Ibne Saif — Certificates"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050102] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-amber-300 uppercase tracking-wider">
            <span>SAYEED IBNE SAIF</span>
            <span>6 VERIFIED NODES</span>
          </div>
        </div>

        {/* 6 Responsive Mobile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {certifications.map((cert, idx) => (
            <button
              key={cert.id}
              onClick={() => setSelectedCertIndex(idx)}
              className="p-3.5 rounded-xl border border-amber-500/30 bg-[#0e0306]/92 text-left backdrop-blur-xl shadow-lg active:scale-[0.98] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400 mb-1.5">
                  <span className="flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {cert.issuerShort}
                  </span>
                  <span className="text-gray-400">{cert.date}</span>
                </div>
                <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                  {cert.name}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-amber-300">
                <span>View Credential</span>
                <Maximize2 size={11} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. Bottom Category Filter Bar & Navigation Cue ── */}
      <div className="relative z-20 pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-3">
        <div className="rounded-2xl border border-amber-500/30 bg-[#0e0306]/94 backdrop-blur-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(200,56,43,0.25)]">
          {/* Active Status Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-amber-200/80">
            <ShieldCheck size={14} className="text-emerald-400 animate-pulse" />
            <span className="font-bold text-white">CREDENTIAL REGISTRY:</span>
            <span>6 Authenticated Certificates</span>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            {[
              { id: "all", label: "All Credentials (6)" },
              { id: "networking", label: "Networking (1)" },
              { id: "systems", label: "Linux & Systems (2)" },
              { id: "dev", label: "Dev & Code (3)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all active:scale-[0.98] focus-royal cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    : "text-gray-400 hover:text-amber-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
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

      {/* ── 5. Full-Screen Royal Credential Inspector Modal ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeModalCert && (
              <div
                key="cert-modal-root"
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8"
              >
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertIndex(null)}
              className="absolute inset-0 bg-black/94 backdrop-blur-2xl"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl flex flex-col rounded-3xl border border-amber-500/50 bg-[#0c0205] shadow-[0_0_80px_rgba(200,56,43,0.45)] overflow-hidden text-white max-h-[90vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <Award size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block">
                      VERIFIED PROOF // {activeModalCert.categoryLabel}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold font-sans uppercase text-white leading-tight">
                      {activeModalCert.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Stepper Navigation */}
                  <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1 text-xs font-mono">
                    <button
                      onClick={() =>
                        setSelectedCertIndex((prev) =>
                          prev === null ? 0 : (prev - 1 + certifications.length) % certifications.length
                        )
                      }
                      className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="px-2 text-amber-300">
                      {(selectedCertIndex ?? 0) + 1} / {certifications.length}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedCertIndex((prev) =>
                          prev === null ? 0 : (prev + 1) % certifications.length
                        )
                      }
                      className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                      aria-label="Next certificate"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedCertIndex(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-950/80 hover:border-red-500 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                    aria-label="Close certificate inspector"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
                {/* Real High-Resolution Certificate Document Stage */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/40 bg-black/90 shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={activeModalCert.localImage || activeModalCert.image}
                    alt={`${activeModalCert.name} Document`}
                    className="max-h-[50vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                    onError={(e) => {
                      if (e.currentTarget.src !== activeModalCert.image) {
                        e.currentTarget.src = activeModalCert.image;
                      }
                    }}
                  />
                </div>

                {/* Metadata & Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Issuer & Date Details */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                        ISSUING AUTHORITY
                      </span>
                      <p className="text-sm font-bold text-amber-200">
                        {activeModalCert.issuer}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                        CONFERENCE / DATE
                      </span>
                      <p className="text-xs font-mono text-gray-300">
                        {activeModalCert.date}
                      </p>
                    </div>
                  </div>

                  {/* Architectural Description */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 md:col-span-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                        ARCHITECTURAL MASTERY & DOMAIN
                      </span>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                        {activeModalCert.description}
                      </p>
                    </div>

                    {/* Verified Skills */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                      <span className="text-[9.5px] font-mono text-gray-400 uppercase tracking-wider mr-1">
                        SKILLS:
                      </span>
                      {activeModalCert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-[10px] font-mono text-amber-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External Verification Action */}
                {activeModalCert.verifyUrl && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-red-950/50 via-[#18050a] to-amber-950/50 border border-amber-500/40">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={18} className="text-emerald-400" />
                      <span className="text-xs font-mono text-gray-200">
                        Cryptographically signed and verified on external platform.
                      </span>
                    </div>

                    <a
                      href={activeModalCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>OFFICIAL VERIFICATION</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
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
