import { client } from "@/sanity/lib/client";

export interface BlogCategory {
  _id: string;
  label: {
    en: string;
    es: string;
  };
  value: string;
}

export const blogCategoriesQuery = `*[_type == "BlogCategory"] {
  _id,
  label {
    en,
    es
  },
  value
}`;

export const blogCategories = async (): Promise<BlogCategory[]> => {
  return await client.fetch(blogCategoriesQuery);
};