import HowItWorksHero from "@/components/HowItWorksPage/HeroComponent/HowItWorksHero";
import HowItWorksCTA from "@/components/HowItWorksPage/HowItWorksCTA/HowItWorksCTA";
import HowItWorksFAQ from "@/components/HowItWorksPage/HowItWorksFAQ/HowItWorksFAQ";
import HowItWorksReassurance from "@/components/HowItWorksPage/HowItWorksReassurance/HowItWorksReassurance";
import HowItWorksSteps from "@/components/HowItWorksPage/HowItWorksSteps/HowItWorksSteps";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { howItWorksPageHero } from "@/sanity/queries/HowItWorksPage/Hero";
import { howItWorksCTA } from "@/sanity/queries/HowItWorksPage/HowItWorksCTA";
import {
  howItWorksFaqsCategories,
  howItWorksFaqsPage,
} from "@/sanity/queries/HowItWorksPage/HowItWorksFaqs";
import { howItWorksPageHowItWorksSteps } from "@/sanity/queries/HowItWorksPage/HowItWorksSteps";
import { getPageSeo } from "@/sanity/queries/SEO/seo";
import { getStructuredData } from "@/sanity/queries/SEO/seo";

export default async function HowItWorks({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, steps, faqsCategories, faqsPage, ctaPage, structuredData] =
    await Promise.all([
      howItWorksPageHero(),
      howItWorksPageHowItWorksSteps(),
      howItWorksFaqsCategories(),
      howItWorksFaqsPage(),
      howItWorksCTA(),
      getStructuredData("how-it-works"),
    ]);

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData[locale as "en" | "es"]}
      />
      <HowItWorksHero
        heroImage={hero?.image}
        eyebrow={hero?.eyebrow[locale as "en" | "es"]}
        headingLine1={hero?.headingLine1[locale as "en" | "es"]}
        headingLine2={hero?.headingLine2[locale as "en" | "es"]}
        subheading={hero?.subheading[locale as "en" | "es"]}
      />
      <HowItWorksSteps
        eyebrow={steps?.eyebrow[locale as "en" | "es"]}
        heading={steps?.heading[locale as "en" | "es"]}
        headingAccent={steps?.headingAccent[locale as "en" | "es"]}
        subheading={steps?.subheading[locale as "en" | "es"]}
        steps={steps?.steps}
        locale={locale as "en" | "es"}
      />
      <HowItWorksReassurance
        items={steps?.reassurance}
        locale={locale as "en" | "es"}
      />
      <HowItWorksFAQ
        locale={locale as "en" | "es"}
        faqsCategories={faqsCategories}
        eyebrow={faqsPage?.eyebrow[locale as "en" | "es"]}
        heading={faqsPage?.heading[locale as "en" | "es"]}
        headingAccent={faqsPage?.headingAccent[locale as "en" | "es"]}
        subheading={faqsPage?.subheading[locale as "en" | "es"]}
        faqs={faqsPage?.faqs}
      />
      <HowItWorksCTA
        eyebrow={ctaPage?.eyebrow[locale as "en" | "es"]}
        scriptLine={ctaPage?.scriptLine[locale as "en" | "es"]}
        heading={ctaPage?.heading[locale as "en" | "es"]}
        headingAccent={ctaPage?.headingAccent[locale as "en" | "es"]}
        subheading={ctaPage?.subheading[locale as "en" | "es"]}
        primaryCTA={ctaPage?.primaryCTA[locale as "en" | "es"]}
        primaryHref={ctaPage?.primaryCTAHref}
        secondaryCTA={ctaPage?.secondaryCTA[locale as "en" | "es"]}
        secondaryHref={ctaPage?.secondaryCTAHref}
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
  const pageSeo = await getPageSeo("how-it-works");
  const path = "/how-it-works";
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
