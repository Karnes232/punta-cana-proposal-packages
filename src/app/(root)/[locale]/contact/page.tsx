import ContactHero from "@/components/ContactPage/HeroComponent/ContactHero";
import ContactBody from "@/components/ContactPage/MainContent/ContactBody";
import ContactTrustBar from "@/components/ContactPage/TrustBar/ContactTrustBar";
import { contactPageContent } from "@/sanity/queries/ContactPage/Content";
import { packageOptions } from "@/sanity/queries/ContactPage/PackageOptions";
import { contactInfo } from "@/sanity/queries/ContactPage/Content";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import Script from "next/script";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [content, packageOptionsData, contactInfoData, structuredData] =
    await Promise.all([
      contactPageContent(),
      packageOptions(),
      contactInfo(),
      getStructuredData("contact"),
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
      <ContactHero
        heroEyebrow={content.heroEyebrow[locale as "en" | "es"]}
        heroHeadingLine1={content.heroHeadingLine1[locale as "en" | "es"]}
        heroHeadingLine2={content.heroHeadingLine2[locale as "en" | "es"]}
        heroSubheading={content.heroSubheading[locale as "en" | "es"]}
        heroImage={content.heroImage}
      />
      <ContactBody
        formEyebrow={content.formEyebrow[locale as "en" | "es"]}
        formHeadingLine1={content.formHeadingLine1[locale as "en" | "es"]}
        formHeadingLine2={content.formHeadingLine2[locale as "en" | "es"]}
        locale={locale as "en" | "es"}
        packageOptions={packageOptionsData.categories}
        email={contactInfoData.email}
        telephone={contactInfoData.telephone}
      />
      <ContactTrustBar
        trustBarStats={content.trustBarStats}
        locale={locale as "en" | "es"}
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
  const pageSeo = await getPageSeo("contact");
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/contact";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/contact";
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
      ...generateHreflangAlternates(locale, "/contact"),
    },
  };
}
