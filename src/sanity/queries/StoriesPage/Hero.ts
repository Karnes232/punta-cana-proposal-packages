import { client } from "@/sanity/lib/client";
import { PAGE_SINGLETONS } from "@/sanity/constants";
import { imageWithDimensions } from "../fragments";

export interface StoriesPageHero {
  eyebrow?: {
    en: string;
    es: string;
  };
  headingLine1?: {
    en: string;
    es: string;
  };
  headingLine2?: {
    en: string;
    es: string;
  };
  subheading?: {
    en: string;
    es: string;
  };
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
    location: {
      en: string;
      es: string;
    };
    packageTag: {
      en: string;
      es: string;
    };
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
    quote: {
      en: string;
      es: string;
    };
  };
}

export const storiesPageHeroQuery = `*[_type == "storiesHero" && _id == $id][0] {
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
  image {
    ${imageWithDimensions}
  },
  featuredStory -> {
    slug,
    names,
    date,
    location {
      en,
      es
    },
    packageTag {
      en,
      es
    },
    heroPhoto {
      ${imageWithDimensions}
    },
    quote {
      en,
      es
    }
  } 
}`;

export async function getStoriesPageHero(): Promise<StoriesPageHero> {
  return await client.fetch<StoriesPageHero>(storiesPageHeroQuery, {
    id: PAGE_SINGLETONS.storiesHero,
  });
}
