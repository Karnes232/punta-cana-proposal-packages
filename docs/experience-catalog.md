# Experience catalog

How the home page, proposal packages, romantic dinners and date requests work.
Keep this file up to date when you change the catalog.

## Pages

| Route                                           | Component(s)                                     |
| ----------------------------------------------- | ------------------------------------------------ |
| `/`                                             | `HomePage` (`src/components/HomePage/`)          |
| `/proposals`                                    | `Catalog section="proposals"` → `ProposalGrid`   |
| `/romantic-dinners`                             | `Catalog section="romantic-dinners"`             |
| `/proposals/[slug]`, `/romantic-dinners/[slug]` | single `ExperienceCard`                          |
| `/contact`                                      | `AvailabilityForm` without a selected experience |

The header and footer render on every page from
`src/app/(root)/[locale]/layout.tsx`. They live in `src/components/Layout/`:
`Navbar/Navbar.tsx` (desktop bar, phone menu, language switchers) and
`Footer/Footer.tsx`, each split into one file per part.

The old category pages (`/classic-proposals`, `/modern-proposals`,
`/dining-proposals`, `/adventure-proposals` and their detail URLs) redirect
to `/proposals` (with the package slug as the `#hash`) in `src/proxy.ts`.

## Content in Sanity

The site is in English, Spanish, French and Portuguese. Content follows two
models:

- **One document per language** (`PER_LANGUAGE_TYPES` in
  `src/sanity/constants.ts`): Catalog Settings, Home and Contact, page SEO,
  legal pages, page sections, stories and FAQs. Each language is its own
  document, `<base>-<language>` for the fixed ones (e.g. `catalogHome-fr`),
  linked by a `translation.metadata` document (the
  `@sanity/document-internationalization` plugin; its Translations menu
  creates and opens the other languages). The site reads the visitor's
  language and falls back to English while a language isn't written yet
  (SEO never falls back). Photos, featured proposals and the dinner deposit
  are shared and live on the English documents only.
- **Shared, with every language in its fields** (`localizedString`,
  `localizedText`): packages, dinners, add-ons, menu, drinks, occasions,
  categories and business info, so prices, styles, photos and the IDs that
  requests rely on exist once.

The blog stays outside the plugin: its posts are one document per language in
nine languages (`language` + `translationGroup`), and its hero, banner and
categories hold the nine languages in their fields.

- **Proposal experiences** (`proposalExperience`) and **romantic dinner
  experiences** (`romanticDinnerExperience`): styles with prices and photos,
  inclusions, extras, menus and drinks (dinners). Only active documents are
  shown; inactive ones (such as "Adventure to Yes") stay out of public lists
  and the sitemap until an editor turns them on.
- **Catalog Settings** (`experienceCatalogSettings`): every editable label
  (navigation, card text, hero lines, notes, footer…), the dinner deposit
  amount and policy messages. Defaults live in `src/lib/experience/labels.ts`,
  `introduction.ts` and `dinnerPolicy.ts`; `label()` uses the Sanity value
  when it is filled in. The catalog documents hold the site's current text
  and photos; the code defaults (in all four languages) are only a safety net
  for fields an editor leaves blank.
- **Catalog Home** (`catalogHome`): home page text (`copy`, defaults in
  `homeCopy.ts`, read with `homeText()`), hero and selector photos, up to
  three featured proposals, journey/editorial/moments photos. Without featured
  proposals, the slugs in `FEATURED_FALLBACK_SLUGS` are used; without a hero
  photo, the first featured proposal's photo is used.
- **Catalog Contact** (`catalogContact`): the contact page heading, text and
  business information. Phone, email and WhatsApp come from **Business &
  social links** (`generalLayout`), the same values the footer shows.
- **SEO**: each page's title, description and sharing image are one `pageSeo`
  document per language with the ID `pageSeo-<page>-<language>` (`SEO_PAGES`,
  `pageSeoId()`), shown as "SEO" inside the page's Studio folder. `catalogPageMetadata()` reads it
  for home, proposals, romantic dinners and contact, and falls back to the
  page's default title. Each package's own SEO is its `seo` field.
- **Studio tools** (`src/sanity/tools/`): the proposal and dinner template
  tools fill a draft from the approved template content.

Named IDs and slugs are in `src/sanity/constants.ts`. Queries are in
`src/sanity/queries/ExperienceCatalog/`.

## Cards and pricing

`ExperienceCard` is one component with two modes:

- **Selectable** (the `/proposals` grid): compact card; clicking selects it
  and opens its configuration; the request form opens in a dialog.
- **Full** (dinners and detail pages): everything visible; the form opens
  inline.

Selection state lives in `ExperienceCard/useExperienceSelection.ts`; each part
of the card is a section component in `ExperienceCard/`. Prices are
calculated by `src/lib/experience/pricing.ts`, the same code the request API
uses. The approved proposal extras (drone, violinist, saxophonist, dinner for
two) and their prices are in `src/lib/experience/proposalExtras.ts`.

On localhost and Netlify deploy previews (`isPreviewHost` in
`src/lib/requestHost.ts`), `/romantic-dinners` shows the editable dinner
example from the template; its form is preview-only and sends nothing.

## Date requests

The form posts to `src/app/api/experience-requests/route.ts`, which:

1. reloads the experience and prices from Sanity and validates dates, styles,
   menus, extras and quantities;
2. calculates the estimate on the server;
3. stores the request (contact details, preferences, configuration, estimate,
   policy snapshot, `status: "new"`) in Netlify Blobs under a new UUID.

Deploy previews (`deploy-preview-N--…`) write to the
`experience-requests-preview` store; every other host writes to
`experience-requests`. Nothing is reserved, held or charged: the team
reviews requests, confirms availability, and asks for the deposit by hand.
Plain `next dev` has no Blobs credentials, so the API returns 503 there.

## Styling

Everything uses Tailwind classes. Shared class helpers are in
`src/components/ExperienceCatalog/styles.ts`, the `upto*` breakpoints and
catalog element defaults (scoped to `.ec-shell`) are in
`src/app/globals.css`. See "Styling" in [CONTRIBUTING.md](../CONTRIBUTING.md).

## Tests

`npm test` covers pricing, the request API (validation, storage, duplicate
dates) and the card components in English and Spanish.
