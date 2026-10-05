import HowItWorksHero from "@/components/HowItWorksPage/HeroComponent/HowItWorksHero";
import HowItWorksCTA from "@/components/HowItWorksPage/HowItWorksCTA/HowItWorksCTA";
import HowItWorksFaq from "@/components/HowItWorksPage/HowItWorksFaq/HowItWorksFaq";
import HowItWorksReassurance from "@/components/HowItWorksPage/HowItWorksReassurance/HowItWorksReassurance";
import HowItWorksSteps from "@/components/HowItWorksPage/HowItWorksSteps/HowItWorksSteps";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
  seoFields,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getHowItWorksPageHero } from "@/sanity/queries/HowItWorksPage/Hero";
import { getHowItWorksCta } from "@/sanity/queries/HowItWorksPage/HowItWorksCTA";
import {
  getHowItWorksFaqCategories,
  getHowItWorksFaqs,
} from "@/sanity/queries/HowItWorksPage/HowItWorksFaqs";
import { getHowItWorksSteps } from "@/sanity/queries/HowItWorksPage/HowItWorksSteps";
import { getPageSeo } from "@/sanity/queries/SEO/seo";
import { getStructuredData } from "@/sanity/queries/SEO/seo";
import { requireLocale } from "@/i18n/requireLocale";
import { toSiteLocale, type SiteLocale } from "@/i18n/locales";

export default async function HowItWorks({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const lang = toSiteLocale(locale);
  const [hero, steps, faqsCategories, faqsPage, ctaPage, structuredData] =
    await Promise.all([
      getHowItWorksPageHero(lang),
      getHowItWorksSteps(lang),
      getHowItWorksFaqCategories(),
      getHowItWorksFaqs(lang),
      getHowItWorksCta(lang),
      getStructuredData("how-it-works", lang),
    ]);

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <HowItWorksHero
        heroImage={hero?.image}
        eyebrow={hero?.eyebrow}
        headingLine1={hero?.headingLine1}
        headingLine2={hero?.headingLine2}
        subheading={hero?.subheading}
      />
      <HowItWorksSteps
        eyebrow={steps?.eyebrow}
        heading={steps?.heading}
        headingAccent={steps?.headingAccent}
        subheading={steps?.subheading}
        steps={steps?.steps}
      />
      <HowItWorksReassurance items={steps?.reassurance} />
      <HowItWorksFaq
        locale={lang}
        faqsCategories={faqsCategories}
        eyebrow={faqsPage?.eyebrow}
        heading={faqsPage?.heading}
        headingAccent={faqsPage?.headingAccent}
        subheading={faqsPage?.subheading}
        faqs={faqsPage?.faqs}
      />
      <HowItWorksCTA
        eyebrow={ctaPage?.eyebrow}
        scriptLine={ctaPage?.scriptLine}
        heading={ctaPage?.heading}
        headingAccent={ctaPage?.headingAccent}
        subheading={ctaPage?.subheading}
        primaryCTA={ctaPage?.primaryCTA}
        primaryHref={ctaPage?.primaryCTAHref}
        secondaryCTA={ctaPage?.secondaryCTA}
        secondaryHref={ctaPage?.secondaryCTAHref}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const pageSeo = await getPageSeo("how-it-works", locale);
  const path = "/how-it-works";
  const canonicalUrl = siteCanonicalUrl(locale, path);
  if (!pageSeo) {
    return fallbackSiteMetadata(locale, path, canonicalUrl);
  }

  return buildSeoMetadata({
    path,
    canonicalUrl,
    ...seoFields(pageSeo.seo),
  });
}
