import FaqContactStrip from "@/components/FaqsPage/FaqContactStrip/FaqContactStrip";
import FaqsContent from "@/components/FaqsPage/FaqsContent";
import FaqHero from "@/components/FaqsPage/HeroComponents/FaqHero";
import { faqContactStrip } from "@/sanity/queries/FaqsPage/FaqContactStrip";
import { faqsPageHeroComponent } from "@/sanity/queries/FaqsPage/HeroComponent";
import { faqsPageFaqsCategories } from "@/sanity/queries/FaqsPage/Faqs";
import { faqsPageFaqs } from "@/sanity/queries/FaqsPage/Faqs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
  localizedSeoFields,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { requireLocale } from "@/i18n/requireLocale";
import { toSiteLocale } from "@/i18n/blogLocales";

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
      faqsPageHeroComponent(),
      faqContactStrip(),
      faqsPageFaqsCategories(),
      faqsPageFaqs(),
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
      <FaqsContent locale={lang} faqsCategories={faqsCategories} faqs={faqs} />
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
