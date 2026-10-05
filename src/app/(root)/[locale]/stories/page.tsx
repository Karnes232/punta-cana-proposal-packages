import StoriesHero from "@/components/StoriesPage/HeroComponent/StoriesHero";
import StoriesFilteredSection from "@/components/StoriesPage/StoriesFilteredSection/StoriesFilteredSection";
import { getStoriesPage } from "@/sanity/queries/StoriesPage/StoriesPage";
import { getProposalTypes } from "@/sanity/queries/StoriesPage/ProposalTypes";
//
import CtaStrip from "@/components/ui/CtaStrip";
import { getAllStories } from "@/sanity/queries/StoriesPage/IndividualStory";
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

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const localeTyped = toSiteLocale(locale);
  const [page, proposalTypes, allStories, structuredData] = await Promise.all([
    getStoriesPage(localeTyped),
    getProposalTypes(),
    getAllStories(localeTyped),
    getStructuredData("stories", localeTyped),
  ]);
  const { hero, featuredStory, cta: ctaStrip } = page;

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <StoriesHero
        image={hero?.image}
        eyebrow={hero?.eyebrow}
        headingLine1={hero?.headingLine1}
        headingLine2={hero?.headingLine2}
        subheading={hero?.subheading}
      />
      {/* Need to add to Sanity CMS */}
      <StoriesFilteredSection
        featuredStory={featuredStory}
        proposalTypes={proposalTypes}
        stories={allStories.map((story) => ({
          slug: story.slug.current,
          names: story.names,
          date: story.date,
          location: story.location ?? "",
          packageTag: story.packageTag ?? "",
          packageType: story.proposalType.value,
          quote: story.quote ?? "",
          photo: story.heroPhoto,
        }))}
        locale={localeTyped}
      />
      <CtaStrip
        eyebrow={ctaStrip.eyebrow}
        heading={ctaStrip.heading}
        headingAccent={ctaStrip.headingAccent}
        subheading={ctaStrip.subheading}
        ctaLabel={ctaStrip.ctaLabel}
        ctaHref={ctaStrip.ctaHref}
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
  const pageSeo = await getPageSeo("stories", locale);
  const path = "/stories";
  const canonicalUrl = siteCanonicalUrl(locale, path);
  if (!pageSeo) {
    return fallbackSiteMetadata(locale, path, canonicalUrl);
  }

  return buildSeoMetadata({
    path,
    canonicalUrl,
    ...seoFields(pageSeo.seo),
  });
}
