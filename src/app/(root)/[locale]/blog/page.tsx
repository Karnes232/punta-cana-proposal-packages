import BlogCTAStrip from "@/components/BlogPage/BlogCTAStrip/BlogCTAStrip";

import BlogFilteredSection from "@/components/BlogPage/BlogFilteredSection/BlogFilteredSection";

import BlogHero from "@/components/BlogPage/HeroComponent/BlogHero";
import JsonLd from "@/components/seo/JsonLd";
import { isSiteLocale } from "@/i18n/blogLocales";
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
  const uiLocale = isSiteLocale(locale) ? locale : "en";

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

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={parseJsonLd(
          structuredData?.seo?.structuredData[uiLocale as "en" | "es"],
        )}
      />
      <BlogHero
        eyebrow={hero?.eyebrow[uiLocale]}
        headingLine1={hero?.headingLine1[uiLocale]}
        headingLine2={hero?.headingLine2[uiLocale]}
        subheading={hero?.subheading[uiLocale]}
        image={hero?.image}
      />
      <BlogFilteredSection
        featuredPost={featuredPost}
        categories={categories}
        posts={posts}
        uiLocale={uiLocale}
      />

      <BlogCTAStrip
        eyebrow={ctaStrip.eyebrow[uiLocale]}
        heading={ctaStrip.heading[uiLocale]}
        headingAccent={ctaStrip.headingAccent[uiLocale]}
        subheading={ctaStrip.subheading[uiLocale]}
        ctaLabel={ctaStrip.ctaLabel[uiLocale]}
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

  const hreflangLanguages: Record<string, string> | undefined = isSiteLocale(
    locale,
  )
    ? undefined
    : {
        en: siteCanonicalUrl("en", path),
        es: siteCanonicalUrl("es", path),
        [locale]: siteCanonicalUrl(locale, path),
        "x-default": siteCanonicalUrl("en", path),
      };

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
