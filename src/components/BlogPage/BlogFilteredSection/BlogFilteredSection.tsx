"use client";

import { useState } from "react";
import FeaturedPost from "@/components/BlogPage/FeaturedPost/FeaturedPost";
import BlogFilterBar from "@/components/BlogPage/BlogFilterBar/BlogFilterBar";
import BlogGrid from "@/components/BlogPage/BlogGrid/BlogGrid";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/Hero";
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

export default function BlogFilteredSection({
  featuredPost,
  categories,
  posts,
  dateLocale,
  locale,
}: BlogFilteredSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      {featuredPost ? (
        <section className="bg-ivory">
          <FeaturedPost post={featuredPost} dateLocale={dateLocale} />
        </section>
      ) : null}

      <BlogFilterBar
        categories={categories}
        locale={locale}
        onChange={setActiveFilter}
      />

      <section className="bg-ivory">
        <BlogGrid
          posts={posts}
          dateLocale={dateLocale}
          activeFilter={activeFilter}
        />
      </section>
    </>
  );
}
