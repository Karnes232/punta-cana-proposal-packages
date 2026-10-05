# Contributing

How to make changes to this site without making it harder to work on. Read it
before opening a pull request, and point your AI tools at it too.

## Workflow

1. Branch from `main`. You can't push to `main` directly.
2. Keep each PR to one concern ("restore Studio list", "format repo"), not a
   week of mixed changes.
3. Run `npm run check` before pushing. It runs typecheck, lint, the format
   check and tests, the same steps CI runs (CI also builds the site and the
   Studio).
4. Open a PR. It can merge once the `ci` check is green.

Formatting is Prettier's job. Run `npm run format` and don't hand-format.
Never commit minified or one-line code.

## Where things live

| Path                             | What goes there                                                             |
| -------------------------------- | --------------------------------------------------------------------------- |
| `src/app/(root)/[locale]/`       | Routes. Keep pages thin: fetch data, render components.                     |
| `src/components/<Area>/`         | Components, grouped by page or feature (`BlogPage/`, `ExperienceCatalog/`). |
| `src/lib/<domain>/`              | Non-UI logic: pricing, normalizing, SEO helpers.                            |
| `src/sanity/schemaTypes/<Area>/` | Sanity schemas. Register every one in `schemaTypes/index.ts`.               |
| `src/sanity/queries/<Area>/`     | GROQ queries and their result types.                                        |
| `src/sanity/structure.ts`        | Studio sidebar.                                                             |
| `messages/{en,es}.json`          | UI strings for next-intl.                                                   |
| `scripts/`                       | One-off and maintenance scripts (Node).                                     |
| `tests/`                         | `node:test` tests, run by `npm test`.                                       |

## Rules

- **Extend, don't duplicate.** Before adding a component, query, helper or
  schema, search for an existing one and extend it. A parallel version of
  something that already exists (a second navbar, a second contact form, a
  second content model) is how this codebase got messy.
- **Delete what you replace.** When new code takes over from old code, remove
  the old code in the same PR.
- **Every Sanity document type must be editable, in the right place.** The
  Studio sidebar mirrors the website (one folder per page). Adding a document
  type means:
  - placing it in its page folder in `src/sanity/structure.ts` (any type
    that isn't placed falls into the "Other types" catch-all, so nothing is ever
    hidden, but it won't be where the client looks);
  - if the site reads it as "the one document of this type", adding it to
    `PAGE_SINGLETONS` in `src/sanity/constants.ts` (no create, delete or
    duplicate);
  - if editors may add documents of it, adding it to `CREATABLE_TYPES`;
  - giving it bilingual titles ("Español / English") in
    `src/sanity/schemaTypes/shared/titles.ts`.

  Edit the structure; never rewrite it wholesale.

- **Don't rename a Sanity `_type`** without a data migration. Existing
  documents keep the old name, and `_type` and `_id` can't be changed: copy
  each document to the new type and ID, point references at the copy, then
  delete the original (see `scripts/migrate-studio-content.mjs`).
- **No hard-coded document IDs or slugs** scattered through the code. Put them
  in one named constant and import it.
- **No `any`.** Type query results. Lint runs with `--max-warnings=0`.
- **Regenerate Sanity types after changing a schema or a `defineQuery` query:**
  `npm run typegen` (also part of `npm run check`) updates `schema.json` and
  `sanity.types.ts`; commit both. CI fails if they're out of date.
- **Bilingual by default.** Every user-facing string needs `en` and `es`.
- **Secrets stay out of git.** `.env*` files are ignored (except
  `.env.example`). Never prefix a secret with `NEXT_PUBLIC_`.

## Styling

- Use Tailwind classes in the component. There is no per-feature stylesheet;
  `src/app/globals.css` holds the theme tokens (`gold`, `ivory`, `black`,
  `gray`, fonts, fluid type sizes), keyframes and a small base layer.
- Experience catalog breakpoints use the `upto390`, `upto600`, `upto700`,
  `upto800` and `upto1280` variants (inclusive max-width, e.g.
  `upto700:p-6`), not `max-[700px]:`, which switches 1px later.
- Reuse the helpers in `src/components/ExperienceCatalog/styles.ts`
  (`shellClass`, `wrapClass`, `buttonClass`, `eyebrowClass`, the `home*`
  blocks). To change one part of a button, pass that part (`layout`,
  `height`, `colors`, ...) rather than adding a second conflicting class.
- Element defaults inside catalog pages (`p`, `small`, form fields, headings)
  are the `@layer base` block in `globals.css`, scoped to `.ec-shell`. A
  class on the element overrides them.
- Shared page pieces live in `src/components/ui/` (hero backgrounds and
  headings, CTA strip, carousel, gallery, load more). Use them instead of
  copying markup.

## Where text lives

- **Editable catalog text** (proposals, dinners, home, nav, footer): the
  defaults are in `src/lib/experience/labels.ts` (`ui`) and `homeCopy.ts`.
  Adding a key there and to `labelKeys` (or `homeCopy`) gives editors a field
  in Catalog Settings / Catalog Home; `label()` and `homeText()` fall back to
  the default when the field is empty.
- **Other UI text** (blog, stories, FAQ, gallery, 404): `messages/en.json`
  and `messages/es.json`, read with `useTranslations` / `getTranslations`.
- Page content itself (headings, paragraphs, images) comes from Sanity.
- Don't write `locale === "es" ? "…" : "…"` in components.

## Constants, tools and redirects

- Named document IDs and slugs: `src/sanity/constants.ts`.
- Studio tools (proposal and dinner templates): `src/sanity/tools/`.
- Legacy URL redirects and blog-only locale handling: `src/proxy.ts`.
- One-off Sanity scripts: `scripts/` (`npm run catalog:*`). Back up the
  dataset before running anything that writes to production.

## Useful commands

| Command                | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Local site at http://localhost:3000, Studio at `/studio` |
| `npm run check`        | Typegen, typecheck, lint, format check, tests            |
| `npm test`             | Pricing, request API and component tests                 |
| `npm run typegen`      | Regenerate `schema.json` and `sanity.types.ts`           |
| `npm run format`       | Format everything with Prettier                          |
| `npm run build`        | Production build of the site                             |
| `npm run studio:build` | Standalone Studio build (what `sanity deploy` uses)      |

To make `git blame` skip the bulk formatting commit:
`git config blame.ignoreRevsFile .git-blame-ignore-revs`
