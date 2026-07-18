import { skills } from "@/lib/content";
import SectionHead from "./SectionHead";
import { Stagger, StaggerItem } from "./Motion";

export default function Skills() {
  return (
    <section className="section section--alt" id="skills">
      <div className="wrap">
        <SectionHead index="02" title="Skills" />

        <Stagger as="ul" className="skills" gap={0.06}>
          {skills.map((group) => (
            <StaggerItem as="li" className="skill" key={group.name}>
              <h3 className="skill__name">{group.name}</h3>
              <div className="skill__tags">
                {group.items.map((item) => (
                  <span className="skill__tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
