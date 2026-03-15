import StoriesHero from "@/components/StoriesPage/HeroComponent/StoriesHero";
import StoriesFilteredSection from "@/components/StoriesPage/StoriesFilteredSection";
import { storiesPageHero } from "@/sanity/queries/StoriesPage.ts/Hero";
import { getProposalTypes } from "@/sanity/queries/StoriesPage.ts/ProposalTypes";
import { defaultStories } from "@/components/StoriesPage/StoriesGrid/types";
import StoriesCTAStrip from "@/components/StoriesPage/StoriesCTAStrip/StoriesCTAStrip";
import { getAllStories } from "@/sanity/queries/StoriesPage.ts/IndividualStory";

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, proposalTypes, allStories] = await Promise.all([
    storiesPageHero(),
    getProposalTypes(),
    getAllStories(),
  ]);
  const localeTyped = locale as "en" | "es";

  console.log(allStories);
  return (
    <main>
      <StoriesHero
        image={hero?.image}
        eyebrow={hero?.eyebrow?.[localeTyped]}
        headingLine1={hero?.headingLine1?.[localeTyped]}
        headingLine2={hero?.headingLine2?.[localeTyped]}
        subheading={hero?.subheading?.[localeTyped]}
      />
      {/* Need to add to Sanity CMS */}
      <StoriesFilteredSection
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
