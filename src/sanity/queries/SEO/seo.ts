import { client } from "@/sanity/lib/client";
import { localizedSeoProjection } from "../fragments";
import type { LocalizedSeo } from "./embeddedLocalizedSeo";

interface PageSeo {
  pageName: string;
  seo: LocalizedSeo;
}
export const seoQuery = `*[_type == "PageSeo" && pageName == $pageName][0] {
    pageName,
    ${localizedSeoProjection}
}`;

export async function getPageSeo(pageName: string): Promise<PageSeo | null> {
  return client.fetch(seoQuery, { pageName });
}

export const structuredDataQuery = `*[_type == "PageSeo" && pageName == $pageName][0] {
    pageName,
    seo {
        structuredData {
            en,
            es
        }
    }
}`;

export interface structuredData {
  pageName: string;
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
  const structuredData = await client.fetch(structuredDataQuery, { pageName });
  return structuredData;
};
