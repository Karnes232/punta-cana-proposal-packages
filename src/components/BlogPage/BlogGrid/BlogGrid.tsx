"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import BlogGridDivider from "./BlogGridDivider";
import LoadMore from "./LoadMore";
import {
  defaultBlogPosts,
  defaultBlogGridContent,
  type BlogCardData,
  type BlogGridContent,
} from "./types";
import { BlogPost } from "@/sanity/queries/BlogPage/BlogPosts";

const PAGE_SIZE = 6;

interface BlogGridProps {
  posts: BlogPost[];
  content?: BlogGridContent;
  chromeLocale: "en" | "es";
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
  content = defaultBlogGridContent,
  chromeLocale,
  dateLocale,
  activeFilter = "all",
}: BlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  const sectionLabel =
    chromeLocale === "es" ? content.sectionEyebrowEs : content.sectionEyebrowEn;
  const readMoreLabel =
    chromeLocale === "es" ? content.readMoreLabelEs : content.readMoreLabelEn;
  const loadMoreLabel =
    chromeLocale === "es" ? content.loadMoreLabelEs : content.loadMoreLabelEn;
  const readTimeSuffix =
    chromeLocale === "es" ? content.readTimeSuffixEs : content.readTimeSuffixEn;

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
          {chromeLocale === "es"
            ? "No hay artículos para esta categoría todavía."
            : "No posts for this category yet."}
        </p>
      </div>
    );
  }

  return (
    <section>
      <BlogGridDivider label={sectionLabel} />

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
