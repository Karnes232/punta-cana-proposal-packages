import { client } from "@/sanity/lib/client";

export interface HomePageHero {
  image?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
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
  headingLine3: {
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

export const homePageHeroQuery = `*[_type == "HomePageHero"][0] {
  image {
    asset-> {
      url,
      metadata {
        dimensions {
          width,
          height
        }   
      }
    },
    alt
  },
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
  headingLine3 {
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
  secondaryHref
}`;

export async function homePageHero(): Promise<HomePageHero> {
  return await client.fetch<HomePageHero>(homePageHeroQuery);
}
