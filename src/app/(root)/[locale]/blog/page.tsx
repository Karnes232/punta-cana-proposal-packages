import BlogCTAStrip from "@/components/BlogPage/BlogCTAStrip/BlogCTAStrip";

import BlogFilteredSection from "@/components/BlogPage/BlogFilteredSection/BlogFilteredSection";

import BlogHero from "@/components/BlogPage/HeroComponent/BlogHero";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { blogCategories } from "@/sanity/queries/BlogPage/BlogCategories";
import { blogPosts } from "@/sanity/queries/BlogPage/BlogPosts";
import { blogPageCtaStrip } from "@/sanity/queries/BlogPage/CtaStripe";
import { blogPageHero } from "@/sanity/queries/BlogPage/Hero";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import Script from "next/script";

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
      {structuredData?.seo?.structuredData[locale as "en" | "es"] && (
        <Script
          id="structured-data-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData.seo.structuredData[locale as "en" | "es"],
            ),
          }}
        />
      )}
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
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/blog";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/blog";
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, "/blog"),
    },
  };
}
