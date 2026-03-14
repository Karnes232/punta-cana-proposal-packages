import { client } from "@/sanity/lib/client";

export interface HomePageFeatureStorySection {
  eyebrow: {
    en: string;
    es: string;
  };
  heading: {
    en: string;
    es: string;
  };
  stories: {
    _id: string;
    coupleName: string;
    location: {
      en: string;
      es: string;
    };
    date: string;
    packageUsed: {
      en: string;
      es: string;
    };
    quote: {
      en: string;
      es: string;
    };
    image: {
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
  }[];
}

export const homePageFeatureStorySectionQuery = `*[_type == "HomePageFeatureStorySection"][0] {
  eyebrow {
    en,
    es
  },
  heading {
    en,
    es
  },
  stories[] -> {
    _id,
    coupleName,
    location {
      en,
      es
    },
    date,
    packageUsed {
      en,
      es
    },
    quote {
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
    }
  }
}`;

export const homePageFeatureStorySection =
  async (): Promise<HomePageFeatureStorySection> => {
    return await client.fetch(homePageFeatureStorySectionQuery);
  };
