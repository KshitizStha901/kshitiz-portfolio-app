# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # type-checks, then produces a static export in out/
npm run lint     # next lint
```

There is no test suite. To preview exactly what GitHub Pages will serve:

```
npm run build && python3 -m http.server 4173 --directory out
```

## Architecture

Next.js App Router, configured for static export (`output: "export"` in `next.config.mjs`). There is no Node server at runtime; every page is prerendered at build time and the result in `out/` is what gets deployed. This constrains what's possible: no API routes, no `next/image` optimization (`images.unoptimized: true`), no server actions, no `dynamicParams` at request time. `trailingSlash: true` is set so paths resolve cleanly on the static host.

**Content lives in code, not a CMS**, split across three files by kind:
- `lib/content.ts` — all copy: profile, hero stats, about text, skills, experience, education, project cards, certifications, nav links. This is the file to edit for text changes. It imports identity/URLs from `lib/site.ts` rather than duplicating them.
- `lib/site.ts` — the single source of truth for the domain and social URLs (`site.url`, `site.social.github`, `site.social.linkedin`). Anything elsewhere that needs these must import from here, not hardcode a duplicate (see the fixed bug in `app/layout.tsx`'s history: it used to have its own `SITE` constant).
- `content/projects/*.md` — long-form case studies (see below).

**Markdown case-study system** (`lib/caseStudies.ts`, server-only, reads the filesystem at build time):
- Files live in `content/projects/<slug>.md` with YAML frontmatter (`title`, `slug`, `status`, `summary`, `projectType`, `role`, `year`, `liveUrl`, `githubUrl`, `featured`, `published`).
- A file only gets a route and a homepage link when `published: true`. `getPublishedSlugs()` feeds `generateStaticParams()` in `app/projects/[slug]/page.tsx`, and `dynamicParams = false` there means anything not returned is a build-time 404.
- Filenames starting with `_` (e.g. `_template.md`) are ignored — use that prefix for scaffolding that shouldn't appear on the site.
- HTML comments in the markdown body are stripped before rendering or TOC extraction (comments were leaking into rendered output and into the table of contents before this was added).
- `getProjectCards()` joins the homepage project list (`lib/content.ts`) with published case studies by `slug`, and frontmatter wins over the hardcoded card fields when both exist. This means case-study metadata (status/role/year/URLs) should be edited in the markdown frontmatter once it's published, not in `lib/content.ts`.
- Markdown renders via `components/Markdown.tsx` (`react-markdown` + `remark-gfm`), mapped to the site's own CSS classes (`.md__h2`, `.md__table`, etc.) rather than a generic prose plugin — section numbers ("01 / OVERVIEW") come from a CSS counter on `.md__h2`, not from the markdown itself. `extractToc()` in `lib/caseStudies.ts` walks h2/h3 headings (after stripping fenced code blocks, so a commented-out `## foo` in a bash example doesn't become a TOC entry) using the same slugify function the renderer uses for heading `id`s, so anchors always match.

**Component structure**: one file per homepage section in `components/` (`Hero`, `About`, `Skills`, `Experience`, `Projects`, `Certifications`, `Contact`), composed in `app/page.tsx`. Shared pieces: `ProjectCard`/`ProjectMeta` (used by both the homepage grid and the case-study header), `CaseStudyLayout` (the `/projects/[slug]` page shell), `SectionHead` (numbered section titles), `TableOfContents`.

**Animation** (`components/Motion.tsx`, Framer Motion): shared primitives `Reveal`, `Stagger`/`StaggerItem`, `HoverCard`. Convention: one axis of movement (small y-offset), `viewport={{ once: true }}` so nothing re-animates on scroll-back, and every variant collapses to zero-travel/plain-opacity under `useReducedMotion()`. `HoverCard` duplicates `StaggerItem`'s variants intentionally — without them it would fall outside its parent `Stagger`'s orchestration and pop in instantly instead of participating in the staggered reveal.

**Hydration fallback** (`app/layout.tsx` + `components/Nav.tsx`): because Framer Motion serializes `initial` state into the static HTML, animated elements ship as `style="opacity:0"` and are invisible until React hydrates. `layout.tsx` injects a `<noscript>` rule plus a 2.5s inline-script timer that force-reveals everything if hydration hasn't happened; `Nav.tsx` stamps `data-hydrated="1"` on `<html>` on mount to cancel that timer. Any new top-level animated component should not assume this safety net is optional — the page must never be permanently blank if JS is slow or absent.

**Optional assets** (`lib/media.ts`, server-only): `resolvePortrait()` / `publicFileExists()` check the filesystem at build time so an unset image (e.g. the About section's portrait) is simply omitted rather than rendering a broken `<img>`. Follow this pattern for any other optional media rather than assuming a file exists.

**Deploy**: `.github/workflows/deploy.yml` runs on push to `main` — `npm ci`, `npm run build`, then publishes `out/` via `actions/deploy-pages`. GitHub repo settings must have Pages source set to "GitHub Actions" (not "Deploy from a branch") for this to take effect; every deploy silently failed until this was set, because the workflow's `configure-pages` step 404s if Pages isn't already enabled with that source. The custom domain lives in `public/CNAME` and must match `lib/site.ts`'s `site.url`. DNS for the domain is hosted on Cloudflare (not the registrar directly, since the `.com.np` registrar only offers nameserver delegation, not record-level editing); GitHub Pages requires those DNS records to be **DNS only** (grey cloud), not Proxied, or GitHub cannot issue the HTTPS certificate.

## Conventions

- **No em dashes anywhere** — in copy, code comments, or docs. Use commas, periods, or parentheses instead. This is stated at the top of `lib/content.ts` and has been enforced throughout the codebase.
- Visual identity is fixed: cream/vanilla background, cherry-red accent, bold uppercase headings, hard rectangular borders (no rounded corners, no shadows, no gradients) — an editorial/brutalist look defined by CSS custom properties in `app/globals.css` (`--cream`, `--cherry`, `--border`, etc.). Preserve this when adding UI; don't introduce a different visual language.
- Don't invent facts, metrics, URLs, or technical details for project/case-study content — this has come up explicitly for the in-progress PingKeeper project, which must not get an invented architecture or case study until real content is provided.
