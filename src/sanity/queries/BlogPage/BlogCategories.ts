import type { BlogLocalizedValue } from "@/i18n/pickBlogLocalized";
import { client } from "@/sanity/lib/client";
import { blogLocalizedStringGroq } from "./blogLocalizedProjection";

export interface BlogCategory {
  _id: string;
  label: BlogLocalizedValue;
  value: string;
}

export const blogCategoriesQuery = `*[_type == "BlogCategory"] {
  _id,
  label ${blogLocalizedStringGroq},
  value
}`;

export const blogCategories = async (): Promise<BlogCategory[]> => {
  return await client.fetch(blogCategoriesQuery);
};
