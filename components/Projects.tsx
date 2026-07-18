import { getProjectCards } from "@/lib/caseStudies";
import SectionHead from "./SectionHead";
import ProjectCard from "./ProjectCard";
import { Stagger } from "./Motion";

export default function Projects() {
  // Server component: reads content/projects/*.md at build time to decide
  // which cards get a "View Case Study" link.
  const cards = getProjectCards();

  return (
    <section className="section section--alt" id="projects">
      <div className="wrap">
        <SectionHead index="04" title="Projects" />

        <Stagger as="ul" className="projects" gap={0.1}>
          {cards.map((p) => (
            <ProjectCard project={p} key={p.name} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
