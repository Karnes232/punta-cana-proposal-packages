import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { homeIcon, homeTextLink } from "@/components/HomePage/styles";
import MoreSection from "@/components/ui/MoreSection";
import StoryCard from "@/components/StoriesPage/StoriesGrid/StoryCard";
import type { StoryCardData } from "@/components/StoriesPage/StoriesGrid/types";

/** At most one row of related stories. */
const MAX_STORIES = 3;

interface MoreStoriesProps {
  stories: StoryCardData[];
  locale: SiteLocale;
}

/** Other stories of the same type, as on the Stories page, then a link to all. */
export default function MoreStories({ stories, locale }: MoreStoriesProps) {
  const t = useTranslations("IndividualStoryPage");

  if (!stories || stories.length === 0) return null;

  return (
    <MoreSection
      label={t("more")}
      heading={t("moreHeading")}
      headingAccent={t("moreAccent")}
    >
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {stories.slice(0, MAX_STORIES).map((story) => (
          <StoryCard
            key={story.slug}
            story={story}
            readMoreLabel={t("readStory")}
            locale={locale}
          />
        ))}
      </div>
      <Link href="/stories" className={homeTextLink}>
        {t("allStories")}
        <FiArrowRight aria-hidden="true" className={homeIcon} />
      </Link>
    </MoreSection>
  );
}
