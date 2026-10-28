"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cloud,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Maximize2,
  ExternalLink,
  X,
  CheckCircle2,
  Server,
  Code2,
  ShieldCheck,
  Flame,
  Globe,
  Radio,
  CornerDownRight,
} from "lucide-react";

export type TechCube = {
  id: string;
  name: string;
  category: "cloud" | "backend" | "systems";
  categoryLabel: string;
  left: string;
  top: string;
  width: string;
  height: string;
  role: string;
  level: string;
  description: string;
  deployments: string[];
  specs: { label: string; value: string }[];
};

export const techCubes: TechCube[] = [
  {
    id: "linux",
    name: "Linux (Ubuntu / POSIX)",
    category: "systems",
    categoryLabel: "Operating Systems & Kernels",
    left: "17.0%",
    top: "16.0%",
    width: "11.5%",
    height: "20.5%",
    role: "Core Operating System & Daemons",
    level: "Daily Driver & Production Host",
    description:
      "Command line fluency, Bash scripting, systemd service management, SSH hardening, and kernel tuning for production servers.",
    deployments: ["Ubuntu 24.04 LTS", "Debian", "Bash Scripting", "Systemd Daemons"],
    specs: [
      { label: "Host OS", value: "Ubuntu Server" },
      { label: "Shell", value: "GNU Bash 5.2" },
    ],
  },
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    category: "cloud",
    categoryLabel: "Cloud Computing & Infrastructure",
    left: "31.5%",
    top: "7.0%",
    width: "12.0%",
    height: "21.0%",
    role: "Multi-AZ Cloud Architecture",
    level: "Cloud Infrastructure Engineer",
    description:
      "Designing and operating resilient cloud services across EC2 compute, VPC subnets, S3 object stores, IAM policies, and CloudWatch telemetry.",
    deployments: ["EC2 Elastic Compute", "VPC Networking", "S3 Storage", "IAM Governance"],
    specs: [
      { label: "Architecture", value: "Multi-AZ Tier" },
      { label: "Telemetry", value: "CloudWatch" },
    ],
  },
  {
    id: "terraform",
    name: "Terraform (IaC)",
    category: "cloud",
    categoryLabel: "Infrastructure as Code",
    left: "61.0%",
    top: "8.5%",
    width: "12.5%",
    height: "21.5%",
    role: "Declarative Infrastructure Provisioning",
    level: "Automated Deployments",
    description:
      "Automating cloud infrastructure provisioning with reusable HCL modules, remote S3 state storage, and DynamoDB lock management.",
    deployments: ["HCL Modules", "State Management", "VPC Automation", "Security Groups"],
    specs: [
      { label: "Language", value: "HashiCorp HCL" },
      { label: "Engine", value: "Terraform 1.8+" },
    ],
  },
  {
    id: "docker",
    name: "Docker (Containers)",
    category: "cloud",
    categoryLabel: "Containerization & Microservices",
    left: "80.0%",
    top: "21.5%",
    width: "12.5%",
    height: "21.5%",
    role: "OCI Container Packaging",
    level: "Production Microservices",
    description:
      "Multi-stage minimal Dockerfile builds, layer optimization, Docker Compose local orchestrations, and container volume persistence.",
    deployments: ["Multi-Stage Builds", "Docker Compose", "containerd", "Minimal Alpine"],
    specs: [
      { label: "Runtime", value: "containerd / OCI" },
      { label: "Base Size", value: "< 30MB" },
    ],
  },
  {
    id: "git",
    name: "Git (VCS)",
    category: "systems",
    categoryLabel: "Version Control & Branching",
    left: "29.0%",
    top: "33.5%",
    width: "11.0%",
    height: "19.0%",
    role: "Distributed Version Control",
    level: "Trunk & Feature Branching",
    description:
      "Advanced Git workflows, rebasing, merge conflict resolution, branch protection rules, and cryptographic commit signing.",
    deployments: ["Branching Strategies", "Semantic Tagging", "GPG Signing", "Merge Workflows"],
    specs: [
      { label: "Protocol", value: "Git SSH / HTTPS" },
      { label: "Standard", value: "Trunk-Based" },
    ],
  },
  {
    id: "kubernetes",
    name: "Kubernetes (K8s)",
    category: "cloud",
    categoryLabel: "Container Orchestration",
    left: "64.0%",
    top: "37.0%",
    width: "12.5%",
    height: "20.5%",
    role: "Cluster Orchestration & Pod Scaling",
    level: "Cloud Native Deployment",
    description:
      "Managing containerized applications across pods, services, ingress controllers, ConfigMaps, and horizontal pod autoscaling.",
    deployments: ["Pod Lifecycle", "Ingress Controllers", "ConfigMaps & Secrets", "HPA Scaling"],
    specs: [
      { label: "API Version", value: "v1.30+" },
      { label: "Networking", value: "CNI Ingress" },
    ],
  },
  {
    id: "github",
    name: "GitHub & Actions CI/CD",
    category: "systems",
    categoryLabel: "DevOps & Collaboration",
    left: "82.5%",
    top: "43.5%",
    width: "11.5%",
    height: "20.0%",
    role: "CI/CD Pipeline Automation",
    level: "Automated Testing & Release",
    description:
      "Continuous integration and continuous deployment workflows, repository governance, automated linting, security scans, and cloud releases.",
    deployments: ["GitHub Actions", "Release Workflows", "OIDC Auth", "Trivy Security"],
    specs: [
      { label: "Pipelines", value: "Declarative YAML" },
      { label: "Platform", value: "Enterprise GitHub" },
    ],
  },
  {
    id: "python",
    name: "Python 3",
    category: "backend",
    categoryLabel: "Scripting & Automation",
    left: "9.5%",
    top: "43.0%",
    width: "12.0%",
    height: "21.0%",
    role: "Systems Automation & APIs",
    level: "Backend & Tooling",
    description:
      "System automation scripting, CLI tools, REST APIs, computer vision solvers, and data processing utilities.",
    deployments: ["CLI Tools", "Automation Scripts", "Image Keying Solvers", "FastAPI / Flask"],
    specs: [
      { label: "Runtime", value: "Python 3.12+" },
      { label: "Typing", value: "PEP 484 Strict" },
    ],
  },
  {
    id: "php",
    name: "PHP 8+",
    category: "backend",
    categoryLabel: "Backend Server Runtimes",
    left: "24.0%",
    top: "49.0%",
    width: "11.0%",
    height: "18.5%",
    role: "High-Throughput Web Runtimes",
    level: "Server-Side Engineering",
    description:
      "Modern PHP 8+ with strict typing, OPcache acceleration, relational MySQL schemas, and robust backend architectures.",
    deployments: ["PHP-FPM", "Strict Types", "MySQL Relational Schemas", "Composer Packages"],
    specs: [
      { label: "Engine", value: "PHP 8.2+ FPM" },
      { label: "Speed", value: "JIT / OPcache" },
    ],
  },
  {
    id: "node",
    name: "Node.js & TypeScript",
    category: "backend",
    categoryLabel: "Asynchronous JavaScript Engine",
    left: "31.5%",
    top: "65.0%",
    width: "12.5%",
    height: "20.5%",
    role: "Real-Time APIs & Fullstack Engines",
    level: "Fullstack Architecture",
    description:
      "Event-driven asynchronous microservices, Next.js server components, TypeScript safety, and fast API endpoints.",
    deployments: ["Next.js App Router", "Express / Fastify", "TypeScript Strict", "Tailwind CSS"],
    specs: [
      { label: "Engine", value: "V8 Engine" },
      { label: "Architecture", value: "Async Event Loop" },
    ],
  },
  {
    id: "laravel",
    name: "Laravel Framework",
    category: "backend",
    categoryLabel: "Enterprise MVC Web Framework",
    left: "17.0%",
    top: "65.5%",
    width: "12.0%",
    height: "21.0%",
    role: "Full-Stack Web Systems & POS",
    level: "Enterprise Production",
    description:
      "Architected complete commercial platforms including Amazing Laundry POS (Qatar) and Gadgetexa Labs with Eloquent ORM and queues.",
    deployments: ["Amazing Laundry POS", "Gadgetexa Labs", "InEx Tracker", "Eloquent ORM"],
    specs: [
      { label: "Framework", value: "Laravel 11" },
      { label: "Database", value: "MySQL / Redis" },
    ],
  },
  {
    id: "wordpress",
    name: "WordPress & WooCommerce",
    category: "backend",
    categoryLabel: "Client E-Commerce & CMS Platforms",
    left: "67.5%",
    top: "61.5%",
    width: "14.5%",
    height: "22.5%",
    role: "Client Storefronts & Custom Themes",
    level: "Client Delivery & Management",
    description:
      "Delivered and managed complete commercial e-commerce for Glowbee Skincare with WooCommerce, custom PHP, payment integrations, and speed optimization.",
    deployments: ["Glowbee Skincare Store", "Custom Theme Dev", "Payment Gateways", "Speed Tuning"],
    specs: [
      { label: "Engine", value: "WooCommerce" },
      { label: "Performance", value: "Cached CDN" },
    ],
  },
];

// Interactive Cosmic Particles Canvas
function CosmicDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // 45 cosmic dust embers (Ruby, Amber, Warm Ivory)
    const particleColors = [
      "rgba(239, 68, 68, 0.75)",
      "rgba(251, 191, 36, 0.85)",
      "rgba(254, 243, 199, 0.9)",
      "rgba(220, 38, 38, 0.55)",
      "rgba(245, 158, 11, 0.8)",
    ];

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.8,
      speedY: Math.random() * 0.35 + 0.12,
      speedX: (Math.random() - 0.5) * 0.2,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(t + p.phase) * 0.25;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70 mix-blend-screen"
      aria-hidden="true"
    />
  );
}

export default function SkillsUniverse() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredCube, setHoveredCube] = useState<TechCube | null>(null);
  const [selectedCube, setSelectedCube] = useState<TechCube | null>(null);

  // 3D Kinetic Mouse Parallax States
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 6.5, y: x * 6.5 });
    setPan({ x: -x * 14, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setPan({ x: 0, y: 0 });
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCube(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full min-h-[100svh] bg-[#050102] text-white overflow-hidden flex flex-col justify-between border-t border-amber-500/20 select-none z-10 py-12 sm:py-16 md:py-20"
      aria-labelledby="skillsTitle"
    >
      {/* 1. Kinetic Cosmic Canvas Particle Drift (Replaces Heavy Video) */}
      <CosmicDustCanvas />

      {/* 2. Top Cinema Header + Telemetry Status Pill */}
      <header className="relative z-20 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 02 // Core Competencies
            </p>
          </div>
          <h2
            id="skillsTitle"
            className="font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none uppercase font-[Anton]"
          >
            The Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-red-500">
              Universe
            </span>
          </h2>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-1.5 max-w-lg font-sans tracking-wide">
            Kinetic 3D zero-gravity constellation. Interactive holographic nodes mapped to live production stacks.
          </p>
        </div>

        {/* Live Orbit Status Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/75 border border-amber-500/35 backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-200/90 font-bold">
            ZERO-G DRIFT // KINETIC
          </span>
        </div>
      </header>

      {/* 3. The 3D Constellation Kinetic Stage with Mouse Parallax & Harmonic Float */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1200px" }}
        className="relative z-10 w-full max-w-[1920px] mx-auto flex-1 hidden md:flex items-center justify-center my-auto aspect-[1672/941] px-4"
      >
        {/* Kinetic 3D Tilt & Pan Wrapper */}
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(${pan.x}px, ${pan.y}px, 0)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full h-full"
        >
          {/* Continuous Harmonic Zero-Gravity Floating Motion */}
          <motion.div
            animate={{
              y: [-7, 7, -7],
              rotateZ: [-0.4, 0.4, -0.4],
              scale: [1.008, 1.025, 1.008],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            {/* The Master High-Definition Royal-Graded Artwork */}
            <img
              src="/media/skills-reference.png"
              alt="The Tech Universe — 3D Constellation"
              className="w-full h-full object-cover object-center select-none filter contrast-105 brightness-100 pointer-events-none rounded-2xl"
              loading="eager"
            />

            {/* Ambient Volumetric Royal Crimson & Amber Breathing Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse 75% 55% at 50% 48%, rgba(220, 38, 38, 0.35) 0%, rgba(212, 175, 55, 0.14) 40%, transparent 75%)",
              }}
              aria-hidden="true"
            />

            {/* Top & Bottom Cinematic Vignette Feathering */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#050102] via-[#050102]/70 to-transparent pointer-events-none" />

            {/* Connecting Kinetic Constellation Vector Arcs */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-30"
              viewBox="0 0 1672 941"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="orbitArc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {/* Cloud Backbone: Linux -> AWS -> Terraform -> Docker */}
              <path
                d="M 376 250 Q 570 120 710 165 T 1060 180 T 1390 280"
                fill="none"
                stroke="url(#orbitArc)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              {/* Backend Backbone: Python -> PHP -> Node -> Laravel -> WordPress */}
              <path
                d="M 260 500 Q 450 560 590 690 T 890 715 T 1200 680"
                fill="none"
                stroke="url(#orbitArc)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              {/* Central Bridge: AWS -> Git -> K8s */}
              <path
                d="M 620 165 L 535 410 L 1120 450"
                fill="none"
                stroke="rgba(251, 191, 36, 0.4)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
            </svg>

            {/* 12 Interactive 3D Tech Station Hotspots */}
            {techCubes.map((cube) => {
              const matchesFilter =
                activeFilter === "all" || cube.category === activeFilter;
              const isHovered = hoveredCube?.id === cube.id;

              return (
                <div
                  key={cube.id}
                  style={{
                    position: "absolute",
                    left: cube.left,
                    top: cube.top,
                    width: cube.width,
                    height: cube.height,
                  }}
                  className={`transition-all duration-500 ${
                    matchesFilter
                      ? "opacity-100"
                      : "opacity-20 filter blur-[1px] grayscale-[0.6]"
                  }`}
                >
                  {/* Clickable / Hoverable Interactive Station */}
                  <button
                    onClick={() => setSelectedCube(cube)}
                    onMouseEnter={() => setHoveredCube(cube)}
                    onMouseLeave={() => setHoveredCube(null)}
                    className="w-full h-full relative rounded-2xl focus-royal cursor-pointer group"
                    aria-label={`Inspect ${cube.name}`}
                  >
                    {/* Glowing Royal Energy Rim on Hover / Filter Match */}
                    <div
                      className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                        isHovered
                          ? "border-2 border-amber-400 bg-amber-500/18 shadow-[0_0_40px_rgba(245,158,11,1),inset_0_0_22px_rgba(220,38,38,0.45)] scale-[1.05]"
                          : matchesFilter && activeFilter !== "all"
                          ? "border border-amber-500/70 bg-red-950/25 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse"
                          : "border border-transparent hover:border-amber-400/40"
                      }`}
                    >
                      {/* Laser Corner Brackets (Appear on Hover) */}
                      {isHovered && (
                        <>
                          <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
                          <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                          <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
                          <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300 pointer-events-none" />
                        </>
                      )}
                    </div>

                    {/* Floating Holographic Telemetry Pill Appearing on Hover */}
                    <div
                      className={`royal-sheen absolute -bottom-9 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/92 backdrop-blur-md border border-amber-400 text-amber-200 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shadow-[0_0_25px_rgba(245,158,11,0.7)] ${
                        isHovered
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <Sparkles size={11} className="text-amber-400" />
                      <span>INSPECT // {cube.name.split(" ")[0]}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* 4. Mobile / Small Screen Card Grid (< 768px) */}
      <div className="md:hidden relative z-10 px-4 py-6 grid grid-cols-2 gap-3">
        {techCubes.map((cube) => (
          <button
            key={cube.id}
            onClick={() => setSelectedCube(cube)}
            className="p-3.5 rounded-xl border border-amber-500/35 bg-[#120407]/92 text-left backdrop-blur-xl shadow-lg active:scale-95 transition-all focus-royal"
          >
            <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400 block truncate">
              {cube.categoryLabel}
            </span>
            <h3 className="text-sm font-bold text-white font-sans mt-0.5 truncate">
              {cube.name}
            </h3>
            <span className="text-[10px] font-mono text-gray-400 mt-2 flex items-center justify-between">
              <span>Inspect Spec →</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
            </span>
          </button>
        ))}
      </div>

      {/* 5. Bottom Interactive Scanner & Category Filter Bar */}
      <div className="relative z-20 pb-4 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl border border-amber-500/30 bg-[#0e0306]/94 backdrop-blur-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(200,56,43,0.25)]">
          {/* Active Status Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-amber-200/80">
            <Flame size={14} className="text-red-500 animate-pulse" />
            <span className="font-bold text-white">ORBIT TELEMETRY:</span>
            <span>12 Core Production Runtimes Active</span>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            {[
              { id: "all", label: "All Runtimes (12)" },
              { id: "cloud", label: "Cloud & DevOps (4)" },
              { id: "backend", label: "Backend & Systems (5)" },
              { id: "systems", label: "VCS & Host OS (3)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all active:scale-[0.98] focus-royal ${
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
      </div>

      {/* 6. Cinematic Tech Inspector Modal */}
      <AnimatePresence>
        {selectedCube && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCube(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl flex flex-col rounded-2xl border border-amber-500/50 bg-[#0e0306] shadow-[0_0_60px_rgba(200,56,43,0.4)] overflow-hidden text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block">
                      TECH SPEC // {selectedCube.categoryLabel}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-[Anton] uppercase text-white leading-tight">
                      {selectedCube.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCube(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors focus-royal"
                  aria-label="Close tech inspector"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                {/* Role & Level Pill */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs uppercase tracking-wider">
                    ROLE: {selectedCube.role}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs uppercase tracking-wider">
                    LEVEL: {selectedCube.level}
                  </span>
                </div>

                {/* Narrative Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-2">
                    Architectural Overview
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {selectedCube.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-3">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCube.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
                      >
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                          {spec.label}
                        </span>
                        <span className="text-sm font-mono font-bold text-amber-100 mt-0.5 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Deployments */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 mb-3">
                    Production Deployments & Workloads
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCube.deployments.map((dep) => (
                      <span
                        key={dep}
                        className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-200 font-mono text-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={12} className="text-amber-400" />
                        <span>{dep}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-[#070103] flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">
                  Status: Verified Production Capability
                </span>

                <button
                  onClick={() => setSelectedCube(null)}
                  className="royal-sheen px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-[0.98] focus-royal"
                >
                  Done Inspecting
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
