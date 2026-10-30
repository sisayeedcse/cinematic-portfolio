"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Layers,
  ChevronUp,
  Sparkles,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type Scene = {
  id: string;
  num: string;
  title: string;
  short: string;
};

const scenes: Scene[] = [
  { id: "stage", num: "01", title: "Cinematic Hero", short: "Hero" },
  { id: "certificates", num: "02", title: "Verified Credentials", short: "Certs" },
  { id: "contact", num: "03", title: "Closing Finale", short: "Finale" },
];

export default function SceneDirectorHUD() {
  const [activeSceneId, setActiveSceneId] = useState<string>("stage");
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setHasScrolled(scrollPos > 300);

      // Determine active scene based on scroll position
      if (scrollPos < window.innerHeight * 0.5) {
        setActiveSceneId("stage");
        return;
      }

      for (let i = scenes.length - 1; i >= 1; i--) {
        const el = document.getElementById(scenes[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollPos;
          if (scrollPos >= top - 200) {
            setActiveSceneId(scenes[i].id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];

  const scrollToScene = (id: string) => {
    setIsOpen(false);
    if (id === "stage") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Cinematic HUD Pill (Desktop & Mobile) */}
      <aside
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${
          hasScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scene Navigator"
      >
        <div className="relative">
          {/* Main Action Pill */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="group flex items-center gap-3 pl-3.5 pr-4 py-2.5 rounded-full bg-[#120407]/90 hover:bg-[#1c060c] border border-amber-500/40 hover:border-amber-400 text-white backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(200,56,43,0.35)] active:scale-95 transition-all focus-royal"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {/* Glowing Golden Pulse Beacon */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-red-500 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
            </span>

            {/* Current Scene Tag */}
            <div className="flex items-center gap-2 text-left">
              <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">
                SCENE {activeScene.num}
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-500/40" />
              <span className="text-xs font-mono font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors uppercase">
                {activeScene.short}
              </span>
            </div>

            {/* Expand / Close Icon */}
            <div className="ml-1 text-amber-400/80 group-hover:text-amber-300 transition-colors">
              {isOpen ? <X size={14} /> : <Compass size={14} />}
            </div>
          </button>

          {/* Expanded Scene Menu Dropup */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-14 right-0 w-64 rounded-2xl p-2.5 bg-[#0e0306]/96 border border-amber-500/50 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(200,56,43,0.4)] flex flex-col gap-1 text-white select-none"
              >
                {/* Header */}
                <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold flex items-center gap-1.5">
                    <Sparkles size={11} className="text-amber-400" />
                    SCENE DIRECTOR
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    {activeScene.num} / 03
                  </span>
                </div>

                {/* Scene Link Items */}
                <div className="flex flex-col gap-0.5 py-1 max-h-72 overflow-y-auto">
                  {scenes.map((scene) => {
                    const isActive = scene.id === activeSceneId;
                    return (
                      <button
                        key={scene.id}
                        onClick={() => scrollToScene(scene.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-mono transition-all group ${
                          isActive
                            ? "bg-gradient-to-r from-red-600/30 to-amber-600/30 border border-amber-500/50 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                            : "hover:bg-white/[0.05] text-gray-400 hover:text-amber-200"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[10px] font-mono ${
                              isActive ? "text-amber-400" : "text-gray-500 group-hover:text-amber-400/80"
                            }`}
                          >
                            {scene.num}
                          </span>
                          <span className="truncate">{scene.title}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Scroll To Top */}
                <button
                  onClick={() => scrollToScene("stage")}
                  className="mt-1 pt-2 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] font-mono text-amber-300 hover:text-white uppercase tracking-wider py-1 hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  <ChevronUp size={12} />
                  <span>RETURN TO STAGE TOP</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}
