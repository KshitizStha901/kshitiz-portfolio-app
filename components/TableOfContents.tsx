import type { TocEntry } from "@/lib/caseStudies";

/**
 * Contents list built from the markdown h2/h3 headings.
 * Renders nothing when a case study is too short to need one.
 */
export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="toc__label">Contents</p>
      <ol className="toc__list">
        {entries.map((e) => (
          <li key={e.id} className={e.level === 3 ? "toc__item toc__item--sub" : "toc__item"}>
            <a href={`#${e.id}`}>{e.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
