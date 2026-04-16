/* ═══════════════════════════════════════════════════════════
   PORTFOLIO DATA — edit this file to update all content
═══════════════════════════════════════════════════════════ */

export const PERSON = {
  name:        "Mehedi Hasan Mahfuz",
  nameShort1:  "Mehedi Hasan",
  nameShort2:  "Mahfuz.",
  role:        "Frontend Developer · React & Next.js",
  location:    "Dhaka, Bangladesh",
  email:       "mehedi1hasan1mahfuz1@gmail.com",
  linkedin:    "https://www.linkedin.com/in/mehedi-hasan-mahfuz/",
  github:      "https://github.com/mehedihasanmahfuz0",
  // ↓ Paste your resume PDF URL here when ready
  resumeUrl:   "#",
  available:   true,
  valueStatement: "I build frontend systems that are scalable, maintainable, and fast — using React and Next.js.",
};

export const STATS = [
  { number: 1, suffix: "+", label: "Year of hands-on XP" },
  { number: 3, suffix: "",  label: "Projects shipped"     },
  { number: 15, suffix: "+", label: "Technologies"        },
];

export const ABOUT_PARAGRAPHS = [
  `I'm a <strong>Frontend Developer</strong> with 1+ year of hands-on experience building modern, production-grade web interfaces that people actually enjoy using.`,
  `My core focus is <strong>React and Next.js</strong> — writing component architectures designed to scale without becoming a maintenance burden three months later.`,
  `I started by mastering <strong>HTML, CSS, and JavaScript fundamentals deeply</strong> before layering the modern ecosystem on top. That discipline shows in how I approach problems.`,
  `I work at the intersection of engineering and product. I use <strong>AI tooling deliberately</strong> — to accelerate delivery, not to replace understanding.`,
  `My goal is to grow into a <strong>full-stack engineer</strong> who can own features end-to-end and contribute meaningfully from day one.`,
];

export type Proficiency = "expert" | "proficient" | "familiar" | "learning";

export interface Skill {
  name: string;
  level: Proficiency;
  pct: number;
}

export interface SkillCategory {
  icon: string;
  title: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: "⟨/⟩",
    title: "Frontend (Primary)",
    skills: [
      { name: "HTML5 / CSS3",                        level: "expert",     pct: 92 },
      { name: "Tailwind CSS",                        level: "expert",     pct: 90 },
      { name: "JavaScript (ES6+)",                   level: "proficient", pct: 78 },
      { name: "TypeScript",                          level: "proficient", pct: 72 },
      { name: "React",                               level: "expert",     pct: 88 },
      { name: "Next.js",                             level: "proficient", pct: 80 },
      { name: "Shadcn/UI · React Hook Form · Zod · Zustand", level: "proficient", pct: 75 },
    ],
  },
  {
    icon: "⚙",
    title: "Backend & Database",
    skills: [
      { name: "REST API Integration",    level: "proficient", pct: 78 },
      { name: "Node.js",                 level: "familiar",   pct: 45 },
      { name: "PostgreSQL + Prisma ORM", level: "familiar",   pct: 50 },
      { name: "MongoDB / NoSQL",         level: "familiar",   pct: 38 },
      { name: "Appwrite (BaaS)",         level: "familiar",   pct: 42 },
    ],
  },
  {
    icon: "⚒",
    title: "Tools, DevOps & More",
    skills: [
      { name: "Git / GitHub",            level: "proficient", pct: 76 },
      { name: "Vercel (Deployment)",     level: "proficient", pct: 74 },
      { name: "GitHub Actions (CI/CD)",  level: "familiar",   pct: 40 },
      { name: "Unit & Component Testing",level: "familiar",   pct: 38 },
      { name: "System Design",           level: "learning",   pct: 28 },
      { name: "WordPress / Shopify / SEO", level: "familiar", pct: 48 },
      { name: "C / Java / Python / Go",  level: "learning",   pct: 22 },
    ],
  },
];

export interface Project {
  number:   string;
  name:     string[];        // lines of the title
  tagline:  string;
  desc:     string;
  features: string[];
  tags:     string[];
  liveUrl:  string;          // ← paste live URL here
  gitUrl:   string;          // ← paste GitHub URL here
  // ↓ paste image path once you add it to /public/images/
  image:    string | null;
  imageAlt: string;
  status?:  string;          // optional status label
}

export const PROJECTS: Project[] = [
  {
    number:  "01",
    name:    ["ClothStore", "E-commerce"],
    tagline: "Full-featured online clothing store",
    desc:    "Production-grade e-commerce platform — product catalogue, cart, checkout, and order management — with type-safe validation end-to-end.",
    features:[
      "Product catalogue with filtering and search",
      "Type-safe forms — React Hook Form + Zod",
      "Database persistence via Prisma ORM + PostgreSQL",
    ],
    tags:    ["React","Next.js","TypeScript","Tailwind","Prisma","Shadcn/UI","Zod"],
    liveUrl: "https://clothestore-tau.vercel.app/",
    gitUrl:  "https://github.com/mehedihasanmahfuz0/clothestore",
    image:   "/images/Clothstore.webp",
    imageAlt:"ClothStore e-commerce screenshot",
    status:  "Under Development",
  },
  {
    number:  "02",
    name:    ["CineScope", "Movie Discovery"],
    tagline: "Real-time movie search & community ratings",
    desc:    "Solves the \"what to watch\" problem with real-time TMDB data, community-driven ratings via Appwrite, and a search experience that responds as you type.",
    features:[
      "Live movie search powered by TMDB API",
      "Community ratings and reviews via Appwrite",
      "Top-rated listings ranked by real user feedback",
    ],
    tags:    ["React","Vite","TMDB API","Appwrite","Tailwind","Vercel"],
    liveUrl: "https://moive-app-blue.vercel.app/",
    gitUrl:  "https://github.com/mehedihasanmahfuz0/moiveApp",
    image:   "/images/Movie.webp",
    imageAlt:"CineScope movie discovery screenshot",
  },
  {
    number:  "03",
    name:    ["PromptLab", "AI Playground"],
    tagline: "Compose, analyse, and iterate on AI prompts",
    desc:    "Lets users compose, analyse, and iterate on prompts in real time. Groq's API powers sub-100ms inference so feedback feels instant.",
    features:[
      "Real-time prompt analysis and evaluation",
      "Session state managed with Zustand",
      "Groq API for sub-100ms LLM inference",
    ],
    tags:    ["React","Next.js","Zustand","Groq API","TypeScript"],
    liveUrl: "https://ai-prompt-playground-zeta.vercel.app/playground",
    gitUrl:  "https://github.com/mehedihasanmahfuz0/AI-Prompt-Playground",
    image:  "/images/PromptPlay.webp",
    imageAlt:"PromptLab AI prompt playground screenshot",
  },
];

export interface Experience {
  role:     string;
  company:  string;
  period:   string;
  bullets:  string[];
  tags:     string[];
}

export const EXPERIENCES: Experience[] = [
  {
    role:    "Digital Marketer",
    company: "Bitchip Digital",
    period:  "Oct 2025 – Present",
    bullets: [
      "Planning and executing digital marketing campaigns — SEO, content strategy, and paid channels.",
      "Collaborating with product and design teams to align marketing messaging with what's being built.",
      "Applying frontend skills to implement landing page improvements and CRO experiments in WordPress and Shopify.",
      "Measuring performance through data analytics and iterating on copy, targeting, and creative.",
    ],
    tags: ["SEO","Digital Marketing","WordPress","Shopify","Analytics"],
  },
  {
    role:    "Self-directed Frontend Engineering",
    company: "Independent / Open Source",
    period:  "2023 – Present",
    bullets: [
      "Built and shipped three full-stack projects independently — from architecture to deployment on Vercel.",
      "Mastered React, Next.js, TypeScript, and the broader ecosystem through consistent project-driven learning.",
      "Integrated third-party APIs (TMDB, Groq, Appwrite) and managed real database schemas with Prisma ORM.",
    ],
    tags: ["React","Next.js","TypeScript","Prisma","Vercel"],
  },
];
