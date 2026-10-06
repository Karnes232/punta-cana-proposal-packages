import type { Image, Settings } from "@/lib/experience/types";
import {
  CATALOG_PAGES,
  type CatalogPageType,
} from "@/lib/experience/catalogPages";
import { pageSectionDocument, pageSectionParams } from "../pageSection";
import { uncachedClient } from "./client";
import { imageWithAlt } from "./fragments";

export type CatalogPage = {
  /** Every text key on the page, written or not. */
  keys: readonly string[];
  /** The page's texts that were written, by Catalog text key. */
  text: Record<string, string>;
  image?: Image;
  contactHeading?: string;
};

type PhotoRow = { url?: string; alt?: string } | null;
type CatalogPageRow = {
  page: Record<string, Record<string, unknown> | null> | null;
  englishImage: PhotoRow;
};

// The page in one language (<type>-<language>), falling back to English
// while a language isn't written yet; an empty photo falls back to the
// English one.
const catalogPageQuery = (type: CatalogPageType) => `{
  "page": ${pageSectionDocument(type)} {
    ...,
    hero { ..., image ${imageWithAlt} }
  },
  "englishImage": *[_id == $fallbackId][0].hero.image ${imageWithAlt}
}`;

export async function getCatalogPage(
  type: CatalogPageType,
  locale: string,
): Promise<CatalogPage> {
  const row = await uncachedClient.fetch<CatalogPageRow>(
    catalogPageQuery(type),
    pageSectionParams(type, locale),
    { next: { revalidate: 60 } },
  );
  const text: Record<string, string> = {};
  for (const [name, keys] of Object.entries(CATALOG_PAGES[type])) {
    const section = row.page?.[name];
    for (const key of keys) {
      const value = section?.[key];
      if (typeof value === "string" && value) text[key] = value;
    }
  }
  const own = row.page?.hero?.image as PhotoRow;
  const photo = own?.url ? own : row.englishImage;
  const { contactHeading, ...labels } = text;
  return {
    keys: Object.values(CATALOG_PAGES[type]).flat(),
    text: labels,
    image: photo?.url
      ? { url: photo.url, alt: photo.alt ? { [locale]: photo.alt } : undefined }
      : undefined,
    contactHeading,
  };
}

/**
 * Catalog text with a catalog page's own texts: every page key comes from
 * the page, so an empty one shows its default text.
 */
export const withCatalogPage = (
  settings: Settings,
  page: CatalogPage,
): Settings => ({
  ...Object.fromEntries(
    Object.entries(settings).filter(([k]) => !page.keys.includes(k)),
  ),
  ...page.text,
});
