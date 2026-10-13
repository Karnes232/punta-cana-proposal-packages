import type { SiteLocale } from "@/i18n/locales";
import type { StoriesPageFeaturedStory } from "@/sanity/queries/StoriesPage/StoriesPage";
import FeaturedStoryPhoto from "./FeaturedStoryPhoto";
import FeaturedStoryCopy from "./FeaturedStoryCopy";

interface FeaturedStoryProps {
  story: StoriesPageFeaturedStory;
  locale: SiteLocale;
}

/** The story picked in the Studio: a large photo beside its quote. */
export default function FeaturedStory({ story, locale }: FeaturedStoryProps) {
  return (
    <article className="mb-16 grid gap-8 md:mb-24 md:grid-cols-2 md:items-center md:gap-12">
      <FeaturedStoryPhoto photo={story.heroPhoto} names={story.names} />
      <FeaturedStoryCopy story={story} locale={locale} />
    </article>
  );
}
