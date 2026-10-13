"use client";
import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";

import { useState } from "react";
import StoryCard from "./StoryCard";
import SectionLabelDivider from "@/components/ui/SectionLabelDivider";
import LoadMore from "@/components/ui/LoadMore";
import { type StoryCardData } from "./types";

const PAGE_SIZE = 6;

interface StoriesGridProps {
  /** The stories for the active filter, newest first. */
  stories: StoryCardData[];
  locale: SiteLocale;
  /** "More stories" above the grid, shown under the featured story. */
  showLabel: boolean;
}

/** An even grid of stories, six at a time. */
export default function StoriesGrid({
  stories,
  locale,
  showLabel,
}: StoriesGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const t = useTranslations("StoriesPage");

  if (stories.length === 0) {
    return (
      <p className="py-16 text-center text-[16px] text-[#3f3f44]">
        {t("empty")}
      </p>
    );
  }

  return (
    <div>
      {showLabel && <SectionLabelDivider label={t("more")} />}
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {stories.slice(0, visibleCount).map((story) => (
          <StoryCard
            key={story.slug}
            story={story}
            readMoreLabel={t("readStory")}
            locale={locale}
          />
        ))}
      </div>
      {visibleCount < stories.length && (
        <LoadMore
          label={t("loadMore")}
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        />
      )}
    </div>
  );
}
