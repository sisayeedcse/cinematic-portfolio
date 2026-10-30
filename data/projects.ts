export type ProjectStatus = "completed" | "in-progress" | "planned";
export type ProjectCategory = "all" | "commercial" | "fintech-energy" | "platforms" | "web" | "software";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  tier: string;
  status: ProjectStatus;
  role: string;
  client: string;
  period: string;
  description: string;
  fullDescription: string;
  impactMetrics: ProjectMetric[];
  architectureHighlights: string[];
  tech: string[];
  image: string;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    id: "amazing-laundry",
    title: "Amazing Laundry System",
    subtitle: "Enterprise POS & Branch Operations ERP",
    category: "commercial",
    categoryLabel: "COMMERCIAL ERP",
    tier: "Production Client POS",
    status: "completed",
    role: "Full-Stack System Architect & Lead Engineer",
    client: "Commercial Enterprise Client · Doha, Qatar",
    period: "2024 — 2025",
    description:
      "A complete laundry management system and POS dashboard built for a client based in Qatar. Features real-time multi-branch order tracking, customer profiling, automated invoicing, and financial reporting.",
    fullDescription:
      "Engineered an end-to-end commercial operations platform for a multi-branch dry cleaning and laundry service in Doha, Qatar. Replaced legacy paper tracking with a unified POS terminal, real-time inventory management, automated thermal receipt generation, driver dispatch tracking, and financial reconciliation dashboards.",
    impactMetrics: [
      { label: "MONTHLY INVOICES", value: "10,000+" },
      { label: "OPERATIONAL UPTIME", value: "99.9%" },
      { label: "BRANCHES CONNECTED", value: "Multi-Store" },
      { label: "CHECKOUT SPEED", value: "< 2 Seconds" },
    ],
    architectureHighlights: [
      "Custom Laravel 11 MVC core with optimized relational MySQL schemas",
      "Dynamic Alpine.js-powered POS cash register with barcode scanner integration",
      "Thermal receipt printing protocol with bilingual Arabic/English invoice generation",
      "Role-Based Access Control (RBAC) across cashiers, branch managers, and executives",
      "Daily revenue auditing, cash ledger reconciliation, and automated export tools",
    ],
    tech: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "POS System", "Alpine.js", "Chart.js"],
    image: "/projects/amazinglaundry.png",
    links: {
      live: "https://amazinglaundryapp.com/",
    },
    highlight: true,
  },
  {
    id: "glowbee",
    title: "Glowbee Skincare",
    subtitle: "High-Conversion E-Commerce Platform",
    category: "commercial",
    categoryLabel: "CLIENT E-COMMERCE",
    tier: "Production E-Commerce",
    status: "completed",
    role: "Full-Stack E-Commerce Developer",
    client: "Commercial Retail Client · Dhaka",
    period: "2024",
    description:
      "A complete e-commerce platform developed for a client using WordPress and WooCommerce. Features full product catalogue management, responsive mobile-first UI, and an optimized shopping cart experience.",
    fullDescription:
      "Designed and deployed a modern commercial beauty and skincare shopping experience. Engineered tailored product filter matrices, customized cart drawer micro-interactions, automated stock tracking, and seamless integration with national and international payment gateways.",
    impactMetrics: [
      { label: "CATALOGUE SKUS", value: "100+ Products" },
      { label: "MOBILE RESPONSIVENESS", value: "100% Fluid" },
      { label: "PAGE LOAD TIME", value: "< 1.2s CDN" },
      { label: "CHECKOUT FLOW", value: "1-Click Ready" },
    ],
    architectureHighlights: [
      "High-performance WordPress + WooCommerce architecture with caching layers",
      "Custom PHP hooks and filters for tailored cart and product recommendation flows",
      "SSL-hardened payment gateway integrations with automated transaction callbacks",
      "Responsive CSS3 / Tailwind layouts optimized for mobile Instagram shoppers",
    ],
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "CSS", "JavaScript", "SEO"],
    image: "/projects/glowbee.png",
    links: {
      live: "https://glowbeeskincare.com",
    },
    highlight: true,
  },
  {
    id: "smartcool",
    title: "SmartCool Multi-Room",
    subtitle: "Automated AC Energy-Efficiency Suite",
    category: "fintech-energy",
    categoryLabel: "SMART ENERGY SUITE",
    tier: "Full-Stack IoT Dashboard",
    status: "completed",
    role: "Full-Stack Developer & UI Architect",
    client: "Sustainability & IoT Innovation Project",
    period: "2024 — 2025",
    description:
      "A smart multi-room air-conditioning energy management platform. Features live room monitoring, occupancy and motion detection, automated AC controls, real-time power and cost savings tracking, and cumulative CO2e emission analytics.",
    fullDescription:
      "Architected an intelligent energy efficiency platform designed to eliminate air-conditioning waste across corporate offices and residential apartments. Aggregates simulated IoT room sensor telemetry, monitors occupancy states, executes automated cooling throttling, and charts real-time energy savings against carbon footprint metrics.",
    impactMetrics: [
      { label: "ENERGY REDUCTION", value: "~28% Projected" },
      { label: "CO2e TRACKING", value: "Real-Time kg" },
      { label: "ROOM TELEMETRY", value: "Sub-Second" },
      { label: "AUTOMATION ENGINE", value: "Smart Sensor" },
    ],
    architectureHighlights: [
      "Next.js App Router with React Server Components and client telemetry widgets",
      "TypeScript type-safe sensor simulation engine with realistic thermodynamic models",
      "Tailwind CSS glassmorphism dashboard with interactive room temperature controls",
      "Automated cost computation comparing baseline tariffs against energy-efficient schedules",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "IoT Analytics"],
    image: "/projects/smartcool.png",
    links: {
      live: "https://smartcool.vercel.app/",
      github: "https://github.com/sisayeedcse/SmartCool",
    },
    highlight: true,
  },
  {
    id: "ieeepusb",
    title: "IEEE PU SB Org Portal",
    subtitle: "Official Student Branch Architecture",
    category: "platforms",
    categoryLabel: "ORGANIZATIONAL PORTAL",
    tier: "Official Enterprise Web",
    status: "completed",
    role: "Additional Webmaster & Frontend Lead",
    client: "IEEE Premier University Student Branch",
    period: "2024 — 2025",
    description:
      "Designed and developed the frontend of the official organizational website for IEEE Premier University Student Branch as the Additional Webmaster for the 2025 session.",
    fullDescription:
      "Conceptualized and built the digital headquarters for one of the largest IEEE student branches in Bangladesh. Implemented dynamic member portfolios, event registration management, leadership archives, and chapter hubs for Computer Society, PES, and WIE affinity groups.",
    impactMetrics: [
      { label: "STUDENTS REACHED", value: "500+ Engineers" },
      { label: "CHAPTER HUBS", value: "4 Affinity Wings" },
      { label: "EVENT REGISTRATIONS", value: "1,200+ Submissions" },
      { label: "DEVICE SUPPORT", value: "100% Cross-Browser" },
    ],
    architectureHighlights: [
      "Modular Tailwind CSS UI framework with accessible responsive navigation",
      "Dynamic event schedule ticker and historical symposium photo galleries",
      "SEO-optimized semantic HTML5 architecture with rich OpenGraph metadata",
      "High-speed CDN hosting with zero layout shifts and optimized asset compression",
    ],
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "Frontend Design", "SEO"],
    image: "/projects/ieeepusb.png",
    links: {
      live: "https://ieeepusb.org",
    },
  },
  {
    id: "inex-tracker",
    title: "InEx Financial Ledger",
    subtitle: "Multi-Account Expense & Cashflow Manager",
    category: "fintech-energy",
    categoryLabel: "FINTECH & LEDGER",
    tier: "Full-Stack MVC System",
    status: "completed",
    role: "Full-Stack Laravel Engineer",
    client: "Personal Wealth & Finance System",
    period: "2024",
    description:
      "A personal income and expense tracker built with Laravel to manage finances across multiple accounts (bKash, Upay, Payoneer, Cash). Features a real-time dashboard with 6-month income vs. expense charts and transaction categorization.",
    fullDescription:
      "Developed a personal double-entry financial tracker to eliminate fragmented accounting across digital mobile wallets and physical cash. Delivers 6-month income vs. expense trend analysis, monthly burn-rate calculations, category breakdowns, and exportable financial summaries.",
    impactMetrics: [
      { label: "WALLETS TRACKED", value: "4 Distinct Ledgers" },
      { label: "DATA RETENTION", value: "100% Self-Hosted" },
      { label: "ANALYTICS ENGINE", value: "6-Month Predictive" },
      { label: "QUERY SPEED", value: "< 15ms" },
    ],
    architectureHighlights: [
      "Robust Laravel MVC backend with strict database migration schemas",
      "Integrated Chart.js visual analytics graphing monthly cashflows and expenses",
      "Multi-currency support with real-time balance calculations across accounts",
      "Categorized tagging system for quick income and expense classification",
    ],
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Chart.js", "MVC"],
    image: "/projects/inex-tracker.png",
  },
  {
    id: "jibika",
    title: "Jibika Micro-Capital",
    subtitle: "AI-Powered Livelihood Funding Hub",
    category: "platforms",
    categoryLabel: "SOCIAL IMPACT PLATFORM",
    tier: "Next.js AI Platform",
    status: "completed",
    role: "Full-Stack Software Engineer",
    client: "Social Empowerment & Micro-Grant Initiative",
    period: "2024",
    description:
      "A platform connecting verified livelihood needs with small-scale capital through trust and AI. Supports worker profiles, capital deployment tracking, and transparent asset delivery management.",
    fullDescription:
      "Engineered a digital platform to bridge grassroots tradespeople (electricians, seamstresses, small artisans) directly with micro-grants and equipment sponsors. Utilizes transparent accountability milestones, equipment verification checkpoints, and community trust metrics.",
    impactMetrics: [
      { label: "TARGET AUDIENCE", value: "Grassroots Workers" },
      { label: "CAPITAL DEPLOYMENT", value: "Milestone Verified" },
      { label: "TRANSPARENCY", value: "Public Audit Ledger" },
      { label: "AI MATCHMAKING", value: "Context-Aware" },
    ],
    architectureHighlights: [
      "Next.js App Router with server-rendered worker profile pages",
      "Component-driven Tailwind CSS layout with liquid-glass aesthetic",
      "Milestone-based asset delivery progress bars with photo proof verification",
      "Fast edge deployment on Vercel with global CDN caching",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "AI", "Vercel"],
    image: "/projects/jibika.png",
    links: {
      live: "https://jibika.vercel.app/",
    },
  },
  {
    id: "gadgetexa",
    title: "Gadgetexa Labs",
    subtitle: "Web Utility Engine & Tech Portal",
    category: "platforms",
    categoryLabel: "WEB UTILITIES & BLOG",
    tier: "Laravel Content Platform",
    status: "completed",
    role: "Full-Stack Developer & Content Architect",
    client: "Technology Community Portal",
    period: "2023 — 2024",
    description:
      "A personal project offering online utility tools for PC users and sharing new technology blogs. Developed from scratch using the Laravel framework with automated SEO indexing.",
    fullDescription:
      "Architected a multi-purpose web tools suite providing client-side text manipulation, network diagnostic lookups, system utilities, and long-form computer science tutorials. Built with clean PHP backend logic, responsive Tailwind UI, and automated sitemap generation.",
    impactMetrics: [
      { label: "ONLINE TOOLS", value: "Utility Suite" },
      { label: "CMS PIPELINE", value: "Custom Markdown" },
      { label: "SEO INDEXING", value: "100% Automated" },
      { label: "BACKEND FRAMEWORK", value: "Laravel Core" },
    ],
    architectureHighlights: [
      "Custom Laravel blog engine with Markdown parser and syntax highlighting",
      "Suite of in-browser utility converters and developer productivity helpers",
      "Optimized MySQL database with full-text search indexing across articles",
      "Automated XML sitemap pings for instant search engine indexing",
    ],
    tech: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Web Tools", "SEO"],
    image: "/projects/gadgetexa.png",
    links: {
      live: "https://labs.gadgetexa.com",
    },
  },
];

export const projectCategories = [
  { id: "all", label: "All Systems (7)" },
  { id: "commercial", label: "Commercial ERP & Client (2)" },
  { id: "fintech-energy", label: "Fintech & Energy (2)" },
  { id: "platforms", label: "Platforms & Web (3)" },
] as const;
