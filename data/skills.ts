export type SkillCategory = {
  id: string;
  label: string;
  note?: string; // e.g. "Foundation", "Learning", "Building"
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    skills: ["C", "C++", "Python", "Java", "PHP", "JavaScript", "Kotlin"],
  },
  {
    id: "web",
    label: "Web Development",
    skills: ["HTML5", "CSS3", "Bootstrap", "Laravel", "WordPress", "WooCommerce"],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: ["Kotlin", "Android SDK", "Jetpack Compose", "Firebase", "SQLite", "FlutterFlow"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["MySQL", "SQLite", "Firebase Firestore", "Room Database"],
  },
  {
    id: "systems",
    label: "Systems & Linux",
    note: "Foundation",
    skills: ["Linux", "Ubuntu", "Shell Scripting", "Git", "GitHub", "Command Line"],
  },
  {
    id: "networking",
    label: "Networking",
    note: "Foundation",
    skills: ["TCP/IP", "Network Fundamentals", "Network Security Basics", "DNS", "HTTP/S"],
  },
  {
    id: "ai-data",
    label: "AI / Data",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Jupyter", "Google Colab"],
  },
  {
    id: "cloud-infra",
    label: "Cloud & Infrastructure",
    note: "Learning",
    skills: ["Linux", "Networking", "Cloud Fundamentals", "Infrastructure Concepts", "Automation"],
  },
];
