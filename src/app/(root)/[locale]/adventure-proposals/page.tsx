import CategoryHero from "@/components/CategoryPage/CategoryHero/CategoryHero";
import CategoryIntro from "@/components/CategoryPage/CategoryIntro/CategoryIntro";

import PackageGrid from "@/components/CategoryPage/PackageGrid/PackageGrid";
import RelatedStories from "@/components/CategoryPage/RelatedStories/RelatedStories";

import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getProposalPackageHeader } from "@/sanity/queries/ProposalPackages/ProposalPackageHeaders";
import { proposalPackagesQuery } from "@/sanity/queries/ProposalPackages/ProposalPackages";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { getRelatedStories } from "@/sanity/queries/StoriesPage/IndividualStory";

export default async function AdventureProposals({
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
    getStructuredData("adventure-proposals"),
    proposalPackagesQuery("adventure-proposals"),
    getProposalPackageHeader(),
    getRelatedStories("adventure"),
  ]);

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData?.[locale as "en" | "es"]}
      />
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
        categorySlug="adventure-proposals"
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
  const pageSeo = await getPageSeo("adventure-proposals");
  const path = "/adventure-proposals";
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
