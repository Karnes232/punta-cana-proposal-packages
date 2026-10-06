import FaqContactStrip from "@/components/FaqPage/FaqContactStrip/FaqContactStrip";
import FaqContent from "@/components/FaqPage/FaqContent";
import FaqHero from "@/components/FaqPage/HeroComponent/FaqHero";
import { getFaqPage } from "@/sanity/queries/FaqPage/FaqPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
  seoFields,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { requireLocale } from "@/i18n/requireLocale";
import { toSiteLocale, type SiteLocale } from "@/i18n/locales";

export default async function FAQ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const lang = toSiteLocale(locale);
  const [{ hero, faqsCategories, faqs, contactStrip }, structuredData] =
    await Promise.all([getFaqPage(lang), getStructuredData("faq", lang)]);

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <FaqHero
        heroImage={hero?.heroImage}
        eyebrow={hero?.eyebrow ?? ""}
        headingLine1={hero?.headingLine1 ?? ""}
        headingLine2={hero?.headingLine2 ?? ""}
        subheading={hero?.subheading ?? ""}
      />
      <FaqContent locale={lang} faqsCategories={faqsCategories} faqs={faqs} />
      <FaqContactStrip
        eyebrow={contactStrip?.eyebrow ?? ""}
        line1={contactStrip?.line1 ?? ""}
        line2={contactStrip?.line2 ?? ""}
        body={contactStrip?.body ?? ""}
        cta={contactStrip?.cta ?? ""}
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
  const pageSeo = await getPageSeo("faq", locale);
  const path = "/faq";
  const canonicalUrl = siteCanonicalUrl(locale, path);
  // No SEO title: the site default, rather than an empty <title>.
  if (!pageSeo?.seo?.meta?.title) {
    return fallbackSiteMetadata(locale, path, canonicalUrl);
  }

  return buildSeoMetadata({
    path,
    canonicalUrl,
    ...seoFields(pageSeo.seo),
  });
}
