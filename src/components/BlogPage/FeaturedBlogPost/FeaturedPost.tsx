import FeaturedPostCopy from "./FeaturedPostCopy";
import FeaturedPostPhoto from "./FeaturedPostPhoto";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/Hero";

interface FeaturedPostProps {
  post: FeaturedPostType;
  chromeLocale: "en" | "es";
  dateLocale: string;
}

export default function FeaturedPost({
  post,
  chromeLocale,
  dateLocale,
}: FeaturedPostProps) {
  const eyebrow =
    chromeLocale === "es" ? "Artículo Destacado" : "Featured Post";
  const readTimeSuffix = chromeLocale === "es" ? "min de lectura" : "min read";

  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden">
      <FeaturedPostPhoto
        photo={post.heroPhoto}
        title={post.title}
        eyebrow={eyebrow}
        readingTime={post.readingTime}
        readTimeSuffix={readTimeSuffix}
      />
      <FeaturedPostCopy
        post={post}
        chromeLocale={chromeLocale}
        dateLocale={dateLocale}
      />
    </article>
  );
}
