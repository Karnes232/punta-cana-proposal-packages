// What the home page shows when the Studio leaves a photo empty.
// Relative imports: the tests compile this file on its own.
import type { Experience, Home, Image } from "../../lib/experience/types";

/** A home page text in the visitor's language, placeholders filled in. */
export type HomeText = (key: string) => string;

/**
 * The "how it works" steps (copy keys stepOne…stepEight); the pickup
 * journey uses the first five (journeyOne…journeyFive).
 */
export const STEPS = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
];

/**
 * Every photo on the home page: the Studio's choice, else one from the
 * featured packages or the dinner. The moments gallery has at most eight
 * photos, without repeats.
 */
export function homePhotos(
  home: Home | null | undefined,
  proposals: Experience[],
  dinner: Experience | null,
) {
  const proposalPhoto =
    home?.proposalSelectorImage ||
    proposals[0]?.styles[0]?.mainImage ||
    proposals[0]?.gallery[0]?.image;
  const dinnerPhoto =
    home?.dinnerSelectorImage ||
    dinner?.styles[0]?.mainImage ||
    dinner?.gallery[0]?.image;
  const hero = home?.heroImage || proposalPhoto;
  const realPhotos = proposals.flatMap((e) =>
    e.gallery.map((p) => p.image).filter((p): p is Image => !!p?.url),
  );
  const photos = (home?.moments?.length ? home.moments : realPhotos)
    .filter((p, i, a) => p.url && a.findIndex((v) => v.url === p.url) === i)
    .slice(0, 8);
  const editorial = home?.editorialImages?.length
    ? home.editorialImages
    : photos.slice(0, 3);
  const journey = STEPS.slice(0, 5).map(
    (_, i) =>
      home?.journeyImages?.[i] ||
      (i === 2 ? proposalPhoto : i === 3 ? photos[1] : undefined),
  );
  return { hero, proposalPhoto, dinnerPhoto, photos, editorial, journey };
}

/** The lowest style price, else the base price. */
export function startingPrice(experience: Experience) {
  const prices = experience.styles
    .map((s) => s.price)
    .filter((p): p is number => typeof p === "number");
  return prices.length ? Math.min(...prices) : experience.basePrice;
}
