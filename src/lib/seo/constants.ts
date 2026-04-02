export const SITE_URL = "https://puntacanaproposalpackages.com";

export type SiteLocale = "en" | "es";

/** Path without locale prefix, e.g. `""` (home), `/contact`, `/blog/slug`. */
export function siteCanonicalUrl(locale: SiteLocale, path: string): string {
  const normalized =
    path === "" || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    return normalized === "" ? SITE_URL : `${SITE_URL}${normalized}`;
  }
  return normalized === "" ? `${SITE_URL}/es` : `${SITE_URL}/es${normalized}`;
}
