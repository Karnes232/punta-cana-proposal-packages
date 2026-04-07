"use client";

import { useState } from "react";
import FeaturedPost from "@/components/BlogPage/FeaturedBlogPost/FeaturedPost";
import BlogFilterBar from "@/components/BlogPage/BlogFilterBar/BlogFilterBar";
import BlogGrid from "@/components/BlogPage/BlogGrid/BlogGrid";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/Hero";
import { BlogPost } from "@/sanity/queries/BlogPage/BlogPosts";

interface BlogFilteredSectionProps {
  featuredPost: FeaturedPostType | null;
  categories: {
    value: string;
    label: {
      en: string;
      es: string;
    };
  }[];
  posts: BlogPost[];
  /** UI strings from en/es site copy (hero, filter bar, grid). */
  uiLocale: "en" | "es";
}

export default function BlogFilteredSection({
  featuredPost,
  categories,
  posts,
  uiLocale,
}: BlogFilteredSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      {featuredPost ? (
        <section className="bg-ivory">
          <FeaturedPost post={featuredPost} uiLocale={uiLocale} />
        </section>
      ) : null}

      <BlogFilterBar
        categories={categories}
        uiLocale={uiLocale}
        onChange={setActiveFilter}
      />

      <section className="bg-ivory">
        <BlogGrid
          posts={posts}
          uiLocale={uiLocale}
          activeFilter={activeFilter}
        />
      </section>
    </>
  );
}
