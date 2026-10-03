import type { Metadata } from "next";

import { generateHreflangAlternates } from "@/i18n/hreflang";
import type { SiteLocale } from "@/i18n/blogLocales";

export type SeoLocale = SiteLocale;

type OgImageInput = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type LocalizedSeoText = {
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
} | null;

/** The per-locale `seo` object returned by Sanity SEO projections. */
type LocalizedSeoInput = {
  meta?: Partial<Record<SeoLocale, LocalizedSeoText>> | null;
  openGraph?:
    | (Partial<Record<SeoLocale, LocalizedSeoText>> & {
        image?: OgImageInput | null;
      })
    | null;
};

/**
 * Picks the `meta` and `openGraph` fields for `locale`, falling back when an
 * editor left a translation empty: Open Graph falls back to the page's meta
 * text, and a missing locale falls back to English. A missing field never
 * throws, so one untranslated document can't take its page down.
 */
export function localizedSeoFields(
  seo: LocalizedSeoInput | null | undefined,
  locale: string,
): {
  meta: { title: string; description: string; keywords: string[] };
  openGraph: {
    title: string;
    description: string;
    image?: OgImageInput | null;
  };
} {
  const lang: SeoLocale = locale === "es" ? "es" : "en";
  const meta = seo?.meta?.[lang] ?? seo?.meta?.en ?? null;
  const og = seo?.openGraph?.[lang] ?? seo?.openGraph?.en ?? null;
  const title = meta?.title ?? og?.title ?? "";
  const description = meta?.description ?? og?.description ?? "";

  return {
    meta: { title, description, keywords: meta?.keywords ?? [] },
    openGraph: {
      title: og?.title ?? title,
      description: og?.description ?? description,
      image: seo?.openGraph?.image,
    },
  };
}

export function buildSeoMetadata(opts: {
  /** Used for default hreflang when hreflangLanguages is omitted; may be any routing locale. */
  locale: string;
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
  /** When set (e.g. blog translations), replaces fixed en/es hreflang alternates. */
  hreflangLanguages?: Record<string, string>;
}): Metadata {
  const {
    locale,
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
    ...(meta.keywords.length > 0 ? { keywords: meta.keywords.join(", ") } : {}),
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
        : generateHreflangAlternates(locale as SeoLocale, path)),
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
  locale: string,
  path: string,
  canonicalUrl: string,
): Metadata {
  const d = SITE_DEFAULTS[locale as SeoLocale] ?? SITE_DEFAULTS.en;
  return buildSeoMetadata({
    locale: locale as SeoLocale,
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
    locale: locale as SeoLocale,
    path,
    canonicalUrl,
    meta: { title: d.title, description: d.description, keywords: [] },
    openGraph: { title: d.title, description: d.description },
    noIndex: true,
    noFollow: true,
  });
}
