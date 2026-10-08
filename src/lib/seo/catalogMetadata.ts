import type { Metadata } from "next";

import type { Locale, Seo } from "@/lib/experience/types";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { buildSeoMetadata, seoFields } from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, type SeoPage } from "@/sanity/queries/SEO/seo";

// Metadata for the experience catalog: the catalog pages (home, proposals,
// romantic dinners, contact) and the proposal and dinner detail pages.

/**
 * Metadata from a proposal or dinner's own `seo` field: title, description,
 * canonical + hreflang, robots and an Open Graph image.
 */
export function catalogMetadata(
  locale: Locale,
  path: string,
  seo?: Seo,
  title?: string,
): Metadata {
  return {
    // This language only: an untranslated SEO title falls back to the
    // page's own title in this language, not to the English SEO title.
    title: seo?.title?.[locale] || title,
    description: seo?.description?.[locale] || undefined,
    alternates: {
      canonical: siteCanonicalUrl(locale, path),
      ...generateHreflangAlternates(path),
    },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: seo?.image?.url ? { images: [seo.image.url] } : undefined,
  };
}
/**
 * Metadata for a catalog page (home, proposals, romantic dinners, contact)
 * from the SEO tab of its page document, through the same builder as the
 * other pages: keywords, Open Graph and robots included. `title` is used
 * when this language has no SEO title.
 */
export async function catalogPageMetadata(
  locale: Locale,
  path: string,
  pageName: SeoPage,
  title?: string,
): Promise<Metadata> {
  const fields = seoFields((await getPageSeo(pageName, locale))?.seo);
  return buildSeoMetadata({
    path,
    canonicalUrl: siteCanonicalUrl(locale, path),
    ...fields,
    // This language only: without an SEO title, the page's own title.
    meta: { ...fields.meta, title: fields.meta.title || title || "" },
    openGraph: {
      ...fields.openGraph,
      title: fields.openGraph.title || title || "",
    },
  });
}
