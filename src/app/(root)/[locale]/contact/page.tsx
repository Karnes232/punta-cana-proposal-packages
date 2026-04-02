import ContactHero from "@/components/ContactPage/HeroComponent/ContactHero";
import ContactBody from "@/components/ContactPage/MainContent/ContactBody";
import ContactTrustBar from "@/components/ContactPage/TrustBar/ContactTrustBar";
import { contactPageContent } from "@/sanity/queries/ContactPage/Content";
import { packageOptions } from "@/sanity/queries/ContactPage/PackageOptions";
import { contactInfo } from "@/sanity/queries/ContactPage/Content";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";

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
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData[locale as "en" | "es"]}
      />
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
  const path = "/contact";
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
