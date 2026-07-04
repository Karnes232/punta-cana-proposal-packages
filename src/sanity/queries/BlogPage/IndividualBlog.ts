import type { AppLocale } from "@/i18n/blogLocales";
import type { BlogLocalizedValue } from "@/i18n/pickBlogLocalized";
import { client } from "@/sanity/lib/client";
import { blogLocalizedStringGroq } from "./blogLocalizedProjection";

export type HreflangSibling = { language: string; slug: string };

export interface BlogPostSeoResolved {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  openGraph: {
    title: string;
    description: string;
  };
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  structuredData?: string | null;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface IndividualBlog {
  _id: string;
  language: AppLocale;
  translationGroup: string;
  slug: {
    current: string;
  };
  title: string;
  category: {
    _id: string;
    label: BlogLocalizedValue;
    value: string;
  };
  categoryTag: string;
  publishedAt: string;
  readingTime: number;
  excerpt: string;
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
    caption: string;
  }[];
  body: unknown[];
  seo: BlogPostSeoResolved;
  hreflangSiblings: HreflangSibling[];
}

const seoProjection = `seo {
  meta {
    title,
    description,
    keywords
  },
  openGraph {
    title,
    description
  },
  "image": select(
    defined(image.asset._ref) => {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  ),
  structuredData,
  noIndex,
  noFollow
}`;

export const individualBlogQueryString = `*[_type == "blogPost" && slug.current == $slug && language == $lang][0] {
  _id,
  language,
  translationGroup,
  slug {
    current
  },
  title,
  category -> {
    _id,
    label ${blogLocalizedStringGroq},
    value
  },
  categoryTag,
  publishedAt,
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
    caption
  },
  body,
  ${seoProjection},
  "hreflangSiblings": *[_type == "blogPost" && translationGroup == ^.translationGroup] {
    language,
    "slug": slug.current
  }
}`;

export const individualBlogQuery = async (
  slug: string,
  lang: string,
): Promise<IndividualBlog | null> => {
  return await client.fetch(individualBlogQueryString, { slug, lang });
};

export interface IndividualBlogMetadata {
  language: AppLocale;
  slug: string;
  translationGroup: string;
  seo: BlogPostSeoResolved;
  hreflangSiblings: HreflangSibling[];
}

export const individualBlogMetadataQueryString = `*[_type == "blogPost" && slug.current == $slug && language == $lang][0] {
  language,
  "slug": slug.current,
  translationGroup,
  ${seoProjection},
  "hreflangSiblings": *[_type == "blogPost" && translationGroup == ^.translationGroup] {
    language,
    "slug": slug.current
  }
}`;

export const individualBlogMetadataQuery = async (
  slug: string,
  lang: string,
): Promise<IndividualBlogMetadata | null> => {
  return await client.fetch(individualBlogMetadataQueryString, { slug, lang });
};

export const moreBlogsQueryString = `*[_type == "blogPost" && slug.current != $slug && language == $lang] | order(publishedAt desc) {
  slug {
    current
  },
  title,
   categoryTag,
  publishedAt,
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
  },
}`;

export const findBlogPostLocaleBySlugQuery = `*[_type == "blogPost" && slug.current == $slug] | order(_updatedAt desc) [0] { language, "slug": slug.current }`;

export const findBlogPostLocaleBySlug = async (
  slug: string,
): Promise<{ language: string; slug: string } | null> => {
  return await client.fetch(findBlogPostLocaleBySlugQuery, { slug });
};

export const getMoreBlogs = async (
  slug: string,
  lang: string,
): Promise<
  {
    slug: { current: string };
    title: string;
    categoryTag: string;
    publishedAt: string;
    readingTime: number;
    excerpt: string;
    heroPhoto: IndividualBlog["heroPhoto"];
  }[]
> => {
  return await client.fetch(moreBlogsQueryString, { slug, lang });
};
