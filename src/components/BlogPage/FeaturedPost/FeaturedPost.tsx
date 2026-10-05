import { useTranslations } from "next-intl";
import FeaturedPostCopy from "./FeaturedPostCopy";
import FeaturedPostPhoto from "./FeaturedPostPhoto";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/Hero";

interface FeaturedPostProps {
  post: FeaturedPostType;
  dateLocale: string;
}

export default function FeaturedPost({ post, dateLocale }: FeaturedPostProps) {
  const t = useTranslations("BlogPage");
  const eyebrow = t("featuredPost");
  const readTimeSuffix = t("minRead");

  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden">
      <FeaturedPostPhoto
        photo={post.heroPhoto}
        title={post.title}
        eyebrow={eyebrow}
        readingTime={post.readingTime}
        readTimeSuffix={readTimeSuffix}
      />
      <FeaturedPostCopy post={post} dateLocale={dateLocale} />
    </article>
  );
}
