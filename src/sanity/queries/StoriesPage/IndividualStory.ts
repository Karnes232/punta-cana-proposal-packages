import type { PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import type { EmbeddedLocalizedDocumentSeo } from "../SEO/embeddedLocalizedSeo";
import { imageWithDimensions, localizedSeoProjection } from "../fragments";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface IndividualStory {
  slug: {
    current: string;
  };
  names: string;
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
  gallery:
    | {
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
        caption: {
          en: string;
          es: string;
        };
      }[]
    | null;
  quote: {
    en: string;
    es: string;
  };
  body: {
    en: PortableTextBlock[];
    es: PortableTextBlock[];
  };
  seo: {
    structuredData: {
      en: string;
      es: string;
    };
  };
}

export interface StoryCard {
  slug: {
    current: string;
  };
  names: string;
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
  quote: {
    en: string;
    es: string;
  };
}

// ── Queries ───────────────────────────────────────────────────────────────────

export const individualStoryQuery = `
  *[_type == "individualStory" && slug.current == $slug][0] {
    slug,
    names,
    proposalType-> {
      value,
      label { en, es }
    },
    packageTag { en, es },
    date,
    location { en, es },
    heroPhoto { ${imageWithDimensions} },
    gallery[] {
      ${imageWithDimensions},
      caption { en, es }
    },
    quote { en, es },
    body { en, es },
    seo {
structuredData {
  en,
  es
}
  }
  }
`;

/**
 * Fetch all stories of the same proposal type, excluding the current story.
 * Matches on proposalType.value (the slug-like string on your proposalType doc).
 * Ordered newest first.
 */
export const moreStoriesQuery = `
  *[
    _type == "individualStory"
    && proposalType->value == $proposalTypeValue
    && slug.current != $currentSlug
  ] | order(publishedAt desc) {
    slug,
    names,
    proposalType-> {
      value,
      label { en, es }
    },
    packageTag { en, es },
    date,
    location { en, es },
    heroPhoto { ${imageWithDimensions} },
    quote { en, es }
  }
`;

/** All slugs — used in generateStaticParams */
export const allStorySlugsQuery = `
  *[_type == "individualStory"] { "slug": slug.current }
`;

// ── Fetchers ──────────────────────────────────────────────────────────────────

export const getIndividualStory = async (
  slug: string,
): Promise<IndividualStory | null> => {
  return client.fetch(individualStoryQuery, { slug });
};

export const getMoreStories = async (
  proposalTypeValue: string,
  currentSlug: string,
): Promise<StoryCard[]> => {
  return client.fetch(moreStoriesQuery, { proposalTypeValue, currentSlug });
};

export const getAllStorySlugs = async (): Promise<{ slug: string }[]> => {
  return client.fetch(allStorySlugsQuery);
};

export interface AllStoriesCard {
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
  proposalType: {
    value: string;
    label: {
      en: string;
      es: string;
    };
  };
  quote: {
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
}

export const allStoriesQuery = `
  *[_type == "individualStory"] {
    slug,
    names,
    date,
    location { en, es },
    packageTag { en, es },
    proposalType-> { value, label { en, es } },
    quote { en, es },
    heroPhoto { ${imageWithDimensions} }
  }
`;

export const getAllStories = async (): Promise<AllStoriesCard[]> => {
  return client.fetch(allStoriesQuery);
};

export const individualStorySEOQueryString = `*[_type == "individualStory" && slug.current == $slug][0] {
  _id,
  ${localizedSeoProjection}
}`;

export const individualStorySEOQuery = async (
  slug: string,
): Promise<EmbeddedLocalizedDocumentSeo | null> => {
  return client.fetch(individualStorySEOQueryString, { slug });
};
