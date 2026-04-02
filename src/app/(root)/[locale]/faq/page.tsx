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
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";

export default async function FAQ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
        data={structuredData?.seo?.structuredData[locale as "en" | "es"]}
      />
      <FaqHero
        heroImage={hero?.heroImage}
        eyebrow={hero?.eyebrow[locale as "en" | "es"]}
        headingLine1={hero?.headingLine1[locale as "en" | "es"]}
        headingLine2={hero?.headingLine2[locale as "en" | "es"]}
        subheading={hero?.subheading[locale as "en" | "es"]}
      />
      <FaqsContent
        locale={locale as "en" | "es"}
        faqsCategories={faqsCategories}
        faqs={faqs}
      />
      <FaqContactStrip
        eyebrow={contactStrip?.eyebrow[locale as "en" | "es"]}
        line1={contactStrip?.line1[locale as "en" | "es"]}
        line2={contactStrip?.line2[locale as "en" | "es"]}
        body={contactStrip?.body[locale as "en" | "es"]}
        cta={contactStrip?.cta[locale as "en" | "es"]}
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
