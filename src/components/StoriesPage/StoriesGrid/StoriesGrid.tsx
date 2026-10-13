"use client";
import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";

import { useState } from "react";
import StoryCard from "./StoryCard";
import SectionLabelDivider from "@/components/ui/SectionLabelDivider";
import LoadMore from "@/components/ui/LoadMore";
import {
  ASYMMETRIC_PAGE_SIZE,
  asymmetricGridClass,
  tallPlacement,
} from "@/components/ui/asymmetricGrid";
import { type StoryCardData } from "./types";

interface StoriesGridProps {
  /** The stories for the active filter, newest first. */
  stories: StoryCardData[];
  locale: SiteLocale;
  /** "More stories" above the grid, shown under the featured story. */
  showLabel: boolean;
}

/** The story grid with its tall/normal rhythm, ten stories at a time. */
export default function StoriesGrid({
  stories,
  locale,
  showLabel,
}: StoriesGridProps) {
  const [visibleCount, setVisibleCount] = useState(ASYMMETRIC_PAGE_SIZE);
  const t = useTranslations("StoriesPage");

  if (stories.length === 0) {
    return (
      <p className="py-16 text-center text-[16px] text-[#3f3f44]">
        {t("empty")}
      </p>
    );
  }

  const visible = stories.slice(0, visibleCount);

  return (
    <div>
      {showLabel && <SectionLabelDivider label={t("more")} />}
      <div className={asymmetricGridClass}>
        {visible.map((story, i) => {
          const placement = tallPlacement(i, visible.length);
          return (
            <div key={story.slug} className={placement ?? undefined}>
              <StoryCard
                story={story}
                readMoreLabel={t("readStory")}
                locale={locale}
                tall={placement !== null}
              />
            </div>
          );
        })}
      </div>
      {visibleCount < stories.length && (
        <LoadMore
          label={t("loadMore")}
          onClick={() =>
            setVisibleCount((count) => count + ASYMMETRIC_PAGE_SIZE)
          }
        />
      )}
    </div>
  );
}
