# Punta Cana Proposal Packages

A premium, bilingual wedding proposal package website for Punta Cana, Dominican Republic. Built with Next.js 15, Sanity CMS, and next-intl for multi-locale support.

## Features

- **Multi-locale routing** — Full UI translations in English and Spanish; blog content in 9 languages (EN, ES, FR, DE, IT, PT, ZH, RU, AR)
- **Headless CMS** — Content managed via Sanity.io with an embedded Studio at `/studio`
- **Proposal packages** — Three categories: Classic, Modern, and Dining proposals
- **Stories/Testimonials** — Individual couple story pages with galleries
- **SEO-optimized** — JSON-LD structured data, hreflang alternates, dynamic sitemaps, robots.txt
- **Contact form** — Package preference, date/time selection, and inquiry capture
- **Ahrefs analytics** integration

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 (strict) |
| CMS | Sanity.io v4 |
| i18n | next-intl v4 |
| Styling | Tailwind CSS v4, styled-components |
| Fonts | Playfair Display, Inter (Google Fonts) |

## Getting Started

### Prerequisites

- Node.js 18+
- A Sanity project (free tier works)

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

### Build

```bash
npm run build
npm run start
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Project Structure

```
src/
├── app/
│   ├── (root)/
│   │   └── [locale]/         # Locale-prefixed routes (en/es)
│   │       ├── page.tsx      # Home
│   │       ├── classic-proposals/
│   │       ├── modern-proposals/
│   │       ├── dining-proposals/
│   │       ├── stories/
│   │       ├── blog/
│   │       ├── contact/
│   │       ├── faq/
│   │       └── how-it-works/
│   └── studio/               # Sanity Studio (locale-independent)
├── components/               # Page-organized UI components
├── i18n/                     # Locale routing, message loading, hreflang helpers
├── sanity/
│   ├── schemaTypes/          # Sanity document/object type definitions
│   ├── queries/              # GROQ query strings
│   └── lib/                  # Sanity client, image URL builder
└── messages/
    ├── en.json               # English UI strings
    └── es.json               # Spanish UI strings
```

## Localization

The site uses `localePrefix: "as-needed"`:

- `/` — English (default, no prefix)
- `/es/...` — Spanish
- `/fr/blog/...` — Blog-only locales (FR, DE, IT, PT, ZH, RU, AR)

Non-blog routes for blog-only locales redirect to the root locale. Language detection is disabled; locale is set explicitly via URL.

Bilingual content (EN/ES) is stored in Sanity as structured objects: `{ en: string; es: string }`.

## Deployment

Recommended: [Vercel](https://vercel.com) — zero-config Next.js deployment.

1. Push to GitHub and connect to Vercel
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in Vercel environment settings
3. Deploy

For other hosts, run `npm run build` and serve with `npm run start`. Ensure environment variables are set on the host.
