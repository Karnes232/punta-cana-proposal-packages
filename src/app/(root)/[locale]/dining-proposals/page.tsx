import CategoryHero from "@/components/CategoryPage/CategoryHero/CategoryHero";
import CategoryIntro from "@/components/CategoryPage/CategoryIntro/CategoryIntro";

import PackageGrid from "@/components/CategoryPage/PackageGrid/PackageGrid";
import RelatedStories from "@/components/CategoryPage/RelatedStories/RelatedStories";

import { generateHreflangAlternates } from "@/i18n/hreflang";
import { getProposalPackageHeader } from "@/sanity/queries/ProposalPackages/ProposalPackageHeaders";
import { proposalPackagesQuery } from "@/sanity/queries/ProposalPackages/ProposalPackages";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { getRelatedStories } from "@/sanity/queries/StoriesPage/IndividualStory";
import Script from "next/script";

export default async function DiningProposals({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [
    structuredData,
    proposalPackage,
    proposalPackageHeader,
    relatedStories,
  ] = await Promise.all([
    getStructuredData("dining-proposals"),
    proposalPackagesQuery("dining-proposals"),
    getProposalPackageHeader(),
    getRelatedStories("dining"),
  ]);

  return (
    <main>
      {structuredData.seo.structuredData[locale as "en" | "es"] && (
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
      <CategoryHero
        image={proposalPackage.heroImage}
        eyebrow={proposalPackage.heroEyebrow[locale as "en" | "es"]}
        headingLine1={proposalPackage.heroHeadingLine1[locale as "en" | "es"]}
        headingLine2={proposalPackage.heroHeadingLine2[locale as "en" | "es"]}
        subheading={proposalPackage.heroSubheading[locale as "en" | "es"]}
      />
      <CategoryIntro
        eyebrow={proposalPackage.introEyebrow[locale as "en" | "es"]}
        headingLine1={proposalPackage.introHeadingLine1[locale as "en" | "es"]}
        headingLine2={proposalPackage.introHeadingLine2[locale as "en" | "es"]}
        description={proposalPackage.introDescription[locale as "en" | "es"]}
      />
      <PackageGrid
        packages={proposalPackage.packages}
        locale={locale as "en" | "es"}
        categorySlug="dining-proposals"
      />

      {relatedStories.length > 0 && (
        <RelatedStories
          eyebrow={
            proposalPackageHeader.RelatedStoriesEyebrow[locale as "en" | "es"]
          }
          headingLine1={
            proposalPackageHeader.RelatedStoriesHeadingLine1[
              locale as "en" | "es"
            ]
          }
          headingLine2={
            proposalPackageHeader.RelatedStoriesHeadingLine2[
              locale as "en" | "es"
            ]
          }
          description={
            proposalPackageHeader.RelatedStoriesDescription[
              locale as "en" | "es"
            ]
          }
          readMore={
            proposalPackageHeader.RelatedStoriesReadMore[locale as "en" | "es"]
          }
          viewAll={
            proposalPackageHeader.RelatedStoriesViewAll[locale as "en" | "es"]
          }
          locale={locale}
          stories={relatedStories}
        />
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  const pageSeo = await getPageSeo("dining-proposals");
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/dining-proposals";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/dining-proposals";
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
      ...generateHreflangAlternates(locale, "/dining-proposals"),
    },
  };
}
