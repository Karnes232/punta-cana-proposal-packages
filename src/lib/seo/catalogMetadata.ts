import type { Metadata } from "next";

import { local } from "@/lib/experience/normalize";
import type { Locale, Seo } from "@/lib/experience/types";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo } from "@/sanity/queries/SEO/seo";

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
    title: local(seo?.title, locale) || title,
    description: local(seo?.description, locale) || undefined,
    alternates: {
      canonical: siteCanonicalUrl(locale, path),
      languages: {
        en: siteCanonicalUrl("en", path),
        es: siteCanonicalUrl("es", path),
        "x-default": siteCanonicalUrl("en", path),
      },
    },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: seo?.image?.url ? { images: [seo.image.url] } : undefined,
  };
}
/**
 * Metadata for a catalog page (home, proposals, romantic dinners, contact)
 * from its Page SEO entry in the Studio; `title` is used when it has none.
 */
export async function catalogPageMetadata(
  locale: Locale,
  path: string,
  pageName: string,
  title?: string,
): Promise<Metadata> {
  const page = (await getPageSeo(pageName))?.seo;
  return catalogMetadata(
    locale,
    path,
    {
      title: { en: page?.meta?.en?.title, es: page?.meta?.es?.title },
      description: {
        en: page?.meta?.en?.description,
        es: page?.meta?.es?.description,
      },
      image: page?.openGraph?.image
        ? { url: page.openGraph.image.url }
        : undefined,
      noIndex: page?.noIndex,
    },
    title,
  );
}
