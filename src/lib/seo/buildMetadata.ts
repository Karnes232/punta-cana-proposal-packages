import type { Metadata } from "next";

import { generateHreflangAlternates } from "@/i18n/hreflang";
import type { SiteLocale } from "@/i18n/locales";
import type { DocumentSeo } from "@/sanity/queries/SEO/documentSeo";

export type SeoLocale = SiteLocale;

type OgImageInput = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

/**
 * Metadata fields from a per-language document's SEO (see DocumentSeo), with
 * fallbacks: Open Graph text falls back to the meta text, and the meta text
 * to the Open Graph text.
 */
export function seoFields(seo: DocumentSeo | null | undefined) {
  // Empty strings count as missing, like absent fields.
  const title = seo?.meta?.title || seo?.openGraph?.title || "";
  const description =
    seo?.meta?.description || seo?.openGraph?.description || "";
  const keywords = seo?.meta?.keywords;
  return {
    meta: {
      title,
      description,
      keywords: Array.isArray(keywords) ? keywords : [],
    },
    openGraph: {
      title: seo?.openGraph?.title || title,
      description: seo?.openGraph?.description || description,
      image: seo?.image,
    },
    noIndex: seo?.noIndex,
    noFollow: seo?.noFollow,
  };
}

export function buildSeoMetadata(opts: {
  path: string;
  canonicalUrl: string;
  meta: { title: string; description: string; keywords: string[] };
  openGraph: {
    title: string;
    description: string;
    image?: OgImageInput | null;
  };
  noIndex?: boolean;
  noFollow?: boolean;
  /** When set (e.g. blog translations), replaces the every-language hreflang alternates. */
  hreflangLanguages?: Record<string, string>;
}): Metadata {
  const {
    path,
    canonicalUrl,
    meta,
    openGraph,
    noIndex,
    noFollow,
    hreflangLanguages,
  } = opts;

  const ogImages =
    openGraph.image?.url != null && openGraph.image.url !== ""
      ? [
          {
            url: openGraph.image.url,
            width: openGraph.image.width ?? undefined,
            height: openGraph.image.height ?? undefined,
            alt: openGraph.image.alt ?? undefined,
          },
        ]
      : undefined;

  return {
    title: meta.title,
    description: meta.description,
    ...(meta.keywords?.length ? { keywords: meta.keywords.join(", ") } : {}),
    openGraph: {
      title: openGraph.title,
      description: openGraph.description,
      type: "website",
      url: canonicalUrl,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: openGraph.title,
      description: openGraph.description,
      ...(openGraph.image?.url ? { images: [openGraph.image.url] } : {}),
    },
    robots: {
      index: !(noIndex ?? false),
      follow: !(noFollow ?? false),
    },
    alternates: {
      canonical: canonicalUrl,
      ...(hreflangLanguages
        ? { languages: hreflangLanguages }
        : generateHreflangAlternates(path)),
    },
  };
}

type SiteDefault = { title: string; description: string };

const SITE_DEFAULTS: { en: SiteDefault } & Partial<
  Record<SeoLocale, SiteDefault>
> = {
  en: {
    title: "Punta Cana Proposal Packages",
    description:
      "Private, curated proposal experiences in the heart of Punta Cana.",
  },
  es: {
    title: "Punta Cana Proposal Packages",
    description:
      "Experiencias de propuesta privadas y curadas en el corazón de Punta Cana.",
  },
  fr: {
    title: "Punta Cana Proposal Packages",
    description:
      "Des demandes en mariage privées et pensées sur mesure, au cœur de Punta Cana.",
  },
  pt: {
    title: "Punta Cana Proposal Packages",
    description:
      "Experiências privativas e exclusivas de pedido de casamento no coração de Punta Cana.",
  },
};

/** When PageSeo is missing in Sanity — still allow indexing. */
export function fallbackSiteMetadata(
  locale: string,
  path: string,
  canonicalUrl: string,
): Metadata {
  const d = SITE_DEFAULTS[locale as SeoLocale] ?? SITE_DEFAULTS.en;
  return buildSeoMetadata({
    path,
    canonicalUrl,
    meta: { title: d.title, description: d.description, keywords: [] },
    openGraph: { title: d.title, description: d.description },
  });
}

/** When a slug document is missing — avoid indexing thin/empty URLs. */
export function fallbackMissingDocumentMetadata(
  locale: string,
  path: string,
  canonicalUrl: string,
): Metadata {
  const d = SITE_DEFAULTS[locale as SeoLocale] ?? SITE_DEFAULTS.en;
  return buildSeoMetadata({
    path,
    canonicalUrl,
    meta: { title: d.title, description: d.description, keywords: [] },
    openGraph: { title: d.title, description: d.description },
    noIndex: true,
    noFollow: true,
  });
}
