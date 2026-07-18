import { about } from "@/lib/content";
import { resolvePortrait } from "@/lib/media";
import SectionHead from "./SectionHead";
import { Reveal } from "./Motion";

export default function About() {
  // Build-time check. No file on disk means no frame is rendered at all,
  // so there is never a broken image placeholder.
  const portrait = resolvePortrait(about.portrait.src);

  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionHead index="01" title="About" />

        <div className={portrait ? "about about--portrait" : "about"}>
          <Reveal className="about__aside">
            <p className="about__lead">{about.lead}</p>

            {portrait && (
              <figure className="portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="portrait__img" src={portrait} alt={about.portrait.alt} />
              </figure>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="about__body">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
