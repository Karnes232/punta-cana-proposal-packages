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
- **Every Sanity document type must be editable.** Adding a document type
  means adding it to `src/sanity/structure.ts`. Any type that isn't listed
  automatically appears under "Legacy (migrating)", so nothing is ever hidden.
  Edit the structure; never rewrite it wholesale.
- **Don't rename a Sanity `_type`** without a data migration. Existing
  documents keep the old name.
- **No hard-coded document IDs or slugs** scattered through the code. Put them
  in one named constant and import it.
- **No `any`.** Type query results. Lint runs with `--max-warnings=0`.
- **Bilingual by default.** Every user-facing string needs `en` and `es`.
- **Secrets stay out of git.** `.env*` files are ignored (except
  `.env.example`). Never prefix a secret with `NEXT_PUBLIC_`.

## Useful commands

| Command                | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Local site at http://localhost:3000, Studio at `/studio` |
| `npm run check`        | Typecheck, lint, format check, tests                     |
| `npm run format`       | Format everything with Prettier                          |
| `npm run build`        | Production build of the site                             |
| `npm run studio:build` | Standalone Studio build (what `sanity deploy` uses)      |

To make `git blame` skip the bulk formatting commit:
`git config blame.ignoreRevsFile .git-blame-ignore-revs`
