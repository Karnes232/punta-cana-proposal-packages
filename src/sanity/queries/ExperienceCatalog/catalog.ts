import { normalizeExperience } from "@/lib/experience/normalize";
import { withProposalExtras } from "@/lib/experience/proposalExtras";
import type { Experience } from "@/lib/experience/types";
import { DINNER_TEMPLATE_ID, EXCLUDED_PROPOSAL_SLUG } from "@/sanity/constants";

import { uncachedClient } from "./client";
import { activeExperienceFilter, experienceProjection } from "./fragments";
import { getDinnerPreview } from "./templates";

export const catalogQuery = /* groq */ `
  *[${activeExperienceFilter}]
  | order(displayOrder asc, _id asc)
  ${experienceProjection}
`;

/** Proposals get the dinner menu, offered through the dinner add-on. */
async function proposalDinnerMenu(experiences: Experience[]) {
  return experiences.some((e) => e._type === "proposalExperience")
    ? (await getDinnerPreview())?.menuItems || []
    : [];
}

/** Every public proposal and romantic dinner, in display order. */
export async function getExperiences() {
  const rows = await uncachedClient.fetch<Experience[]>(
    catalogQuery,
    { excludedSlug: EXCLUDED_PROPOSAL_SLUG },
    { next: { revalidate: 60 } },
  );
  const menu = await proposalDinnerMenu(rows);
  return rows.map((experience) =>
    withProposalExtras(normalizeExperience(experience), menu),
  );
}

/** One public experience by document ID, or null. */
export async function getExperience(id: string) {
  const experience = await uncachedClient.fetch<Experience | null>(
    /* groq */ `*[_id == $id && ${activeExperienceFilter}][0] ${experienceProjection}`,
    { id, excludedSlug: EXCLUDED_PROPOSAL_SLUG },
    { cache: "no-store" },
  );
  if (!experience) return null;
  return withProposalExtras(
    normalizeExperience(experience),
    await proposalDinnerMenu([experience]),
  );
}

/**
 * The experience a customer request refers to. The published dinner example
 * accepts inquiries too, never confirmed reservations.
 */
export async function getRequestExperience(id: string) {
  const active = await getExperience(id);
  return (
    active || (id === DINNER_TEMPLATE_ID ? await getDinnerPreview() : null)
  );
}
