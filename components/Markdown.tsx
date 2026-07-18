import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/caseStudies";

/**
 * Renders case-study markdown using the portfolio's own type scale.
 * Deliberately not a generic prose/typography plugin: every element maps to a
 * class in globals.css so the editorial look is preserved.
 *
 * h2 numbering ("01 / OVERVIEW") is applied by a CSS counter, so authors never
 * have to number sections by hand in the markdown.
 */

/** Flatten React children back to plain text so headings can get stable ids. */
function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (typeof node === "object" && "props" in node) {
    return toText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

const components: Components = {
  h1: ({ children }) => (
    <h2 className="md__h2" id={slugifyHeading(toText(children))}>
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="md__h2" id={slugifyHeading(toText(children))}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="md__h3" id={slugifyHeading(toText(children))}>
      {children}
    </h3>
  ),
  h4: ({ children }) => <h4 className="md__h4">{children}</h4>,

  p: ({ children }) => <p className="md__p">{children}</p>,
  ul: ({ children }) => <ul className="md__ul">{children}</ul>,
  ol: ({ children }) => <ol className="md__ol">{children}</ol>,
  li: ({ children }) => <li className="md__li">{children}</li>,
  blockquote: ({ children }) => <blockquote className="md__quote">{children}</blockquote>,
  hr: () => <hr className="md__hr" />,
  strong: ({ children }) => <strong className="md__strong">{children}</strong>,

  a: ({ href = "", children }) => {
    const external = isExternal(href);
    return (
      <a
        className="md__link"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },

  // Fenced blocks arrive as <pre><code>. Horizontal scrolling lives on the pre.
  pre: ({ children }) => <pre className="md__pre">{children}</pre>,

  code: ({ className, children, ...rest }: ComponentPropsWithoutRef<"code">) => {
    const fenced = typeof className === "string" && className.startsWith("language-");
    return (
      <code className={fenced ? className : "md__code"} {...rest}>
        {children}
      </code>
    );
  },

  // Alt text doubles as a caption, which suits the editorial layout.
  img: ({ src, alt }) => (
    <figure className="md__figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="md__img" src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" />
      {alt ? <figcaption className="md__caption">{alt}</figcaption> : null}
    </figure>
  ),

  // Wrapper keeps wide tables scrollable instead of blowing out the page.
  table: ({ children }) => (
    <div className="md__table-wrap">
      <table className="md__table">{children}</table>
    </div>
  ),
};

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
