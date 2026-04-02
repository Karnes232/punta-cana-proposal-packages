import type { Metadata } from "next";

import { generateHreflangAlternates } from "@/i18n/hreflang";

export type SeoLocale = "en" | "es";

type OgImageInput = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export function buildSeoMetadata(opts: {
  locale: SeoLocale;
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
}): Metadata {
  const { locale, path, canonicalUrl, meta, openGraph, noIndex, noFollow } =
    opts;

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
    ...(meta.keywords.length > 0
      ? { keywords: meta.keywords.join(", ") }
      : {}),
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
      ...generateHreflangAlternates(locale, path),
    },
  };
}

const SITE_DEFAULTS = {
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
} as const;

/** When PageSeo is missing in Sanity — still allow indexing. */
export function fallbackSiteMetadata(
  locale: SeoLocale,
  path: string,
  canonicalUrl: string,
): Metadata {
  const d = SITE_DEFAULTS[locale];
  return buildSeoMetadata({
    locale,
    path,
    canonicalUrl,
    meta: { title: d.title, description: d.description, keywords: [] },
    openGraph: { title: d.title, description: d.description },
  });
}

/** When a slug document is missing — avoid indexing thin/empty URLs. */
export function fallbackMissingDocumentMetadata(
  locale: SeoLocale,
  path: string,
  canonicalUrl: string,
): Metadata {
  const d = SITE_DEFAULTS[locale];
  return buildSeoMetadata({
    locale,
    path,
    canonicalUrl,
    meta: { title: d.title, description: d.description, keywords: [] },
    openGraph: { title: d.title, description: d.description },
    noIndex: true,
    noFollow: true,
  });
}
