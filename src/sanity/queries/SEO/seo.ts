import { client } from "@/sanity/lib/client";
import {
  CATALOG_CONTACT_ID,
  CATALOG_HOME_ID,
  languageDocumentId,
  legalDocumentId,
} from "@/sanity/constants";
import { documentSeoProjection } from "../fragments";
import type { DocumentSeo } from "./documentSeo";

interface PageSeo {
  seo: DocumentSeo;
}

// Each page's SEO is the seo field of its own document, one per language.
// No fallback to another language: a page without SEO in its language uses
// its own default title instead.
const SEO_IN_PAGE_DOCUMENT = {
  home: CATALOG_HOME_ID,
  contact: CATALOG_CONTACT_ID,
  "how-it-works": "howItWorksPage",
  faq: "faqPage",
  blog: "blogPage",
  stories: "storiesPage",
  proposals: "proposalsPage",
  "romantic-dinners": "romanticDinnersPage",
  "privacy-policy": legalDocumentId("privacy-policy"),
  "terms-of-service": legalDocumentId("terms-of-service"),
} as const;

/** A page with SEO: its path name, e.g. "how-it-works". */
export type SeoPage = keyof typeof SEO_IN_PAGE_DOCUMENT;

const pageSeoDocumentId = (pageName: SeoPage, locale: string) =>
  languageDocumentId(SEO_IN_PAGE_DOCUMENT[pageName], locale);

export const seoQuery = `*[_id == $id][0] {
  ${documentSeoProjection}
}`;

export async function getPageSeo(
  pageName: SeoPage,
  locale: string,
): Promise<PageSeo | null> {
  return client.fetch(seoQuery, { id: pageSeoDocumentId(pageName, locale) });
}

export const structuredDataQuery = `*[_id == $id][0] {
  seo { structuredData }
}`;

export interface StructuredData {
  seo?: { structuredData?: string | null };
}

export const getStructuredData = async (
  pageName: SeoPage,
  locale: string,
): Promise<StructuredData | null> =>
  client.fetch(structuredDataQuery, {
    id: pageSeoDocumentId(pageName, locale),
  });
