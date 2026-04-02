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
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import Script from "next/script";

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
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/classic-proposals";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/classic-proposals";
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
      ...generateHreflangAlternates(locale, "/classic-proposals"),
    },
  };
}
