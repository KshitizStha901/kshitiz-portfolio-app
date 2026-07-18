---
title: "Aminu Nepal"
slug: "aminu-nepal"
status: "Production"
projectType: "Ecommerce Platform"
role: "Solo, End to End Full-Stack"
year: "2026"
summary: "A production ecommerce storefront for a Nepali skincare brand, designed, built and shipped solo, with a separate standalone admin panel behind it."
liveUrl: ""
githubUrl: ""
featured: true
published: true
---

<!--
  Everything below is assembled strictly from facts already recorded in
  lib/content.ts. Nothing here is invented.

  Sections you may want to add yourself, since only you have the material:
  The Problem, Challenges, What I Learned, Future Improvements.
  Add them as `## Heading` and they join the table of contents automatically.

  Architecture diagram, once you have one:
  ![Aminu Nepal architecture](/projects/aminu-nepal/architecture.png)
-->

## Overview

Aminu Nepal is a production ecommerce storefront for a Nepali skincare brand.
I designed and shipped it independently, end to end, which meant the customer
storefront, the backend API and a separate standalone admin panel were all mine
to build and keep running.

It is a real store rather than a demo: it handles products, collections,
ingredients, coupons, orders and customer accounts.

## My Role

Solo. There was no team to split this with, so the whole surface was my
responsibility:

- Frontend storefront and the separate admin panel
- Backend API and data model
- Authentication and access control
- Image and email infrastructure
- Deployment and the ongoing migration described below

## Architecture

The system is three deployable pieces rather than one monolith:

1. **Storefront**, a Next.js 16 App Router application in TypeScript.
2. **Admin panel**, a second standalone Next.js application, kept separate from
   the storefront so the two have independent surfaces.
3. **Backend API**, a Node.js and Express service using Prisma ORM over MySQL.

Client requests do not talk to the backend directly. They are proxied through
`/api-proxy/*`, so the backend origin is never exposed to the browser.

## Authentication

Authentication is JWT based, with tokens delivered as `httpOnly` cookies rather
than stored anywhere JavaScript can reach them.

The admin side adds role based access control with two roles:

| Role | Access |
| --- | --- |
| `superadmin` | Full access across every resource |
| `editor` | Content level access |

## The Admin System

The admin panel provides full CRUD across the entities the store actually runs
on:

- Products
- Orders
- Blogs
- Coupons
- Users
- Collections
- Ingredients

## Media and Email

Product and content imagery goes through **Cloudinary**, so uploads, storage and
delivery are handled outside the application server.

Transactional email is sent with **Nodemailer**.

## Ordering

Order processing currently supports cash on delivery, which is the payment
method the store operates with today.

## Deployment and Current Work

The backend is being migrated from Render to **AWS EC2**. That work is ongoing
at the time of writing, so the deployment story here is a snapshot rather than a
finished state.
