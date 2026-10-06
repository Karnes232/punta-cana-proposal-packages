import type { AppLocale } from "@/i18n/locales";
import type { BlogLocalizedValue } from "@/i18n/pickBlogLocalized";
import { client } from "@/sanity/lib/client";
import { blogLocalizedStringGroq } from "./blogLocalizedProjection";
import {
  documentSeoProjection,
  imageWithDimensions,
  listable,
} from "../fragments";
import type { DocumentSeo } from "../SEO/documentSeo";

export type HreflangSibling = { language: string; slug: string };

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
    };
    alt?: string;
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
        caption: string;
      }[]
    | null;
  body: unknown[];
  seo: DocumentSeo;
  hreflangSiblings: HreflangSibling[];
}

export const individualBlogQuery = `*[_type == "blogPost" && slug.current == $slug && language == $lang][0] {
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
    ${imageWithDimensions}
  },
  gallery[defined(asset)] {
    ${imageWithDimensions},
    caption
  },
  body,
  ${documentSeoProjection},
  "hreflangSiblings": *[_type == "blogPost" && translationGroup == ^.translationGroup
    && defined(slug.current) && defined(language)] {
    language,
    "slug": slug.current
  }
}`;

export const getIndividualBlog = async (
  slug: string,
  lang: string,
): Promise<IndividualBlog | null> => {
  return await client.fetch(individualBlogQuery, { slug, lang });
};

export interface IndividualBlogMetadata {
  language: AppLocale;
  slug: string;
  translationGroup: string;
  seo: DocumentSeo;
  hreflangSiblings: HreflangSibling[];
}

export const individualBlogMetadataQuery = `*[_type == "blogPost" && slug.current == $slug && language == $lang][0] {
  language,
  "slug": slug.current,
  translationGroup,
  ${documentSeoProjection},
  "hreflangSiblings": *[_type == "blogPost" && translationGroup == ^.translationGroup
    && defined(slug.current) && defined(language)] {
    language,
    "slug": slug.current
  }
}`;

export const getIndividualBlogMetadata = async (
  slug: string,
  lang: string,
): Promise<IndividualBlogMetadata | null> => {
  return await client.fetch(individualBlogMetadataQuery, { slug, lang });
};

export const moreBlogsQuery = `*[_type == "blogPost" && slug.current != $slug && language == $lang && ${listable}] | order(publishedAt desc) {
  slug {
    current
  },
  title,
   categoryTag,
  publishedAt,
  readingTime,
  excerpt,
  heroPhoto {
    ${imageWithDimensions}
  },
}`;

export const findBlogPostLocaleBySlugQuery = `*[_type == "blogPost" && slug.current == $slug && defined(language)] | order(_updatedAt desc) [0] { language, "slug": slug.current }`;

export const getBlogPostLocaleBySlug = async (
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
  return await client.fetch(moreBlogsQuery, { slug, lang });
};
