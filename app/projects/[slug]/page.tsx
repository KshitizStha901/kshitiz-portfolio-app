import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { extractToc, getCaseStudy, getPublishedSlugs } from "@/lib/caseStudies";
import { profile, projects } from "@/lib/content";
import { site } from "@/lib/site";
import CaseStudyLayout from "@/components/CaseStudyLayout";

type Params = { slug: string };

/** Static export: only published markdown files get a route. */
export function generateStaticParams(): Params[] {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

// Anything not returned above is a 404 rather than an attempted render.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  const { title, summary } = caseStudy.frontmatter;
  const pageTitle = `${title} | Case Study | ${profile.name}`;

  return {
    title: pageTitle,
    description: summary,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: {
      type: "article",
      url: `${site.url}/projects/${slug}/`,
      title: pageTitle,
      description: summary,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  // "Project / 02" numbering follows the order of the homepage grid.
  const position = projects.findIndex((p) => p.slug === slug);
  const index = String(position >= 0 ? position + 1 : 1).padStart(2, "0");

  return (
    <CaseStudyLayout caseStudy={caseStudy} toc={extractToc(caseStudy.body)} index={index} />
  );
}
