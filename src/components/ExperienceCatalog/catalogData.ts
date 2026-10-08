// What the proposals and romantic dinners pages show when the Studio leaves
// a photo empty. Relative imports: the tests compile this file on its own.
import type { Experience, Image } from "../../lib/experience/types";
import { PROPOSALS_HERO_SLUG } from "../../sanity/constants";

/** The proposal packages, or the romantic dinners. */
export const ofType = (experiences: Experience[], type: Experience["_type"]) =>
  experiences.filter((e) => e._type === type);

/**
 * The proposals hero: the page's photo, else the Love Signature package's
 * first photo, else the first package's.
 */
export function proposalsHeroPhoto(
  page: { image?: Image },
  experiences: Experience[],
) {
  const proposals = ofType(experiences, "proposalExperience");
  return (
    page.image ||
    proposals.find((e) => e.slug?.current === PROPOSALS_HERO_SLUG)?.gallery[0]
      ?.image ||
    proposals[0]?.gallery[0]?.image
  );
}

/**
 * The romantic dinners hero: the page's photo, else the first dinner's,
 * else a photo from the dinner template (when it is shown).
 */
export function dinnersHeroPhoto(
  page: { image?: Image },
  experiences: Experience[],
  preview: Experience | null,
) {
  return (
    page.image ||
    ofType(experiences, "romanticDinnerExperience")[0]?.gallery[0]?.image ||
    preview?.styles[1]?.mainImage ||
    preview?.gallery[0]?.image
  );
}
