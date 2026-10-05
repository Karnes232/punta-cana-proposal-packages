import FaqContactStrip from "@/components/FaqPage/FaqContactStrip/FaqContactStrip";
import FaqContent from "@/components/FaqPage/FaqContent";
import FaqHero from "@/components/FaqPage/HeroComponent/FaqHero";
import { getFaqContactStrip } from "@/sanity/queries/FaqPage/FaqContactStrip";
import { getFaqPageHero } from "@/sanity/queries/FaqPage/HeroComponent";
import { getFaqCategories } from "@/sanity/queries/FaqPage/Faqs";
import { getFaqs } from "@/sanity/queries/FaqPage/Faqs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
  localizedSeoFields,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { requireLocale } from "@/i18n/requireLocale";
import { toSiteLocale } from "@/i18n/locales";

export default async function FAQ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const lang = toSiteLocale(locale);
  const [hero, contactStrip, faqsCategories, faqs, structuredData] =
    await Promise.all([
      getFaqPageHero(),
      getFaqContactStrip(),
      getFaqCategories(),
      getFaqs(),
      getStructuredData("faq"),
    ]);

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData[lang]}
      />
      <FaqHero
        heroImage={hero?.heroImage}
        eyebrow={hero?.eyebrow[lang]}
        headingLine1={hero?.headingLine1[lang]}
        headingLine2={hero?.headingLine2[lang]}
        subheading={hero?.subheading[lang]}
      />
      <FaqContent locale={lang} faqsCategories={faqsCategories} faqs={faqs} />
      <FaqContactStrip
        eyebrow={contactStrip?.eyebrow[lang]}
        line1={contactStrip?.line1[lang]}
        line2={contactStrip?.line2[lang]}
        body={contactStrip?.body[lang]}
        cta={contactStrip?.cta[lang]}
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
  const pageSeo = await getPageSeo("faq");
  const path = "/faq";
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
