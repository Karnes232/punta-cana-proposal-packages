/**
 * Site UI is localized to SITE_LOCALES only (nav, footer copy, switcher).
 * BLOG_ONLY_LOCALES may appear in URLs under /blog only (see `src/proxy.ts`).
 */
export const SITE_LOCALES = ["en", "es", "fr", "pt"] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

/**
 * Languages content is written in, in the Studio. The site shows the
 * SITE_LOCALES among them; the others can be prepared before going live.
 */
export const CONTENT_LOCALES = ["en", "es", "fr", "pt"] as const;
export type ContentLocale = (typeof CONTENT_LOCALES)[number];
export const LANGUAGE_NAMES: Record<ContentLocale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

export const BLOG_ONLY_LOCALES = ["de", "it", "zh", "ru", "ar"] as const;
export type BlogOnlyLocale = (typeof BLOG_ONLY_LOCALES)[number];

export const ALL_LOCALES = [...SITE_LOCALES, ...BLOG_ONLY_LOCALES] as const;
export type AppLocale = (typeof ALL_LOCALES)[number];

/** Label for the blog category filter “show all posts” tab. */
const ALL_POSTS_FILTER_LABELS: Record<AppLocale, string> = {
  en: "All Posts",
  es: "Todos",
  fr: "Tous les articles",
  de: "Alle Beiträge",
  it: "Tutti gli articoli",
  pt: "Todos os artigos",
  zh: "所有帖子",
  ru: "Все сообщения",
  ar: "جميع المشاركات",
};

export function blogAllPostsFilterLabel(locale: string): string {
  if ((ALL_LOCALES as readonly string[]).includes(locale)) {
    return ALL_POSTS_FILTER_LABELS[locale as AppLocale];
  }
  return ALL_POSTS_FILTER_LABELS.en;
}

export function isBlogOnlyLocale(locale: string): locale is BlogOnlyLocale {
  return (BLOG_ONLY_LOCALES as readonly string[]).includes(locale);
}

export function isSiteLocale(locale: string): locale is SiteLocale {
  return (SITE_LOCALES as readonly string[]).includes(locale);
}

/** The site UI's language for a route locale (English when it has no UI). */
export function toSiteLocale(locale: string): SiteLocale {
  return isSiteLocale(locale) ? locale : "en";
}

/** URL prefix of a site language: "" for English (as-needed), "/es" etc. */
export function localePrefix(locale: string): string {
  return isSiteLocale(locale) && locale !== "en" ? `/${locale}` : "";
}
