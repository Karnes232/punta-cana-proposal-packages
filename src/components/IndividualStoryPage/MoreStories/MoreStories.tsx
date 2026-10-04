import { useTranslations } from "next-intl";
import CardCarousel from "@/components/ui/CardCarousel";
import MoreSection from "@/components/ui/MoreSection";
import MoreStoriesCard from "./MoreStoriesCard";
import { type MoreStoriesStory } from "./types";

interface MoreStoriesProps {
  stories: MoreStoriesStory[];
}

export default function MoreStories({ stories }: MoreStoriesProps) {
  const t = useTranslations("IndividualStoryPage");
  const tc = useTranslations("Carousel");

  if (!stories || stories.length === 0) return null;

  return (
    <MoreSection
      label={t("more")}
      heading={t("moreHeading")}
      headingAccent={t("moreAccent")}
    >
      <CardCarousel prevLabel={tc("previous")} nextLabel={tc("next")}>
        {stories.map((story) => (
          <MoreStoriesCard
            key={story.slug}
            story={story}
            readMoreLabel={t("readStory")}
          />
        ))}
      </CardCarousel>
    </MoreSection>
  );
}
