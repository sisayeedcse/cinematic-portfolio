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
  date: string;
  /** Path relative to /public — must match the actual file in /public/certs/ */
  image: string;
  credentialId?: string;
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "network-fundamentals",
    name: "Networking Fundamentals",
    issuer: "Akamai Technologies via Coursera",
    date: "May 4, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241786/network_fundamentals_lmhwno.png",
    verifyUrl: "https://coursera.org/verify/4VUPOC8415V4",
  },
  {
    id: "hands-on-linux",
    name: "Hands-on Introduction to Linux Commands and Shell Scripting",
    issuer: "IBM via Coursera",
    date: "May 10, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241785/hands_on_linux_ybxzbx.png",
    verifyUrl: "https://coursera.org/verify/Y6IZZQ9SL7II",
  },
  {
    id: "command-line-basics",
    name: "Command Line Basics",
    issuer: "Scrimba",
    date: "July 13, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241794/command_line_basics_lgyeac.png",
    verifyUrl:
      "https://scrimba.com/certificate-cert2fentAFN57J96QJUr8Qwvo1EufJnUADCR3ozZA6nezoXG",
  },
  {
    id: "learn-python",
    name: "Learn Python",
    issuer: "Scrimba",
    date: "July 13, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241820/learn_python_sixsxp.png",
    verifyUrl:
      "https://scrimba.com/certificate-cert2uNjgWdv7Rrk2nH8qnXvQnL7dm9BKYadr5F",
  },
  {
    id: "app-development-kotlin",
    name: "Android App Development with Kotlin",
    issuer: "FutureNation · Creative IT Institute",
    date: "December 8, 2024",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241787/app_development_w6xtiw.png",
  },
  {
    id: "hack-the-code-challenge",
    name: "Hack the Code Challenge — Standard Edition",
    issuer: "Reply · Team QuantumX · Position 164",
    date: "March 12, 2025",
    image: "https://res.cloudinary.com/dknflcbt1/image/upload/v1787241785/hack_the_code_h6q6lg.png",
  },
];
