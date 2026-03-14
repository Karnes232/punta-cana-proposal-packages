import { client } from "@/sanity/lib/client";

export interface HomePageCTABanner {
  eyebrow: {
    en: string;
    es: string;
  };
  headingLine1: {
    en: string;
    es: string;
  };
  headingLine2: {
    en: string;
    es: string;
  };
  subheading: {
    en: string;
    es: string;
  };
  primaryLabel: {
    en: string;
    es: string;
  };
  primaryHref: string;
  secondaryLabel: {
    en: string;
    es: string;
  };
  secondaryHref: string;
}

export const homePageCTABannerQuery = `*[_type == "HomePageCTABanner"][0] {
  eyebrow {
    en,
    es
  },
  headingLine1 {
    en,
    es
  },
  headingLine2 {
    en,
    es
  },
  subheading {
    en,
    es
  },
  primaryLabel {
    en,
    es
  },
  primaryHref,
  secondaryLabel {
    en,
    es  
  },
  secondaryHref,
}`;

export const homePageCTABanner = async (): Promise<HomePageCTABanner> => {
  return await client.fetch(homePageCTABannerQuery);
};
