import BlogCTAStrip from "@/components/BlogPage/BlogCTAStrip/BlogCTAStrip";

import BlogFilteredSection from "@/components/BlogPage/BlogFilteredSection/BlogFilteredSection";

import BlogHero from "@/components/BlogPage/HeroComponent/BlogHero";
import JsonLd from "@/components/seo/JsonLd";
import { ALL_LOCALES, isSiteLocale } from "@/i18n/blogLocales";
import {
  blogDateFormatLocale,
  pickBlogLocalized,
} from "@/i18n/pickBlogLocalized";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { blogCategories } from "@/sanity/queries/BlogPage/BlogCategories";
import { blogPostsByLanguage } from "@/sanity/queries/BlogPage/BlogPosts";
import { blogPageCtaStrip } from "@/sanity/queries/BlogPage/CtaStripe";
import { blogPageHero } from "@/sanity/queries/BlogPage/Hero";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";

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
  const chromeLocale = isSiteLocale(locale) ? locale : "en";
  const dateLocale = blogDateFormatLocale(locale);

  const [structuredData, hero, categories, posts, ctaStrip] = await Promise.all(
    [
      getStructuredData("blog"),
      blogPageHero(),
      blogCategories(),
      blogPostsByLanguage(locale),
      blogPageCtaStrip(),
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
        data={parseJsonLd(
          structuredData?.seo?.structuredData[chromeLocale as "en" | "es"],
        )}
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
        chromeLocale={chromeLocale}
        dateLocale={dateLocale}
        locale={locale}
      />

      <BlogCTAStrip
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
  const seoLocale = isSiteLocale(locale) ? locale : "en";
  const pageSeo = await getPageSeo("blog");
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
    locale: seoLocale,
    path,
    canonicalUrl,
    meta: pageSeo.seo.meta[seoLocale as "en" | "es"],
    openGraph: {
      title: pageSeo.seo.openGraph[seoLocale as "en" | "es"].title,
      description: pageSeo.seo.openGraph[seoLocale as "en" | "es"].description,
      image: pageSeo.seo.openGraph.image,
    },
    noIndex: pageSeo.seo.noIndex,
    noFollow: pageSeo.seo.noFollow,
    hreflangLanguages,
  });
}
