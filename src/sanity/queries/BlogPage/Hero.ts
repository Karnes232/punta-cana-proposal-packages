import { client } from "@/sanity/lib/client";

export interface FeaturedPost {
  slug: {
    current: string;
  };
  title: {
    en: string;
    es: string;
  };
  publishedAt: string;
  categoryTag: {
    en: string;
    es: string;
  };
  excerpt: {
    en: string;
    es: string;
  };
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
    slug,
    title {
      en,
      es
    },
    publishedAt,
    categoryTag {
      en,
      es
    },
    readingTime,
    excerpt {
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
    }
  }
}`;

export const blogPageHero = async (): Promise<BlogPageHero> => {
  return await client.fetch(blogPageHeroQuery);
};
