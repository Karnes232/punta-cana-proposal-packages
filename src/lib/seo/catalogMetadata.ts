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
 * Like catalogMetadata, but Home and Contact fall back to their older
 * PageSeo documents for any field the catalog page leaves empty.
 */
export async function catalogPageMetadata(
  locale: Locale,
  path: string,
  seo?: Seo,
  title?: string,
): Promise<Metadata> {
  const previous =
    path === "" || path === "/contact"
      ? await getPageSeo(path === "" ? "home" : "contact")
      : null;
  const preserved: Seo = {
    title: {
      en: previous?.seo?.meta?.en?.title,
      es: previous?.seo?.meta?.es?.title,
    },
    description: {
      en: previous?.seo?.meta?.en?.description,
      es: previous?.seo?.meta?.es?.description,
    },
    image: previous?.seo?.openGraph?.image
      ? { url: previous.seo.openGraph.image.url }
      : undefined,
    noIndex: previous?.seo?.noIndex,
  };
  return catalogMetadata(
    locale,
    path,
    {
      ...preserved,
      ...seo,
      title: { ...preserved.title, ...seo?.title },
      description: { ...preserved.description, ...seo?.description },
    },
    title,
  );
}
