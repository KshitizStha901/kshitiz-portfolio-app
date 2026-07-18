import { certifications } from "@/lib/content";
import SectionHead from "./SectionHead";
import { Reveal, Stagger, StaggerItem } from "./Motion";

export default function Certifications() {
  const { headline, others } = certifications;

  return (
    <section className="section" id="certifications">
      <div className="wrap">
        <SectionHead index="05" title="Certifications" />

        {/* AWS is the headline credential, so it gets its own block and the largest type. */}
        <Reveal>
          <div className="cert cert--headline">
            <span className="cert__badge">Primary credential</span>
            <p className="cert__year">{headline.year}</p>
            <h3 className="cert__name">{headline.name}</h3>
          </div>
        </Reveal>

        <Stagger as="ul" className="cert-list" gap={0.08}>
          {others.map((c) => (
            <StaggerItem as="li" className="cert" key={c.name}>
              <p className="cert__year">{c.year}</p>
              <h3 className="cert__name">{c.name}</h3>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
