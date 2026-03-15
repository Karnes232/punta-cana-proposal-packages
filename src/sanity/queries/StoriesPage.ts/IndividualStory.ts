import { client } from "@/sanity/lib/client";

export interface IndividualStory {
  slug: {
    current: string;
  };
  names: string;
  publishedAt: string;
  proposalType: {
    value: string;
    label: {
      en: string;
      es: string;
    };
  };
  packageTag: {
    en: string;
    es: string;
  };
  date: string;
  location: {
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
    };
    alt: string;
  };
  gallery: {
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
  }[];
  quote: {
    en: string;
    es: string;
  };
  body: {
    en: any;
    es: any;
  };
}

export const individualStoryQuery = `*[_type == "individualStory" && slug.current == $slug][0] {
    slug,
    names,
    publishedAt,
    proposalType->{
        value,
        label {
            en,
            es
        }
    },
    packageTag {
        en,
        es
    },
    date,
    location {
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
    gallery {
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
    },
    body {
        en,
        es
    }
}`;

export const getIndividualStory = async (
  slug: string,
): Promise<IndividualStory | null> => {
  const story = await client.fetch(individualStoryQuery, { slug });
  return story;
};
