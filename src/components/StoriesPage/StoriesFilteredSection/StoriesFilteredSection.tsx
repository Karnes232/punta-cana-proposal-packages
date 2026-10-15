"use client";

import type { SiteLocale } from "@/i18n/locales";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { local } from "@/lib/experience/normalize";
import FilterTabs from "@/components/ui/FilterTabs";
import FeaturedStory from "@/components/StoriesPage/FeaturedStory/FeaturedStory";
import StoriesGrid from "@/components/StoriesPage/StoriesGrid/StoriesGrid";
import type { StoryCardData } from "@/components/StoriesPage/StoriesGrid/types";
import type { ProposalTypes } from "@/sanity/queries/StoriesPage/ProposalTypes";
import type { StoriesPageFeaturedStory } from "@/sanity/queries/StoriesPage/StoriesPage";

interface StoriesFilteredSectionProps {
  featuredStory: StoriesPageFeaturedStory | null;
  proposalTypes: ProposalTypes[];
  stories: StoryCardData[];
  locale: SiteLocale;
}

/**
 * The filter tabs, the featured story and the grid. The featured story shows
 * only under "All", and the grid leaves it out there, so no story appears
 * twice.
 */
export default function StoriesFilteredSection({
  featuredStory,
  proposalTypes,
  stories,
  locale,
}: StoriesFilteredSectionProps) {
  const t = useTranslations("StoriesPage");
  const [activeFilter, setActiveFilter] = useState("all");

  const featuredSlug = featuredStory?.slug?.current;
  const showFeatured = Boolean(featuredSlug) && activeFilter === "all";
  // Only the types that have a story get a tab.
  const usedTypes = proposalTypes.filter((type) =>
    stories.some((story) => story.packageType === type.value),
  );
  // Under a filter the featured story is hidden, so it joins the grid.
  const gridStories =
    activeFilter === "all"
      ? stories.filter((story) => story.slug !== featuredSlug)
      : stories.filter((story) => story.packageType === activeFilter);

  return (
    <>
      <FilterTabs
        tabs={usedTypes.map((type) => ({
          value: type.value,
          label: local(type.label, locale),
        }))}
        allLabel={t("all")}
        groupLabel={t("filterLabel")}
        active={activeFilter}
        onChange={setActiveFilter}
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-16 md:px-10 md:py-24">
          {showFeatured && featuredStory && (
            <FeaturedStory locale={locale} story={featuredStory} />
          )}
          <StoriesGrid
            key={activeFilter}
            stories={gridStories}
            locale={locale}
            showLabel={showFeatured}
          />
        </div>
      </section>
    </>
  );
}
