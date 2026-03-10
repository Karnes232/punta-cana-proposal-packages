import { client } from "@/sanity/lib/client";

export interface HomePageBrandStatement {
  quote: {
    en: string;
    es: string;
  };
  body: {
    en: string;
    es: string;
  };
  signature: string;
}

export const homePageBrandStatementQuery = `*[_type == "HomePageBrandStatement"][0] {
  quote {
    en,
    es
  },
  body {
    en,
    es
  },
  signature
}`;

export async function homePageBrandStatement(): Promise<HomePageBrandStatement> {
  return await client.fetch<HomePageBrandStatement>(
    homePageBrandStatementQuery,
  );
}
