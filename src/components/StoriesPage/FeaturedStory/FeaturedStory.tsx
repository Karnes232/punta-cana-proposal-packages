import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";
import FeaturedStoryPhoto from "./FeaturedStoryPhoto";
import FeaturedStoryCopy from "./FeaturedStoryCopy";
import { type FeaturedStoryData } from "./types";

interface FeaturedStoryProps {
  story: FeaturedStoryData;
  locale: SiteLocale;
}

export default function FeaturedStory({ story, locale }: FeaturedStoryProps) {
  const eyebrow = useTranslations("StoriesPage")("featured");

  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden">
      <FeaturedStoryPhoto
        photo={story.heroPhoto}
        names={story.names}
        eyebrow={eyebrow}
        location={story.location}
      />
      <FeaturedStoryCopy story={story} locale={locale} />
    </article>
  );
}
