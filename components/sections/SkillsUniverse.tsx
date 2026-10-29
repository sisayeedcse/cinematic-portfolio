"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextEngine from "spring-text-engine";
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
  ChevronDown,
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
  // ── Left Arc: Operating Systems, Cloud, Databases & Web Runtimes ──
  {
    id: "linux",
    name: "Linux (Kernel & POSIX)",
    category: "systems",
    categoryLabel: "Operating Systems & Kernels",
    left: "14.8%",
    top: "17.5%",
    width: "6.8%",
    height: "11.5%",
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
    id: "ubuntu",
    name: "Ubuntu Server 24.04 LTS",
    category: "systems",
    categoryLabel: "Server Distributions",
    left: "22.5%",
    top: "14.0%",
    width: "6.8%",
    height: "11.5%",
    role: "Enterprise Linux Distribution",
    level: "Production Server OS",
    description:
      "Long Term Support Ubuntu environments, package management with APT, UFW firewall configurations, and system logging.",
    deployments: ["Production Cloud Instances", "UFW Firewall Hardening", "APT Repositories", "Journalctl Telemetry"],
    specs: [
      { label: "Distro", value: "Ubuntu 24.04 LTS" },
      { label: "Kernel", value: "Linux 6.8+" },
    ],
  },
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    category: "cloud",
    categoryLabel: "Cloud Computing & Infrastructure",
    left: "31.5%",
    top: "7.5%",
    width: "7.5%",
    height: "12.5%",
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
    id: "database",
    name: "SQLite & Database Architecture",
    category: "backend",
    categoryLabel: "Embedded & Relational Databases",
    left: "22.2%",
    top: "27.5%",
    width: "7.8%",
    height: "13.5%",
    role: "Serverless Embedded Storage",
    level: "Embedded & ACID Transactions",
    description:
      "High-performance local zero-configuration SQL database engines with ACID transaction safety, write-ahead logging (WAL), and optimized query schemas.",
    deployments: ["Embedded Systems", "WAL Mode Pipelines", "Schema Migrations", "ACID Data Safety"],
    specs: [
      { label: "Engine", value: "SQLite 3" },
      { label: "Mode", value: "WAL / Multi-Threaded" },
    ],
  },
  {
    id: "mysql",
    name: "MySQL & MariaDB",
    category: "backend",
    categoryLabel: "Relational Database Engines",
    left: "10.2%",
    top: "32.0%",
    width: "6.8%",
    height: "11.5%",
    role: "Relational Data Management",
    level: "Production Schema & Query Tuning",
    description:
      "Relational schema modeling, indexing strategies, slow query optimization, transactional guarantees (ACID), and automated backups.",
    deployments: ["Production E-Commerce", "InnoDB Engine", "Foreign Key Constraints", "Automated SQL Dumps"],
    specs: [
      { label: "Engine", value: "InnoDB / MySQL 8" },
      { label: "Integrity", value: "ACID Guaranteed" },
    ],
  },
  {
    id: "firebase",
    name: "Firebase Cloud Services",
    category: "cloud",
    categoryLabel: "BaaS & Realtime Systems",
    left: "8.5%",
    top: "48.5%",
    width: "6.8%",
    height: "11.5%",
    role: "Serverless Backend & Realtime Sync",
    level: "Mobile & Web Cloud Backends",
    description:
      "Cloud Firestore, Firebase Authentication, Cloud Storage, and push notifications for mobile and web applications.",
    deployments: ["Android App Sync", "Firestore Rules", "OAuth Identity", "Cloud Functions"],
    specs: [
      { label: "Database", value: "Cloud Firestore" },
      { label: "Sync", value: "Realtime WebSocket" },
    ],
  },
  {
    id: "laravel",
    name: "Laravel Framework",
    category: "backend",
    categoryLabel: "Enterprise MVC Web Framework",
    left: "17.8%",
    top: "44.5%",
    width: "6.8%",
    height: "11.5%",
    role: "Full-Stack Web Systems & POS",
    level: "Enterprise Production",
    description:
      "Architected complete commercial platforms including Amazing Laundry POS (Qatar) and Gadgetexa Labs with Eloquent ORM, queues, and REST APIs.",
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
    left: "25.5%",
    top: "45.5%",
    width: "7.5%",
    height: "12.5%",
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
  {
    id: "python",
    name: "Python 3",
    category: "backend",
    categoryLabel: "Scripting & Automation",
    left: "14.5%",
    top: "61.5%",
    width: "6.8%",
    height: "11.5%",
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
    left: "22.5%",
    top: "61.5%",
    width: "7.5%",
    height: "12.5%",
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

  // ── Right Arc: Containers, IaC, CI/CD, Git & Low-Level Systems ──
  {
    id: "docker",
    name: "Docker (Containers)",
    category: "cloud",
    categoryLabel: "Containerization & Microservices",
    left: "56.0%",
    top: "7.5%",
    width: "7.8%",
    height: "12.5%",
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
    id: "kubernetes",
    name: "Kubernetes (K8s)",
    category: "cloud",
    categoryLabel: "Container Orchestration",
    left: "65.5%",
    top: "10.5%",
    width: "7.8%",
    height: "12.5%",
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
    id: "terraform",
    name: "Terraform (IaC)",
    category: "cloud",
    categoryLabel: "Infrastructure as Code",
    left: "75.5%",
    top: "15.0%",
    width: "7.8%",
    height: "12.5%",
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
    id: "devops",
    name: "DevOps & Release Automation",
    category: "cloud",
    categoryLabel: "Continuous Delivery & Reliability",
    left: "69.0%",
    top: "27.0%",
    width: "7.5%",
    height: "12.5%",
    role: "CI/CD Orchestration & Release Engineering",
    level: "Production Delivery",
    description:
      "End-to-end continuous integration and deployment pipelines, automated rollouts, health check probes, and infrastructure testing.",
    deployments: ["Automated Release Tagging", "Smoke Tests", "Blue/Green Strategy", "Telemetry Alerts"],
    specs: [
      { label: "Methodology", value: "GitOps / Trunk" },
      { label: "Automation", value: "100% Declarative" },
    ],
  },
  {
    id: "terminal",
    name: "Bash & POSIX Command Line",
    category: "systems",
    categoryLabel: "Shells & Command Line Fluency",
    left: "77.5%",
    top: "31.5%",
    width: "6.8%",
    height: "11.5%",
    role: "System Automation & Shell Scripting",
    level: "Daily Driver",
    description:
      "Advanced Bash shell scripting, POSIX utilities (awk, sed, grep, find, xargs), cron daemons, pipe streaming, and system automation.",
    deployments: ["Backup Automation", "Log Analysis Scripts", "Cron Daemons", "Server Provisioning"],
    specs: [
      { label: "Shell", value: "GNU Bash 5.2" },
      { label: "Standard", value: "POSIX Compliant" },
    ],
  },
  {
    id: "git",
    name: "Git (VCS)",
    category: "systems",
    categoryLabel: "Version Control & Branching",
    left: "72.0%",
    top: "42.5%",
    width: "6.8%",
    height: "11.5%",
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
    id: "github",
    name: "GitHub & Actions CI/CD",
    category: "systems",
    categoryLabel: "DevOps & Collaboration",
    left: "84.5%",
    top: "42.0%",
    width: "6.8%",
    height: "11.5%",
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
    id: "javascript",
    name: "JavaScript & TypeScript",
    category: "backend",
    categoryLabel: "Modern Web Programming",
    left: "65.0%",
    top: "59.5%",
    width: "6.8%",
    height: "11.5%",
    role: "Asynchronous Web Applications",
    level: "Fullstack Architecture",
    description:
      "Modern ESNext, TypeScript strict type safety, asynchronous event loop patterns, DOM optimization, and Next.js React integration.",
    deployments: ["Next.js App Router", "Node.js Daemons", "Strict TypeScript", "Tailwind CSS"],
    specs: [
      { label: "Language", value: "TypeScript 5+" },
      { label: "Standard", value: "ECMAScript 2024" },
    ],
  },
  {
    id: "c",
    name: "C Programming Language",
    category: "systems",
    categoryLabel: "Low-Level Systems & Memory",
    left: "73.5%",
    top: "59.5%",
    width: "6.8%",
    height: "11.5%",
    role: "Systems Programming & Pointer Arithmetic",
    level: "Academic & Systems Foundation",
    description:
      "Pointer arithmetic, manual dynamic memory management (malloc/free), buffer safety, file descriptors, and systems architecture.",
    deployments: ["Academic Algorithms", "Data Structures", "System Calls", "Kernel Fundamentals"],
    specs: [
      { label: "Standard", value: "C17 / C23" },
      { label: "Compiler", value: "GCC / Clang" },
    ],
  },
  {
    id: "cpp",
    name: "C++ (High-Performance)",
    category: "systems",
    categoryLabel: "Object-Oriented & Performance Systems",
    left: "83.5%",
    top: "59.5%",
    width: "6.8%",
    height: "11.5%",
    role: "High-Performance Systems & OOP",
    level: "Academic & Computational Algorithms",
    description:
      "Object-oriented programming, STL template libraries, RAII memory idioms, references, and high-performance algorithmic problem solving.",
    deployments: ["Competitive Algorithms", "STL Containers", "RAII Patterns", "Computational Models"],
    specs: [
      { label: "Standard", value: "C++20" },
      { label: "Paradigms", value: "Generic / OOP / RAII" },
    ],
  },
];

export default function SkillsUniverse() {
  const [selectedCube, setSelectedCube] = useState<TechCube | null>(null);
  const [hoveredCube, setHoveredCube] = useState<TechCube | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 6, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToAcademic = () => {
    const el = document.getElementById("academic");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="skills"
      className="relative min-h-[100svh] bg-[#050102] text-white flex flex-col justify-between overflow-hidden select-none border-t border-amber-500/20"
      aria-labelledby="skillsTitle"
    >
      {/* ── 1. Top Cinema Header Bar ── */}
      <header className="relative z-20 pt-24 sm:pt-28 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono">
              Scene 02 // Core Competencies
            </p>
          </div>
          <TextEngine
            tag="h2"
            mode="once"
            lineOut={{ opacity: 0, filter: "blur(10px)" }}
            lineIn={{ opacity: 1, filter: "blur(0px)" }}
            lineConfig={{ tension: 190, friction: 26 }}
            lineStagger={90}
            id="skillsTitle"
            className="font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none uppercase font-[Anton]"
            style={{ justifyContent: "flex-start" }}
          >
            The Tech Universe
          </TextEngine>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-1.5 max-w-lg font-sans tracking-wide">
            Kinetic 3D zero-gravity constellation. 20 interactive holographic nodes mapped to live production stacks.
          </p>
        </div>

        {/* Live Orbit Status Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black/75 border border-amber-500/35 backdrop-blur-md shadow-[0_0_20px_rgba(200,56,43,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-200/90 font-bold">
            ZERO-G DRIFT // 20 NODES ACTIVE
          </span>
        </div>
      </header>

      {/* ── 2. The 3D Constellation Kinetic Stage with Mouse Parallax & Harmonic Float ── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1200px" }}
        className="relative z-10 w-full max-w-[1920px] mx-auto flex-1 hidden md:flex items-center justify-center my-auto aspect-[1024/576] px-4"
      >
        {/* Kinetic 3D Tilt Wrapper */}
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full h-full"
        >
          {/* Continuous Harmonic Floating Motion */}
          <motion.div
            animate={{
              y: [-6, 6, -6],
              rotateZ: [-0.3, 0.3, -0.3],
              scale: [1.005, 1.018, 1.005],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            {/* The Master Royal Artwork */}
            <img
              src="/media/skills-universe-royal-bg.jpg"
              alt="The Tech Universe — Sayeed Ibne Saif"
              className="w-full h-full object-cover object-center select-none filter contrast-105 brightness-100 pointer-events-none rounded-2xl"
              loading="eager"
            />

            {/* Ambient Volumetric Royal Crimson & Amber Breathing Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse 75% 55% at 50% 48%, rgba(220, 38, 38, 0.35) 0%, rgba(212, 175, 55, 0.14) 40%, transparent 75%)",
              }}
              aria-hidden="true"
            />

            {/* Top & Bottom Cinematic Vignette Feathering */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050102] via-[#050102]/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#050102] via-[#050102]/70 to-transparent pointer-events-none" />

            {/* 20 Interactive 3D Tech Station Hotspots */}
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
                          ? "border-2 border-amber-400 bg-amber-500/20 shadow-[0_0_35px_rgba(245,158,11,0.95),inset_0_0_20px_rgba(220,38,38,0.45)] scale-[1.08]"
                          : matchesFilter && activeFilter !== "all"
                          ? "border border-amber-500/70 bg-red-950/25 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse"
                          : "border border-transparent hover:border-amber-400/50"
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
                      className={`royal-sheen absolute -bottom-9 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/94 backdrop-blur-md border border-amber-400 text-amber-200 font-mono text-[9.5px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shadow-[0_0_25px_rgba(245,158,11,0.8)] ${
                        isHovered
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <Sparkles size={11} className="text-amber-400" />
                      <span>{cube.name.split(" ")[0]} // SPEC</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── 3. Mobile / Small Screen Card Grid (< 768px) ── */}
      <div className="md:hidden relative z-10 px-4 py-8 grid grid-cols-2 gap-3 max-w-xl mx-auto">
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

      {/* ── 4. Bottom Interactive Scanner & Category Filter Bar ── */}
      <div className="relative z-20 pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col gap-3">
        <div className="rounded-2xl border border-amber-500/30 bg-[#0e0306]/94 backdrop-blur-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(200,56,43,0.25)]">
          {/* Active Status Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-amber-200/80">
            <Flame size={14} className="text-red-500 animate-pulse" />
            <span className="font-bold text-white">ORBIT TELEMETRY:</span>
            <span>20 Production Runtimes Online</span>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            {[
              { id: "all", label: "All Runtimes (20)" },
              { id: "cloud", label: "Cloud & DevOps (5)" },
              { id: "backend", label: "Backend & DBs (7)" },
              { id: "systems", label: "Systems & Kernels (8)" },
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

        {/* Scroll Cue to Academic Foundation */}
        <div className="flex justify-center pt-1">
          <button
            onClick={scrollToAcademic}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 hover:bg-red-950/70 border border-amber-500/30 text-amber-200/80 hover:text-white font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span>SCROLL TO ACADEMIC FOUNDATION</span>
            <ChevronDown size={12} className="text-amber-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ── 5. Cinematic Tech Inspector Modal ── */}
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
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors focus-royal cursor-pointer"
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
                  className="royal-sheen px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-[0.98] focus-royal cursor-pointer"
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
