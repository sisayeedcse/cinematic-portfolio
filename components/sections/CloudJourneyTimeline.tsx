"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cloudJourney, journeyStatusConfig, JourneyStep } from "@/data/cloudJourney";
import {
  Terminal,
  Network,
  Cloud,
  Cpu,
  GitBranch,
  Container,
  Activity,
  Server,
  ShieldCheck,
  CheckCircle2,
  CircleDot,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CornerDownRight,
  Layers,
} from "lucide-react";

// Technical blueprint snippet for each milestone
const milestoneTechData: Record<
  string,
  {
    icon: typeof Terminal;
    codeLang: string;
    terminalCmd: string;
    terminalOutput: string[];
    competencies: string[];
    stats: { label: string; value: string }[];
  }
> = {
  "linux-systems": {
    icon: Terminal,
    codeLang: "bash",
    terminalCmd: "sayeed@srv-core:~$ systemctl status nginx --no-pager",
    terminalOutput: [
      "● nginx.service - High Performance Web & Proxy Server",
      "   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)",
      "   Active: active (running) | Memory: 32.4M | Tasks: 4 (limit: 4915)",
      "   Process: 1042 ExecStart=/usr/sbin/nginx -g daemon on; (code=exited, status=0/SUCCESS)",
      "   Main PID: 1043 (nginx: master process /usr/sbin/nginx)",
    ],
    competencies: [
      "Bash & POSIX Scripting",
      "Systemd Daemons & Services",
      "File Systems & Mounts (ext4)",
      "User / Group Permissions",
      "Process Management (ps / top / kill)",
      "SSH Hardening & Key Auth",
    ],
    stats: [
      { label: "OS Core", value: "Ubuntu 24.04 LTS" },
      { label: "Kernel", value: "Linux 6.8.0" },
      { label: "Shell", value: "GNU Bash 5.2" },
    ],
  },
  networking: {
    icon: Network,
    codeLang: "network",
    terminalCmd: "sayeed@srv-core:~$ curl -Iv https://sayeed.cloud/api/v1/health",
    terminalOutput: [
      "* Trying 10.0.4.15:443...",
      "* Connected to sayeed.cloud (10.0.4.15) port 443",
      "* TLSv1.3 (OUT), TLS handshake, Client hello (1):",
      "* TLSv1.3 (IN), TLS handshake, Server hello (2):",
      "* TLSv1.3 (IN), Certificate: CN=sayeed.cloud, O=CloudPKI",
      "< HTTP/2 200 OK | Content-Type: application/json; charset=utf-8",
    ],
    competencies: [
      "TCP/IP 4-Layer Architecture",
      "DNS Record Resolution (A, CNAME, MX)",
      "CIDR IPv4 Subnetting & Routing",
      "HTTP/2 & TLS 1.3 Cryptography",
      "Firewalls & Packet Filtering (ufw/iptables)",
      "VPC Peering & NAT Gateways",
    ],
    stats: [
      { label: "Protocol", value: "TCP/IP & UDP" },
      { label: "Encrypted", value: "TLS 1.3 / HTTPS" },
      { label: "Subnet", value: "10.0.0.0/16 VPC" },
    ],
  },
  "cloud-fundamentals": {
    icon: Cloud,
    codeLang: "cloud-spec",
    terminalCmd: "sayeed@srv-core:~$ aws sts get-caller-identity",
    terminalOutput: [
      "{",
      '  "UserId": "AIDASAYEEDIBNESAIF01",',
      '  "Account": "849204918231",',
      '  "Arn": "arn:aws:iam::849204918231:user/sayeed-cloud-engineer"',
      "}",
      "# Architecture: Multi-AZ Resilient Tier across us-east-1a, us-east-1b",
    ],
    competencies: [
      "AWS Core IAM & Principle of Least Privilege",
      "VPC Topology & Route Tables",
      "EC2 Elastic Compute & Auto Scaling",
      "S3 Object Lifecycle & Versioning",
      "CloudWatch Metrics & Alarms",
      "Shared Responsibility Security Model",
    ],
    stats: [
      { label: "Provider", value: "Amazon Web Services" },
      { label: "Design", value: "Multi-AZ Fault Tolerant" },
      { label: "Access", value: "IAM RBAC Enforcement" },
    ],
  },
  "git-github": {
    icon: GitBranch,
    codeLang: "git",
    terminalCmd: "sayeed@srv-core:~$ git log -1 --stat",
    terminalOutput: [
      "commit 8e4b2d19f (HEAD -> main, origin/main)",
      "Author: Sayeed Ibne Saif <sayeed@cloud.dev>",
      "Date:   Wed Mar 11 18:24:00 2026 +0600",
      "    feat(infra): provision production cluster via IaC",
      " 4 files changed, 218 insertions(+), 12 deletions(-)",
    ],
    competencies: [
      "Trunk-Based & GitFlow Branching",
      "Semantic Commit & Release Tagging",
      "Pull Request Architecture Reviews",
      "Merge Conflict Resolution",
      "GPG Commit Signing",
      "Submodules & Monorepo Tooling",
    ],
    stats: [
      { label: "VCS", value: "Git 2.45+" },
      { label: "Host", value: "GitHub Enterprise" },
      { label: "Security", value: "GPG Verified Commits" },
    ],
  },
  containers: {
    icon: Container,
    codeLang: "dockerfile",
    terminalCmd: "sayeed@srv-core:~$ docker compose up -d --build",
    terminalOutput: [
      "[+] Building 4.2s (14/14) FINISHED",
      " => [internal] load build definition from Dockerfile",
      " => => naming to docker.io/sayeed/microservice:v2.4.0",
      "[+] Running 3/3",
      " ✔ Network edge-bridge        Created",
      " ✔ Container gateway-proxy-1  Started",
      " ✔ Container api-service-1    Started",
    ],
    competencies: [
      "Multi-Stage OCI Builds (Alpine/Scratch)",
      "Docker Compose Production Stacks",
      "Layer Caching & Minimal Images",
      "Container Volume Mounts & Data Persistence",
      "Container Networking & Service Discovery",
      "Non-Root User Container Hardening",
    ],
    stats: [
      { label: "Engine", value: "Docker / containerd" },
      { label: "Format", value: "OCI Compliant" },
      { label: "Base Size", value: "< 24MB Stripped" },
    ],
  },
  iac: {
    icon: Cpu,
    codeLang: "hcl",
    terminalCmd: "sayeed@srv-core:~$ terraform apply -auto-approve",
    terminalOutput: [
      "aws_vpc.production: Creating...",
      "aws_subnet.public[0]: Creating...",
      "aws_security_group.ingress: Creation complete after 3s",
      "Apply complete! Resources: 14 added, 0 changed, 0 destroyed.",
      "Outputs:",
      '  cluster_endpoint = "https://k8s-prod.sayeed.cloud"',
    ],
    competencies: [
      "Terraform HCL Declarative Architecture",
      "S3 Remote State with DynamoDB Locking",
      "Reusable Modular Infrastructure Patterns",
      "State Drift Detection & Remediation",
      "Environment Parity (dev / staging / prod)",
      "Infrastructure Compliance as Code",
    ],
    stats: [
      { label: "IaC Engine", value: "Terraform 1.8+" },
      { label: "State", value: "Encrypted S3 Remote" },
      { label: "Locking", value: "AWS DynamoDB" },
    ],
  },
  "ci-cd": {
    icon: Activity,
    codeLang: "yaml",
    terminalCmd: "sayeed@srv-core:~$ gh run list --workflow=deploy.yml -L 1",
    terminalOutput: [
      "STATUS    TITLE                      WORKFLOW    BRANCH  EVENT",
      "✔ 2814    ci: build, test & deploy   Pipeline    main    push",
      "Elapsed: 1m 42s | 3 jobs (lint, security-scan, deploy-prod) SUCCESS",
    ],
    competencies: [
      "GitHub Actions Declarative Workflows",
      "Automated Unit / Integration Testing",
      "Container Image Scanning (Trivy)",
      "Zero-Downtime Rolling Deployments",
      "Secret Management with OIDC Auth",
      "Canary & Blue/Green Releases",
    ],
    stats: [
      { label: "CI/CD", value: "GitHub Actions" },
      { label: "Scan", value: "SAST & Trivy OCI" },
      { label: "Auth", value: "AWS OIDC (Zero-Secret)" },
    ],
  },
  monitoring: {
    icon: Server,
    codeLang: "promql",
    terminalCmd: "sayeed@srv-core:~$ promtool query instant http://localhost:9090 'up'",
    terminalOutput: [
      '{instance="api.sayeed.cloud:443", job="cluster-ingress"} => 1 @[1741700000]',
      '{instance="pg-cluster:5432", job="database-pool"} => 1 @[1741700000]',
      'query: rate(http_requests_total{status=~"5.."}[5m]) => 0.0000 ops/sec',
    ],
    competencies: [
      "Prometheus Pull-Based Metric Scraping",
      "Grafana Spatial Dashboard Design",
      "Centralized Log Aggregation (Loki)",
      "Service Level Indicators & SLO Rules",
      "Proactive Alertmanager Pager Alerts",
      "Distributed Tracing (OpenTelemetry)",
    ],
    stats: [
      { label: "Metrics", value: "Prometheus v2.52" },
      { label: "Visuals", value: "Grafana Cloud" },
      { label: "SLO Target", value: "99.95% Availability" },
    ],
  },
  kubernetes: {
    icon: ShieldCheck,
    codeLang: "k8s-manifest",
    terminalCmd: "sayeed@srv-core:~$ kubectl get pods -n production -o wide",
    terminalOutput: [
      "NAME                          READY   STATUS    RESTARTS   AGE    IP",
      "sayeed-cloud-api-79b8c-x4q2   1/1     Running   0          18d    10.244.1.18",
      "sayeed-cloud-api-79b8c-m9d8   1/1     Running   0          18d    10.244.2.44",
      "ingress-nginx-controller-0    1/1     Running   0          42d    10.244.0.12",
    ],
    competencies: [
      "Pod Lifecycle & StatefulSets",
      "Declarative Ingress & TLS Termination",
      "ConfigMaps & External Secret Stores",
      "Horizontal Pod Autoscaling (HPA)",
      "RBAC Policies & ClusterRoles",
      "GitOps Continuous Deployment (ArgoCD)",
    ],
    stats: [
      { label: "Orchestrator", value: "Kubernetes v1.30" },
      { label: "CNI", value: "Cilium eBPF" },
      { label: "GitOps", value: "ArgoCD Synced" },
    ],
  },
};

// Map each node along an elliptical trajectory arc
function getNodePos(index: number, total: number) {
  const t = index / (total - 1); // 0 to 1
  const x = 0.06 + t * 0.88;
  const arcHeight = 0.52;
  const y = 0.72 - Math.sin(t * Math.PI) * arcHeight;
  return { x, y };
}

export default function CloudJourneyTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const current: JourneyStep = cloudJourney[activeStep];
  const tech = milestoneTechData[current.id] || milestoneTechData["linux-systems"];
  const StepIcon = tech.icon;

  const nextStep = useCallback(() => {
    setDirection(1);
    setActiveStep((prev) => (prev + 1) % cloudJourney.length);
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setActiveStep((prev) => (prev - 1 + cloudJourney.length) % cloudJourney.length);
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      setDirection(index > activeStep ? 1 : -1);
      setActiveStep(index);
    },
    [activeStep]
  );

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextStep();
      if (e.key === "ArrowLeft") prevStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep, prevStep]);

  const activePos = getNodePos(activeStep, cloudJourney.length);

  return (
    <section
      id="journey"
      className="relative min-h-[100svh] py-24 sm:py-32 px-4 sm:px-6 md:px-10 bg-[#060204] text-white flex flex-col justify-between overflow-hidden border-t border-amber-500/20 select-none"
      aria-labelledby="journeyTitle"
    >
      {/* 1. Volumetric Digital Stage Lighting & Perspective Grid (Royal Theme) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 50% at 50% 25%, rgba(200, 56, 43, 0.22) 0%, transparent 75%),
              radial-gradient(circle 380px at 50% 65%, rgba(212, 175, 55, 0.12) 0%, transparent 100%)
            `,
          }}
        />

        {/* Perspective grid floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-[48%] origin-bottom"
          style={{
            perspective: "600px",
            background:
              "linear-gradient(to top, rgba(212, 175, 55, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(200, 56, 43, 0.09) 1px, transparent 1px)",
            backgroundSize: "60px 40px",
            transform: "rotateX(62deg)",
            maskImage: "linear-gradient(to top, black 15%, transparent 95%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-grow">
        {/* 2. Editorial Top Header + Flight Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
                Scene 03 // The Trajectory
              </p>
            </div>
            <h2
              id="journeyTitle"
              className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none uppercase font-[Anton] text-white"
            >
              A Journey Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-red-500">
                Cloud
              </span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-xl font-sans tracking-wide">
              Interactive flight deck tracing systems foundation, networking protocols, automation, and distributed cloud architecture.
            </p>
          </div>

          {/* Telemetry Indicator */}
          <div className="hidden lg:flex flex-col items-end gap-1 font-mono text-[11px] text-gray-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-amber-500/30 backdrop-blur-md">
              <span className="text-amber-400 font-semibold">[ TRAJECTORY BEACON ]</span>
              <span className="text-amber-200">
                NODE 0{current.index} / 0{cloudJourney.length}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  current.status === "completed"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : current.status === "building"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : current.status === "learning"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    : "bg-red-500/20 text-red-400 border border-red-500/40"
                }`}
              >
                {journeyStatusConfig[current.status].label}
              </span>
            </div>
            <span className="text-[10px] text-amber-500/70 tracking-wider">
              KEYBOARD: USE ← / → ARROWS TO NAVIGATE
            </span>
          </div>
        </div>

        {/* 3. The Kinetic Trajectory Rail (Curved Arc with Royal Gold & Red Energy Beam) */}
        <div className="relative w-full h-32 sm:h-36 mb-6 sm:mb-8 flex items-center justify-center">
          {/* SVG Arc Geometry */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 1000 130"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#dc2626" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="70%" stopColor="#dc2626" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.3" />
              </linearGradient>

              <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base curved track */}
            <path
              d="M 60 95 Q 500 15 940 95"
              fill="none"
              stroke="rgba(212, 175, 55, 0.15)"
              strokeWidth="2"
              strokeDasharray="4 6"
            />

            {/* Active glowing segment line */}
            <path
              d="M 60 95 Q 500 15 940 95"
              fill="none"
              stroke="url(#arcGlow)"
              strokeWidth="3.5"
              className="filter drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]"
            />

            {/* Vertical energy beam dropped onto the active milestone */}
            <line
              x1={activePos.x * 1000}
              y1={activePos.y * 130}
              x2={activePos.x * 1000}
              y2={130}
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeDasharray="3 3"
              className="animate-pulse"
              opacity="0.9"
            />
          </svg>

          {/* 9 Orbital Interactive Milestone Nodes */}
          <div className="absolute inset-0 flex justify-between items-center px-2 sm:px-6">
            {cloudJourney.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = idx < activeStep;
              const pos = getNodePos(idx, cloudJourney.length);

              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(idx)}
                  style={{
                    position: "absolute",
                    left: `${pos.x * 100}%`,
                    top: `${pos.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="group relative z-20 flex flex-col items-center focus:outline-none"
                  aria-label={`Milestone 0${step.index}: ${step.title}`}
                >
                  {/* Outer Pulsing Halo when active */}
                  {isActive && (
                    <motion.div
                      layoutId="nodeHalo"
                      className="absolute -inset-2.5 rounded-full bg-amber-400/40 blur-[6px] animate-ping pointer-events-none"
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  )}

                  {/* Node Circle */}
                  <div
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-amber-300 via-rose-500 to-red-700 text-white shadow-[0_0_24px_rgba(245,158,11,1)] scale-110 sm:scale-125 border-2 border-amber-200 ring-4 ring-amber-500/40"
                        : isPast
                        ? "bg-[#18060a] text-amber-300 border border-amber-500/40 hover:border-amber-400 hover:scale-110 shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                        : "bg-[#0e0406] text-gray-500 border border-white/10 hover:border-amber-500/30 hover:text-gray-300 hover:scale-105"
                    }`}
                  >
                    0{step.index}
                  </div>

                  {/* Subtitle tag below the node */}
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider mt-1.5 transition-all text-center max-w-[70px] truncate ${
                      isActive
                        ? "text-amber-300 font-bold scale-105 drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]"
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {step.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. The 3D Spatial Milestone Deck (Master Stage) */}
        <div className="relative w-full mb-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 80 : -80,
                scale: 0.96,
                rotateY: direction > 0 ? 6 : -6,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                rotateY: 0,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -80 : 80,
                scale: 0.96,
                rotateY: direction > 0 ? -6 : 6,
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#18070b]/95 via-[#0e0306]/98 to-[#050102]/98 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(200,56,43,0.3)] p-6 sm:p-8 md:p-10 overflow-hidden"
            >
              {/* Giant ambient watermark numeral */}
              <span
                className="absolute right-4 sm:right-10 bottom-2 text-7xl sm:text-9xl md:text-[160px] font-black font-[Anton] text-white/[0.03] select-none pointer-events-none leading-none"
                aria-hidden="true"
              >
                0{current.index}
              </span>

              {/* Corner tech lines */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 w-2 h-14 bg-gradient-to-b from-amber-400 to-red-600" />

              {/* Card Header Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 block">
                      MILESTONE 0{current.index} // 0{cloudJourney.length}
                    </span>
                    <span className="text-xs text-amber-200/80 font-mono tracking-wider">
                      PHASE: {current.subtitle.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 ${
                      current.status === "completed"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                        : current.status === "building"
                        ? "bg-rose-500/15 text-rose-300 border border-rose-500/40"
                        : current.status === "learning"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/40"
                        : "bg-red-500/15 text-red-300 border border-red-500/40"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        current.status === "completed"
                          ? "bg-emerald-400"
                          : current.status === "building"
                          ? "bg-rose-400 animate-pulse"
                          : current.status === "learning"
                          ? "bg-amber-400 animate-pulse"
                          : "bg-red-400"
                      }`}
                    />
                    {journeyStatusConfig[current.status].label}
                  </span>
                </div>
              </div>

              {/* Title & Core Overview */}
              <div className="mb-6 relative z-10">
                <h3 className="font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight font-[Anton] text-white">
                  {current.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed font-sans">
                  {current.description}
                </p>
              </div>

              {/* Two Column Technical Breakdown: Terminal Output + Competency Chips */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 mb-8">
                {/* Left: Terminal Output Shell */}
                <div className="lg:col-span-7 rounded-xl bg-[#080204] border border-amber-500/20 p-4 font-mono text-xs overflow-hidden shadow-inner">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] text-gray-500 ml-2 tracking-wider">
                        cloud-kernel // vty01
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-400/80 uppercase">
                      [{tech.codeLang}]
                    </span>
                  </div>

                  {/* Terminal Command Execution */}
                  <div className="text-amber-200 font-semibold mb-2 flex items-center gap-1.5">
                    <span className="text-red-400">❯</span>
                    <span>{tech.terminalCmd}</span>
                  </div>

                  {/* Terminal Log Lines */}
                  <div className="space-y-1 text-gray-400 text-[11px] leading-relaxed overflow-x-auto no-scrollbar">
                    {tech.terminalOutput.map((line, lIdx) => (
                      <p
                        key={lIdx}
                        className={
                          line.startsWith("✔") || line.startsWith("●") || line.startsWith("Apply complete")
                            ? "text-emerald-400/90 font-medium"
                            : line.startsWith("*") || line.startsWith("=>")
                            ? "text-amber-300/80"
                            : line.startsWith("#")
                            ? "text-rose-400/90 italic"
                            : "text-gray-300"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right: Competencies & Architectural Telemetry */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                  {/* Competency Chips */}
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Key Competencies & Protocols
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.competencies.map((comp) => (
                        <span
                          key={comp}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-gray-300 text-xs font-mono hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-200 transition-colors"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architectural Telemetry Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.08]">
                    {tech.stats.map((st) => (
                      <div
                        key={st.label}
                        className="p-2.5 rounded-lg bg-white/[0.02] border border-amber-500/10"
                      >
                        <p className="text-[9px] font-mono uppercase tracking-wider text-gray-500">
                          {st.label}
                        </p>
                        <p className="text-xs font-mono font-semibold text-amber-100 mt-0.5 truncate">
                          {st.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Interactive Scrubbing & Directional Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08] relative z-10">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 text-xs font-mono tracking-wider transition-all hover:text-amber-200 active:scale-[0.98] focus-royal"
                >
                  <ChevronLeft className="w-4 h-4" />
                  PREVIOUS
                </button>

                {/* 9 Segmented Progress Bar */}
                <div className="flex items-center gap-1.5">
                  {cloudJourney.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => goToStep(pIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 active:scale-95 focus-royal ${
                        pIdx === activeStep
                          ? "w-8 bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                          : pIdx < activeStep
                          ? "w-3 bg-red-800/60 hover:bg-red-700"
                          : "w-3 bg-white/10 hover:bg-white/25"
                      }`}
                      aria-label={`Jump to milestone 0${pIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  className="royal-sheen flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-[0.98] focus-royal"
                >
                  NEXT MILESTONE
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 5. Editorial Footer Notes */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-gray-500 pt-2 tracking-widest uppercase">
          <span>[ SYSTEMS MINDSET · DISTRIBUTED RESILIENCE ]</span>
          <span className="hidden sm:inline">MMXXVI // SAYEED IBNE SAIF</span>
          <span>[ STAGE: 03 / 07 — CLOUD TRAJECTORY ]</span>
        </div>
      </div>
    </section>
  );
}