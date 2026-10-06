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
}

export interface StoriesPageFeaturedStory {
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
}

export interface StoriesPageCtaStrip {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
}

// Any part can be missing (e.g. a document created outside the Studio);
// the page renders what it has.
export interface StoriesPage {
  hero: StoriesPageHero | null;
  featuredStory: StoriesPageFeaturedStory | null;
  cta: StoriesPageCtaStrip | null;
}

// The page in one language (storiesPage-<language>), falling back to English
// while a language isn't written yet.
export const storiesPageQuery = `${pageSectionDocument("storiesPage")} {
  hero {
    eyebrow,
    headingLine1,
    headingLine2,
    subheading,
    image {
      ${imageWithDimensions}
    }
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
  },
  cta {
    eyebrow,
    heading,
    headingAccent,
    subheading,
    ctaLabel,
    ctaHref
  }
}`;

export async function getStoriesPage(locale: string): Promise<StoriesPage> {
  const page = await client.fetch<Partial<StoriesPage> | null>(
    storiesPageQuery,
    pageSectionParams("storiesPage", locale),
  );
  return {
    hero: page?.hero ?? null,
    featuredStory: page?.featuredStory ?? null,
    cta: page?.cta ?? null,
  };
}
