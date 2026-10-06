import type { BlogLocalizedValue } from "@/i18n/pickBlogLocalized";
import { client } from "@/sanity/lib/client";
import { blogLocalizedStringGroq } from "./blogLocalizedProjection";
import { imageWithDimensions, listable } from "../fragments";

export interface BlogPost {
  _id: string;
  language: string;
  slug: {
    current: string;
  };
  title: string;
  category: {
    _id: string;
    label: BlogLocalizedValue;
    value: string;
  };
  publishedAt: string;
  categoryTag: string;
  excerpt: string;
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

export const blogPostsByLanguageQuery = `*[_type == "blogPost" && language == $lang && ${listable}] | order(publishedAt desc) {
  _id,
  language,
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
heroPhoto { ${imageWithDimensions} },
}`;

export const getBlogPostsByLanguage = async (
  lang: string,
): Promise<BlogPost[]> => {
  return await client.fetch(blogPostsByLanguageQuery, { lang });
};
