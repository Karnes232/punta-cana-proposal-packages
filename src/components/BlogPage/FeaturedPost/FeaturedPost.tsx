import FeaturedPostCopy from "./FeaturedPostCopy";
import FeaturedPostPhoto from "./FeaturedPostPhoto";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/BlogPage";

interface FeaturedPostProps {
  post: FeaturedPostType;
  dateLocale: string;
}

/** The post picked in the Studio: a large photo beside its excerpt. */
export default function FeaturedPost({ post, dateLocale }: FeaturedPostProps) {
  return (
    <article className="mb-16 grid gap-8 md:mb-24 md:grid-cols-2 md:items-center md:gap-12">
      <FeaturedPostPhoto photo={post.heroPhoto} title={post.title} />
      <FeaturedPostCopy post={post} dateLocale={dateLocale} />
    </article>
  );
}
