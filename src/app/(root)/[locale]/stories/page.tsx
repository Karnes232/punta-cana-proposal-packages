import StoriesHero from "@/components/StoriesPage/HeroComponent/StoriesHero";
import StoriesFilteredSection from "@/components/StoriesPage/StoriesFilteredSection";
import { storiesPageHero } from "@/sanity/queries/StoriesPage.ts/Hero";
import { getProposalTypes } from "@/sanity/queries/StoriesPage.ts/ProposalTypes";
import { defaultStories } from "@/components/StoriesPage/StoriesGrid/types";
import StoriesCTAStrip from "@/components/StoriesPage/StoriesCTAStrip/StoriesCTAStrip";

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, proposalTypes] = await Promise.all([
    storiesPageHero(),
    getProposalTypes(),
  ]);
  const localeTyped = locale as "en" | "es";
  const safeProposalTypes = proposalTypes ?? { type: [] };

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
        proposalTypes={safeProposalTypes}
        stories={defaultStories}
        locale={localeTyped}
      />
      <StoriesCTAStrip locale={localeTyped} />
    </main>
  );
}
