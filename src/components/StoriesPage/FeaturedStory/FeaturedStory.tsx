import FeaturedStoryPhoto from "./FeaturedStoryPhoto";
import FeaturedStoryCopy from "./FeaturedStoryCopy";
import {
  defaultFeaturedStory,
  defaultFeaturedStoryContent,
  type FeaturedStoryData,
  type FeaturedStoryContent,
} from "./types";

interface FeaturedStoryProps {
  story?: FeaturedStoryData;
  locale: "en" | "es";
  content?: FeaturedStoryContent;
}

export default function FeaturedStory({
  story = defaultFeaturedStory,
  locale,
  content = defaultFeaturedStoryContent,
}: FeaturedStoryProps) {
  const eyebrow =
    locale === "es" ? content.eyebrowEs : content.eyebrowEn;

  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden">
      <FeaturedStoryPhoto
        photo={story.photo}
        names={story.names}
        eyebrow={eyebrow}
        location={story.location}
      />
      <FeaturedStoryCopy
        story={story}
        content={content}
        locale={locale}
      />
    </article>
  );
}