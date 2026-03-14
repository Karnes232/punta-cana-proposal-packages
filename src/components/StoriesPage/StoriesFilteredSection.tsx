"use client";

import { useState } from "react";
import StoriesFilterBar from "@/components/StoriesPage/StoriesFilterBar/StoriesFilterBar";
import FeaturedStory from "@/components/StoriesPage/FeaturedStory/FeaturedStory";
import StoriesGrid from "@/components/StoriesPage/StoriesGrid/StoriesGrid";
import type { StoryCardData } from "@/components/StoriesPage/StoriesGrid/types";
import type { ProposalTypes } from "@/sanity/queries/StoriesPage.ts/ProposalTypes";

interface StoriesFilteredSectionProps {
  proposalTypes: ProposalTypes;
  stories: StoryCardData[];
  locale: "en" | "es";
}

export default function StoriesFilteredSection({
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
      <FeaturedStory locale={locale} />
      <StoriesGrid
        activeFilter={activeFilter}
        stories={stories}
        locale={locale}
      />
    </>
  );
}
