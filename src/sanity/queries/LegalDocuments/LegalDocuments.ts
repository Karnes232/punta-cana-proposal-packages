import type { PortableTextBlock } from "@portabletext/react";
import { languageDocumentId, legalDocumentId } from "@/sanity/constants";
import { client } from "@/sanity/lib/client";

/** One legal page in one language (legalDocument-<page>-<language>). */
export interface LegalDocuments {
  content: PortableTextBlock[];
}

// Falls back to the English document while a language isn't written yet.
export const legalDocumentsQuery = `coalesce(
  *[_type == "legalDocument" && _id == $id][0],
  *[_type == "legalDocument" && _id == $fallbackId][0]
) {
  content
}`;

export async function getLegalDocuments(
  pageName: string,
  locale: string,
): Promise<LegalDocuments> {
  return await client.fetch<LegalDocuments>(legalDocumentsQuery, {
    id: languageDocumentId(legalDocumentId(pageName), locale),
    fallbackId: languageDocumentId(legalDocumentId(pageName), "en"),
  });
}
