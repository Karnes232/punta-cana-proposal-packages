import { client } from "@/sanity/lib/client";
import { pageSeoId } from "@/sanity/constants";
import { localizedSeoProjection } from "../fragments";
import type { LocalizedSeo } from "./embeddedLocalizedSeo";

interface PageSeo {
  seo: LocalizedSeo;
}
export const seoQuery = `*[_type == "pageSeo" && _id == $id][0] {
    ${localizedSeoProjection}
}`;

export async function getPageSeo(pageName: string): Promise<PageSeo | null> {
  return client.fetch(seoQuery, { id: pageSeoId(pageName) });
}

export const structuredDataQuery = `*[_type == "pageSeo" && _id == $id][0] {
    seo {
        structuredData {
            en,
            es
        }
    }
}`;

export interface structuredData {
  seo: {
    structuredData: {
      en: string;
      es: string;
    };
  };
}

export const getStructuredData = async (
  pageName: string,
): Promise<structuredData> => {
  const structuredData = await client.fetch(structuredDataQuery, {
    id: pageSeoId(pageName),
  });
  return structuredData;
};
