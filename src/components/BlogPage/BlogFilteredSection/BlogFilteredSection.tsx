"use client";

import { useState } from "react";
import FeaturedPost from "@/components/BlogPage/FeaturedBlogPost/FeaturedPost";
import BlogFilterBar from "@/components/BlogPage/BlogFilterBar/BlogFilterBar";
import BlogGrid from "@/components/BlogPage/BlogGrid/BlogGrid";
// import type { FeaturedPostData } from "@/components/BlogPage/FeaturedBlogPost/types";
import type { BlogCardData } from "@/components/BlogPage/BlogGrid/types";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/Hero";
import { BlogPost } from "@/sanity/queries/BlogPage/BlogPosts";

interface BlogFilteredSectionProps {
  featuredPost: FeaturedPostType;
  categories: {
    value: string;
    label: {
      en: string;
      es: string;
    };
  }[];
  posts: BlogPost[];
  locale: "en" | "es";
}

export default function BlogFilteredSection({
  featuredPost,
  categories,
  posts,
  locale,
}: BlogFilteredSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      {/* Featured post — sits between hero and filter bar */}
      <section className="bg-ivory">
        {/* <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 md:py-16"> */}
        <FeaturedPost post={featuredPost} locale={locale} />
        {/* </div> */}
      </section>

      {/* Filter bar — black strip with category tabs */}
      <BlogFilterBar
        categories={categories}
        locale={locale}
        onChange={setActiveFilter}
      />

      {/* Grid — ivory background, filtered by active tab */}
      <section className="bg-ivory">
        {/* <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 md:py-16"> */}
        <BlogGrid posts={posts} locale={locale} activeFilter={activeFilter} />
        {/* </div> */}
      </section>
    </>
  );
}
