"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import TextEngine from "spring-text-engine";

const stats = [
  { value: 3, suffix: "+", label: "Years of\nExperience", accent: "crimson" },
  { value: 10, suffix: "+", label: "Production\nProjects Delivered", accent: "gold" },
  { value: 6, suffix: "", label: "Verified\nCertifications", accent: "crimson" },
  { value: 5, suffix: "+", label: "Client\nSystems Deployed", accent: "gold" },
];

function useCountUp(target: number, duration = 1600, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatCard({
  value,
  suffix,
  label,
  accent,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  accent: "crimson" | "gold";
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1600, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const accentColor =
    accent === "crimson"
      ? { text: "text-[#c8382b]", glow: "shadow-[0_0_40px_rgba(200,56,43,0.4)]", border: "border-[#c8382b]/30" }
      : { text: "text-[#d4af37]", glow: "shadow-[0_0_40px_rgba(212,175,55,0.4)]", border: "border-[#d4af37]/30" };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col items-center justify-center gap-2 p-8 rounded-2xl bg-[#0c0304]/80 border ${accentColor.border} backdrop-blur-xl ${accentColor.glow} group hover:scale-[1.03] transition-transform duration-300`}
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 rounded-2xl opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url(/tex/grain.png)", backgroundSize: "200px" }}
        aria-hidden="true"
      />

      {/* Number */}
      <span className={`font-[Anton] text-6xl sm:text-7xl leading-none tabular-nums ${accentColor.text} drop-shadow-lg`}>
        {count}
        <span className="text-4xl">{suffix}</span>
      </span>

      {/* Label */}
      <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-amber-200/70 text-center whitespace-pre-line leading-relaxed">
        {label}
      </p>

      {/* Corner accent */}
      <span
        className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${accent === "crimson" ? "bg-[#c8382b]" : "bg-[#d4af37]"} shadow-lg opacity-60 group-hover:opacity-100 transition-opacity`}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function StatCounters() {
  return (
    <section
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#050102] overflow-hidden"
      aria-label="Impact Statistics"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(200,56,43,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Horizontal rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-3 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#c8382b] animate-pulse shadow-[0_0_10px_rgba(200,56,43,0.9)]" />
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
            IMPACT // BY THE NUMBERS
          </p>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <TextEngine
            tag="h2"
            mode="once"
            lineOut={{ opacity: 0, filter: "blur(10px)" }}
            lineIn={{ opacity: 1, filter: "blur(0px)" }}
            lineConfig={{ tension: 190, friction: 26 }}
            lineStagger={90}
            className="font-[Anton] text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white"
            style={{ justifyContent: "center" }}
          >
            The Proof
          </TextEngine>
          <p className="text-xs text-amber-200/60 mt-2 font-mono tracking-wide">
            Real deliverables. Verified credentials. Production systems.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              accent={s.accent as "crimson" | "gold"}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
