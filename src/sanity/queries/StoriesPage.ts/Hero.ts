import { client } from "@/sanity/lib/client";

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

export const storiesPageHeroQuery = `*[_type == "StoriesPageHero"][0] {
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
    quote {
      en,
      es
    }
  } 
}`;

export async function storiesPageHero(): Promise<StoriesPageHero> {
  return await client.fetch<StoriesPageHero>(storiesPageHeroQuery);
}
