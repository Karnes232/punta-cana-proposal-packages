import { client } from "@/sanity/lib/client";
import { PAGE_SINGLETONS } from "@/sanity/constants";
import { imageWithDimensions } from "../fragments";

export interface FaqsPageHeroComponent {
  heroImage?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
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
  subheading: {
    en: string;
    es: string;
  };
}

export const faqsPageHeroComponentQuery = `*[_type == "faqHero" && _id == $id][0] {
  heroImage {
    ${imageWithDimensions}
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
  subheading {
    en,
    es
  }
}`;

export const getFaqPageHero = async () => {
  return await client.fetch(faqsPageHeroComponentQuery, {
    id: PAGE_SINGLETONS.faqHero,
  });
};
