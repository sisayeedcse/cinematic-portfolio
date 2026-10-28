export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  coursework: string[];
};

export const education: EducationItem[] = [
  {
    id: "premier-university",
    degree: "Bachelor of Science in Computer Science and Engineering",
    institution: "Premier University",
    period: "Nov 2022 – Nov 2026",
    location: "Chattogram, Bangladesh",
    coursework: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Computer Networks",
      "Operating Systems",
      "Computer Architecture",
      "Cybersecurity",
      "Software Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "IoT",
      "Web Application Development",
      "Mobile Application Development",
    ],
  },
];
