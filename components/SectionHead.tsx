import { Reveal } from "./Motion";

/** Shared section heading: index number plus title, over a heavy rule. */
export default function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <div className="section__head">
        <span className="section__index">{index}</span>
        <h2 className="section__title">{title}</h2>
      </div>
    </Reveal>
  );
}
