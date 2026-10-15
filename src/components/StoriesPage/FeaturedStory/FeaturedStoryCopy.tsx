import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import {
  buttonClass,
  eyebrowClass,
} from "@/components/ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "@/components/HomePage/styles";
import { formatSanityDate } from "@/lib/formatDate";
import type { StoriesPageFeaturedStory } from "@/sanity/queries/StoriesPage/StoriesPage";

interface FeaturedStoryCopyProps {
  story: StoriesPageFeaturedStory;
  locale: SiteLocale;
}

export default function FeaturedStoryCopy({
  story,
  locale,
}: FeaturedStoryCopyProps) {
  const t = useTranslations("StoriesPage");
  const proposedPrefix = useTranslations("IndividualStoryPage")("proposed");

  const date = formatSanityDate(story.date, locale, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <p className={eyebrowClass()}>
        {t("featured")}
        {story.packageTag && ` · ${story.packageTag}`}
      </p>
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.15] font-normal text-balance text-ink">
          {story.names}
        </h2>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-body">
          {story.location && (
            <span className="inline-flex items-center gap-2">
              <FiMapPin
                aria-hidden="true"
                className="size-4 shrink-0 text-accent"
              />
              {story.location}
            </span>
          )}
          <span>
            {proposedPrefix} · {date}
          </span>
        </p>
      </div>
      {story.quote && (
        <blockquote className="font-display text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.6] text-pretty text-ink/85 italic">
          &ldquo;{story.quote}&rdquo;
        </blockquote>
      )}
      <Link
        href={`/stories/${story.slug.current}`}
        className={`${buttonClass({ ...homeButtonParts, secondary: true })} self-start`}
      >
        {t("readTheirStory")}
        <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
      </Link>
    </div>
  );
}
