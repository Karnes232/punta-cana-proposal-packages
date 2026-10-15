"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import BlogCard from "./BlogCard";
import SectionLabelDivider from "@/components/ui/SectionLabelDivider";
import LoadMore from "@/components/ui/LoadMore";
import {
  ASYMMETRIC_PAGE_SIZE,
  asymmetricGridClass,
  tallPlacement,
} from "@/components/ui/asymmetricGrid";
import { BlogPost } from "@/sanity/queries/BlogPage/BlogPosts";

interface BlogGridProps {
  /** The posts for the active filter, newest first. */
  posts: BlogPost[];
  dateLocale: string;
  /** "Latest posts" above the grid, shown under the featured post. */
  showLabel: boolean;
}

/** The post grid with its tall/normal rhythm, ten posts at a time. */
export default function BlogGrid({
  posts,
  dateLocale,
  showLabel,
}: BlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(ASYMMETRIC_PAGE_SIZE);
  const t = useTranslations("BlogPage");

  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-[16px] text-body">{t("noPosts")}</p>
    );
  }

  const visible = posts.slice(0, visibleCount);

  return (
    <div>
      {showLabel && <SectionLabelDivider label={t("latestPosts")} />}
      <div className={asymmetricGridClass}>
        {visible.map((post, i) => {
          const placement = tallPlacement(i, visible.length);
          return (
            <div key={post.slug.current} className={placement ?? undefined}>
              <BlogCard
                post={post}
                readMoreLabel={t("readArticle")}
                readTimeSuffix={t("minRead")}
                dateLocale={dateLocale}
                tall={placement !== null}
              />
            </div>
          );
        })}
      </div>
      {visibleCount < posts.length && (
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
