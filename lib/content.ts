/**
 * Single source of truth for every piece of copy on the site.
 * Editing content here never requires touching component markup.
 * House style: no em dashes anywhere. Use commas, periods or parentheses.
 *
 * URLs and handles live in lib/site.ts.
 */

import { site, urlLabel } from "./site";

export const profile = {
  name: "Kshitiz Shrestha",
  role: "Full-Stack Developer · Cloud & Systems",
  location: "Balaju, Kathmandu, Nepal",
  availability: "Open to relocation and remote",
  email: "kshitizstha1007@gmail.com",
  phone: "+977 9813614667",
  phoneHref: "tel:+9779813614667",
  // Social URLs live in lib/site.ts.
  github: site.social.github,
  githubLabel: urlLabel(site.social.github),
  linkedin: site.social.linkedin,
  linkedinLabel: site.social.linkedinLabel,
  resume: "/assets/Kshitiz_Shrestha_Resume.pdf",
  openTo: "Full-Stack · DevOps · Cloud Infrastructure",
  languages: "English (professional) · Nepali (native) · Hindi",
  pitch:
    "I build and operate production web applications from frontend to deployment, including ecommerce platforms, internal tools, APIs and cloud infrastructure.",
};

/**
 * Credential strip under the hero pitch. Three facts, scannable in one glance.
 * Labels are kept to two short words so the strip stays one compact row on a
 * phone. The whole hero has to clear the fold on a 375x812 screen.
 */
export const heroStats = [
  { value: "AWS SAA", label: "Certified 2025" },
  { value: "Production", label: "Live platform" },
  { value: "Full-stack", label: "Front and back" },
];

export const about = {
  lead: "I ship production software, and I like the part where something is broken and nobody knows why yet.",
  paragraphs: [
    "I'm a full-stack developer at Iconiq, where I own the frontend and backend of a live ecommerce platform end to end: authentication, image pipelines, transactional email, an admin dashboard, and the deployments that keep it all running.",
    "Before that, five months of DevOps internships and an AWS Solutions Architect, Associate certification got me comfortable with the layer underneath the app. How APIs behave under load, what HTTP and HTTPS are really doing on the wire, and how to work backwards from a symptom to a root cause.",
    "The part I'm most confident about is communication. I can explain a problem to an engineer and to someone who just wants to know when it will be fixed, in English or Nepali, and I stay calm when a system is down and people are waiting.",
  ],

  /**
   * Portrait is opt-in. The About component checks whether this file actually
   * exists at build time and simply omits the frame if it does not, so there is
   * never a broken image. Drop a real photo at public/assets/portrait.jpg
   * (or change this path) and it appears automatically.
   */
  portrait: {
    src: "/assets/portrait.jpg",
    alt: "Kshitiz Shrestha",
  },
};

export const skills = [
  {
    name: "Frontend",
    items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
  },
  {
    name: "Backend and APIs",
    items: ["Node.js", "Express", "REST APIs", "JWT auth (httpOnly cookies)", "Prisma ORM", "Nodemailer", "Postman"],
  },
  { name: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { name: "Cloud and AWS", items: ["EC2", "S3", "IAM", "VPC", "CloudWatch", "AWS CLI"] },
  {
    name: "Linux and Systems",
    items: ["AlmaLinux", "RBAC", "File permissions", "User management", "systemd", "Log analysis"],
  },
  { name: "Networking", items: ["DNS", "TCP/IP", "HTTP status codes", "SSL/TLS", "Troubleshooting"] },
  {
    name: "DevOps and Deployment",
    items: ["Git", "GitHub", "CI/CD pipelines", "Vercel", "Render", "Cloudinary"],
  },
  { name: "Scripting", items: ["Bash", "Python basics", "Automation scripts", "Log parsing"] },
];

export type Job = {
  date: string;
  type?: string;
  role: string;
  org: string;
  points: string[];
  link?: { href: string; label: string };
};

export const experience: Job[] = [
  {
    date: "January 2026 to Present",
    type: "Full-time",
    role: "Full-Stack Developer",
    org: "Iconiq",
    link: { href: "https://skinroutineglow.com", label: "skinroutineglow.com" },
    points: [
      "Build and maintain SkinRoutineGlow, a live production skincare ecommerce platform.",
      "Next.js and React frontend, Express and MongoDB backend.",
      "Implemented JWT access and refresh authentication with httpOnly cookies.",
      "Built a Cloudinary image pipeline and transactional email flows (verification, password reset) via Nodemailer.",
      "Built a full admin dashboard covering products, orders, users, blog content and subscribers, with analytics charts.",
      "Order processing currently supports cash on delivery.",
      "Own both frontend and backend repositories end to end, deployed on Vercel and Render.",
    ],
  },
  {
    date: "2025",
    type: "3 months",
    role: "DevOps Engineer Intern",
    org: "UBA Solutions",
    points: [
      "Monitored AWS cloud infrastructure deployments.",
      "Read HTTP logs and CloudWatch metrics to diagnose issues.",
      "Documented deployment and handover procedures.",
      "Completed an in-house AWS apprenticeship, leading to the AWS Solutions Architect, Associate certification.",
    ],
  },
  {
    date: "2025",
    type: "2 months",
    role: "DevOps Intern",
    org: "Amnil Technology",
    points: [
      "Administered AlmaLinux servers (user management, RBAC, service configuration).",
      "Log analysis with grep, awk and journalctl.",
      "Supported CI/CD pipeline operations.",
      "Maintained runbooks and handover documentation.",
    ],
  },
];

export const education: Job[] = [
  {
    date: "2020 to 2024",
    role: "BSc CSIT",
    org: "Kathford International College of Engineering and Management, Lalitpur",
    points: [],
  },
  {
    date: "2018 to 2020",
    role: "Higher Secondary",
    org: "St. Xavier's College, Maitighar",
    points: [],
  },
];

export type Project = {
  /** Matches content/projects/<slug>.md. Omit when there is no case study. */
  slug?: string;
  name: string;
  /** Production / In progress. Overridden by frontmatter `status` when published. */
  badge: string;
  /** Who it was built for. Keeps employed work and independent work distinct. */
  context: string;
  /** One line value proposition. */
  tagline: string;
  featured?: boolean;
  summary: string;
  role?: string;
  year?: string;
  projectType?: string;
  /** Leave empty when no public URL exists. Never invent one. */
  liveUrl?: string;
  githubUrl?: string;
  stack?: { label: string; items: string[] }[];
  note?: string;
};

/**
 * Homepage project cards. Concise overviews only. The long form lives in
 * content/projects/<slug>.md and is reached via "View Case Study".
 *
 * SkinRoutineGlow and Aminu Nepal are separate builds and are labelled as such:
 * SkinRoutineGlow is the platform built as an employee at Iconiq, Aminu Nepal is
 * an independent solo build. They use different backends (MongoDB vs MySQL).
 *
 * Add an object here and the grid absorbs it. No layout changes needed.
 */
export const projects: Project[] = [
  {
    slug: "aminu-nepal",
    name: "Aminu Nepal",
    badge: "Production",
    context: "Independent project",
    featured: true,
    projectType: "Ecommerce platform",
    role: "Solo, end to end",
    year: "2026",
    tagline: "A production ecommerce storefront for a skincare brand, designed, built and shipped solo.",
    summary:
      "Customer storefront plus a separate standalone admin panel. Full admin CRUD for products, orders, blogs, coupons, users, collections and ingredients, with role based access control (superadmin and editor). JWT auth via httpOnly cookies, Cloudinary image handling, Nodemailer email and cash on delivery ordering.",
    stack: [
      {
        label: "Frontend",
        items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
      },
      { label: "Backend", items: ["Node.js", "Express", "Prisma ORM", "MySQL"] },
    ],
  },
  {
    name: "SkinRoutineGlow",
    badge: "Production",
    context: "Professional work at Iconiq",
    projectType: "Ecommerce platform",
    role: "Full-stack, frontend and backend",
    year: "2026",
    liveUrl: "https://skinroutineglow.com",
    tagline: "A live skincare ecommerce platform I own from frontend through to deployment.",
    summary:
      "JWT access and refresh authentication with httpOnly cookies, a Cloudinary image pipeline and transactional email flows via Nodemailer. Full admin dashboard covering products, orders, users, blog content and subscribers, with analytics charts. Order processing currently supports cash on delivery.",
    stack: [
      { label: "Frontend", items: ["Next.js", "React"] },
      { label: "Backend", items: ["Express", "MongoDB"] },
      { label: "Services", items: ["Cloudinary", "Nodemailer", "Vercel", "Render"] },
    ],
    note: "Both frontend and backend repositories owned end to end.",
  },
  {
    slug: "pingkeeper",
    name: "PingKeeper",
    badge: "In progress",
    context: "Personal project",
    projectType: "Monitoring tool",
    role: "Solo",
    tagline: "Uptime and ping monitoring for a set of hosts.",
    summary:
      "Server uptime and ping monitoring tool, currently in development. Periodically checks whether a set of hosts is reachable, records response times, and surfaces when something stops responding.",
    note: "Built around the same monitoring and log reading work I did during my internships.",
  },
];

export const certifications = {
  headline: { year: "2025", name: "AWS Certified Solutions Architect, Associate" },
  others: [
    { year: "2023", name: "Flutter Development, 90 hours" },
    { year: "2023", name: "UI/UX Design, 75 hours" },
  ],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
];
