/**
 * Certifications data.
 *
 * Certificate images live in:  /public/certs/<filename>
 * Network Fundamentals image not yet uploaded — placeholder shown automatically.
 */

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerShort: string;
  date: string;
  image: string;
  localImage: string;
  credentialId?: string;
  verifyUrl?: string;
  category: "networking" | "systems" | "dev";
  categoryLabel: string;
  skills: string[];
  description: string;
}

export const certifications: Certification[] = [
  {
    id: "network-fundamentals",
    name: "Networking Fundamentals",
    issuer: "Akamai Technologies via Coursera",
    issuerShort: "Akamai",
    date: "May 4, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241786/network_fundamentals_lmhwno.png",
    localImage: "/certs/network-fundamentals.png",
    verifyUrl: "https://coursera.org/verify/4VUPOC8415V4",
    category: "networking",
    categoryLabel: "Cloud & Edge Networks",
    skills: ["TCP/IP", "DNS Architecture", "Subnetting", "Routing Protocols", "CDN & Edge Security"],
    description: "Deep dive into foundational networking architectures, packet switching, IP addressing, DNS lookups, and internet edge security infrastructure by Akamai.",
  },
  {
    id: "hands-on-linux",
    name: "Hands-on Introduction to Linux Commands and Shell Scripting",
    issuer: "IBM via Coursera",
    issuerShort: "IBM",
    date: "May 10, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241785/hands_on_linux_ybxzbx.png",
    localImage: "/certs/hands-on-linux.png",
    verifyUrl: "https://coursera.org/verify/Y6IZZQ9SL7II",
    category: "systems",
    categoryLabel: "Operating Systems & POSIX",
    skills: ["Linux CLI", "Bash Scripting", "Cron Automation", "Process Daemons", "Pipes & Streams"],
    description: "Mastery of enterprise Linux server environments, Bash pipeline automation, file permissions, daemon administration, and shell scripting by IBM.",
  },
  {
    id: "command-line-basics",
    name: "Command Line Basics",
    issuer: "Scrimba",
    issuerShort: "Scrimba",
    date: "July 13, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241794/command_line_basics_lgyeac.png",
    localImage: "/certs/command-line-basics.jpg",
    verifyUrl: "https://scrimba.com/certificate-cert2fentAFN57J96QJUr8Qwvo1EufJnUADCR3ozZA6nezoXG",
    category: "systems",
    categoryLabel: "Terminal Fluency",
    skills: ["POSIX Shell", "Terminal Shortcuts", "File Systems", "Environment Variables", "CLI Tooling"],
    description: "Interactive command-line engineering covering shell navigation, file system manipulation, standard I/O redirection, and environment configurations.",
  },
  {
    id: "learn-python",
    name: "Learn Python",
    issuer: "Scrimba",
    issuerShort: "Scrimba",
    date: "July 13, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241820/learn_python_sixsxp.png",
    localImage: "/certs/learn-python.jpg",
    verifyUrl: "https://scrimba.com/certificate-cert2uNjgWdv7Rrk2nH8qnXvQnL7dm9BKYadr5F",
    category: "dev",
    categoryLabel: "Software & Scripting",
    skills: ["Python 3", "Data Structures", "OOP Idioms", "File Handling", "Algorithm Design"],
    description: "Comprehensive Python 3 programming covering algorithmic problem solving, object-oriented software patterns, modular architecture, and file streams.",
  },
  {
    id: "app-development-kotlin",
    name: "Android App Development with Kotlin",
    issuer: "FutureNation · Creative IT Institute",
    issuerShort: "FutureNation",
    date: "December 8, 2024",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241787/app_development_w6xtiw.png",
    localImage: "/certs/app-development-kotlin.png",
    verifyUrl: "https://futurenation.gov.bd",
    category: "dev",
    categoryLabel: "Mobile Systems",
    skills: ["Kotlin", "Android SDK", "Jetpack Architecture", "SQLite & Room", "REST Integration"],
    description: "Production mobile engineering with Kotlin, Android Jetpack lifecycle management, Room local databases, asynchronous coroutines, and material UI design.",
  },
  {
    id: "hack-the-code-challenge",
    name: "Hack the Code Challenge — Standard Edition",
    issuer: "Reply · Team QuantumX · Position 164",
    issuerShort: "Reply",
    date: "March 12, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241785/hack_the_code_h6q6lg.png",
    localImage: "/certs/hack-the-code-challenge.png",
    verifyUrl: "https://challenges.reply.com",
    category: "dev",
    categoryLabel: "Competitive Algorithms",
    skills: ["Global Hackathon", "Score: 44,321,439", "Team QuantumX", "Graph Traversal", "Optimization"],
    description: "Global standard edition competitive coding challenge by Reply. Achieved Position 164 internationally with Team QuantumX with 44.3M total points.",
  },
];
