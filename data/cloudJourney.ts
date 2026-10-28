export type JourneyStatus = "completed" | "learning" | "building" | "next" | "planned";

export type JourneyStep = {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  status: JourneyStatus;
  description: string;
};

export const cloudJourney: JourneyStep[] = [
  {
    id: "linux-systems",
    index: 1,
    title: "Linux & Systems",
    subtitle: "Foundation",
    status: "completed",
    description: "Command line fluency, shell scripting, file systems and system administration fundamentals.",
  },
  {
    id: "networking",
    index: 2,
    title: "Networking",
    subtitle: "Fundamentals",
    status: "completed",
    description: "TCP/IP, DNS, HTTP, network layers, routing concepts and network security basics. Coursera certified.",
  },
  {
    id: "cloud-fundamentals",
    index: 3,
    title: "Cloud Fundamentals",
    subtitle: "Core Concepts",
    status: "learning",
    description: "Cloud computing models (IaaS, PaaS, SaaS), deployment models, core service categories and cloud economics.",
  },
  {
    id: "cloud-provider",
    index: 4,
    title: "AWS / Azure / GCP",
    subtitle: "Hands-on Cloud",
    status: "building",
    description: "Practical cloud platform skills — compute, storage, networking, IAM and cost management.",
  },
  {
    id: "iac",
    index: 5,
    title: "Infrastructure as Code",
    subtitle: "Automation",
    status: "next",
    description: "Terraform, CloudFormation or Pulumi for declarative, version-controlled infrastructure provisioning.",
  },
  {
    id: "containers",
    index: 6,
    title: "Containers & Docker",
    subtitle: "Containerization",
    status: "planned",
    description: "Docker fundamentals, containerizing applications, Docker Compose and container networking.",
  },
  {
    id: "cicd",
    index: 7,
    title: "CI/CD Pipelines",
    subtitle: "DevOps",
    status: "planned",
    description: "GitHub Actions, automated testing, deployment pipelines and release automation.",
  },
  {
    id: "monitoring",
    index: 8,
    title: "Monitoring & Reliability",
    subtitle: "Observability",
    status: "planned",
    description: "Logging, metrics, alerting and SRE principles using tools like Prometheus, Grafana and CloudWatch.",
  },
  {
    id: "cloud-projects",
    index: 9,
    title: "Cloud Projects",
    subtitle: "Real Work",
    status: "building",
    description: "Hands-on projects demonstrating end-to-end cloud infrastructure design, deployment and operation.",
  },
];

export const journeyStatusConfig: Record<JourneyStatus, { label: string; color: string }> = {
  completed: { label: "Completed", color: "text-emerald-400" },
  learning: { label: "Learning", color: "text-amber-400" },
  building: { label: "Building", color: "text-rose-400" },
  next: { label: "Next", color: "text-amber-300" },
  planned: { label: "Planned", color: "text-gray-500" },
};
