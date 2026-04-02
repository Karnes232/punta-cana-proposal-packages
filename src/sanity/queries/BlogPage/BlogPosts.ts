import { client } from "@/sanity/lib/client";

export interface BlogPost {
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

export const blogPostsQuery = `*[_type == "blogPost"] {
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
heroPhoto { ${imageFragment} },
}`;

export const blogPosts = async (): Promise<BlogPost[]> => {
  return await client.fetch(blogPostsQuery);
};