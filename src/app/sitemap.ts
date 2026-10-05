import { getExperiences } from "@/sanity/queries/ExperienceCatalog";
import type { MetadataRoute } from "next";

import { SITE_LOCALES } from "@/i18n/locales";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import {
  STATIC_SITEMAP_PATHS,
  absoluteBlogUrl,
  getSitemapBlogEntries,
  getSitemapDynamicPaths,
} from "@/sanity/queries/SEO/sitemapUrls";

export const revalidate = 3600;

function normalizePath(path: string): string {
  if (path === "" || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function changeFrequency(
  path: string,
): NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]> {
  if (path.includes("/blog/") || path.includes("/stories/")) return "weekly";
  return "monthly";
}

function priority(path: string): number {
  const p = normalizePath(path);
  if (p === "") return 1;
  const depth = p.split("/").filter(Boolean).length;
  return depth <= 1 ? 0.9 : 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dynamicPaths, blogEntries] = await Promise.all([
    getSitemapDynamicPaths(),
    getSitemapBlogEntries(),
  ]);

  const experiences = await getExperiences();
  const catalogPaths = experiences
    .filter((e) => e.slug?.current && !e.seo?.noIndex)
    .map(
      (e) =>
        `/${e._type === "proposalExperience" ? "proposals" : "romantic-dinners"}/${e.slug!.current}`,
    );
  const pathSet = new Set<string>([
    ...STATIC_SITEMAP_PATHS,
    ...dynamicPaths,
    ...catalogPaths,
  ]);

  const entries: MetadataRoute.Sitemap = [];
  const urlSeen = new Set<string>();
  const now = new Date();

  for (const raw of pathSet) {
    const path = normalizePath(raw);
    // Every page exists in every site language.
    const languages = Object.fromEntries(
      SITE_LOCALES.map((locale) => [locale, siteCanonicalUrl(locale, path)]),
    );
    for (const url of Object.values(languages)) {
      if (urlSeen.has(url)) continue;
      urlSeen.add(url);
      entries.push({
        url,
        lastModified: now,
        changeFrequency: changeFrequency(path),
        priority: priority(path),
        alternates: { languages },
      });
    }
  }

  for (const row of blogEntries) {
    if (!row.slug || !row.language) continue;
    const url = absoluteBlogUrl(row.language, row.slug);
    if (urlSeen.has(url)) continue;
    urlSeen.add(url);
    const path = normalizePath(`/blog/${row.slug}`);
    entries.push({
      url,
      lastModified: now,
      changeFrequency: changeFrequency(path),
      priority: priority(path),
    });
  }

  return entries;
}
