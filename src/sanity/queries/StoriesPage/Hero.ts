import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";
import { imageWithDimensions } from "../fragments";

export interface StoriesPageHero {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  subheading?: string;
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
  featuredStory: {
    slug: {
      current: string;
    };
    names: string;
    date: string;
    location: string;
    packageTag: string;
    heroPhoto: {
      asset: {
        url: string;
        metadata: {
          dimensions: {
            width: number;
            height: number;
          };
        };
        alt: string;
      };
    };
    quote: string;
  };
}

export const storiesPageHeroQuery = `${pageSectionDocument("storiesHero")} {
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
  image {
    ${imageWithDimensions}
  },
  featuredStory -> {
    slug,
    names,
    date,
    location,
    packageTag,
    heroPhoto {
      ${imageWithDimensions}
    },
    quote
  } 
}`;

export async function getStoriesPageHero(
  locale: string,
): Promise<StoriesPageHero> {
  return await client.fetch<StoriesPageHero>(
    storiesPageHeroQuery,
    pageSectionParams("storiesHero", locale),
  );
}
