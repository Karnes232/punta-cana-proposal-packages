import { client } from "@/sanity/lib/client";
import { IndividualBlogSEO } from "../BlogPage/IndividualBlog";

// ── Shared image fragment ─────────────────────────────────────────────────────

const imageFragment = `
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
`;

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
    caption: {
      en: string;
      es: string;
    };
  }[];
  quote: {
    en: string;
    es: string;
  };
  body: {
    en: any;
    es: any;
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
    heroPhoto { ${imageFragment} },
    gallery[] {
      ${imageFragment},
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
    heroPhoto { ${imageFragment} },
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
    heroPhoto { ${imageFragment} }
  }
`;

export const getAllStories = async (): Promise<AllStoriesCard[]> => {
  return client.fetch(allStoriesQuery);
};

export interface relatedStories {
  slug?: {
    current: string;
  };
  names: string;
  date: string;
  location: {
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

export const relatedStoriesQuery = `
    *[_type == "individualStory" && proposalType->value == $proposalTypeValue] | order(publishedAt desc) [0...2] {
      slug,
      names,
      date,
      location { en, es },
      proposalType-> { value, label { en, es } },
      quote { en, es },
      heroPhoto { ${imageFragment} }
    }
  `;

export const getRelatedStories = async (
  proposalTypeValue: string,
): Promise<relatedStories[]> => {
  return client.fetch(relatedStoriesQuery, { proposalTypeValue });
};

export const individualStorySEOQueryString = `*[_type == "individualStory" && slug.current == $slug][0] {
  _id,
  seo {
        meta {
    en {
      title,
      description,
      keywords
    },
    es {
      title,
      description,
      keywords
    }
  },
  // Open Graph data
  openGraph {
    en {
      title,
      description
    },
    es {
      title,
      description
    },
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  noIndex,
  noFollow
    }
}`;

export const individualStorySEOQuery = async (
  slug: string,
): Promise<IndividualBlogSEO | null> => {
  return client.fetch(individualStorySEOQueryString, { slug });
};
