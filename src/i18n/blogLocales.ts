/**
 * Site UI is localized to SITE_LOCALES only (nav, footer copy, switcher).
 * BLOG_ONLY_LOCALES may appear in URLs under /blog only (see `src/proxy.ts`).
 */
export const SITE_LOCALES = ["en", "es"] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

export const BLOG_ONLY_LOCALES = ["fr", "de", "it", "pt"] as const;
export type BlogOnlyLocale = (typeof BLOG_ONLY_LOCALES)[number];

export const ALL_LOCALES = [
  ...SITE_LOCALES,
  ...BLOG_ONLY_LOCALES,
] as const;
export type AppLocale = (typeof ALL_LOCALES)[number];

export function isBlogOnlyLocale(locale: string): locale is BlogOnlyLocale {
  return (BLOG_ONLY_LOCALES as readonly string[]).includes(locale);
}

export function isSiteLocale(locale: string): locale is SiteLocale {
  return (SITE_LOCALES as readonly string[]).includes(locale);
}
