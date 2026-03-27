// Server Component — Home Page
// Fetches all homepage section data in parallel via Promise.all, then passes
// each section's content to its component. Sanity stores all text as bilingual
// objects `{ en: string; es: string }`, so every prop is accessed with
// `[locale as "en" | "es"]` to pull the right language at render time.
// Structured data (JSON-LD) and hreflang alternates are injected here for SEO.

import Hero from "@/components/HomePage/HeroComponents/Hero";
import { homePageHero } from "@/sanity/queries/HomePage/Hero";
import BrandStatement from "@/components/HomePage/BrandStatement/BrandStatement";
import { homePageBrandStatement } from "@/sanity/queries/HomePage/BrandStatement";
import PackageCategories from "@/components/HomePage/PackageCategories/PackageCategories";
import { homePagePackageCategories } from "@/sanity/queries/HomePage/PackageCategories";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import { homePageHowItWorks } from "@/sanity/queries/HomePage/HowItWorks";
import { StepIconType } from "@/components/HomePage/HowItWorks/HowItWorksStep";
import FeaturedStory from "@/components/HomePage/FeaturedStory/FeaturedStory";
import { homePageFeatureStorySection } from "@/sanity/queries/HomePage/FeaturedStorySection";
import TrustIndicators from "@/components/HomePage/TrustIndicators/TrustIndicators";
import { homePageTrustIndicators } from "@/sanity/queries/HomePage/TrustIndicators";
import { TrustIconType } from "@/components/HomePage/TrustIndicators/TrustIndicatorIcon";
import CTABanner from "@/components/HomePage/CTABanner/CTABanner";
import { homePageCTABanner } from "@/sanity/queries/HomePage/CTABanner";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import Script from "next/script";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [
    hero,
    brandStatement,
    packageCategories,
    howItWorks,
    featureStorySection,
    trustIndicators,
    ctaBanner,
    structuredData,
  ] = await Promise.all([
    homePageHero(),
    homePageBrandStatement(),
    homePagePackageCategories(),
    homePageHowItWorks(),
    homePageFeatureStorySection(),
    homePageTrustIndicators(),
    homePageCTABanner(),
    getStructuredData("home"),
  ]);

  return (
    <main>
      {structuredData.seo.structuredData[locale as "en" | "es"] && (
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
      <Hero
        image={hero?.image}
        eyebrow={hero.eyebrow[locale as "en" | "es"]}
        headingLine1={hero.headingLine1[locale as "en" | "es"]}
        headingLine2={hero.headingLine2[locale as "en" | "es"]}
        headingLine3={hero.headingLine3[locale as "en" | "es"]}
        subheading={hero.subheading[locale as "en" | "es"]}
        primaryLabel={hero.primaryLabel[locale as "en" | "es"]}
        primaryHref={hero.primaryHref}
        secondaryLabel={hero.secondaryLabel[locale as "en" | "es"]}
        secondaryHref={hero.secondaryHref}
      />
      <BrandStatement
        quote={brandStatement.quote[locale as "en" | "es"]}
        body={brandStatement.body[locale as "en" | "es"]}
        signature={brandStatement.signature}
      />
      <PackageCategories
        eyebrow={packageCategories.eyebrow[locale as "en" | "es"]}
        headingLine1={packageCategories.headingLine1[locale as "en" | "es"]}
        headingLine2={packageCategories.headingLine2[locale as "en" | "es"]}
        categories={packageCategories.categories}
        locale={locale}
      />
      <HowItWorks
        eyebrow={howItWorks.eyebrow[locale as "en" | "es"]}
        headingLine1={howItWorks.headingLine1[locale as "en" | "es"]}
        headingLine2={howItWorks.headingLine2[locale as "en" | "es"]}
        ctaLabel={howItWorks.ctaLabel[locale as "en" | "es"]}
        ctaHref={howItWorks.ctaHref}
        steps={howItWorks.steps.map((step) => ({
          step: step.step,
          icon: step.icon as StepIconType,
          title: step.title[locale as "en" | "es"],
          description: step.description[locale as "en" | "es"],
        }))}
      />
      <FeaturedStory
        eyebrow={featureStorySection.eyebrow[locale as "en" | "es"]}
        heading={featureStorySection.heading[locale as "en" | "es"]}
        stories={featureStorySection.stories.map((story) => ({
          coupleName: story.coupleName,
          location: story.location[locale as "en" | "es"],
          date: story.date,
          packageUsed: story.packageUsed[locale as "en" | "es"],
          quote: story.quote[locale as "en" | "es"],
          imageSrc: story.image?.asset?.url,
          imageAlt: story.image?.alt,
        }))}
        locale={locale}
      />
      <TrustIndicators
        items={trustIndicators.items.map((item) => ({
          icon: item.icon as TrustIconType,
          value: item.value[locale as "en" | "es"],
          label: item.label[locale as "en" | "es"],
          sublabel: item.sublabel[locale as "en" | "es"],
        }))}
      />
      <CTABanner
        eyebrow={ctaBanner.eyebrow[locale as "en" | "es"]}
        headingLine1={ctaBanner.headingLine1[locale as "en" | "es"]}
        headingLine2={ctaBanner.headingLine2[locale as "en" | "es"]}
        subheading={ctaBanner.subheading[locale as "en" | "es"]}
        primaryLabel={ctaBanner.primaryLabel[locale as "en" | "es"]}
        primaryHref={ctaBanner.primaryHref}
        secondaryLabel={ctaBanner.secondaryLabel[locale as "en" | "es"]}
        secondaryHref={ctaBanner.secondaryHref}
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
  const pageSeo = await getPageSeo("home");
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es";
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
      ...generateHreflangAlternates(locale, ""),
    },
  };
}
