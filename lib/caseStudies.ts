/**
 * Markdown case-study loader.
 *
 * SERVER ONLY. This reads the filesystem, so it may only be imported from
 * server components, generateStaticParams or generateMetadata. The site is a
 * static export, so every call here runs at build time and nothing ships to
 * the browser.
 *
 * Files live in content/projects/<slug>.md. The frontmatter is the source of
 * truth for case-study metadata (status, role, year, URLs). A file is only
 * routed and linked when `published: true`.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projects, type Project } from "./content";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  status?: string;
  summary?: string;
  projectType?: string;
  role?: string;
  year?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  published?: boolean;
};

export type CaseStudy = {
  frontmatter: CaseStudyFrontmatter;
  /** Raw markdown body with the frontmatter block removed. */
  body: string;
};

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/** Turn heading text into a URL fragment. Shared with the markdown renderer. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Read every markdown file, published or not. Missing directory is fine. */
export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    // Leading underscore marks scaffolding such as _template.md, never content.
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as Partial<CaseStudyFrontmatter>;

      // Strip HTML comments up front. They are authoring notes, and leaving
      // them in causes two visible bugs: the renderer prints them as body
      // text, and a commented-out line starting with ## lands in the TOC.
      const body = content.replace(/<!--[\s\S]*?-->/g, "").trimStart();

      return {
        // Filename wins if frontmatter omits the slug, so a route always exists.
        frontmatter: {
          ...fm,
          title: fm.title ?? file.replace(/\.md$/, ""),
          slug: fm.slug ?? file.replace(/\.md$/, ""),
        } as CaseStudyFrontmatter,
        body,
      };
    });
}

/** Only case studies with `published: true`. */
export function getPublishedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((cs) => cs.frontmatter.published === true);
}

/** Slugs that should get a generated route. Drives generateStaticParams. */
export function getPublishedSlugs(): string[] {
  return getPublishedCaseStudies().map((cs) => cs.frontmatter.slug);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  return getPublishedCaseStudies().find((cs) => cs.frontmatter.slug === slug) ?? null;
}

/**
 * Homepage cards joined to their case studies.
 *
 * Frontmatter is the source of truth for case-study metadata (status, role,
 * year, URLs) so those facts are written once, in the markdown. The card keeps
 * its own tagline and summary because the homepage stays deliberately concise.
 * `hasCaseStudy` is only true for a published file, which is what gates the
 * "View Case Study" link.
 */
export type ProjectCardData = Project & { hasCaseStudy: boolean };

export function getProjectCards(): ProjectCardData[] {
  const published = new Map(
    getPublishedCaseStudies().map((cs) => [cs.frontmatter.slug, cs.frontmatter]),
  );

  return projects.map((p) => {
    const fm = p.slug ? published.get(p.slug) : undefined;
    if (!fm) return { ...p, hasCaseStudy: false };

    return {
      ...p,
      badge: fm.status || p.badge,
      role: fm.role || p.role,
      year: fm.year || p.year,
      projectType: fm.projectType || p.projectType,
      liveUrl: fm.liveUrl || p.liveUrl,
      githubUrl: fm.githubUrl || p.githubUrl,
      hasCaseStudy: true,
    };
  });
}

/**
 * Build a table of contents from h2 and h3 headings.
 *
 * Fenced code blocks are stripped first, otherwise a commented-out "## foo"
 * inside a bash example would show up as a heading.
 */
export function extractToc(markdown: string): TocEntry[] {
  const withoutCode = markdown.replace(/^```[\s\S]*?^```/gm, "");
  const entries: TocEntry[] = [];

  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({
      id: slugifyHeading(text),
      text,
      level: match[1].length === 2 ? 2 : 3,
    });
  }

  return entries;
}
