import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";
import { imageWithDimensions } from "../fragments";

export interface FeaturedPost {
  language: string;
  slug: {
    current: string;
  };
  title: string;
  publishedAt: string;
  categoryTag: string;
  excerpt: string;
  readingTime: number;
  heroPhoto: {
    asset: {
      url: string;
    };
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
    alt: string;
  };
}

export interface BlogPageHero {
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
    alt?: string;
  };
}

export interface BlogPageCtaStrip {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface BlogPage {
  hero: BlogPageHero | null;
  featuredPost: FeaturedPost | null;
  cta: BlogPageCtaStrip | null;
}

// The page in one language (blogPage-<language>), falling back to English
// for blog-only languages and while a language isn't written yet.
export const blogPageQuery = `${pageSectionDocument("blogPage")} {
  hero {
    eyebrow,
    headingLine1,
    headingLine2,
    subheading,
    image {
      ${imageWithDimensions}
    }
  },
  featuredPost -> {
    language,
    slug,
    title,
    publishedAt,
    categoryTag,
    readingTime,
    excerpt,
    heroPhoto {
      ${imageWithDimensions}
    }
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

export const getBlogPage = async (locale: string): Promise<BlogPage | null> =>
  client.fetch<BlogPage | null>(
    blogPageQuery,
    pageSectionParams("blogPage", locale),
  );
