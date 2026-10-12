import {
  buildSeoMetadata,
  fallbackSiteMetadata,
  seoFields,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo } from "@/sanity/queries/SEO/seo";
import type { SiteLocale } from "@/i18n/locales";
import type { LegalPageName } from "./LegalPage";

/** A legal page's metadata: its SEO from the Studio, else the site's. */
export async function legalMetadata(page: LegalPageName, locale: SiteLocale) {
  const pageSeo = await getPageSeo(page, locale);
  const path = `/${page}`;
  const canonicalUrl = siteCanonicalUrl(locale, path);
  // No SEO title: the site default, rather than an empty <title>.
  if (!pageSeo?.seo?.meta?.title) {
    return fallbackSiteMetadata(locale, path, canonicalUrl);
  }
  return buildSeoMetadata({
    path,
    canonicalUrl,
    ...seoFields(pageSeo.seo),
  });
}
