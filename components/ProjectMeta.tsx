/**
 * The STATUS / ROLE / YEAR strip. Shared by the project cards and the
 * case-study header so the two never drift apart.
 */
export type MetaItem = { label: string; value: string };

export default function ProjectMeta({
  items,
  variant = "card",
}: {
  items: MetaItem[];
  variant?: "card" | "header";
}) {
  const visible = items.filter((i) => i.value);
  if (visible.length === 0) return null;

  return (
    <dl className={variant === "header" ? "pmeta pmeta--header" : "pmeta"}>
      {visible.map((i) => (
        <div className="pmeta__cell" key={i.label}>
          <dt className="pmeta__label">{i.label}</dt>
          <dd className="pmeta__value">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
