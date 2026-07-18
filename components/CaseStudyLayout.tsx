import type { CaseStudy, TocEntry } from "@/lib/caseStudies";
import ProjectMeta from "./ProjectMeta";
import TableOfContents from "./TableOfContents";
import Markdown from "./Markdown";
import { profile } from "@/lib/content";

/**
 * Shell for a single case study.
 *
 * The homepage navbar is not reused here: its links are hash anchors to
 * homepage sections, which would dead-end on this route. A slim bar with a
 * brand link and "Back to Projects" replaces it.
 */
export default function CaseStudyLayout({
  caseStudy,
  toc,
  index,
}: {
  caseStudy: CaseStudy;
  toc: TocEntry[];
  index: string;
}) {
  const { frontmatter: fm, body } = caseStudy;

  return (
    <>
      <header className="nav">
        <div className="wrap nav__inner">
          <a className="nav__brand" href="/">
            {profile.name}
          </a>
          {/* Full label is kept for assistive tech; the tail is dropped
              visually on narrow screens so the bar stays on one line. */}
          <a className="nav__back" href="/#projects" aria-label="Back to Projects">
            <span aria-hidden="true">&larr; Back</span>
            <span className="nav__back-rest" aria-hidden="true"> to Projects</span>
          </a>
        </div>
      </header>

      <main>
        <article>
          <header className="cs-head">
            <div className="wrap">
              <p className="cs-head__eyebrow">Project / {index}</p>
              <h1 className="cs-head__title">{fm.title}</h1>

              {fm.summary && <p className="cs-head__summary">{fm.summary}</p>}

              <ProjectMeta
                variant="header"
                items={[
                  { label: "Status", value: fm.status ?? "" },
                  { label: "Role", value: fm.role ?? "" },
                  { label: "Type", value: fm.projectType ?? "" },
                  { label: "Year", value: fm.year ?? "" },
                ]}
              />

              {(fm.liveUrl || fm.githubUrl) && (
                <div className="cs-head__links">
                  {fm.liveUrl && (
                    <a className="btn btn--solid" href={fm.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Site
                    </a>
                  )}
                  {fm.githubUrl && (
                    <a className="btn btn--ghost" href={fm.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="section cs-main">
            <div className="wrap cs-body">
              <TableOfContents entries={toc} />
              <div className="cs-content">
                <Markdown>{body}</Markdown>
              </div>
            </div>
          </div>
        </article>

        <div className="section cs-foot">
          <div className="wrap">
            <a className="btn btn--ghost" href="/#projects">
              <span aria-hidden="true">&larr;</span> Back to Projects
            </a>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="wrap">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  );
}
