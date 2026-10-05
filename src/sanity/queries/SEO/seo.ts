import { client } from "@/sanity/lib/client";
import { languageDocumentId, pageSeoId } from "@/sanity/constants";
import { documentSeoProjection } from "../fragments";
import type { DocumentSeo } from "./documentSeo";

interface PageSeo {
  seo: DocumentSeo;
}

// One pageSeo document per page and language (pageSeo-<page>-<language>).
// No fallback to another language: a page without SEO in its language uses
// its own default title instead.
const pageSeoDocumentId = (pageName: string, locale: string) =>
  languageDocumentId(pageSeoId(pageName), locale);

export const seoQuery = `*[_type == "pageSeo" && _id == $id][0] {
  ${documentSeoProjection}
}`;

export async function getPageSeo(
  pageName: string,
  locale: string,
): Promise<PageSeo | null> {
  return client.fetch(seoQuery, { id: pageSeoDocumentId(pageName, locale) });
}

export const structuredDataQuery = `*[_type == "pageSeo" && _id == $id][0] {
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
