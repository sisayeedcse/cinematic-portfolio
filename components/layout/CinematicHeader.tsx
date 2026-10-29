"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, Compass } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  targetId: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "HOME", targetId: "stage" },
  { id: "contact", label: "CONTACT", targetId: "contact" },
];

export default function CinematicHeader() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Scroll spy to highlight active nav link and trigger liquid-glass backdrop
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);

      // Scroll spy detection: if scroll position is within the hero viewport, highlight HOME
      if (scrollPos < window.innerHeight * 0.5) {
        setActiveSection("home");
        return;
      }

      for (let i = navItems.length - 1; i >= 1; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollPos;
          if (scrollPos >= top - 200) {
            setActiveSection(item.id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (targetId: string) => {
    setMobileMenuOpen(false);
    if (targetId === "stage") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLegendClick = () => {
    const targetEl = document.getElementById("contact");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="hdr"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 select-none ${
        isScrolled
          ? "bg-[#050102]/92 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(200,56,43,0.15)]"
          : "bg-gradient-to-b from-[#050102]/95 via-[#050102]/60 to-transparent"
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-[72px] md:h-[78px] flex items-center justify-between relative">
        {/* ====================================================================
            1. LEFT: Sayeed Rugged Crimson Logo + Vertical Divider + Stacked Roles
            ==================================================================== */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* SAYEED Logo Graphic */}
          <button
            onClick={() => scrollTo("stage")}
            className="flex items-center cursor-pointer group focus-royal rounded-md"
            aria-label="Sayeed Ibne Saif — Return to Home"
          >
            <img
              src="/media/logo-sayeed.png"
              alt="SAYEED"
              className="h-7 sm:h-8 md:h-[34px] w-auto object-contain filter drop-shadow-[0_0_12px_rgba(220,38,38,0.7)] group-hover:drop-shadow-[0_0_18px_rgba(245,158,11,0.9)] transition-all duration-300 group-hover:scale-105"
            />
          </button>

          {/* Thin Vertical Divider (Matching Reference Image) */}
          <span
            className="w-[1px] h-7 sm:h-8 bg-white/20 sm:bg-white/30 shrink-0"
            aria-hidden="true"
          />

          {/* Three Stacked Roles (Matching Reference Image) */}
          <div className="flex flex-col text-[8px] sm:text-[9px] font-mono tracking-[0.24em] text-gray-300 leading-tight uppercase font-medium">
            <span className="hover:text-amber-300 transition-colors">SOFTWARE</span>
            <span className="text-red-400 font-bold hover:text-red-300 transition-colors">CLOUD</span>
            <span className="hover:text-amber-300 transition-colors">INFRASTRUCTURE</span>
          </div>
        </div>

        {/* ====================================================================
            2. CENTER: Clean Letterspaced Navigation + Active Glowing Red Dot
            ==================================================================== */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.targetId)}
                className={`relative py-1 flex flex-col items-center group cursor-pointer transition-colors duration-200 focus-royal rounded px-1.5 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white font-medium"
                }`}
              >
                <span className="text-[11px] xl:text-xs font-mono tracking-[0.22em] uppercase transition-all duration-200 group-hover:text-amber-200">
                  {item.label}
                </span>

                {/* The Signature Reference Glowing Red Dot Underneath Active Link */}
                {isActive ? (
                  <motion.span
                    layoutId="headerActiveRedDot"
                    className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,1),0_0_14px_rgba(239,68,68,0.8)] absolute -bottom-2"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent absolute -bottom-2 group-hover:bg-red-500/50 transition-colors" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ====================================================================
            3. RIGHT: "WELCOME TO MY WORLD" with 3 Red Dots + •LEGEND• Pill
            ==================================================================== */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* "WELCOME TO MY WORLD" Block (Desktop / Tablet) */}
          <div className="hidden sm:flex flex-col items-center text-center">
            <span className="text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.22em] text-gray-200 uppercase whitespace-nowrap">
              WELCOME TO MY WORLD
            </span>
            {/* 3 Glowing Red Dots Underneath (Matching Reference Image) */}
            <div className="flex items-center gap-1.5 mt-1" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_rgba(220,38,38,1)] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_rgba(220,38,38,1)] animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_rgba(220,38,38,1)] animate-pulse [animation-delay:300ms]" />
            </div>
          </div>

          {/* Thin Vertical Divider */}
          <span
            className="hidden sm:block w-[1px] h-7 sm:h-8 bg-white/20 shrink-0"
            aria-hidden="true"
          />

          {/* •LEGEND• White Pill Badge (Matching Reference Image) */}
          <button
            onClick={handleLegendClick}
            className="royal-sheen px-3 sm:px-4 py-1 sm:py-1.5 rounded-md bg-white text-black font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,255,255,0.45),0_0_25px_rgba(245,158,11,0.3)] hover:bg-amber-300 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.8)] active:scale-95 transition-all duration-300 cursor-pointer focus-royal"
            title="Explore Legend Experience"
          >
            •LEGEND•
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors focus-royal"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ====================================================================
          4. THE CINEMATIC CHAMFERED HUD BORDER LINE (Matching Reference Image)
          45-degree angle drop on left and rise on right!
          ==================================================================== */}
      <div className="absolute -bottom-[8px] inset-x-0 w-full flex items-end pointer-events-none select-none z-30">
        {/* Left Wing (Starts at y=2, runs flat, angles down to y=14) */}
        <svg
          width="56"
          height="16"
          viewBox="0 0 56 16"
          fill="none"
          className="shrink-0 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M 0 2 L 26 2 L 44 14 L 56 14"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.2"
          />
          {/* Subtle tick highlight at corner */}
          <circle cx="26" cy="2" r="1.5" fill="#ef4444" opacity="0.8" />
          <circle cx="44" cy="14" r="1.5" fill="#ef4444" opacity="0.8" />
        </svg>

        {/* Center Connecting Span */}
        <div className="flex-1 h-[1.2px] bg-white/[0.32] mb-[2px]" aria-hidden="true" />

        {/* Right Wing (Starts at y=14, angles up to y=2, runs flat to edge) */}
        <svg
          width="56"
          height="16"
          viewBox="0 0 56 16"
          fill="none"
          className="shrink-0 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M 0 14 L 12 14 L 30 2 L 56 2"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.2"
          />
          {/* Subtle tick highlight at corner */}
          <circle cx="12" cy="14" r="1.5" fill="#ef4444" opacity="0.8" />
          <circle cx="30" cy="2" r="1.5" fill="#ef4444" opacity="0.8" />
        </svg>
      </div>

      {/* ====================================================================
          5. MOBILE FULL-SCREEN CINEMATIC NAVIGATION DRAWER
          ==================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden w-full bg-[#070204]/98 border-b border-amber-500/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.98)] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-white">
              {/* Mobile Welcome Tag */}
              <div className="flex flex-col items-center py-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.24em] text-gray-300">
                  WELCOME TO MY WORLD
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,1)] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,1)] animate-pulse [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,1)] animate-pulse [animation-delay:300ms]" />
                </div>
              </div>

              {/* Mobile Links List */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.targetId)}
                      className={`flex items-center justify-between p-3 rounded-xl text-left font-mono text-xs tracking-wider transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-red-600/30 to-amber-600/30 border border-amber-500/50 text-white font-bold"
                          : "bg-white/[0.03] text-gray-300 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
