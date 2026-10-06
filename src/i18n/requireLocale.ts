import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { isSiteLocale, type AppLocale, type SiteLocale } from "./locales";
import { routing } from "./routing";

/**
 * 404 for a [locale] segment that isn't a configured locale.
 *
 * The [locale] layout checks this too, but Next renders a layout and its page
 * in parallel, so the page still ran with values like "foo.bar" (paths with a
 * dot skip the proxy) and crashed in Intl.NumberFormat. Call it in every page
 * and generateMetadata right after reading params.
 */
export function requireLocale(locale: string): asserts locale is AppLocale {
  if (!hasLocale(routing.locales, locale)) notFound();
}

/**
 * 404 for a language without the full site (the blog-only languages) on a
 * page that has a request form: the API only takes requests in site
 * languages. The proxy already redirects these URLs; this covers paths it
 * skips.
 */
export function requireSiteLocale(
  locale: string,
): asserts locale is SiteLocale {
  if (!isSiteLocale(locale)) notFound();
}
