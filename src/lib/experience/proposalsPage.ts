/**
 * The Proposals page's own texts (proposalsPage-<language>), section by
 * section in the order of the page. Each is named after the Catalog text
 * key the page reads with label(), and its default is the same.
 */
export const PROPOSALS_PAGE_SECTIONS = {
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
} as const;

export const PROPOSALS_PAGE_KEYS: readonly string[] = Object.values(
  PROPOSALS_PAGE_SECTIONS,
).flat();

/**
 * Keys used only by the Proposals page; they leave Catalog text. The others
 * are shared with Romantic dinners or the navigation and stay there too.
 */
export const PROPOSALS_ONLY_KEYS: readonly string[] =
  PROPOSALS_PAGE_KEYS.filter(
    (key) => key.startsWith("proposal") || key === "emptyProposals",
  );
