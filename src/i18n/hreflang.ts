import { SITE_URL, blogPostPath, siteCanonicalUrl } from "@/lib/seo/constants";

export type HreflangSibling = { language: string; slug: string };

/**
 * hreflang map for blog posts: one URL per translation + x-default (prefers English).
 */
export function buildBlogHreflangMap(
  siblings: HreflangSibling[],
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const { language, slug } of siblings) {
    languages[language] = siteCanonicalUrl(language, blogPostPath(slug));
  }
  const en = siblings.find((s) => s.language === "en");
  if (en) {
    languages["x-default"] = siteCanonicalUrl("en", blogPostPath(en.slug));
  } else if (siblings[0]) {
    const s = siblings[0];
    languages["x-default"] = siteCanonicalUrl(s.language, blogPostPath(s.slug));
  }
  return languages;
}

/**
 * Utility function to generate hreflang URLs for a given path
 * Ensures reciprocal hreflang tags (both en and es versions)
 */
export function generateHreflangUrls(
  path: string,
  baseUrl: string = SITE_URL,
): { en: string; es: string } {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // For English, path without locale prefix
  const enPath = cleanPath;
  // For Spanish, add /es prefix (avoid trailing slash when path is empty)
  const esPath = cleanPath ? `es/${cleanPath}` : "es";

  return {
    en: enPath ? `${baseUrl}/${enPath}` : baseUrl,
    es: `${baseUrl}/${esPath}`,
  };
}

/**
 * Generate alternates object with hreflang tags for Next.js metadata
 */
export function generateHreflangAlternates(
  currentLocale: "en" | "es",
  path: string,
  baseUrl: string = SITE_URL,
) {
  const urls = generateHreflangUrls(path, baseUrl);

  return {
    languages: {
      en: urls.en,
      es: urls.es,
      "x-default": urls.en, // Default to English
    },
  };
}
