import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";
import { imageWithDimensions } from "../fragments";

export interface HowItWorksPageHero {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
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
    alt: string;
  };
}

export const howItWorksPageHeroQuery = `${pageSectionDocument("howItWorksHero")} {
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
  image {
    ${imageWithDimensions}
  }
}`;

export async function getHowItWorksPageHero(
  locale: string,
): Promise<HowItWorksPageHero> {
  return await client.fetch(
    howItWorksPageHeroQuery,
    pageSectionParams("howItWorksHero", locale),
  );
}
