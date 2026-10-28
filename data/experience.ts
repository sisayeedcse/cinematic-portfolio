export type ExperienceItem = {
  id: string;
  title: string;
  organization: string;
  type: "professional" | "leadership";
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "freelance-web-dev",
    title: "Freelance Web Developer",
    organization: "Independent / International Clients",
    type: "professional",
    period: "Feb 2023 – May 2026",
    location: "Remote",
    description:
      "Developed and maintained client websites independently, managing the full project lifecycle from requirement gathering through delivery.",
    highlights: [
      "Analyzed client requirements and delivered website solutions end-to-end",
      "Developed and maintained WordPress and WooCommerce e-commerce sites",
      "Built custom PHP, HTML, CSS and JavaScript solutions for client needs",
      "Configured servers, domains, hosting environments and SSL certificates",
      "Diagnosed and resolved performance, compatibility and configuration issues",
      "Managed client communication, revisions and project timelines independently",
    ],
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "glowbee-dev",
    title: "Website Developer & Manager",
    organization: "Glowbee Skincare",
    type: "professional",
    period: "Aug 2022 – May 2026",
    location: "Chattogram, Bangladesh",
    description:
      "Owned the complete web presence of a skincare brand — from development through ongoing performance improvement and digital operations.",
    highlights: [
      "Built and maintained the WooCommerce-based e-commerce website",
      "Implemented SEO strategies and tracked performance via Google Analytics",
      "Managed content, product listings, promotions and site configuration",
      "Continuously improved page speed, UX and conversion performance",
    ],
    tech: ["WordPress", "WooCommerce", "PHP", "SEO", "Google Analytics"],
  },
  {
    id: "ieee-chairperson",
    title: "Chairperson",
    organization: "IEEE Computer Society · Premier University Student Branch Chapter",
    type: "leadership",
    period: "2026",
    location: "Chattogram, Bangladesh",
    description:
      "Lead the IEEE Computer Society student chapter, overseeing technical programming, community building and organizational operations.",
    highlights: [
      "Lead chapter strategy, planning and execution across technical programs",
      "Coordinated volunteers and organized IEEE-sanctioned technical events",
      "Managed speaker communication and participant coordination",
      "Collaborated with IEEE regional units and sister chapters",
      "Directed technical communication including announcements and reports",
    ],
    tech: [],
  },
];
