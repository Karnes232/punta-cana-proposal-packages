import StoriesHero from "@/components/StoriesPage/HeroComponent/StoriesHero";
import StoriesFilteredSection from "@/components/StoriesPage/StoriesFilteredSection";
import { storiesPageHero } from "@/sanity/queries/StoriesPage.ts/Hero";
import { getProposalTypes } from "@/sanity/queries/StoriesPage.ts/ProposalTypes";
import { defaultStories } from "@/components/StoriesPage/StoriesGrid/types";
import StoriesCTAStrip from "@/components/StoriesPage/StoriesCTAStrip/StoriesCTAStrip";
import { getAllStories } from "@/sanity/queries/StoriesPage.ts/IndividualStory";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import Script from "next/script";

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, proposalTypes, allStories, structuredData] = await Promise.all([
    storiesPageHero(),
    getProposalTypes(),
    getAllStories(),
    getStructuredData("stories"),
  ]);
  const localeTyped = locale as "en" | "es";

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
      <StoriesCTAStrip locale={localeTyped} />
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
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/stories";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/stories";
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
      ...generateHreflangAlternates(locale, "/stories"),
    },
  };
}
