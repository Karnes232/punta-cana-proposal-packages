"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import BlogCard from "./BlogCard";
import SectionLabelDivider from "@/components/ui/SectionLabelDivider";
import LoadMore from "@/components/ui/LoadMore";
import { BlogPost } from "@/sanity/queries/BlogPage/BlogPosts";

const PAGE_SIZE = 6;

interface BlogGridProps {
  posts: BlogPost[];
  dateLocale: string;
  /** Active filter value passed down from the filter bar — "all" or a categoryType slug */
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

export default function BlogGrid({
  posts,
  dateLocale,
  activeFilter = "all",
}: BlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("BlogPage");
  const sectionLabel = t("latestPosts");
  const readMoreLabel = t("readArticle");
  const loadMoreLabel = t("loadMore");
  const readTimeSuffix = t("minRead");

  // Client-side filter
  const filtered =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.category.value === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleLoadMore() {
    setIsLoading(true);
    // Simulate network delay — replace with real Sanity pagination fetch
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoading(false);
    }, 600);
  }

  if (filtered.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-body font-light text-gray text-fluid-base">
          {t("noPosts")}
        </p>
      </div>
    );
  }

  return (
    <section>
      <SectionLabelDivider label={sectionLabel} />

      {/*
        Asymmetric grid — two column base.
        Cards at index 0 and 5 (tall) span 1 col with a taller photo.
        Cards at index 1–4 (wide) span 1 col with a wider photo.
        Every 6 cards the pattern resets.

        On mobile all cards are single column / standard height.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gold/10">
        {visible.map((post, i) => {
          const variant = variantPattern[i % variantPattern.length];

          // Row 1: tall card takes col 1, next two wide cards take cols 2–3
          // Row 2: next two wide cards take cols 1–2, tall card takes col 3
          const isFirstInPattern = i % 6 === 0;
          const isLastInPattern = i % 6 === 5;

          return (
            <div
              key={post.slug.current}
              className={`
                ${isFirstInPattern || isLastInPattern ? "md:col-span-1 md:row-span-2" : "md:col-span-1"}
              `}
            >
              <BlogCard
                post={post}
                readMoreLabel={readMoreLabel}
                readTimeSuffix={readTimeSuffix}
                variant={variant}
                dateLocale={dateLocale}
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
