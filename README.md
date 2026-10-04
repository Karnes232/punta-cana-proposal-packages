# Punta Cana Proposal Packages

Bilingual (English/Spanish) website for private marriage proposals and romantic
dinners in Punta Cana. Built with Next.js 16, Sanity v4, next-intl and
Tailwind CSS v4, hosted on Netlify.

## Features

- **Proposal packages and romantic dinners** at `/proposals` and
  `/romantic-dinners`: configurable cards (style, guests, menus, drinks,
  extras) with a live price estimate. See
  [docs/experience-catalog.md](docs/experience-catalog.md).
- **Date requests, not bookings.** The request form (on the cards and at
  `/contact`) stores each request in Netlify Blobs for the team to review;
  nothing is reserved or charged automatically.
- **Stories, blog, FAQ, how it works and legal pages**, all edited in Sanity.
- **Embedded Sanity Studio** at `/studio`.
- **Languages:** the whole site in English and Spanish; blog posts also in
  French, German, Italian, Portuguese, Chinese, Russian and Arabic.
- **SEO:** per-page metadata from Sanity, hreflang alternates, JSON-LD,
  `sitemap.xml` and `robots.txt`.

## Tech stack

| Area      | Technology                                         |
| --------- | -------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript 5    |
| CMS       | Sanity v4 (embedded Studio, GROQ, TypeGen)         |
| i18n      | next-intl v4 (`localePrefix: "as-needed"`)         |
| Styling   | Tailwind CSS v4 (theme tokens in `globals.css`)    |
| Hosting   | Netlify (Next.js runtime, Netlify Blobs for forms) |
| Tests     | `node:test` (pricing, request API, components)     |

`styled-components` is installed only because Sanity Studio requires it; the
site itself doesn't use it.

## Getting started

Requirements: Node.js 24 (see `.nvmrc`) and access to the Sanity project.

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

The site runs at http://localhost:3000 and the Studio at
http://localhost:3000/studio.

### Environment variables

| Variable                         | Used for                                                  |
| -------------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sanity project (`czmzv5on`)                               |
| `NEXT_PUBLIC_SANITY_DATASET`     | Dataset (`production`)                                    |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional API version override                             |
| `SANITY_API_READ_TOKEN`          | Optional, for `catalog:audit` to include drafts           |
| `SANITY_API_WRITE_TOKEN`         | Only for `catalog:bootstrap` and `catalog:migrate-legacy` |

Never prefix a secret with `NEXT_PUBLIC_`. Request storage uses Netlify Blobs
with credentials Netlify provides, so under plain `next dev` the request API
returns 503; use Netlify Dev or a deploy preview to test it.

## Scripts

| Command                           | What it does                                                      |
| --------------------------------- | ----------------------------------------------------------------- |
| `npm run dev`                     | Local development server                                          |
| `npm run build` / `npm start`     | Production build / serve it                                       |
| `npm run check`                   | Typegen, typecheck, lint, format check and tests (same as CI)     |
| `npm test`                        | Unit and component tests                                          |
| `npm run typegen`                 | Regenerate `schema.json` and `sanity.types.ts`                    |
| `npm run lint` / `npm run format` | ESLint (zero warnings allowed) / Prettier                         |
| `npm run studio:build`            | Standalone Studio build                                           |
| `npm run catalog:bootstrap`       | Create missing catalog documents; never replaces existing ones    |
| `npm run catalog:audit`           | Export the dataset to `work/*.ndjson` and count documents by type |
| `npm run catalog:migrate-legacy`  | One-off: copy legacy proposal packages into `proposalExperience`  |

## Project structure

```
messages/                 next-intl UI strings (en.json, es.json)
scripts/                  maintenance scripts and the test runner
tests/                    node:test suites
src/
├── app/
│   ├── (root)/[locale]/  routes: home, proposals, romantic-dinners, contact,
│   │                     stories, blog, faq, how-it-works, legal, 404
│   ├── api/experience-requests/   request API (validates, stores in Blobs)
│   ├── studio/           embedded Sanity Studio
│   ├── globals.css       Tailwind import, theme tokens, upto* breakpoints,
│   │                     keyframes, catalog element defaults
│   ├── sitemap.ts, robots.ts
├── components/
│   ├── ExperienceCatalog/  home, catalog, cards, request form, nav, footer
│   │   └── styles.ts       shared Tailwind class helpers for the catalog
│   ├── ui/                 shared pieces (heroes, carousel, gallery, CTA…)
│   └── <Page>/             components for one page (BlogPage, FaqPage, …)
├── i18n/                 routing, message loading, locales, hreflang
├── lib/
│   ├── experience/       pricing, normalizing, default labels and copy
│   └── seo/              metadata builders
├── proxy.ts              middleware: legacy redirects, blog-only locales, next-intl
└── sanity/
    ├── schemaTypes/      document and object schemas
    ├── queries/          GROQ queries (one folder per page/area)
    ├── structure.ts      Studio sidebar
    ├── tools/            Studio tools (proposal and dinner templates)
    └── constants.ts      named document IDs and slugs
```

## Localization

- `/…` is English and `/es/…` is Spanish.
- Blog-only languages live under `/fr/blog/…`, `/de/blog/…` and so on. Any
  other path in those languages redirects to the English page (`src/proxy.ts`).
- Short UI text lives in `messages/{en,es}.json`. Catalog text that editors
  may want to change lives in Sanity (Catalog Settings and Catalog Home), with
  the current wording as the default in `src/lib/experience/`.

## Deployment

Netlify builds `main` for the live site (puntacanaproposalpackages.com). Other
branches and pull requests get their own deploys. Set the Sanity environment
variables in Netlify; Blobs needs no extra configuration.

The retired category URLs (`/classic-proposals`, `/modern-proposals`, …) are
redirected to `/proposals` in `src/proxy.ts`, because on Netlify the
middleware runs before `next.config` redirects.

See [CONTRIBUTING.md](CONTRIBUTING.md) before making changes.
