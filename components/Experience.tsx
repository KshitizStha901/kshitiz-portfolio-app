import { education, experience, type Job } from "@/lib/content";
import SectionHead from "./SectionHead";
import { Reveal, Stagger, StaggerItem } from "./Motion";

function JobEntry({ job }: { job: Job }) {
  return (
    <StaggerItem as="li" className="job">
      <p className="job__meta">
        <span>{job.date}</span>
        {job.type && <span className="job__type">{job.type}</span>}
      </p>

      <h3 className="job__role">{job.role}</h3>

      <p className="job__org">
        {job.org}
        {job.link && (
          <>
            {" ("}
            <a href={job.link.href} rel="noopener" target="_blank">
              {job.link.label}
            </a>
            {")"}
          </>
        )}
      </p>

      {job.points.length > 0 && (
        <ul className="job__points">
          {job.points.map((point) => (
            <li key={point.slice(0, 32)}>{point}</li>
          ))}
        </ul>
      )}
    </StaggerItem>
  );
}

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead index="03" title="Experience" />

        <Stagger as="ol" className="timeline" gap={0.1}>
          {experience.map((job) => (
            <JobEntry job={job} key={job.role + job.org} />
          ))}
        </Stagger>

        <Reveal>
          <h2 className="section__title section__title--sub">Education</h2>
        </Reveal>

        <Stagger as="ol" className="timeline" gap={0.1}>
          {education.map((job) => (
            <JobEntry job={job} key={job.role + job.org} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
