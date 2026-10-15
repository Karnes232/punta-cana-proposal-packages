"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import FeaturedPost from "@/components/BlogPage/FeaturedPost/FeaturedPost";
import BlogGrid from "@/components/BlogPage/BlogGrid/BlogGrid";
import FilterTabs from "@/components/ui/FilterTabs";
import { blogAllPostsFilterLabel } from "@/i18n/locales";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/BlogPage";
import { BlogPost } from "@/sanity/queries/BlogPage/BlogPosts";

interface BlogFilteredSectionProps {
  featuredPost: FeaturedPostType | null;
  categories: {
    value: string;
    label: string;
  }[];
  posts: BlogPost[];
  /** Locale string for date formatting on cards (matches URL locale). */
  dateLocale: string;
  /** App route locale for filter chrome (e.g. “All posts” tab). */
  locale: string;
}

/**
 * The category tabs, the featured post and the grid. The featured post shows
 * only under "All", and the grid leaves it out there, so no post appears
 * twice.
 */
export default function BlogFilteredSection({
  featuredPost,
  categories,
  posts,
  dateLocale,
  locale,
}: BlogFilteredSectionProps) {
  const t = useTranslations("BlogPage");
  const [activeFilter, setActiveFilter] = useState("all");

  const featuredSlug = featuredPost?.slug?.current;
  const showFeatured = Boolean(featuredSlug) && activeFilter === "all";
  // Only the categories that have a post get a tab.
  const usedCategories = categories.filter((category) =>
    posts.some((post) => post.category?.value === category.value),
  );
  // Under a filter the featured post is hidden, so it joins the grid.
  const gridPosts =
    activeFilter === "all"
      ? posts.filter((post) => post.slug.current !== featuredSlug)
      : posts.filter((post) => post.category?.value === activeFilter);

  return (
    <>
      <FilterTabs
        tabs={usedCategories}
        allLabel={blogAllPostsFilterLabel(locale)}
        groupLabel={t("filterLabel")}
        active={activeFilter}
        onChange={setActiveFilter}
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-16 md:px-10 md:py-24">
          {showFeatured && featuredPost && (
            <FeaturedPost post={featuredPost} dateLocale={dateLocale} />
          )}
          <BlogGrid
            key={activeFilter}
            posts={gridPosts}
            dateLocale={dateLocale}
            showLabel={showFeatured}
          />
        </div>
      </section>
    </>
  );
}
