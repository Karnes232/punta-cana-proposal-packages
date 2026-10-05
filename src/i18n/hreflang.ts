import { SITE_LOCALES } from "@/i18n/locales";
import { blogPostPath, siteCanonicalUrl } from "@/lib/seo/constants";

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
 * hreflang alternates for a page that exists in every site language: one URL
 * per language plus x-default (English).
 */
export function generateHreflangAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        SITE_LOCALES.map((locale) => [locale, siteCanonicalUrl(locale, path)]),
      ),
      "x-default": siteCanonicalUrl("en", path),
    },
  };
}
