import type { Image, Settings } from "@/lib/experience/types";
import {
  PROPOSALS_PAGE_KEYS,
  PROPOSALS_PAGE_SECTIONS,
} from "@/lib/experience/proposalsPage";
import { pageSectionDocument, pageSectionParams } from "../pageSection";
import { uncachedClient } from "./client";
import { imageWithAlt } from "./fragments";

export type ProposalsPage = {
  /** The page's texts that were written, by Catalog text key. */
  text: Record<string, string>;
  image?: Image;
  contactHeading?: string;
};

type Section = Record<string, unknown> | null;
type ProposalsPageRow = {
  page: Record<keyof typeof PROPOSALS_PAGE_SECTIONS, Section> | null;
  englishImage: { url?: string; alt?: string } | null;
};

// The page in one language (proposalsPage-<language>), falling back to
// English while a language isn't written yet; an empty photo falls back to
// the English one.
export const proposalsPageQuery = `{
  "page": ${pageSectionDocument("proposalsPage")} {
    hero { ..., image ${imageWithAlt} },
    intro,
    packages,
    contact
  },
  "englishImage": *[_id == $fallbackId][0].hero.image ${imageWithAlt}
}`;

export async function getProposalsPage(locale: string): Promise<ProposalsPage> {
  const row = await uncachedClient.fetch<ProposalsPageRow>(
    proposalsPageQuery,
    pageSectionParams("proposalsPage", locale),
    { next: { revalidate: 60 } },
  );
  const text: Record<string, string> = {};
  for (const [name, keys] of Object.entries(PROPOSALS_PAGE_SECTIONS)) {
    const section = row.page?.[name as keyof typeof PROPOSALS_PAGE_SECTIONS];
    for (const key of keys) {
      const value = section?.[key];
      if (typeof value === "string" && value) text[key] = value;
    }
  }
  const hero = row.page?.hero as { image?: { url?: string; alt?: string } };
  const photo = hero?.image?.url ? hero.image : row.englishImage;
  const { contactHeading, ...labels } = text;
  return {
    text: labels,
    image: photo?.url
      ? { url: photo.url, alt: photo.alt ? { [locale]: photo.alt } : undefined }
      : undefined,
    contactHeading,
  };
}

/**
 * Catalog text with the Proposals page's own texts: every page key comes
 * from the page, so an empty one shows its default text.
 */
export const withProposalsPage = (
  settings: Settings,
  page: ProposalsPage,
): Settings => ({
  ...Object.fromEntries(
    Object.entries(settings).filter(([k]) => !PROPOSALS_PAGE_KEYS.includes(k)),
  ),
  ...page.text,
});
