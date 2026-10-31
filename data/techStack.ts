export type SkillCategory = "cloud-devops" | "languages" | "platforms-db";

export type TechItem = {
  id: string;
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  icon: string;
  invertDark?: boolean;
  role: string;
  level: string;
  description: string;
  tags: string[];
  specs: { label: string; value: string }[];
  featured?: boolean;
};

export const techCategories: { id: "all" | SkillCategory; label: string }[] = [
  { id: "all", label: "All Technologies (16)" },
  { id: "cloud-devops", label: "Cloud & DevOps (7)" },
  { id: "languages", label: "Core & Languages (5)" },
  { id: "platforms-db", label: "Platforms & Data (4)" },
];

export const techStack: TechItem[] = [
  // ── Cloud & DevOps (Priority) ──
  {
    id: "aws",
    name: "AWS",
    category: "cloud-devops",
    categoryLabel: "Cloud Computing & Architecture",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    invertDark: true,
    role: "Multi-AZ Cloud Infrastructure",
    level: "Cloud Infrastructure Engineer",
    description: "Designing and operating resilient, production cloud services across EC2 compute, VPC subnets, S3 object storage, IAM governance, and CloudWatch telemetry.",
    tags: ["EC2 Compute", "VPC Networking", "S3 Storage", "IAM Governance"],
    specs: [
      { label: "Deployment", value: "Multi-AZ AWS" },
      { label: "Governance", value: "Least-Privilege IAM" },
    ],
    featured: true,
  },
  {
    id: "docker",
    name: "Docker",
    category: "cloud-devops",
    categoryLabel: "Containerization & Microservices",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    role: "OCI Container Packaging",
    level: "Production Containerization",
    description: "Engineering multi-stage minimal Dockerfile builds, layer caching, Docker Compose orchestrations, and container volume persistence for microservice workloads.",
    tags: ["Multi-Stage Builds", "Docker Compose", "containerd", "Minimal Alpine"],
    specs: [
      { label: "Runtime", value: "containerd / OCI" },
      { label: "Optimization", value: "Layer Cache Tuning" },
    ],
    featured: true,
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    categoryLabel: "Backend & Systems Programming",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    role: "Backend APIs & AI/Data Engineering",
    level: "Core Production Language",
    description: "Developing robust automation tooling, RESTful backend microservices, data processing pipelines, and AI/ML model integrations with Python 3.",
    tags: ["Python 3", "AsyncIO", "OOP Architecture", "Data Pipelines"],
    specs: [
      { label: "Standard", value: "PEP 8 / Type Hints" },
      { label: "Ecosystem", value: "FastAPI / PyTorch" },
    ],
    featured: true,
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "cloud-devops",
    categoryLabel: "Automated Pipelines & DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
    role: "Continuous Integration & Deployment",
    level: "Automated Release Systems",
    description: "Designing automated GitHub Actions & Jenkins delivery pipelines with unit test matrices, linting gates, automated container builds, and zero-downtime rollouts.",
    tags: ["GitHub Actions", "Release Automation", "Test Gates", "Zero-Downtime"],
    specs: [
      { label: "Pipelines", value: "Multi-Stage Workflows" },
      { label: "Security", value: "Secret Masking & OIDC" },
    ],
    featured: true,
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "cloud-devops",
    categoryLabel: "Container Orchestration",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
    role: "Cluster Orchestration & Pod Scaling",
    level: "Cloud Native Deployment",
    description: "Operating containerized workloads across K8s pods, ingress controllers, ConfigMaps, persistent volume claims, and horizontal pod autoscaling.",
    tags: ["Pod Lifecycle", "Ingress Controllers", "ConfigMaps", "HPA Scaling"],
    specs: [
      { label: "Cluster API", value: "v1.30+" },
      { label: "Networking", value: "CNI Ingress" },
    ],
    featured: true,
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "cloud-devops",
    categoryLabel: "Infrastructure as Code (IaC)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
    role: "Declarative Infrastructure Provisioning",
    level: "Automated Deployments",
    description: "Automating cloud provisioning with modular HashiCorp HCL templates, remote S3 state storage, and DynamoDB state locking.",
    tags: ["HCL Modules", "State Management", "VPC Automation", "Security Groups"],
    specs: [
      { label: "Engine", value: "HashiCorp Terraform" },
      { label: "State", value: "Remote S3 + Lock" },
    ],
    featured: true,
  },
  {
    id: "linux",
    name: "Linux",
    category: "cloud-devops",
    categoryLabel: "Operating Systems & Kernels",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    role: "Core Operating System & Daemons",
    level: "Daily Driver & Production Host",
    description: "POSIX command line fluency, Bash scripting, systemd service administration, SSH hardening, kernel tuning, and network socket management.",
    tags: ["Ubuntu Server", "Systemd Daemons", "SSH Hardening", "POSIX Streams"],
    specs: [
      { label: "Host OS", value: "Ubuntu 24.04 LTS" },
      { label: "Shell", value: "GNU Bash 5.2" },
    ],
    featured: true,
  },
  {
    id: "bash",
    name: "Bash",
    category: "cloud-devops",
    categoryLabel: "Shell Automation & Pipelines",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
    role: "Automated CLI Scripting",
    level: "Systems Automation",
    description: "Writing robust shell scripts with rigorous error traps (`set -euo pipefail`), cron daemons, process monitoring, and file stream filters.",
    tags: ["POSIX Shell", "Cron Automation", "Stream Redirection", "Regex Processing"],
    specs: [
      { label: "Standard", value: "POSIX Compliant" },
      { label: "Execution", value: "Defensive Scripting" },
    ],
  },
  {
    id: "git",
    name: "Git",
    category: "platforms-db",
    categoryLabel: "Version Control Systems",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    role: "Distributed Version Control",
    level: "Trunk & Branching Workflows",
    description: "Advanced branching workflows, rebasing, merge conflict resolution, pull request reviews, and cryptographic commit verification.",
    tags: ["Trunk-Based", "Interactive Rebase", "Commit Signing", "Tagging"],
    specs: [
      { label: "VCS", value: "Git 2.45+" },
      { label: "Security", value: "GPG Signed Commits" },
    ],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "platforms-db",
    categoryLabel: "Relational Database Management",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    role: "Relational Storage & Schema Design",
    level: "Production Database Architect",
    description: "Designing normalized relational database schemas, B-tree query indexing, foreign key constraints, and transactional consistency in high-concurrency environments.",
    tags: ["InnoDB Engine", "Query Optimization", "B-Tree Indexes", "ACID Transactions"],
    specs: [
      { label: "Engine", value: "InnoDB" },
      { label: "Transactions", value: "ACID Guaranteed" },
    ],
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "platforms-db",
    categoryLabel: "Enterprise Web Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    role: "MVC Web Architecture & APIs",
    level: "Full-Stack System Architect",
    description: "Engineering scalable web applications with Laravel 11, Eloquent ORM, Blade/Alpine.js interfaces, background queue workers, and RBAC authentication.",
    tags: ["Laravel 11", "Eloquent ORM", "Redis Queues", "REST APIs"],
    specs: [
      { label: "Framework", value: "Laravel 11.x" },
      { label: "Architecture", value: "Enterprise MVC" },
    ],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "languages",
    categoryLabel: "Mobile Systems & JVM",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    role: "Android Systems & Jetpack Compose",
    level: "Android App Developer",
    description: "Native mobile development using Kotlin, Android Jetpack Architecture Components, Room database persistence, and declarative Jetpack Compose UI.",
    tags: ["Android SDK", "Jetpack Compose", "Coroutines", "Room Database"],
    specs: [
      { label: "Platform", value: "Android SDK 34" },
      { label: "UI Tooling", value: "Jetpack Compose" },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    categoryLabel: "Web & Runtime Engineering",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    role: "Client-Side Engineering & Dynamic UI",
    level: "Modern ES6+ Developer",
    description: "Building responsive web interfaces, DOM state management, WebGL/Canvas visualizers, and asynchronous WebSocket architectures with modern JavaScript.",
    tags: ["ES2024+", "Async/Await", "Canvas 2D/WebGL", "DOM Events"],
    specs: [
      { label: "Standard", value: "ECMAScript 2024" },
      { label: "Paradigms", value: "Functional & Reactive" },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    categoryLabel: "High-Performance Systems",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    role: "Low-Level Performance & Data Structures",
    level: "Competitive Engineering",
    description: "Developing memory-efficient data structures, graph traversal algorithms, STL containers, and competitive algorithmic solutions.",
    tags: ["C++20", "STL Containers", "Graph Algorithms", "Competitive Coding"],
    specs: [
      { label: "Standard", value: "ISO C++20" },
      { label: "Focus", value: "Algorithmic Efficiency" },
    ],
  },
  {
    id: "c",
    name: "C",
    category: "languages",
    categoryLabel: "Core Systems Programming",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
    role: "Memory & Hardware Abstractions",
    level: "Foundational Systems",
    description: "Direct memory management with pointers, manual buffer allocations, POSIX system calls, and computer architecture fundamentals.",
    tags: ["Pointer Arithmetic", "Manual Memory", "POSIX Calls", "Compiler Toolchains"],
    specs: [
      { label: "Standard", value: "ANSI C / C99" },
      { label: "Tooling", value: "GCC / GDB" },
    ],
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "platforms-db",
    categoryLabel: "Cloud Database & Auth",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    role: "Realtime Database & Security Rules",
    level: "Cloud Backend Services",
    description: "Operating serverless backends with Cloud Firestore, realtime sync listeners, Firebase Authentication, and granular security rules.",
    tags: ["Cloud Firestore", "Auth Services", "Security Rules", "Cloud Functions"],
    specs: [
      { label: "Sync Engine", value: "Realtime WebSocket" },
      { label: "Security", value: "Granular RBAC Rules" },
    ],
  },
];
