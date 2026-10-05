import type { IndividualBlog } from "@/sanity/queries/BlogPage/IndividualBlog";

export interface MoreBlogsPost {
  slug: string;
  title: string;
  categoryTag: string;
  publishedAt: string;
  readingTime: number;
  excerpt: string;
  heroPhoto: IndividualBlog["heroPhoto"];
}
