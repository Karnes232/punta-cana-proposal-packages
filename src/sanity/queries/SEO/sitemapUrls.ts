import { client } from "@/sanity/lib/client";

import { blogPostPath, siteCanonicalUrl } from "@/lib/seo/constants";

const sitemapBlogEntriesQuery = `*[_type == "blogPost" && defined(slug.current) && defined(language)] {
  "language": language,
  "slug": slug.current
}`;

const sitemapStorySlugsQuery = `*[_type == "individualStory" && defined(slug.current)] {
  "slug": slug.current
}`;

export const STATIC_SITEMAP_PATHS = [
  "/proposals",
  "/romantic-dinners",
  "",
  "/blog",
  "/stories",
  "/faq",
  "/how-it-works",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
] as const;

export async function getSitemapDynamicPaths(): Promise<string[]> {
  const stories = await client.fetch<Array<{ slug: string }>>(
    sitemapStorySlugsQuery,
  );

  const paths: string[] = [];

  for (const s of stories ?? []) {
    if (s.slug) paths.push(`/stories/${s.slug}`);
  }

  return paths;
}

export async function getSitemapBlogEntries(): Promise<
  { language: string; slug: string }[]
> {
  return await client.fetch(sitemapBlogEntriesQuery);
}

export function absoluteBlogUrl(language: string, slug: string): string {
  return siteCanonicalUrl(language, blogPostPath(slug));
}
