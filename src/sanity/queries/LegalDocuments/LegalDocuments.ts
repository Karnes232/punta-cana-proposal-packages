import type { PortableTextBlock } from "@portabletext/react";
import { legalDocumentId } from "@/sanity/constants";
import { client } from "@/sanity/lib/client";

export interface LegalDocuments {
  content: {
    _type: string;
    en: PortableTextBlock[];
    es: PortableTextBlock[];
  };
}

export const legalDocumentsQuery = `*[_type == "legalDocument" && _id == $id][0] {
  content
}`;

export async function getLegalDocuments(
  pageName: string,
): Promise<LegalDocuments> {
  return await client.fetch<LegalDocuments>(legalDocumentsQuery, {
    id: legalDocumentId(pageName),
  });
}
