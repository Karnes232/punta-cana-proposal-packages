import HowItWorksHero from "@/components/HowItWorksPage/HeroComponent/HowItWorksHero";
import HowItWorksCTA from "@/components/HowItWorksPage/HowItWorksCTA/HowItWorksCTA";
import HowItWorksFAQ from "@/components/HowItWorksPage/HowItWorksFAQ/HowItWorksFAQ";
import HowItWorksReassurance from "@/components/HowItWorksPage/HowItWorksReassurance/HowItWorksReassurance";
import HowItWorksSteps from "@/components/HowItWorksPage/HowItWorksSteps/HowItWorksSteps";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
  localizedSeoFields,
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
import { requireLocale } from "@/i18n/requireLocale";
import { toSiteLocale } from "@/i18n/blogLocales";

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
        data={structuredData?.seo?.structuredData[lang]}
      />
      <HowItWorksHero
        heroImage={hero?.image}
        eyebrow={hero?.eyebrow[lang]}
        headingLine1={hero?.headingLine1[lang]}
        headingLine2={hero?.headingLine2[lang]}
        subheading={hero?.subheading[lang]}
      />
      <HowItWorksSteps
        eyebrow={steps?.eyebrow[lang]}
        heading={steps?.heading[lang]}
        headingAccent={steps?.headingAccent[lang]}
        subheading={steps?.subheading[lang]}
        steps={steps?.steps}
        locale={lang}
      />
      <HowItWorksReassurance items={steps?.reassurance} locale={lang} />
      <HowItWorksFAQ
        locale={lang}
        faqsCategories={faqsCategories}
        eyebrow={faqsPage?.eyebrow[lang]}
        heading={faqsPage?.heading[lang]}
        headingAccent={faqsPage?.headingAccent[lang]}
        subheading={faqsPage?.subheading[lang]}
        faqs={faqsPage?.faqs}
      />
      <HowItWorksCTA
        eyebrow={ctaPage?.eyebrow[lang]}
        scriptLine={ctaPage?.scriptLine[lang]}
        heading={ctaPage?.heading[lang]}
        headingAccent={ctaPage?.headingAccent[lang]}
        subheading={ctaPage?.subheading[lang]}
        primaryCTA={ctaPage?.primaryCTA[lang]}
        primaryHref={ctaPage?.primaryCTAHref}
        secondaryCTA={ctaPage?.secondaryCTA[lang]}
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
  requireLocale(locale);
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
    ...localizedSeoFields(pageSeo.seo, locale),
    noIndex: pageSeo.seo.noIndex,
    noFollow: pageSeo.seo.noFollow,
  });
}
