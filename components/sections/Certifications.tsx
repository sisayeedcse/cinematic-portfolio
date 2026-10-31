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
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
} from "lucide-react";

export default function Certifications() {
  const [mounted, setMounted] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  const activeModalCert =
    selectedCertIndex !== null ? certifications[selectedCertIndex] : null;

  return (
    <section
      id="certificates"
      className="relative w-full bg-[#050102] text-white py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="certsTitle"
    >
      {/* ── 1. Top Cinema Header Bar ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 02 // Verified Credentials
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
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase font-sans text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            style={{ justifyContent: "flex-start" }}
          >
            Verified Credentials
          </TextEngine>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-2 max-w-xl font-sans tracking-wide">
            Enterprise industry credentials spanning Cloud & Edge Networking, IBM Linux Systems, Scrimba Python, and Global Competitive Engineering.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-black/70 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(200,56,43,0.2)]">
          {[
            { id: "all", label: "All Credentials (6)" },
            { id: "networking", label: "Cloud & Networks (1)" },
            { id: "systems", label: "Systems & Linux (2)" },
            { id: "dev", label: "Software & Mobile (3)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] font-mono tracking-wider transition-all duration-300 focus-royal ${
                activeFilter === cat.id
                  ? "text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  : "text-gray-400 hover:text-amber-200"
              }`}
            >
              {activeFilter === cat.id && (
                <motion.div
                  layoutId="certsCategoryHighlight"
                  className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-xl"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. Cinematic Royal Spotlight Frame (Sayeed Centered & Highlighting Him Proudly) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-12 sm:mb-16">
        <motion.div
          initial={{ scale: 1.08, opacity: 0, filter: "blur(14px) brightness(0.65)" }}
          whileInView={{ scale: 1, opacity: 1, filter: "blur(0px) brightness(1.0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] min-h-[260px] sm:min-h-[380px] md:min-h-[440px] rounded-3xl overflow-hidden border border-amber-500/35 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(200,56,43,0.3)] group"
        >
          {/* Master Spotlight Artwork */}
          <img
            src="/media/certificates-hero-bg.png"
            alt="Sayeed Ibne Saif — Verified Credentials"
            className="w-full h-full object-cover object-[center_35%] filter contrast-105 brightness-100 transition-transform duration-700 group-hover:scale-[1.02]"
            loading="eager"
          />

          {/* Warm Ambient Pulsing Ember Aura */}
          <div
            className="absolute inset-0 opacity-45 mix-blend-screen pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(220, 38, 38, 0.45) 0%, rgba(212, 175, 55, 0.16) 42%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Anamorphic Light Sweep on Viewport Reveal */}
          <motion.div
            initial={{ x: "-100%", opacity: 0.75 }}
            whileInView={{ x: "200%", opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent pointer-events-none mix-blend-screen -skew-x-12"
          />

          {/* Subtle edge shading for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050102] via-transparent to-[#050102]/60 pointer-events-none" />

          {/* Royal Bottom Telemetry Strip across the artwork frame */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-500/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,1)]" />
              <span className="text-[10px] sm:text-[11px] font-mono text-amber-200 font-bold tracking-[0.2em] uppercase">
                HONORS & VERIFIED CREDENTIALS · SAYEED IBNE SAIF
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-[10px] font-mono text-red-200 font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>INDUSTRY BENCHMARK STANDARDS</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3. Breathable, Uncluttered 3-Column Credential Grid (Zero Congestion) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCerts.map((cert, idx) => {
            const globalIndex = certifications.findIndex((c) => c.id === cert.id);
            const isHovered = hoveredId === cert.id;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedCertIndex(globalIndex)}
                className={`group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 backdrop-blur-2xl border ${
                  isHovered
                    ? "bg-[#160408]/95 border-amber-400 shadow-[0_20px_50px_rgba(200,56,43,0.35),0_0_25px_rgba(245,158,11,0.3)] -translate-y-1.5 scale-[1.01]"
                    : "bg-[#0d0205]/90 border-amber-500/25 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
                }`}
              >
                {/* Top Row: Category Pill + Issue Date */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
                    <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                      VERIFIED
                    </span>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-[10px] font-mono text-amber-300/90 uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">
                    {cert.date}
                  </span>
                </div>

                {/* Certificate High-Res Thumbnail Preview with Zoom Icon */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/80 border border-white/10 mb-4 shadow-inner group/thumb">
                  <img
                    src={cert.localImage || cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (e.currentTarget.src !== cert.image) {
                        e.currentTarget.src = cert.image;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3">
                    <span className="text-[9px] font-mono text-gray-300 tracking-wider">
                      {cert.credentialId ? `ID: ${cert.credentialId.slice(0, 16)}...` : `VERIFIED // ${cert.issuerShort.toUpperCase()}`}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-black/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                      <Eye size={11} /> PREVIEW
                    </span>
                  </div>
                </div>

                {/* Certificate Name & Description */}
                <div className="mb-4">
                  <h3 className="font-extrabold text-lg sm:text-xl font-sans uppercase text-white tracking-tight group-hover:text-amber-100 transition-colors leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-gray-300 font-sans mt-2 line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/10">
                  {cert.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-[10px] group-hover:border-amber-500/40 group-hover:text-amber-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Inspect Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCertIndex(globalIndex);
                  }}
                  className="royal-sheen w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] group-hover:scale-[1.01]"
                >
                  <Maximize2 size={13} />
                  <span>INSPECT CREDENTIAL</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── 4. Cinematic Full Modal Inspector Lightbox (Portal to document.body) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeModalCert && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalCertTitle"
              >
                {/* Dark Liquid Glass Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCertIndex(null)}
                  className="absolute inset-0 bg-black/94 backdrop-blur-2xl"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 25 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-amber-500/50 bg-[#0d0205] shadow-[0_0_80px_rgba(220,38,38,0.45)] overflow-hidden text-white"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        <Award size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block font-bold">
                          VERIFIED CREDENTIAL // {activeModalCert.categoryLabel}
                        </span>
                        <h3
                          id="modalCertTitle"
                          className="text-lg sm:text-2xl font-extrabold font-sans uppercase text-white leading-tight"
                        >
                          {activeModalCert.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCertIndex(null)}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close credential viewer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
                    {/* Full High-Resolution Certificate Frame */}
                    <div className="w-full rounded-2xl overflow-hidden border border-amber-500/30 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
                      <img
                        src={activeModalCert.localImage || activeModalCert.image}
                        alt={activeModalCert.name}
                        className="w-full h-auto object-cover max-h-[60vh]"
                        onError={(e) => {
                          if (e.currentTarget.src !== activeModalCert.image) {
                            e.currentTarget.src = activeModalCert.image;
                          }
                        }}
                      />
                    </div>

                    {/* Metadata Telemetry Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/25">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-amber-300/80 block">
                          ISSUING ENTITY
                        </span>
                        <span className="text-sm sm:text-base font-extrabold font-sans text-white tracking-wide mt-1 block">
                          {activeModalCert.issuer}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/25">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-amber-300/80 block">
                          DATE VERIFIED
                        </span>
                        <span className="text-sm sm:text-base font-extrabold font-sans text-white tracking-wide mt-1 block">
                          {activeModalCert.date}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/25 sm:col-span-2">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-amber-300/80 block">
                          CREDENTIAL IDENTIFIER
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-gray-200 mt-1 block truncate">
                          {activeModalCert.credentialId || `REC-VERIFIED-${activeModalCert.id.toUpperCase()}`}
                        </span>
                      </div>
                    </div>

                    {/* Narrative Description */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
                        COMPETENCY & VERIFICATION SUMMARY
                      </span>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                        {activeModalCert.description}
                      </p>
                    </div>

                    {/* Skills Badges */}
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 mb-2.5 block font-bold">
                        VERIFIED TECHNICAL CAPABILITIES
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeModalCert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 sm:p-6 border-t border-white/10 bg-[#070103] flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      AUTHENTICATED RECORD · NO EXPIRATION
                    </span>

                    <div className="flex items-center gap-3">
                      {activeModalCert.verifyUrl && (
                        <a
                          href={activeModalCert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="royal-sheen flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                        >
                          <ExternalLink size={14} />
                          <span>Verify with Issuer</span>
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
