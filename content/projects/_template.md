---
title: "Project Name"
slug: "project-name"
status: "In Progress"
projectType: "Monitoring Tool"
role: "Solo"
year: "2026"
summary: "One or two sentences. This appears under the title on the case-study page and in the page description for search and link previews."
liveUrl: ""
githubUrl: ""
featured: false
published: false
---

<!--
  HOW THIS FILE WORKS

  Filename    content/projects/<slug>.md
  Underscore  files starting with _ are ignored, which is why this template
              never appears on the site.

  published: false  no route is generated, and the homepage card shows no
                    "View Case Study" link.
  published: true   the route /projects/<slug>/ is generated at build time and
                    the homepage card links to it automatically.

  Frontmatter is the source of truth for status, role, year, projectType,
  liveUrl and githubUrl. When this file is published, those values override
  whatever the card in lib/content.ts says, so facts are written once.

  Leave liveUrl or githubUrl as "" and the buttons simply do not render.

  The slug here must match the `slug` on the matching project in
  lib/content.ts, otherwise the homepage card will not find this file.

  Section numbering ("01 / OVERVIEW") is added automatically by CSS.
  Do not number headings by hand.

  ## headings become the table of contents (### nests under them).
  A contents list only appears once there are at least three headings.

  Images go in public/projects/<slug>/ and are referenced from the site root:
  ![Describe the diagram](/projects/<slug>/architecture.png)
  The alt text is also rendered as the visible caption.
-->

## Overview

What the project is, in a couple of paragraphs.

## The Problem

What needed solving.

## Architecture

How the pieces fit together.

![Describe the diagram here](/projects/project-name/architecture.png)

## Technical Decisions

What you chose, and why you chose it over the alternative.

## Challenges

What actually went wrong and how you dealt with it.

## What I Learned

## Future Improvements
