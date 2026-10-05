// Fixed Sanity document IDs and slugs the code depends on. Change them here;
// scripts/*.mjs can't import TypeScript and keep their own copies.

/** Romantic dinner configured as an inquiry-only example (inactive document). */
export const DINNER_TEMPLATE_ID = "8d9e1e5f-d981-4276-ab95-8d88a3ebd429";

/** Proposal template edited through the Studio's proposal template tool. */
export const PROPOSAL_TEMPLATE_ID = "proposal-initial-template";

/** Singleton documents (their ID matches their schema type). */
export const CATALOG_SETTINGS_ID = "experienceCatalogSettings";
export const CATALOG_HOME_ID = "catalogHome";
export const CATALOG_CONTACT_ID = "catalogContact";
export const CATALOG_SINGLETON_IDS = [
  CATALOG_SETTINGS_ID,
  CATALOG_HOME_ID,
  CATALOG_CONTACT_ID,
] as const;

/**
 * Page sections the site reads as "the one document of this type". The
 * Studio opens exactly this document for each type, so a second copy can't be
 * created by accident. Schema type → document ID (the ID matches the type,
 * like the catalog singletons above).
 */
export const PAGE_SINGLETONS = {
  generalLayout: "generalLayout",
  storiesHero: "storiesHero",
  storiesCtaStrip: "storiesCtaStrip",
  blogHero: "blogHero",
  blogCtaStrip: "blogCtaStrip",
  faqHero: "faqHero",
  faqContactStrip: "faqContactStrip",
  howItWorksHero: "howItWorksHero",
  howItWorksSteps: "howItWorksSteps",
  howItWorksFaq: "howItWorksFaq",
  howItWorksCta: "howItWorksCta",
} as const;

/** Pages with an SEO entry (pageSeo), and their document IDs. */
export const SEO_PAGES = [
  "home",
  "proposals",
  "romantic-dinners",
  "stories",
  "blog",
  "faq",
  "how-it-works",
  "contact",
  "privacy-policy",
  "terms-of-service",
] as const;
export const pageSeoId = (page: string) => `pageSeo-${page}`;

/** Legal pages (legalDocument) and their document IDs. */
export const LEGAL_PAGES = ["privacy-policy", "terms-of-service"] as const;
export const legalDocumentId = (page: string) => `legalDocument-${page}`;

/**
 * Document types with one document per language, linked by the
 * @sanity/document-internationalization plugin (translation.metadata).
 * Everything else keeps every language side by side in its fields.
 */
export const PER_LANGUAGE_TYPES: readonly string[] = [
  "pageSeo",
  "storiesHero",
  "storiesCtaStrip",
  "story",
];

/** A page document's fixed ID in one language, e.g. "storiesHero-fr". */
export const languageDocumentId = (base: string, language: string) =>
  `${base}-${language}`;

/** Every schema type whose documents can't be created, deleted or duplicated. */
export const SINGLETON_TYPES: ReadonlySet<string> = new Set([
  ...CATALOG_SINGLETON_IDS,
  ...Object.keys(PAGE_SINGLETONS),
  "pageSeo",
  "legalDocument",
]);

/** Document types editors may add from the Studio's "Create" menu. */
export const CREATABLE_TYPES: ReadonlySet<string> = new Set([
  "proposalExperience",
  "romanticDinnerExperience",
  "experienceAddon",
  "menuItem",
  "beverageOption",
  "dinnerOccasion",
  "blogPost",
  "blogCategory",
  "story",
  "storyType",
  "faq",
  "faqCategory",
  "howItWorksFaqCategory",
]);

/** Home page proposals when Catalog Home has none selected. */
export const FEATURED_FALLBACK_SLUGS = [
  "love-signature",
  "path-of-love",
  "marry-me-sign",
];

/** Proposal whose first photo is the /proposals hero when none is set. */
export const PROPOSALS_HERO_SLUG = "love-signature";
