import type {
  Contact,
  Experience,
  Home,
  Image,
  Localized,
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
// back to English while a language isn't written yet; each home photo falls
// back to the English one when it's empty. The featured proposals and the
// dinner deposit are shared: they live on the English documents only.
export const catalogContentQuery = defineQuery(`{
      "settings": coalesce(*[_id == $settingsId][0], *[_id == $settingsEnId][0]),
      "dinnerDepositAmount": *[_id == $settingsEnId][0].dinnerDepositAmount,
      "homeText": coalesce(*[_id == $homeId][0], *[_id == $homeEnId][0]),
      "homePhotos": *[_id == $homeId][0] {
        heroImage ${imageWithAlt},
        proposalSelectorImage ${imageWithAlt},
        dinnerSelectorImage ${imageWithAlt},
        journeyImages[] ${imageWithAlt},
        editorialImages[] ${imageWithAlt},
        moments[] ${imageWithAlt}
      },
      "homePhotosEn": *[_id == $homeEnId][0] {
        heroImage ${imageWithAlt},
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

type HomePhotos = Omit<Home, "copy">;
type PhotoWithAlt = { url?: string; alt?: Localized | string };
const PHOTO_FIELDS = [
  "heroImage",
  "proposalSelectorImage",
  "dinnerSelectorImage",
  "journeyImages",
  "editorialImages",
  "moments",
] as const;

// Home photos come from the language's document (alt text in that language),
// or from the English document when the language left one empty.
function homePhotosIn(
  locale: string,
  own: HomePhotos | null,
  english: HomePhotos | null,
): HomePhotos {
  const inLocale = (photo?: PhotoWithAlt | null): Image | undefined =>
    photo?.url
      ? {
          url: photo.url,
          alt:
            typeof photo.alt === "string" ? { [locale]: photo.alt } : photo.alt,
        }
      : undefined;
  const has = (value: unknown) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value);
  const photos: Record<string, Image | Image[] | undefined> = {};
  for (const field of PHOTO_FIELDS) {
    const value = has(own?.[field]) ? own?.[field] : english?.[field];
    photos[field] = Array.isArray(value)
      ? value.map((p) => inLocale(p)).filter((p): p is Image => !!p)
      : inLocale(value);
  }
  return photos as HomePhotos;
}

type CatalogContentRow = {
  settings: Settings | null;
  dinnerDepositAmount?: number;
  // The home text document: one top-level field per homeCopy key.
  homeText: Record<string, unknown> | null;
  homePhotos: HomePhotos | null;
  homePhotosEn: HomePhotos | null;
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
      row.homeText || row.homePhotos || row.homePhotosEn
        ? {
            ...homePhotosIn(locale, row.homePhotos, row.homePhotosEn),
            copy: homeTextFields(row.homeText),
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
