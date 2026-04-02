import BlogCTAStrip from "@/components/BlogPage/BlogCTAStrip/BlogCTAStrip";

import BlogFilteredSection from "@/components/BlogPage/BlogFilteredSection/BlogFilteredSection";

import BlogHero from "@/components/BlogPage/HeroComponent/BlogHero";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { blogCategories } from "@/sanity/queries/BlogPage/BlogCategories";
import { blogPosts } from "@/sanity/queries/BlogPage/BlogPosts";
import { blogPageCtaStrip } from "@/sanity/queries/BlogPage/CtaStripe";
import { blogPageHero } from "@/sanity/queries/BlogPage/Hero";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [structuredData, hero, categories, posts, ctaStrip] = await Promise.all(
    [
      getStructuredData("blog"),
      blogPageHero(),
      blogCategories(),
      blogPosts(),
      blogPageCtaStrip(),
    ],
  );

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData[locale as "en" | "es"]}
      />
      <BlogHero
        eyebrow={hero?.eyebrow[locale as "en" | "es"]}
        headingLine1={hero?.headingLine1[locale as "en" | "es"]}
        headingLine2={hero?.headingLine2[locale as "en" | "es"]}
        subheading={hero?.subheading[locale as "en" | "es"]}
        image={hero?.image}
        locale={locale as "en" | "es"}
      />
      <BlogFilteredSection
        featuredPost={hero.featuredPost}
        categories={categories}
        posts={posts}
        locale={locale as "en" | "es"}
      />

      <BlogCTAStrip
        eyebrow={ctaStrip.eyebrow[locale as "en" | "es"]}
        heading={ctaStrip.heading[locale as "en" | "es"]}
        headingAccent={ctaStrip.headingAccent[locale as "en" | "es"]}
        subheading={ctaStrip.subheading[locale as "en" | "es"]}
        ctaLabel={ctaStrip.ctaLabel[locale as "en" | "es"]}
        ctaHref={ctaStrip.ctaHref}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  const pageSeo = await getPageSeo("blog");
  const path = "/blog";
  const canonicalUrl = siteCanonicalUrl(locale, path);
  if (!pageSeo) {
    return fallbackSiteMetadata(locale, path, canonicalUrl);
  }

  return buildSeoMetadata({
    locale,
    path,
    canonicalUrl,
    meta: pageSeo.seo.meta[locale],
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      image: pageSeo.seo.openGraph.image,
    },
    noIndex: pageSeo.seo.noIndex,
    noFollow: pageSeo.seo.noFollow,
  });
}
