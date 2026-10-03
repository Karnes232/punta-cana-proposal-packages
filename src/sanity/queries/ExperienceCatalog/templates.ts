import { normalizeExperience } from "@/lib/experience/normalize";
import type { Experience } from "@/lib/experience/types";

import { uncachedClient } from "./client";
import { experienceProjection } from "./fragments";
import { DINNER_TEMPLATE_ID } from "@/sanity/constants";
import { defineQuery } from "next-sanity";

/**
 * The romantic dinner example. It is an inactive document, so it is read
 * directly and shown as active. Used for the dinner menu that proposals offer
 * as an add-on, for the inquiry-only dinner card, and on preview hosts.
 * Reads the published document, never private drafts.
 */
export const templatePreviewQuery = defineQuery(
  `*[_id == $id][0] ${experienceProjection}`,
);

export async function getDinnerPreview() {
  return getTemplatePreview(DINNER_TEMPLATE_ID);
}

async function getTemplatePreview(id: string) {
  const row = await uncachedClient.fetch<Experience | null>(
    templatePreviewQuery,
    { id },
    { cache: "no-store" },
  );
  return row
    ? normalizeExperience({
        ...row,
        active: true,
        styles: (row.styles || []).map((style) => ({ ...style, active: true })),
      })
    : null;
}
