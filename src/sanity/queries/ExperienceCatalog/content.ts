import type {
  Contact,
  Experience,
  Home,
  Settings,
} from "@/lib/experience/types";
import {
  CATALOG_CONTACT_ID,
  CATALOG_HOME_ID,
  CATALOG_SETTINGS_ID,
  FEATURED_FALLBACK_SLUGS,
} from "@/sanity/constants";

import { getExperience } from "./catalog";
import { uncachedClient } from "./client";
import { imageWithAlt } from "./fragments";
import { defineQuery } from "next-sanity";

export const catalogContentQuery = defineQuery(`{
      "settings": *[_id == $settingsId][0],
      "home": *[_id == $homeId][0] {
        ...,
        heroImage ${imageWithAlt},
        proposalHeroImage ${imageWithAlt},
        dinnerHeroImage ${imageWithAlt},
        proposalSelectorImage ${imageWithAlt},
        dinnerSelectorImage ${imageWithAlt},
        journeyImages[] ${imageWithAlt},
        editorialImages[] ${imageWithAlt},
        moments[] ${imageWithAlt}
      },
      "contact": *[_id == $contactId][0]
    }`);

export const homePresentationQuery = defineQuery(`{
      "ids": *[_id == $homeId][0].featuredProposals[0...3]._ref
    }`);

export const featuredFallbackQuery = defineQuery(`*[
        _type == "proposalExperience"
        && active == true
        && slug.current in $featuredSlugs
      ] | order(name.en asc)[0...3]._id`);

export type CatalogContent = {
  settings: Settings | null;
  home: Home | null;
  contact: Contact | null;
};

/** The three catalog singletons: settings, home page and contact page. */
export async function getCatalogContent() {
  return uncachedClient.fetch<CatalogContent>(
    catalogContentQuery,
    {
      settingsId: CATALOG_SETTINGS_ID,
      homeId: CATALOG_HOME_ID,
      contactId: CATALOG_CONTACT_ID,
    },
    { next: { revalidate: 60 } },
  );
}

type HomeConfig = { ids: string[] | null };

/**
 * The proposals featured on Home (up to three).
 * Only these summaries reach Home; the full catalog stays on its own pages.
 */
export async function getHomePresentation() {
  const config = await uncachedClient.fetch<HomeConfig>(
    homePresentationQuery,
    { homeId: CATALOG_HOME_ID },
    { next: { revalidate: 60 } },
  );
  const ids =
    config.ids ??
    (await uncachedClient.fetch<string[]>(
      featuredFallbackQuery,
      { featuredSlugs: FEATURED_FALLBACK_SLUGS },
      { next: { revalidate: 60 } },
    ));
  const proposals = (await Promise.all(ids.map(getExperience))).filter(
    (e): e is Experience => !!e && e._type === "proposalExperience",
  );
  return { proposals };
}
