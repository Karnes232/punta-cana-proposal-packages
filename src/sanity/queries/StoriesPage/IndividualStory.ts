import type { PortableTextBlock } from "@portabletext/react";
import type { Localized } from "@/lib/experience/types";
import { client } from "@/sanity/lib/client";
import type { DocumentSeo } from "../SEO/documentSeo";
import { documentSeoProjection, imageWithDimensions } from "../fragments";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface IndividualStory {
  slug: {
    current: string;
  };
  names: string;
  proposalType: {
    value: string;
    label: Localized;
  };
  packageTag: string;
  date: string;
  location: string;
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
        caption?: string;
      }[]
    | null;
  quote: string;
  body: PortableTextBlock[];
  seo?: { structuredData?: string | null };
}

export interface StoryCard {
  slug: {
    current: string;
  };
  names: string;
  proposalType: {
    value: string;
    label: Localized;
  };
  packageTag: string;
  date: string;
  location: string;
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
  quote: string;
}

// ── Queries ───────────────────────────────────────────────────────────────────

export const individualStoryQuery = `
  coalesce(
    *[_type == "story" && slug.current == $slug && language == $language][0],
    *[_type == "story" && slug.current == $slug && language == "en"][0]
  ) {
    slug,
    names,
    proposalType-> { value, label },
    packageTag,
    date,
    location,
    heroPhoto { ${imageWithDimensions} },
    gallery[] {
      ${imageWithDimensions},
      caption
    },
    quote,
    body,
    seo { structuredData }
  }
`;

/**
 * Fetch all stories of the same proposal type, excluding the current story.
 * Matches on proposalType.value (the slug-like string on your proposalType doc).
 * Ordered newest first.
 */
export const moreStoriesQuery = `
  *[
    _type == "story" && language == $language
    && proposalType->value == $proposalTypeValue
    && slug.current != $currentSlug
  ] | order(publishedAt desc) {
    slug,
    names,
    proposalType-> { value, label },
    packageTag,
    date,
    location,
    heroPhoto { ${imageWithDimensions} },
    quote
  }
`;

// ── Fetchers ──────────────────────────────────────────────────────────────────

export const getIndividualStory = async (
  slug: string,
  language: string,
): Promise<IndividualStory | null> => {
  return client.fetch(individualStoryQuery, { slug, language });
};

export const getMoreStories = async (
  proposalTypeValue: string,
  currentSlug: string,
  language: string,
): Promise<StoryCard[]> => {
  return client.fetch(moreStoriesQuery, {
    proposalTypeValue,
    currentSlug,
    language,
  });
};

export interface AllStoriesCard {
  slug: {
    current: string;
  };
  names: string;
  date: string;
  location: string;
  packageTag: string;
  proposalType: {
    value: string;
    label: Localized;
  };
  quote: string;
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
  *[_type == "story" && language == $language] {
    slug,
    names,
    date,
    location,
    packageTag,
    proposalType-> { value, label },
    quote,
    heroPhoto { ${imageWithDimensions} }
  }
`;

export const getAllStories = async (
  language: string,
): Promise<AllStoriesCard[]> => {
  return client.fetch(allStoriesQuery, { language });
};

// No fallback to English here: a story without SEO in a language gets the
// "missing document" metadata, like a missing story.
export const individualStorySeoQuery = `*[_type == "story" && slug.current == $slug && language == $language][0] {
  _id,
  ${documentSeoProjection}
}`;

export const getIndividualStorySeo = async (
  slug: string,
  language: string,
): Promise<{ _id: string; seo: DocumentSeo } | null> => {
  return client.fetch(individualStorySeoQuery, { slug, language });
};
