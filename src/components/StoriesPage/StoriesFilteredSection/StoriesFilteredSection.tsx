"use client";

import type { SiteLocale } from "@/i18n/locales";
import { useState } from "react";
import StoriesFilterBar from "@/components/StoriesPage/StoriesFilterBar/StoriesFilterBar";
import FeaturedStory from "@/components/StoriesPage/FeaturedStory/FeaturedStory";
import StoriesGrid from "@/components/StoriesPage/StoriesGrid/StoriesGrid";
import type { StoryCardData } from "@/components/StoriesPage/StoriesGrid/types";
import type { ProposalTypes } from "@/sanity/queries/StoriesPage/ProposalTypes";
import type { FeaturedStoryData } from "@/components/StoriesPage/FeaturedStory/types";

interface StoriesFilteredSectionProps {
  featuredStory: FeaturedStoryData | null;
  proposalTypes: ProposalTypes[];
  stories: StoryCardData[];
  locale: SiteLocale;
}

export default function StoriesFilteredSection({
  featuredStory,
  proposalTypes,
  stories,
  locale,
}: StoriesFilteredSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <StoriesFilterBar
        content={proposalTypes}
        locale={locale}
        onChange={setActiveFilter}
      />
      {featuredStory?.slug?.current && (
        <FeaturedStory locale={locale} story={featuredStory} />
      )}
      <StoriesGrid
        activeFilter={activeFilter}
        stories={stories}
        locale={locale}
      />
    </>
  );
}
