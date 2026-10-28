export type ProjectStatus = "completed" | "in-progress" | "planned";
export type ProjectCategory = "web" | "mobile" | "software" | "cloud" | "systems" | "coming-next";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  tech: string[];
  image?: string;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    id: "glowbee",
    title: "Glowbee Skincare",
    subtitle: "E-Commerce Website Development",
    category: "web",
    status: "completed",
    description:
      "A complete e-commerce platform developed for a client using WordPress. Features full product management, responsive design, and an optimized shopping experience.",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "CSS", "JavaScript"],
    image: "/projects/glowbee.png",
    links: {
      live: "https://glowbeeskincare.com",
    },
    highlight: true,
  },
  {
    id: "ieeepusb",
    title: "IEEE PU SB Org Website",
    subtitle: "Frontend Design & Development",
    category: "web",
    status: "completed",
    description:
      "Designed and developed the frontend of the official organizational website for IEEE Premier University Student Branch as the Additional Webmaster for the 2025 session.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Frontend Design"],
    image: "/projects/ieeepusb.png",
    links: {
      live: "https://ieeepusb.org",
    },
  },
  {
    id: "gadgetexa",
    title: "Gadgetexa Labs",
    subtitle: "Personal Web Tools & Tech Blog",
    category: "web",
    status: "completed",
    description:
      "A personal project offering online utility tools for PC users and sharing new technology blogs. Developed from scratch using the Laravel framework.",
    tech: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Web Tools"],
    image: "/projects/gadgetexa.png",
    links: {
      live: "https://labs.gadgetexa.com",
    },
  },
  {
    id: "amazing-laundry",
    title: "Amazing Laundry System",
    subtitle: "Custom POS & Management Dashboard",
    category: "software",
    status: "completed",
    description:
      "A complete laundry management system and POS dashboard built for a client based in Qatar. Features order tracking, customer management, and financial reporting.",
    tech: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "POS System"],
    image: "/projects/amazinglaundry.png",
    links: {
      live: "https://amazinglaundryapp.com/",
    },
  },
  {
    id: "jibika",
    title: "Jibika",
    subtitle: "Livelihood & Micro-Capital Web Platform",
    category: "web",
    status: "completed",
    description:
      "A platform connecting verified livelihood needs with small-scale capital through trust and AI. Supports worker profiles, capital deployment tracking, and asset delivery management.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "AI"],
    image: "/projects/jibika.png",
    links: {
      live: "https://jibika.vercel.app/",
    },
  },
  {
    id: "inex-tracker",
    title: "InEx Tracker",
    subtitle: "Personal Finance & Expense Manager",
    category: "software",
    status: "completed",
    description:
      "A personal income and expense tracker built with Laravel to manage finances across multiple accounts (bKash, Upay, Payoneer). Features a real-time dashboard with 6-month income vs. expense charts, transaction history, account balances, and monthly cost estimation.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Chart.js"],
    image: "/projects/inex-tracker.png",
  },
  {
    id: "smartcool",
    title: "SmartCool",
    subtitle: "Multi-Room AC Energy-Efficiency Suite",
    category: "software",
    status: "completed",
    description:
      "A smart multi-room air-conditioning energy management platform. Features live room monitoring, occupancy and motion detection, automated AC controls, real-time power and cost savings tracking, and cumulative CO2e emission analytics.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "/projects/smartcool.png",
    links: {
      live: "https://smartcool.vercel.app/",
      github: "https://github.com/sisayeedcse/SmartCool",
    },
  }
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "software", label: "Software" },
  { id: "cloud", label: "Cloud" },
  { id: "systems", label: "Systems" },
] as const;
