import { client } from "@/sanity/lib/client";

import { blogPostPath, siteCanonicalUrl } from "@/lib/seo/constants";

const sitemapPackagesQuery = `*[_type == "ProposalPackages"] {
  "category": page,
  "slugs": packages[]->slug.current
}`;

const sitemapBlogEntriesQuery = `*[_type == "blogPost" && defined(slug.current) && defined(language)] {
  "language": language,
  "slug": slug.current
}`;

const sitemapStorySlugsQuery = `*[_type == "individualStory" && defined(slug.current)] {
  "slug": slug.current
}`;

const PROPOSAL_HUB_SEGMENTS = new Set([
  "classic-proposals",
  "modern-proposals",
  "dining-proposals",
  "adventure-proposals",
]);

export const STATIC_SITEMAP_PATHS = [
  "",
  "/classic-proposals",
  "/modern-proposals",
  "/dining-proposals",
  "/adventure-proposals",
  "/blog",
  "/stories",
  "/faq",
  "/how-it-works",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
] as const;

export async function getSitemapDynamicPaths(): Promise<string[]> {
  const [packages, stories] = await Promise.all([
    client.fetch<Array<{ category: string; slugs: (string | null)[] | null }>>(
      sitemapPackagesQuery,
    ),
    client.fetch<Array<{ slug: string }>>(sitemapStorySlugsQuery),
  ]);

  const paths: string[] = [];

  for (const row of packages ?? []) {
    const seg = row.category;
    if (!seg || !PROPOSAL_HUB_SEGMENTS.has(seg)) continue;
    for (const slug of row.slugs ?? []) {
      if (typeof slug === "string" && slug.length > 0) {
        paths.push(`/${seg}/${slug}`);
      }
    }
  }
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
