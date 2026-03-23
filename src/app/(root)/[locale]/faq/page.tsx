import FaqContactStrip from "@/components/FaqsPage/FaqContactStrip/FaqContactStrip";
import FaqsContent from "@/components/FaqsPage/FaqsContent";
import FaqHero from "@/components/FaqsPage/HeroComponents/FaqHero";
import { faqContactStrip } from "@/sanity/queries/FaqsPage/FaqContactStrip";
import { faqsPageHeroComponent } from "@/sanity/queries/FaqsPage/HeroComponent";
import { faqsPageFaqsCategories } from "@/sanity/queries/FaqsPage/Faqs";
import { faqsPageFaqs } from "@/sanity/queries/FaqsPage/Faqs";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import Script from "next/script";

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
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/faq";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/faq";
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
      ...generateHreflangAlternates(locale, "/faq"),
    },
  };
}
