# Current implementation — September 29, 2026

This update reuses the Next.js 16 / React 19 application, EN/ES routes, Sanity production content, shared pricing and request storage. It does not migrate/delete existing CMS documents or replace the existing blog, stories, legal, FAQ or legacy detail routes. Adventure to Yes is intentionally excluded from public package queries and the sitemap.

## Home

The home route uses ExperienceHome rather than the complete catalog. A full-height real Sanity photograph leads with proposals, followed by an interactive two-experience selector, trust benefits, up to three featured proposals, a five-step pickup journey, a real editorial photo sequence, a secondary private-dinner section, eight planning steps and a native-dialog photo gallery. There are no configurators/forms on Home. Featured links select the relevant card on /proposals via its hash; cards still never navigate to new detail pages.

The existing black/ivory/gold palette and Playfair/Inter fonts remain. Images use Next Image, lazy loading except the hero, responsive sizes and quality 80. Hero content enters once; motion and transitions respect reduced-motion preferences. The header is sticky, transparent over the home hero and solid after scrolling. The larger logo, active links, contextual proposal/celebration CTA, full navigation and EN/ES links are shared. The mobile menu expands in the header flow and closes with Escape. Blog language alternates reuse the existing translation context.

Proposal forms use a native modal dialog on the same page to avoid stretching the grid. Package/style/extra state stays in the existing cards. Dialogs provide keyboard focus containment and Escape dismissal. Home photo galleries restore focus to the invoking thumbnail.

## Sanity editing

- Catalog Settings: bilingual navigation labels, exclusivity, one-couple-or-group-per-night message, date preference warning, deposit/remaining-balance policy and submission success text. `dinnerDepositAmount` defaults to USD200; policy messages use `{deposit}` so changes remain consistent.
- Home: bilingual `copy` fields, hero/selector photographs, up to three ordered `featuredProposals` references (legacy or current packages), five ordered `journeyImages`, `editorialImages` and `moments`. Copy fields initialize with the approved business text on new documents; published overrides are read at runtime. No public driver identity is stored or displayed.
- Proposal experiences gain optional location and badge fields. Missing durations and inclusions are not invented. Featured cards show only real supplied values, with a maximum of four inclusions.
- Existing dinner/menu/style/extras documents remain editable through the existing Studio tools.

No verified same-location before/after pair was supplied, so the website uses a real editorial sequence instead of a fabricated comparison. No verified driver/vehicle photos or short videos were supplied: transport steps use consistent line icons until actual journey photographs are assigned; the real proposal photograph is used for the hero. Existing gallery photographs come from Sanity, without invented testimonials or names. The master attachment ends in section 16; this implementation covers its supplied content.

## Date requests, not automatic reservations

Clients configure dinner style, guests, occasion, individual three-course menus, cocktails, shared wine and extras. They can supply preferred and alternative dates, date flexibility, accommodation, contact information, comments and optional fragrance sensitivity. Preferred date is required for a dinner inquiry. The published example can accept a manually reviewed request without being activated as a confirmed/bookable inventory item.

The server reloads the selected experience and price data from Sanity. It validates real calendar dates, input types, menu/style/extra identities and applicable prices. Unknown capacity may be requested, but is explicitly marked for quotation/manual review; a configured maximum is respected. Guest-menu counts are checked before iteration. No calendar, temporary hold, inventory decrement, payment or reservation is created.

Every valid request receives its own UUID and UTC timestamp in private Netlify Blobs with `status: new`, contact data, date preferences, selected configuration, server-calculated estimate and payment-policy snapshot. Multiple clients may submit the same preferred date. The deposit status remains `not_requested`. Netlify preview requests use a separate store. Success appears only after a durable write, explicitly stating that the team will confirm availability and provide the next step for the deposit. No automatic email notification or checkout is configured.

Operational flow: request → manual agenda/capacity review → availability communicated → USD200 deposit requested and received → reservation officially confirmed → remaining balance paid on dinner day. “One table / one group per evening” communicates exclusivity, not real-time availability.

## Verified

37 pricing, component and API tests pass, including duplicate-date requests with unique IDs, date validation, request-only capacity handling, preserved configuration, editable deposit amount and non-confirming success messages. TypeScript and scoped ESLint pass. Browser checks cover EN/ES Home, exactly three featured packages, no Home forms, selector changes, pickup steps, gallery navigation/Escape/focus restoration, mobile navigation, card selection from featured links and proposal request dialogs. Existing Blog link remains in the footer.

## Deployment

Work is on `feat/experience-catalog`. GitHub reports that the earlier PR #2 was merged separately. This Home/date-request expansion is delivered in a follow-up PR with its own preview. The connected account still reports `push: false` on Karnes232/punta-cana-proposal-packages, so a maintainer must merge the follow-up. Do not interpret a successful preview as a production release.

## Photographic section heroes and proposal extras
Both catalog pages now have photographic heroes with one H1, package and explanation anchors, and responsive gold/ivory CTAs. `catalogHome.proposalHeroImage` and `dinnerHeroImage` override the real published Sanity catalog image fallbacks.

All proposal catalogs and server request lookups share the approved extras: drone videographer USD399, violinist USD399, saxophonist USD399, and romantic dinner for two USD299. Matching legacy extras are replaced in the presentation layer without modifying Sanity documents; unrelated extras remain. Approved rates are centralized in `src/lib/experience/proposalExtras.ts`. Standalone dinner extras retain their existing rates.

The dinner addon uses the existing published dinner's active menu items. Each of exactly two guests must choose a starter, main and dessert before submission. The server validates active dish IDs, course matching, quantity and supplements. Removing the addon excludes its menus and cost from the request while retaining local choices for reselection. Menus and estimates remain in the durable request snapshot. No booking or payment is made.
