import type { BlogLocalizedValue } from "@/i18n/pickBlogLocalized";
import { client } from "@/sanity/lib/client";
import { blogLocalizedStringGroq } from "./blogLocalizedProjection";

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
  eyebrow: BlogLocalizedValue;
  headingLine1: BlogLocalizedValue;
  headingLine2: BlogLocalizedValue;
  subheading: BlogLocalizedValue;
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
  featuredPost: FeaturedPost;
}

export const blogPageHeroQuery = `*[_type == "BlogPageHero"][0] {
  eyebrow ${blogLocalizedStringGroq},
  headingLine1 ${blogLocalizedStringGroq},
  headingLine2 ${blogLocalizedStringGroq},
  subheading ${blogLocalizedStringGroq},
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
  featuredPost -> {
    language,
    slug,
    title,
    publishedAt,
    categoryTag,
    readingTime,
    excerpt,
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
    }
  }
}`;

export const blogPageHero = async (): Promise<BlogPageHero> => {
  return await client.fetch(blogPageHeroQuery);
};
