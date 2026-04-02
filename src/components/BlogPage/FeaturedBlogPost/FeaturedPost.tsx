import FeaturedPostPhoto from "./FeaturedPostPhoto";
import FeaturedPostCopy from "./FeaturedPostCopy";
// import {
//   defaultFeaturedPost,
//   defaultFeaturedPostContent,
//   type FeaturedPostData,
//   type FeaturedPostContent,
// } from "./types";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/Hero";
interface FeaturedPostProps {
  post: FeaturedPostType;
  locale: "en" | "es";
}

export default function FeaturedPost({
  post,
  locale,
}: FeaturedPostProps) {
  const eyebrow = locale === "es" ? "Artículo Destacado" : "Featured Post";
  const readTimeSuffix =
    locale === "es" ? "min de lectura" : "min read";

  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden">
      <FeaturedPostPhoto
        photo={post.heroPhoto}
        title={post.title[locale]}
        eyebrow={eyebrow}
        readingTime={post.readingTime}
        readTimeSuffix={readTimeSuffix}
      />
      <FeaturedPostCopy post={post} locale={locale} />
    </article>
  );
}