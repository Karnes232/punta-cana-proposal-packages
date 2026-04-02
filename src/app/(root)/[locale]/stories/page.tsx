import StoriesHero from "@/components/StoriesPage/HeroComponent/StoriesHero";
import StoriesFilteredSection from "@/components/StoriesPage/StoriesFilteredSection";
import { storiesPageHero } from "@/sanity/queries/StoriesPage/Hero";
import { getProposalTypes } from "@/sanity/queries/StoriesPage/ProposalTypes";
//
import StoriesCTAStrip from "@/components/StoriesPage/StoriesCTAStrip/StoriesCTAStrip";
import { getAllStories } from "@/sanity/queries/StoriesPage/IndividualStory";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { storiesPageCtaStrip } from "@/sanity/queries/StoriesPage/CtaStripe";

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, proposalTypes, allStories, structuredData, ctaStrip] =
    await Promise.all([
      storiesPageHero(),
      getProposalTypes(),
      getAllStories(),
      getStructuredData("stories"),
      storiesPageCtaStrip(),
    ]);
  const localeTyped = locale as "en" | "es";

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData[locale as "en" | "es"]}
      />
      <StoriesHero
        image={hero?.image}
        eyebrow={hero?.eyebrow?.[localeTyped]}
        headingLine1={hero?.headingLine1?.[localeTyped]}
        headingLine2={hero?.headingLine2?.[localeTyped]}
        subheading={hero?.subheading?.[localeTyped]}
      />
      {/* Need to add to Sanity CMS */}
      <StoriesFilteredSection
        featuredStory={hero.featuredStory}
        proposalTypes={proposalTypes}
        stories={allStories.map((story) => ({
          slug: story.slug.current,
          names: story.names,
          date: story.date,
          location: story.location[localeTyped] ?? "",
          packageTag: story.packageTag[localeTyped] ?? "",
          packageType: story.proposalType.value,
          quote: story.quote[localeTyped] ?? "",
          photo: story.heroPhoto,
        }))}
        locale={localeTyped}
      />
      <StoriesCTAStrip
        eyebrow={ctaStrip.eyebrow[localeTyped]}
        heading={ctaStrip.heading[localeTyped]}
        headingAccent={ctaStrip.headingAccent[localeTyped]}
        subheading={ctaStrip.subheading[localeTyped]}
        ctaLabel={ctaStrip.ctaLabel[localeTyped]}
        ctaHref={ctaStrip.ctaHref}
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
  const pageSeo = await getPageSeo("stories");
  const path = "/stories";
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
