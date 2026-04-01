import FeaturedPostPhoto from "./FeaturedPostPhoto";
import FeaturedPostCopy from "./FeaturedPostCopy";
import {
  defaultFeaturedPost,
  defaultFeaturedPostContent,
  type FeaturedPostData,
  type FeaturedPostContent,
} from "./types";

interface FeaturedPostProps {
  post?: FeaturedPostData;
  locale: "en" | "es";
  content?: FeaturedPostContent;
}

export default function FeaturedPost({
  post = defaultFeaturedPost,
  locale,
  content = defaultFeaturedPostContent,
}: FeaturedPostProps) {
  const eyebrow = locale === "es" ? content.eyebrowEs : content.eyebrowEn;
  const readTimeSuffix =
    locale === "es" ? content.readTimeSuffixEs : content.readTimeSuffixEn;

  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden">
      <FeaturedPostPhoto
        photo={post.heroPhoto}
        title={post.title[locale]}
        eyebrow={eyebrow}
        readingTime={post.readingTime}
        readTimeSuffix={readTimeSuffix}
      />
      <FeaturedPostCopy post={post} content={content} locale={locale} />
    </article>
  );
}