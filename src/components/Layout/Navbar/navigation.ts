// The header's pages and the helpers that place the visitor among them.
// Relative imports: the tests compile this file on its own.
import {
  ALL_LOCALES,
  isBlogOnlyLocale,
  isSiteLocale,
  localePrefix,
  type AppLocale,
} from "../../../i18n/locales";

/** A header link: its path under the language prefix and its Catalog text key. */
export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "", label: "navHome" },
  { href: "proposals", label: "navProposals" },
  { href: "romantic-dinners", label: "navDinners" },
  { href: "how-it-works", label: "navHow" },
  { href: "faq", label: "navFaq" },
  { href: "contact", label: "contactUsLabel" },
];

const LOCALE_SEGMENT = new RegExp(`^/(${ALL_LOCALES.join("|")})(?=/|$)`);

// Where the desktop bar takes over from the Menu button (upto1280 ends).
export const DESKTOP = "(min-width: 1281px)";

/**
 * The page's path without its language, and the language from its URL:
 * blog pages can be in a blog-only language (e.g. /de/blog) while the menu
 * itself is in English.
 */
export function pagePath(pathname: string) {
  return {
    path: pathname.replace(LOCALE_SEGMENT, "") || "/",
    urlLanguage: (pathname.match(LOCALE_SEGMENT)?.[1] ?? "en") as AppLocale,
  };
}

export const isBlogPath = (path: string) =>
  path === "/blog" || path.startsWith("/blog/");

/** The link's own page. */
export const isPage = (path: string, href: string) => path === `/${href}`;

/** The link's page or a page inside its section (shown in gold). */
export const inSection = (path: string, href: string) =>
  isPage(path, href) || (href !== "" && path.startsWith(`/${href}/`));

/**
 * The same page in another language. A blog post has its own slug in each
 * language (its alternates); without one, the language's blog index.
 */
export function languageHref(
  language: AppLocale,
  path: string,
  alternates: { language: string; path: string }[] | null,
) {
  const target = path.startsWith("/blog/")
    ? alternates?.find((a) => a.language === language)?.path || "/blog"
    : path;
  // Blog-only languages always have their prefix (localePrefix is for
  // site languages, where English has none).
  const languagePrefix = isSiteLocale(language)
    ? localePrefix(language)
    : `/${language}`;
  return languagePrefix
    ? `${languagePrefix}${target === "/" ? "" : target}`
    : target;
}

/** Site languages first, then the blog-only ones. */
export function splitLanguages(languages: readonly AppLocale[]) {
  return {
    site: languages.filter((l) => !isBlogOnlyLocale(l)),
    blog: languages.filter((l) => isBlogOnlyLocale(l)),
  };
}
