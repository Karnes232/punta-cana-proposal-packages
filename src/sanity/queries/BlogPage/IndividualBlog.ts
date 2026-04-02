import { client } from "@/sanity/lib/client";

export interface IndividualBlog {
  _id: string;
  slug: {
    current: string;
  };
  title: {
    en: string;
    es: string;
  };

  category: {
    _id: string;
    label: {
      en: string;
      es: string;
    };
    value: string;
  };
  categoryTag: {
    en: string;
    es: string;
  };
  publishedAt: string;
  readingTime: number;
  excerpt: {
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
      alt: string;
    };
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
  body: {
    en: any;
    es: any;
  };
}

export const individualBlogQueryString = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  slug {
    current
  },
  title {
    en,
    es
  },
  category -> {
    _id,
    label { en, es },
    value
  },
  categoryTag {
    en,
    es
  },
  publishedAt,
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
  },
  gallery[] {
    asset-> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    caption { en, es }
  },
  body { en, es }
}`;

export const individualBlogQuery = async (
  slug: string,
): Promise<IndividualBlog> => {
  return await client.fetch(individualBlogQueryString, { slug });
};
