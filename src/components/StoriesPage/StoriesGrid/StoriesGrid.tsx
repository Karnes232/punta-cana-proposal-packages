"use client";

import { useState } from "react";
import StoryCard from "./StoryCard";
import StoriesGridDivider from "./StoriesGridDivider";
import LoadMore from "./LoadMore";
import {
  // defaultStories,
  // defaultStoriesGridContent,
  type StoryCardData,
  // type StoriesGridContent,
} from "./types";

const PAGE_SIZE = 6;

interface StoriesGridProps {
  stories: StoryCardData[];
  // content?: StoriesGridContent;
  locale: "en" | "es";
  /** Active filter value passed down from the filter bar — "all" or a packageType slug */
  activeFilter?: string;
}

/**
 * Asymmetric grid pattern (repeating every 6 cards):
 *
 * [ tall ] [ wide        ]
 *          [ wide        ]
 * [ wide        ] [ tall ]
 * [ wide        ]
 */
type Variant = "tall" | "wide" | "standard";
const variantPattern: Variant[] = [
  "tall",
  "wide",
  "wide",
  "wide",
  "wide",
  "tall",
];

export default function StoriesGrid({
  stories,
  locale,
  activeFilter = "all",
}: StoriesGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  const sectionLabel =
    locale === "es" ? "Más Historias" : "More Stories";
  const readMoreLabel =
    locale === "es" ? "Leer Historia" : "Read Story";
  const loadMoreLabel =
    locale === "es" ? "Ver Más Historias" : "Load More Stories";

  // Client-side filter
  const filtered =
    activeFilter === "all"
      ? stories
      : stories?.filter((s) => s.packageType === activeFilter);

  const visible = filtered?.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleLoadMore() {
    setIsLoading(true);
    // Simulate network delay — replace with real Sanity pagination fetch
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoading(false);
    }, 600);
  }

  if (filtered?.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-body font-light text-gray text-fluid-base">
          {locale === "es"
            ? "No hay historias para este tipo de propuesta todavía."
            : "No stories for this package type yet."}
        </p>
      </div>
    );
  }

  return (
    <section>
      <StoriesGridDivider label={sectionLabel} />

      {/*
        Asymmetric grid — two column base.
        Cards at index 0 and 5 (tall) span 1 col with a taller photo.
        Cards at index 1–4 (wide) span 1 col with a wider photo.
        Every 6 cards the pattern resets.

        On mobile all cards are single column / standard height.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gold/10">
        {visible.map((story, i) => {
          const variant = variantPattern[i % variantPattern.length];

          // Row 1: tall card takes col 1, next two wide cards take cols 2–3
          // Row 2: next two wide cards take cols 1–2, tall card takes col 3
          const isFirstInPattern = i % 6 === 0;
          const isLastInPattern = i % 6 === 5;

          return (
            <div
              key={story.slug}
              className={`
                ${isFirstInPattern || isLastInPattern ? "md:col-span-1 md:row-span-2" : "md:col-span-1"}
              `}
            >
              <StoryCard
                story={story}
                readMoreLabel={readMoreLabel}
                variant={variant}
                locale={locale}
              />
            </div>
          );
        })}
      </div>

      {hasMore && (
        <LoadMore
          label={loadMoreLabel}
          onClick={handleLoadMore}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}
