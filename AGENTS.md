# Notes for AI coding assistants

Next.js 16 (App Router) + Sanity v4 + next-intl (en/es). Studio is embedded at
`/studio`. Follow [CONTRIBUTING.md](CONTRIBUTING.md). The rules that matter most:

- Run `npm run check` before finishing. It must pass with zero lint warnings.
- Extend existing components, queries and schemas instead of adding parallel
  versions. When new code replaces old code, delete the old code.
- Edit `src/sanity/structure.ts` surgically. Never replace it wholesale. Put
  every new document type in its page folder, and add it to the singleton /
  creatable lists in `src/sanity/constants.ts` and to the bilingual titles
  in `src/sanity/schemaTypes/shared/titles.ts` (see CONTRIBUTING).
- Don't rename Sanity `_type` values or delete documents without a migration
  the maintainer has approved.
- Never write minified or one-line code. Let Prettier format.
- No `any`, no hard-coded Sanity document IDs outside a named constant.
- Keep changes small and focused. One concern per PR.
