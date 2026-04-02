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
  seo: {
    structuredData: {
      en: string;
      es: string;
    };
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
  body { en, es }, 
  seo {
structuredData {
  en,
  es
}
  }
}`;

export const individualBlogQuery = async (
  slug: string,
): Promise<IndividualBlog> => {
  return await client.fetch(individualBlogQueryString, { slug });
};

export interface IndividualBlogSEO {
  _id: string;
  seo: {
    meta: {
      en: {
        title: string;
        description: string;
        keywords: string[];
      };
      es: {
        title: string;
        description: string;
        keywords: string[];
      };
    };
    openGraph: {
      en: {
        title: string;
        description: string;
      };
      es: {
        title: string;
        description: string;
      };
      image: {
        url: string;
        alt: string;
        width: number;
        height: number;
      };
    };
    noIndex: boolean;
    noFollow: boolean;
  };
}

export const individualBlogSEOQueryString = `*[_type == "blogPost" && slug.current == $slug][0] {
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

export const individualBlogSEOQuery = async (
  slug: string,
): Promise<IndividualBlogSEO> => {
  return await client.fetch(individualBlogSEOQueryString, { slug });
};

export const moreBlogsQueryString = `*[_type == "blogPost" && slug.current != $slug] | order(publishedAt desc) {
  slug {
    current
  },
  title {
    en,
    es
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
}`;

export const getMoreBlogs = async (slug: string): Promise<IndividualBlog[]> => {
  return await client.fetch(moreBlogsQueryString, { slug });
};
