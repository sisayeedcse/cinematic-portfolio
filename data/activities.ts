export type Activity = {
  id: string;
  title: string;
  organization: string;
  period?: string;
  description: string;
  tags: string[];
  image?: string;
  image2?: string;
  imagePosition?: string;
  image2Position?: string;
  link?: string;
  linkText?: string;
  badge?: string;
};

export const activities: Activity[] = [
  // ── Most Notable / Recent First ──
  {
    id: "iconeect-2026",
    title: "Volunteer, IEEE iCONEECT 2026",
    organization: "IEEE · Premier University",
    period: "2026",
    badge: "IEEE FLAGSHIP",
    description:
      "Volunteered at iCONNECT 2026 & iCONCLAVE 2026 — coordinating Physical Sessions 02 & 06 on Day 01, Virtual Session 08, and the iCONCLAVE competitions on Day 02. Gained hands-on experience in research, AI/ML, and emerging technologies.",
    tags: ["Volunteering", "IEEE", "Research", "AI/ML", "Conference"],
    image: "/activities/iconeect-team.jpg",
    image2: "/activities/iconeect-award.png",
    imagePosition: "center top",
  },
  {
    id: "ict-fair-runner-up",
    title: "Runner-up, 3rd Chattogram ICT Fair 2025",
    organization: "ISPB Chattogram Chapter",
    period: "Jan 15 - Jan 17, 2025",
    badge: "PODIUM FINISH · RUNNER-UP",
    description:
      "Secured the runner-up position in the tech competition at the 3rd Chattogram ICT Fair 2025 held at GEC Convention Center. The three-day event featured renowned tech companies, youth-focused seminars, and science exhibits.",
    tags: ["Competition", "Runner-up", "Tech Fair", "Achievement"],
    image: "/activities/podium-gec.jpg",
    image2: "/activities/prize-gec.jpg",
    imagePosition: "center 20%",
  },
  {
    id: "appquest-2025",
    title: "5th Place, AppQuest 2025 Hackathon",
    organization: "AppLink & Banglalink",
    period: "Dec 13, 2025",
    badge: "TOP 5 NATIONAL",
    description:
      "Secured 5th position among 42 teams with 'MaidMatch', a domestic help management platform aimed at solving real-world problems. The hackathon was held at Banglalink HQ in Dhaka.",
    tags: ["Hackathon", "Top 5", "Startup", "Tech Innovation"],
    image: "/activities/applink-hackathon.jpg",
    link: "https://github.com/sisayeedcse/MaidMatch-App",
    linkText: "View GitHub Repo",
  },
  {
    id: "televerse-1-0",
    title: "Top 30 Finalist, Televerse 1.0 Hackathon",
    organization: "CUET ETE",
    period: "2024",
    badge: "TOP 30 FINALIST",
    description:
      "Competed in an intense 8-hour hackathon, building and presenting a full microservice-based project. Reached the top 30 finalists from all over Bangladesh, gaining hands-on experience in Docker, CI/CD, and DevOps under pressure.",
    tags: ["Hackathon", "Microservices", "DevOps", "Finalist"],
    image: "/activities/televerse-hackathon.jpg",
    link: "https://github.com/sisayeedcse/CareForAll_MicroService",
    linkText: "View GitHub Repo",
    imagePosition: "center 30%",
  },
  // ── IEEE Programs ──
  {
    id: "ieee-aiml-bootcamp",
    title: "IEEE AI/ML Bootcamp",
    organization: "IEEE Computer Society · Premier University",
    period: "2025",
    badge: "TECHNICAL BOOTCAMP",
    description:
      "Participated in and helped organize an intensive AI/ML bootcamp covering foundational to applied machine learning concepts, workshops and project sessions.",
    tags: ["AI/ML", "Bootcamp", "Organization", "Technical Education"],
    image: "/activities/bootcamp.png",
    imagePosition: "95% 30%",
  },
  {
    id: "ieee-technical-webinars",
    title: "IEEE Technical Webinars & Workshops",
    organization: "IEEE Computer Society · Premier University",
    period: "2024 - 2025",
    badge: "EDUCATION PROGRAM",
    description:
      "Active participant and organizer for IEEE technical education events covering software development, emerging technologies and industry practices.",
    tags: ["Webinars", "Workshops", "Technical Programs", "Community"],
    image: "/activities/webinar.png",
    imagePosition: "85% center",
  },
  {
    id: "ieee-student-initiatives",
    title: "Student Technology Initiatives",
    organization: "IEEE Computer Society · Premier University",
    period: "2024 - Present",
    badge: "LEADERSHIP & GOVERNANCE",
    description:
      "Coordinated student-led technology education programs designed to build technical skills and connect students with professional engineering communities.",
    tags: ["Leadership", "Collaboration", "Technology Education", "Student Programs"],
    image: "/activities/workshop.png",
    imagePosition: "95% 20%",
  },
];
