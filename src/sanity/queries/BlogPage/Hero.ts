import { client } from "@/sanity/lib/client";

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
  eyebrow: {
    en: string;
    es: string;
  };
  headingLine1: {
    en: string;
    es: string;
  };
  headingLine2: {
    en: string;
    es: string;
  };
  subheading: {
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
  featuredPost: FeaturedPost;
}

export const blogPageHeroQuery = `*[_type == "BlogPageHero"][0] {
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
