import type { ProjectCardData } from "@/lib/caseStudies";
import ProjectMeta from "./ProjectMeta";
import { HoverCard } from "./Motion";

/**
 * Homepage project card. Concise overview only, the long form lives on
 * /projects/<slug>. Every link is conditional: nothing renders unless a real
 * URL exists, and the case-study link only appears for a published markdown file.
 */
export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const { liveUrl, githubUrl, hasCaseStudy, slug } = project;
  const hasLinks = Boolean(liveUrl || githubUrl || (hasCaseStudy && slug));

  return (
    <HoverCard className={project.featured ? "project project--featured" : "project"}>
      <div className="project__head">
        <h3 className="project__name">{project.name}</h3>
        <span className="badge">{project.badge}</span>
      </div>

      <p className="project__context">{project.context}</p>
      <p className="project__tagline">{project.tagline}</p>
      <p className="project__desc">{project.summary}</p>

      <ProjectMeta
        items={[
          { label: "Role", value: project.role ?? "" },
          { label: "Type", value: project.projectType ?? "" },
          { label: "Year", value: project.year ?? "" },
        ]}
      />

      {project.stack && (
        <div className="project__stack">
          {project.stack.map((row) => (
            <div className="project__stack-row" key={row.label}>
              <span className="project__stack-label">{row.label}</span>
              <div className="skill__tags">
                {row.items.map((item) => (
                  <span className="skill__tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {project.note && <p className="project__meta">{project.note}</p>}

      {hasLinks && (
        <div className="project__links">
          {hasCaseStudy && slug && (
            <a className="project__link project__link--primary" href={`/projects/${slug}/`}>
              View Case Study <span aria-hidden="true">&rarr;</span>
            </a>
          )}
          {liveUrl && (
            <a className="project__link" href={liveUrl} target="_blank" rel="noopener noreferrer">
              Live Site
            </a>
          )}
          {githubUrl && (
            <a className="project__link" href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>
      )}
    </HoverCard>
  );
}
