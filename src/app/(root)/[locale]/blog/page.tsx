import CtaStrip from "@/components/ui/CtaStrip";

import BlogFilteredSection from "@/components/BlogPage/BlogFilteredSection/BlogFilteredSection";

import BlogHero from "@/components/BlogPage/HeroComponent/BlogHero";
import JsonLd from "@/components/seo/JsonLd";
import { ALL_LOCALES, toSiteLocale } from "@/i18n/locales";
import {
  blogDateFormatLocale,
  pickBlogLocalized,
} from "@/i18n/pickBlogLocalized";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getBlogCategories } from "@/sanity/queries/BlogPage/BlogCategories";
import { getBlogPostsByLanguage } from "@/sanity/queries/BlogPage/BlogPosts";
import { getBlogPage } from "@/sanity/queries/BlogPage/BlogPage";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { requireLocale } from "@/i18n/requireLocale";

function parseJsonLd(raw: string | null | undefined): unknown {
  if (raw == null || raw === "") return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const chromeLocale = toSiteLocale(locale);
  const dateLocale = blogDateFormatLocale(locale);

  const [structuredData, page, categories, posts] = await Promise.all([
    getStructuredData("blog", chromeLocale),
    getBlogPage(chromeLocale),
    getBlogCategories(),
    getBlogPostsByLanguage(locale),
  ]);
  const hero = page?.hero;
  const cta = page?.cta;

  // Only a post in the visitor's language is featured.
  const featuredPost =
    page?.featuredPost?.language === locale ? page.featuredPost : null;

  const categoriesForFilter = categories.map((c) => ({
    value: c.value,
    label: pickBlogLocalized(c.label, locale),
  }));

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={parseJsonLd(structuredData?.seo?.structuredData)}
      />
      <BlogHero
        eyebrow={hero?.eyebrow ?? ""}
        headingLine1={hero?.headingLine1 ?? ""}
        headingLine2={hero?.headingLine2 ?? ""}
        subheading={hero?.subheading ?? ""}
        image={hero?.image}
      />
      <BlogFilteredSection
        featuredPost={featuredPost}
        categories={categoriesForFilter}
        posts={posts}
        dateLocale={dateLocale}
        locale={locale}
      />

      <CtaStrip
        eyebrow={cta?.eyebrow ?? ""}
        heading={cta?.heading ?? ""}
        headingAccent={cta?.headingAccent ?? ""}
        subheading={cta?.subheading ?? ""}
        ctaLabel={cta?.ctaLabel ?? ""}
        ctaHref={cta?.ctaHref ?? ""}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const seoLocale = toSiteLocale(locale);
  const pageSeo = await getPageSeo("blog", seoLocale);
  const path = "/blog";
  const canonicalUrl = siteCanonicalUrl(locale, path);
  if (!pageSeo) {
    return fallbackSiteMetadata(seoLocale, path, canonicalUrl);
  }

  const hreflangLanguages: Record<string, string> = Object.fromEntries(
    ALL_LOCALES.map((l) => [l, siteCanonicalUrl(l, path)]),
  );
  hreflangLanguages["x-default"] = siteCanonicalUrl("en", path);

  return buildSeoMetadata({
    path,
    canonicalUrl,
    meta: pageSeo.seo.meta,
    openGraph: { ...pageSeo.seo.openGraph, image: pageSeo.seo.image },
    noIndex: pageSeo.seo.noIndex,
    noFollow: pageSeo.seo.noFollow,
    hreflangLanguages,
  });
}
