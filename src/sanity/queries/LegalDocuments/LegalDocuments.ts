import type { PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/lib/client";

export interface LegalDocuments {
  pageName: string;
  content: {
    _type: string;
    en: PortableTextBlock[];
    es: PortableTextBlock[];
  };
}

export const legalDocumentsQuery = `*[_type == "legalDocuments" && pageName == $pageName][0] {
  pageName,
  content
}`;

export async function getLegalDocuments(
  pageName: string,
): Promise<LegalDocuments> {
  return await client.fetch<LegalDocuments>(legalDocumentsQuery, { pageName });
}
