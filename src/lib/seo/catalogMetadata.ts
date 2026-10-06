import type { Metadata } from "next";

import type { Locale, Seo } from "@/lib/experience/types";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, type SeoPage } from "@/sanity/queries/SEO/seo";

// Metadata for the experience catalog pages (home, proposals, romantic
// dinners, contact). Simpler than buildSeoMetadata in ./buildMetadata.ts:
// title, description, canonical + hreflang, robots and an Open Graph image.

/** Metadata from an experience or catalog page's `seo` field. */
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
 * from the SEO tab of its page document; `title` is used when it has none.
 */
export async function catalogPageMetadata(
  locale: Locale,
  path: string,
  pageName: SeoPage,
  title?: string,
): Promise<Metadata> {
  const page = (await getPageSeo(pageName, locale))?.seo;
  return catalogMetadata(
    locale,
    path,
    {
      title: { [locale]: page?.meta?.title },
      description: { [locale]: page?.meta?.description },
      image: page?.image ? { url: page.image.url } : undefined,
      noIndex: page?.noIndex,
    },
    title,
  );
}
