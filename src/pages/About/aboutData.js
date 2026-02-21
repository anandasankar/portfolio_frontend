export const SKILLS = [
  {
    icon: "bi-server",
    title: "Backend",
    color: "#00d4ff",
    items: [
      { icon: "bi-filetype-js", label: "JavaScript" },
      { icon: "bi-filetype-tsx", label: "TypeScript" },
      { icon: "bi-diagram-3", label: "Node.js" },
      { icon: "bi-hdd-network", label: "Express.js" },
    ],
  },
  {
    icon: "bi-database",
    title: "Database",
    color: "#00ffcc",
    items: [
      { icon: "bi-database-fill", label: "PostgreSQL" },
      { icon: "bi-database", label: "MongoDB" },
      { icon: "bi-lightning-fill", label: "Redis" },
      { icon: "bi-layers", label: "Prisma" },
    ],
  },
  {
    icon: "bi-tools",
    title: "Tools & Cloud",
    color: "#7dd3fc",
    items: [
      { icon: "bi-cloud-fill", label: "AWS" },
      { icon: "bi-box-seam", label: "Docker" },
      { icon: "bi-git", label: "Git" },
      { icon: "bi-terminal-fill", label: "Postman" },
      { icon: "bi-check-circle-fill", label: "Jest" },
    ],
  },
];

export const EXPERIENCES = [
  {
    role: "Backend Developer",
    company: "Game Mano Private Limited",
    period: "Dec 2024 — Present",
    desc: "Developing scalable CMS platforms, REST APIs, Redis caching, background jobs, and AWS-based backend systems.",
    current: true,
  },
  {
    role: "Backend Developer",
    company: "Microspark Software Solutions",
    period: "Aug 2023 — Dec 2024",
    desc: "Built scalable RESTful APIs, optimized database performance, and developed secure backend services.",
    current: false,
  },
];

export const STATS = [
  { number: "2+", label: "Years" },
  { number: "10+", label: "Projects" },
  { number: "2", label: "Companies" },
];
