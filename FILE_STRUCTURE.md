# Project file structure

Overview of the **Punta Cana proposal packages** Next.js app: **App Router**, **next-intl** i18n, **Sanity CMS**, and **page-scoped React components**.

---

## Top level

```
punta-cana-proposal-packages/
├── messages/                 # next-intl JSON catalogs (en, es)
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # UI by page / feature
│   ├── i18n/                 # Locale routing, navigation, requests
│   ├── sanity/               # CMS client, schemas, GROQ queries
│   └── proxy.ts              # next-intl middleware (matcher + routing)
├── next.config.ts
├── package.json
├── sanity.cli.ts             # Sanity CLI (project id, dataset)
├── sanity.config.ts          # Studio config (schema, plugins)
├── tailwind.config.ts
└── tsconfig.json
```

---

## i18n (`messages/` + `src/i18n/`)

| Path                     | Role                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| `messages/en.json`       | English UI strings for `next-intl`                                     |
| `messages/es.json`       | Spanish UI strings                                                     |
| `src/i18n/routing.ts`    | `defineRouting` — locales (`en`, `es`), default locale, `localePrefix` |
| `src/i18n/request.ts`    | `getRequestConfig` — loads messages for the active locale              |
| `src/i18n/navigation.ts` | Locale-aware `Link`, `redirect`, `usePathname`, etc.                   |
| `src/i18n/hreflang.ts`   | Alternate-language / SEO helpers                                       |

**App integration:** Routes live under `src/app/(root)/[locale]/…`. `next-intl` is wired via `next.config.ts` (`createNextIntlPlugin`) and locale handling in `src/app/(root)/[locale]/layout.tsx`. Middleware-style setup is in `src/proxy.ts` (next-intl `createMiddleware` + matcher).

---

## App Router (`src/app/`)

```
src/app/
├── globals.css
├── layout.tsx                    # Root HTML shell
├── (root)/
│   ├── layout.tsx                # Layout wrapping locale routes
│   └── [locale]/
│       ├── layout.tsx            # Per-locale: NextIntlClientProvider, etc.
│       ├── page.tsx              # Home
│       ├── blog/page.tsx
│       ├── contact/page.tsx
│       ├── faq/page.tsx
│       ├── how-it-works/page.tsx
│       ├── privacy-policy/page.tsx
│       ├── terms-of-service/page.tsx
│       ├── classic-proposals/page.tsx
│       ├── modern-proposals/page.tsx
│       ├── dining-proposals/page.tsx
│       └── stories/
│           ├── page.tsx          # Stories index
│           └── [slug]/page.tsx   # Individual story
└── studio/
    └── [[...tool]]/
        ├── layout.tsx
        └── page.tsx              # Embedded Sanity Studio
```

- **`(root)`** — Route group for the main site shell (shared layout with navbar/footer).
- **`[locale]`** — Dynamic segment for `en` / `es` URLs.
- **`studio`** — Sanity Studio at `/studio` (outside the `[locale]` tree).

---

## Components (`src/components/`)

Organized by **page or domain**, not a flat `components/` dump:

```
src/components/
├── BlockContent/              # Portable Text / rich content rendering
├── ContactPage/
├── FaqsPage/
├── HomePage/
│   ├── BrandStatement/
│   ├── CTABanner/
│   ├── FeaturedStory/
│   ├── HeroComponents/
│   ├── HowItWorks/
│   ├── PackageCategories/
│   └── TrustIndicators/
├── HowItWorksPage/
├── IndividualStoryPage/
├── LanguageSwitcher/
├── Layout/
│   ├── Footer/
│   └── Navbar/
├── StoriesPage/
└── ui/                        # Shared primitives (e.g. RevealOnScroll)
```

Page files under `src/app/(root)/[locale]/…` import from these folders as needed.

---

## Sanity (`src/sanity/` + root Sanity config)

**Root (tooling & Studio entry)**

| File               | Role                                                |
| ------------------ | --------------------------------------------------- |
| `sanity.config.ts` | Studio schema registration, plugins, project wiring |
| `sanity.cli.ts`    | CLI project / dataset                               |

**Runtime & Studio support (`src/sanity/`)**

```
src/sanity/
├── env.ts                     # Sanity env (project id, dataset, API version)
├── structure.ts               # Studio desk structure
├── lib/
│   ├── client.ts              # Sanity client
│   ├── image.ts               # Image URL helpers
│   └── live.ts                # Live content / preview hooks if used
├── schemaTypes/
│   ├── index.ts               # Exports all document/object types
│   ├── ContactPage/
│   ├── FaqsPage/
│   ├── GeneralLayout/
│   ├── HomePage/
│   ├── HowItWorksPage/
│   ├── LegalDocuments/
│   ├── Localized/             # localized.ts — shared localization patterns
│   ├── SEO/
│   └── StoriesPage/
└── queries/                   # GROQ queries grouped like schemaTypes
    ├── ContactPage/
    ├── FaqsPage/
    ├── GeneralLayout/
    ├── HomePage/
    ├── HowItWorksPage/
    ├── LegalDocuments/
    ├── SEO/
    └── StoriesPage.ts/        # Note: folder name includes “.ts”
```

**Schema folders → content domains**

- **HomePage** — Hero, brand, package categories, featured story, CTA, how-it-works steps, trust, etc.
- **StoriesPage** — Hero, `IndividualStory`, `ProposalType`
- **HowItWorksPage** — Hero, steps, FAQ, CTA
- **FaqsPage** — FAQs, hero, contact strip, categories
- **ContactPage** — Page content
- **GeneralLayout** — Nav/footer-style singleton
- **LegalDocuments** — Legal text documents
- **SEO** — Page-level SEO types

**Queries** mirror the same folder names; each file exports GROQ strings / query functions consumed by Server Components or data loaders in the App Router.

---

## Quick mental model

1. **URL** → `src/app/(root)/[locale]/…` picks the page.
2. **Copy (UI chrome)** → `messages/*.json` + `src/i18n/*`.
3. **Copy & media (CMS)** → `src/sanity/schemaTypes` + `src/sanity/queries` → fetched in route `page.tsx` / layouts.
4. **Rendering** → `src/components/<PageName>/…` + shared `Layout`, `BlockContent`, `ui`.

---

_Generated from the repository layout. Re-run or edit this file when you add routes, schemas, or top-level folders._
