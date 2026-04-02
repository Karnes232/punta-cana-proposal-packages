// Server Component — Classic Proposals Page
// Fetches proposal packages, shared section headers, and related couple stories
// in parallel. The entire page (from PackageGrid through BookingForm) is wrapped
// in <CustomizationProvider> so all those components share one piece of state:
// which package the user selected, their tier, and their aesthetic preferences.
//
// `labels` is built server-side so locale-specific button text (e.g. "Book Now"
// vs "Reservar") doesn't require a client component just for a string.
//

import CategoryHero from "@/components/CategoryPage/CategoryHero/CategoryHero";
import CategoryIntro from "@/components/CategoryPage/CategoryIntro/CategoryIntro";

import PackageGrid from "@/components/CategoryPage/PackageGrid/PackageGrid";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";

import RelatedStories from "@/components/CategoryPage/RelatedStories/RelatedStories";

import { proposalPackagesQuery } from "@/sanity/queries/ProposalPackages/ProposalPackages";
import { getProposalPackageHeader } from "@/sanity/queries/ProposalPackages/ProposalPackageHeaders";
import { getRelatedStories } from "@/sanity/queries/StoriesPage/IndividualStory";

export default async function ClassicProposals({
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
    getStructuredData("classic-proposals"),
    proposalPackagesQuery("classic-proposals"),
    getProposalPackageHeader(),
    getRelatedStories("classic"),
  ]);

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData.seo.structuredData[locale as "en" | "es"]}
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
        categorySlug="classic-proposals"
      />
      {relatedStories.length > 0 && (
        <RelatedStories
          stories={relatedStories}
          locale={locale}
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
  const pageSeo = await getPageSeo("classic-proposals");
  const path = "/classic-proposals";
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
