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
 * Page sections the site reads as "the one document of this type"
 * (`*[_type == X][0]`). The Studio opens exactly this document for each type,
 * so a second copy can't be created by accident. Schema type → document ID.
 */
export const PAGE_SINGLETONS = {
  generalLayout: "generalLayout",
  HomePageHero: "hero",
  StoriesPageHero: "storiesPageHero",
  StoriesPageCtaStrip: "storiesPageCtaStrip",
  BlogPageHero: "blogPageHero",
  BlogPageCtaStrip: "blogPageCtaStrip",
  FaqsPageHeroComponent: "faqsPageHeroComponent",
  FaqsPageFaqContactStrip: "faqsPageFaqContactStrip",
  HowItWorksPageHero: "howItWorksPageHero",
  HowItWorksPageHowItWorksSteps: "howItWorksPageHowItWorksSteps",
  HowItWorksPageHowItWorksFAQ: "howItWorksPageHowItWorksFAQ",
  HowItWorksPageHowItWorksCTA: "howItWorksPageHowItWorksCTA",
} as const;

/** Every schema type that has exactly one document (catalog and page sections). */
export const SINGLETON_TYPES: ReadonlySet<string> = new Set([
  ...CATALOG_SINGLETON_IDS,
  ...Object.keys(PAGE_SINGLETONS),
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
  "BlogCategory",
  "individualStory",
  "ProposalType",
  "FaqsPageFaqs",
  "FaqsPageFaqsCategories",
  "HowItWorksPageHowItWorksFaqCategory",
]);

/** Kept out of every public listing on purpose (see docs/experience-catalog.md). */
export const EXCLUDED_PROPOSAL_SLUG = "adventure-to-yes";

/** Home page proposals when Catalog Home has none selected. */
export const FEATURED_FALLBACK_SLUGS = [
  "love-signature",
  "path-of-love",
  "marry-me-sign",
];

/** Proposal whose first photo is the /proposals hero when none is set. */
export const PROPOSALS_HERO_SLUG = "love-signature";
