"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Check, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillLogo {
  id: string;
  name: string;
  category: string;
  icon: string;
  glow: string;
  invertDark?: boolean;
  desc: string;
}

const skillLogos: SkillLogo[] = [
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Infrastructure",
    icon: "/icons/aws.svg",
    glow: "rgba(255, 153, 0, 0.65)",
    desc: "Multi-AZ Cloud Architecture, VPC, EC2 Compute, S3 Storage & IAM Governance",
  },
  {
    id: "docker",
    name: "Docker",
    category: "Containerization",
    icon: "/icons/docker.svg",
    glow: "rgba(36, 150, 237, 0.65)",
    desc: "OCI Container Packaging, Multi-Stage Dockerfiles, Compose & Layer Cache Tuning",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Orchestration",
    icon: "/icons/kubernetes.svg",
    glow: "rgba(50, 108, 229, 0.65)",
    desc: "Cluster Orchestration, Pod Lifecycle, Ingress Controllers & Declarative Deployments",
  },
  {
    id: "github",
    name: "GitHub",
    category: "CI/CD & Actions",
    icon: "/icons/github.svg",
    glow: "rgba(255, 255, 255, 0.65)",
    desc: "Automated Build/Deploy Pipelines, Actions Workflows, Version Control & PR Review",
  },
  {
    id: "python",
    name: "Python",
    category: "Systems & Automation",
    icon: "/icons/python.svg",
    glow: "rgba(255, 212, 59, 0.65)",
    desc: "Python 3 Automation Tooling, RESTful API Microservices & Systems Scripting",
  },
  {
    id: "php",
    name: "PHP",
    category: "Backend Architecture",
    icon: "/icons/php.svg",
    glow: "rgba(119, 123, 179, 0.65)",
    desc: "High-Throughput Web Backends, Object-Oriented Domain Logic & Enterprise APIs",
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "Infrastructure as Code",
    icon: "/icons/terraform.svg",
    glow: "rgba(132, 79, 186, 0.65)",
    desc: "Declarative Cloud Infrastructure as Code, State Management & Modular Provisioning",
  },
  {
    id: "linux",
    name: "Linux",
    category: "Operating Systems",
    icon: "/icons/linux.svg",
    glow: "rgba(255, 214, 0, 0.65)",
    desc: "Enterprise POSIX Kernel, Systemd Daemons, Process Governance & File Permissions",
  },
  {
    id: "nginx",
    name: "Nginx",
    category: "Edge & Reverse Proxy",
    icon: "/icons/nginx.svg",
    glow: "rgba(0, 150, 57, 0.65)",
    desc: "High-Performance Edge Reverse Proxy, TLS/SSL Termination & Load Balancing",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Fullstack Architecture",
    icon: "/icons/nextjs.svg",
    glow: "rgba(255, 255, 255, 0.65)",
    desc: "Server-Side Rendering, App Router Architecture, Edge Middleware & Hybrid Compute",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Relational Database",
    icon: "/icons/mysql.svg",
    glow: "rgba(0, 117, 143, 0.65)",
    desc: "Relational Schema Design, Query Optimization, Index Tuning & Acid Transactions",
  },
  {
    id: "bash",
    name: "Bash",
    category: "CLI & Pipelines",
    icon: "/icons/bash.svg",
    glow: "rgba(78, 170, 37, 0.65)",
    desc: "POSIX Shell Scripting, Cron Automation, Pipe Streams & Standard I/O Redirection",
  },
];

export default function Skills() {
  const [activeId, setActiveId] = useState<string>("aws");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const selectedSkill =
    skillLogos.find((s) => s.id === (hoveredId || activeId)) || skillLogos[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 1. Dual Royal Curtain Parting with 2 Golden Lines (Zero Blur, Snappy)
      tl.fromTo(
        leftCurtainRef.current,
        { xPercent: 0 },
        { xPercent: -101, duration: 0.85, ease: "power3.inOut" },
        0
      );
      tl.fromTo(
        rightCurtainRef.current,
        { xPercent: 0 },
        { xPercent: 101, duration: 0.85, ease: "power3.inOut" },
        0
      );

      // 2. High-Resolution Artwork Expansion (Crisp, zero blur, clear transform on complete)
      tl.fromTo(
        bgImgRef.current,
        {
          clipPath: "inset(0% 50% 0% 50%)",
          scale: 1.08,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1.0,
          duration: 0.85,
          ease: "power3.inOut",
          clearProps: "scale",
        },
        0
      );

      // 3. Subtle Anamorphic Flare Sweep
      tl.fromTo(
        sweepRef.current,
        { x: "-100%", opacity: 0.8 },
        { x: "200%", opacity: 0, duration: 1.0, ease: "power2.inOut" },
        0.2
      );

      // 4. Marquee HUD Entrance
      tl.fromTo(
        hudRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0.3
      );

      // 5. Holographic Primitives Stagger (Fast & Snappy)
      const logoButtons = gridContainerRef.current?.querySelectorAll(".skill-logo-btn");
      if (logoButtons && logoButtons.length > 0) {
        tl.fromTo(
          logoButtons,
          { scale: 0.4, opacity: 0, y: 18 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            stagger: 0.025,
            duration: 0.45,
            ease: "back.out(1.5)",
          },
          0.35
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-[100svh] pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 bg-[#050102] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none z-10"
      aria-labelledby="skillsTitle"
    >
      {/* ── 1. Master High-Resolution Artwork (Sayeed Walking Forward with 3D SKILLS & Red Mist) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center will-change-transform">
        <img
          ref={bgImgRef}
          src="/media/skills-throne-clean.jpg"
          alt="Sayeed Ibne Saif — Technical Arsenal & Skills"
          className="w-full h-full object-cover object-[62%_20%] sm:object-[56%_25%] lg:object-center select-none cinematic-backdrop-img filter contrast-105 brightness-100 will-change-transform"
          style={{ clipPath: "inset(0% 50% 0% 50%)" }}
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
        <div
          ref={sweepRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none mix-blend-screen -skew-x-12 opacity-0"
        />

        {/* ── Royal Dual-Curtain Split Reveal with 2 Parting Golden Lines (Zero Blur) ── */}
        <div
          ref={leftCurtainRef}
          className="absolute top-0 bottom-0 left-0 w-1/2 z-10 pointer-events-none bg-gradient-to-r from-[#050102] via-[#0d0205] to-[#120306] border-r border-[#d4af37] shadow-[2px_0_15px_rgba(212,175,55,0.5)] will-change-transform"
        />
        <div
          ref={rightCurtainRef}
          className="absolute top-0 bottom-0 right-0 w-1/2 z-10 pointer-events-none bg-gradient-to-l from-[#050102] via-[#0d0205] to-[#120306] border-l border-[#d4af37] shadow-[-2px_0_15px_rgba(212,175,55,0.5)] will-change-transform"
        />

        {/* Edge Vignette Shading for Royal Contrast */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#050102] via-[#050102]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#050102] via-[#050102]/85 to-transparent pointer-events-none" />
      </div>

      {/* ── 2. Top Cinema Marquee HUD ── */}
      <div
        ref={hudRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-amber-200/80 uppercase tracking-[0.25em] pb-4 border-b border-amber-500/20"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
          SCENE 02 // TECHNICAL ARSENAL
        </span>

        {/* Letterspaced Title */}
        <p className="text-center text-amber-100 font-mono tracking-[0.22em] text-[11px] sm:text-xs">
          CLOUD INFRASTRUCTURE · <span className="text-amber-400 font-bold">DEVOPS</span> · SYSTEMS
        </p>

        <span className="text-amber-400 font-semibold tracking-widest hidden sm:inline">
          12 PRODUCTION PRIMITIVES
        </span>
      </div>

      {/* ── 3. Main Stage: Unobstructed Left/Center (Sayeed & SKILLS) + Holographic Glowing Logos on Right ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full mt-auto lg:my-auto py-2 sm:py-3 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        {/* Left Side spacer: leaves Sayeed and "SKILLS" text 100% open and visible */}
        <div className="hidden lg:block lg:flex-1 pointer-events-none" />

        {/* Right Side: Creative Compact Holographic Constellation of Glowing Logos (Sleek for Laptop & Mobile) */}
        <div className="w-full max-w-sm sm:max-w-md lg:w-[310px] xl:w-[350px] 2xl:w-[390px] lg:ml-auto flex flex-col items-center lg:items-end space-y-1.5 sm:space-y-2.5">
          {/* Header pill above the logos */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-black/80 border border-amber-500/35 backdrop-blur-xl shadow-lg">
            <Flame size={10} className="text-red-500 animate-pulse" />
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-amber-300 uppercase tracking-widest">
              TECHNOLOGY MATRIX // SELECT OR HOVER
            </span>
          </div>

          {/* Glowing Logos Floating Grid (6 cols on mobile, 4 cols on desktop/laptop) */}
          <div
            ref={gridContainerRef}
            className="grid grid-cols-6 lg:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-2 p-2 sm:p-2.5 lg:p-3 rounded-2xl sm:rounded-3xl bg-[#0d0205]/85 border border-amber-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(200,56,43,0.3)]"
          >
            {skillLogos.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;

              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveId(skill.id)}
                  onMouseEnter={() => setHoveredId(skill.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`skill-logo-btn relative w-9 h-9 sm:w-11 sm:h-11 lg:w-11 lg:h-11 xl:w-13 xl:h-13 rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2 transition-all duration-300 group cursor-pointer focus-royal ${
                    isSelected
                      ? "bg-[#1f050b] border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.65),0_0_12px_rgba(220,38,38,0.5)] ring-1 ring-amber-400/50 scale-105"
                      : "bg-[#110204]/90 border border-white/10 hover:border-amber-400/80 hover:bg-[#180408] shadow-[0_6px_15px_rgba(0,0,0,0.7)] hover:scale-110"
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `0 0 16px ${skill.glow}, 0 0 25px rgba(200, 56, 43, 0.4)`
                      : undefined,
                  }}
                  title={`${skill.name} — ${skill.category}`}
                  aria-label={skill.name}
                >
                  {/* Subtle pulsing background glow matching the brand color */}
                  <div
                    className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"
                    style={{ backgroundColor: skill.glow }}
                  />

                  {/* SVG Logo Image */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`relative z-10 w-full h-full object-contain filter transition-transform duration-300 group-hover:scale-110 ${
                      skill.invertDark ? "brightness-125" : ""
                    }`}
                    loading="eager"
                  />

                  {/* Active Indicator Dot */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)] animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Dynamic Telemetry Bar for the Highlighted Skill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="w-full rounded-xl sm:rounded-2xl p-2 sm:p-2.5 bg-[#120306]/92 border border-amber-500/35 backdrop-blur-xl shadow-xl flex items-center justify-between gap-2 text-left"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center p-1 shrink-0 border border-white/15 bg-black/60 shadow-md"
                  style={{ boxShadow: `0 0 10px ${selectedSkill.glow}` }}
                >
                  <img
                    src={selectedSkill.icon}
                    alt={selectedSkill.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-[11px] sm:text-xs font-sans uppercase text-white tracking-wide">
                      {selectedSkill.name}
                    </span>
                    <span className="text-[7px] sm:text-[8px] font-mono font-bold text-amber-300/90 uppercase tracking-wider px-1 py-0.2 rounded bg-white/5 border border-white/10">
                      {selectedSkill.category}
                    </span>
                  </div>
                  <p className="text-[8px] sm:text-[10px] font-sans text-gray-300 truncate mt-0.5">
                    {selectedSkill.desc}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[8px] font-mono uppercase font-bold">
                <Check size={9} />
                <span>ACTIVE</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── 4. Bottom Telemetry Strip ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] font-mono text-gray-400 tracking-wider pt-3 px-2 border-t border-white/5">
        <span className="flex items-center gap-1.5 text-amber-300/80">
          <ShieldCheck size={12} className="text-emerald-400" />
          VERIFIED PRODUCTION ARCHITECTURE & RUNTIMES
        </span>
        <span className="hidden sm:inline text-amber-400/70">
          ENTERPRISE CLOUD · DEVOPS · AUTOMATION
        </span>
      </div>
    </section>
  );
}
