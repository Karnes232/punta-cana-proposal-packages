import { client } from "@/sanity/lib/client";
import {
  CATALOG_CONTACT_ID,
  CATALOG_HOME_ID,
  languageDocumentId,
  legalDocumentId,
  pageSeoId,
} from "@/sanity/constants";
import { documentSeoProjection } from "../fragments";
import type { DocumentSeo } from "./documentSeo";

interface PageSeo {
  seo: DocumentSeo;
}

// Pages whose SEO is the seo field of their own document.
const SEO_IN_PAGE_DOCUMENT: Record<string, string> = {
  home: CATALOG_HOME_ID,
  contact: CATALOG_CONTACT_ID,
  "how-it-works": "howItWorksPage",
  faq: "faqPage",
  "privacy-policy": legalDocumentId("privacy-policy"),
  "terms-of-service": legalDocumentId("terms-of-service"),
};

// Every other page has one pageSeo document per language
// (pageSeo-<page>-<language>). No fallback to another language: a page
// without SEO in its language uses its own default title instead.
const pageSeoDocumentId = (pageName: string, locale: string) =>
  languageDocumentId(
    SEO_IN_PAGE_DOCUMENT[pageName] ?? pageSeoId(pageName),
    locale,
  );

export const seoQuery = `*[_id == $id][0] {
  ${documentSeoProjection}
}`;

export async function getPageSeo(
  pageName: string,
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
  pageName: string,
  locale: string,
): Promise<StructuredData | null> =>
  client.fetch(structuredDataQuery, {
    id: pageSeoDocumentId(pageName, locale),
  });
