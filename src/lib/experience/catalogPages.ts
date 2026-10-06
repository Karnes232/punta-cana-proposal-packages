/**
 * The Proposals and Romantic dinners pages' own texts
 * (proposalsPage-<language>, romanticDinnersPage-<language>), section by
 * section in the order of each page. Each is named after the Catalog text
 * key the page reads with label(), and its default is the same.
 */
export const CATALOG_PAGES = {
  proposalsPage: {
    hero: [
      "heroEyebrow",
      "proposalIntroTitle",
      "proposalHeroText",
      "proposalHeroCta",
      "heroHowItWorks",
    ],
    intro: [
      "introStepsHeading",
      "proposalIntroDescription",
      "proposalIntroStep1Title",
      "proposalIntroStep1",
      "proposalIntroStep2Title",
      "proposalIntroStep2",
      "proposalIntroStep3Title",
      "proposalIntroStep3",
      "proposalIntroStep4Title",
      "proposalIntroStep4",
      "proposalIntroNote",
    ],
    packages: ["emptyProposals"],
    contact: ["contactHeading", "contactUsLabel"],
  },
  romanticDinnersPage: {
    hero: [
      "heroEyebrow",
      "dinnerIntroTitle",
      "dinnerHeroText",
      "dinnerHeroCta",
      "heroHowItWorks",
    ],
    intro: [
      "introStepsHeading",
      "dinnerIntroDescription",
      "dinnerPrivacyTagline",
      "dinnerIntroStep1Title",
      "dinnerIntroStep1",
      "dinnerIntroStep2Title",
      "dinnerIntroStep2",
      "dinnerIntroStep3Title",
      "dinnerIntroStep3",
      "dinnerIntroStep4Title",
      "dinnerIntroStep4",
      "dinnerIntroNote",
    ],
    dinners: ["dinnerInquiryNote", "emptyDinners", "dinnerTemplatePreviewNote"],
    contact: ["contactHeading", "contactUsLabel"],
  },
} as const;

export type CatalogPageType = keyof typeof CATALOG_PAGES;

/** Every text on either page. */
export const CATALOG_PAGE_KEYS: readonly string[] = [
  ...new Set(
    Object.values(CATALOG_PAGES).flatMap((page) => Object.values(page).flat()),
  ),
];

/** The navigation and footer show it too, so Catalog text keeps it. */
export const KEPT_IN_CATALOG_TEXT: readonly string[] = ["contactUsLabel"];

/** Page texts that are no longer edited in Catalog text. */
export const MOVED_FROM_CATALOG_TEXT: readonly string[] =
  CATALOG_PAGE_KEYS.filter((key) => !KEPT_IN_CATALOG_TEXT.includes(key));
