# Kshitiz Shrestha Portfolio

Personal portfolio site. Next.js, TypeScript, Framer Motion. Statically
exported and deployed to GitHub Pages.

## Structure

```
app/            pages, layout, global styles
components/     one file per section
lib/content.ts  site copy (jobs, projects, skills, etc.)
lib/site.ts     domain and social links
content/        markdown case studies
public/         static files (resume, favicon, CNAME, etc.)
```

## Development

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
```

## Editing content

Most text lives in `lib/content.ts`. To add a project, add an object to the
`projects` array.

To add a case study, create a markdown file in `content/projects/`. See
`_template.md` for the format. Set `published: true` to make it live.

## Deploy

Pushing to `main` triggers the GitHub Actions workflow, which builds the
site and publishes it to GitHub Pages. Custom domain is set in
`public/CNAME`.

DNS (A records pointing to GitHub Pages):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

CNAME record for `www` should point to `<github-username>.github.io`.
