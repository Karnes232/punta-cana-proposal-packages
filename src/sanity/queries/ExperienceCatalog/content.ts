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
  languageDocumentId,
} from "@/sanity/constants";

import { homeCopy } from "@/lib/experience/homeCopy";

import { getExperience } from "./catalog";
import { uncachedClient } from "./client";
import { imageWithAlt } from "./fragments";
import { defineQuery } from "next-sanity";

// The catalog documents are one per language (e.g. catalogHome-fr), falling
// back to English while a language isn't written yet. Photos, featured
// proposals and the dinner deposit are shared: they live on the English
// documents only.
export const catalogContentQuery = defineQuery(`{
      "settings": coalesce(*[_id == $settingsId][0], *[_id == $settingsEnId][0]),
      "dinnerDepositAmount": *[_id == $settingsEnId][0].dinnerDepositAmount,
      "homeText": coalesce(*[_id == $homeId][0], *[_id == $homeEnId][0]),
      "homePhotos": *[_id == $homeEnId][0] {
        heroImage ${imageWithAlt},
        proposalHeroImage ${imageWithAlt},
        dinnerHeroImage ${imageWithAlt},
        proposalSelectorImage ${imageWithAlt},
        dinnerSelectorImage ${imageWithAlt},
        journeyImages[] ${imageWithAlt},
        editorialImages[] ${imageWithAlt},
        moments[] ${imageWithAlt}
      },
      "contact": coalesce(*[_id == $contactId][0], *[_id == $contactEnId][0])
    }`);

// Featured proposals are shared: they live on the English home document.
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

const textField = (value: unknown) =>
  typeof value === "string" ? value : undefined;

// The home texts (top-level fields named after the homeCopy keys), as the
// `copy` record homeText() reads.
const homeTextFields = (doc: Record<string, unknown> | null) =>
  Object.fromEntries(
    Object.keys(homeCopy).flatMap((key) => {
      const value = textField(doc?.[key]);
      return value ? [[key, value]] : [];
    }),
  );

type CatalogContentRow = {
  settings: Settings | null;
  dinnerDepositAmount?: number;
  // The home text document: one top-level field per homeCopy key.
  homeText: Record<string, unknown> | null;
  homePhotos: Omit<Home, "copy" | "contactHeading"> | null;
  contact: Contact | null;
};

/** The catalog documents in `locale`: settings, home page and contact page. */
export async function getCatalogContent(
  locale: string,
): Promise<CatalogContent> {
  const id = (base: string) => languageDocumentId(base, locale);
  const en = (base: string) => languageDocumentId(base, "en");
  const row = await uncachedClient.fetch<CatalogContentRow>(
    catalogContentQuery,
    {
      settingsId: id(CATALOG_SETTINGS_ID),
      settingsEnId: en(CATALOG_SETTINGS_ID),
      homeId: id(CATALOG_HOME_ID),
      homeEnId: en(CATALOG_HOME_ID),
      contactId: id(CATALOG_CONTACT_ID),
      contactEnId: en(CATALOG_CONTACT_ID),
    },
    { next: { revalidate: 60 } },
  );
  return {
    settings: row.settings
      ? { ...row.settings, dinnerDepositAmount: row.dinnerDepositAmount }
      : null,
    home:
      row.homeText || row.homePhotos
        ? {
            ...row.homePhotos,
            copy: homeTextFields(row.homeText),
            contactHeading: textField(row.homeText?.contactHeading),
          }
        : null,
    contact: row.contact,
  };
}

type HomeConfig = { ids: string[] | null };

/**
 * The proposals featured on Home (up to three).
 * Only these summaries reach Home; the full catalog stays on its own pages.
 */
export async function getHomePresentation() {
  const config = await uncachedClient.fetch<HomeConfig>(
    homePresentationQuery,
    { homeId: languageDocumentId(CATALOG_HOME_ID, "en") },
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
