import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";
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
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
}

export const faqsPageHeroComponentQuery = `${pageSectionDocument("faqHero")} {
  heroImage {
    ${imageWithDimensions}
  },
  eyebrow,
  headingLine1,
  headingLine2,
  subheading
}`;

export const getFaqPageHero = async (locale: string) => {
  return await client.fetch(
    faqsPageHeroComponentQuery,
    pageSectionParams("faqHero", locale),
  );
};
