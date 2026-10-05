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
import { getBlogPageCtaStrip } from "@/sanity/queries/BlogPage/CtaStrip";
import { getBlogPageHero } from "@/sanity/queries/BlogPage/Hero";
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

  const [structuredData, hero, categories, posts, ctaStrip] = await Promise.all(
    [
      getStructuredData("blog", chromeLocale),
      getBlogPageHero(),
      getBlogCategories(),
      getBlogPostsByLanguage(locale),
      getBlogPageCtaStrip(),
    ],
  );

  const featuredPost =
    hero?.featuredPost?.language === locale ? hero.featuredPost : null;

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
        eyebrow={pickBlogLocalized(hero?.eyebrow, locale)}
        headingLine1={pickBlogLocalized(hero?.headingLine1, locale)}
        headingLine2={pickBlogLocalized(hero?.headingLine2, locale)}
        subheading={pickBlogLocalized(hero?.subheading, locale)}
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
        eyebrow={pickBlogLocalized(ctaStrip.eyebrow, locale)}
        heading={pickBlogLocalized(ctaStrip.heading, locale)}
        headingAccent={pickBlogLocalized(ctaStrip.headingAccent, locale)}
        subheading={pickBlogLocalized(ctaStrip.subheading, locale)}
        ctaLabel={pickBlogLocalized(ctaStrip.ctaLabel, locale)}
        ctaHref={ctaStrip.ctaHref}
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
