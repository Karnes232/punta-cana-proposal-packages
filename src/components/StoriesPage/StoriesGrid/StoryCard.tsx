import type { SiteLocale } from "@/i18n/locales";
import { framedImage } from "@/sanity/lib/image";
import Image from "next/image";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";
import { tallPhotoClass } from "@/components/ui/asymmetricGrid";
import type { StoryCardData } from "./types";
import { formatSanityDate } from "@/lib/formatDate";

interface StoryCardProps {
  story: StoryCardData;
  readMoreLabel: string;
  locale: SiteLocale;
  /** Spans two grid rows on desktop; the photo grows to fill them. */
  tall?: boolean;
}

/**
 * One story in the grid: a 4:3 photo with its text below. The link's ::after
 * covers the card, so the whole card opens the story.
 */
export default function StoryCard({
  story,
  readMoreLabel,
  locale,
  tall = false,
}: StoryCardProps) {
  const date = formatSanityDate(story.date, locale, {
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group relative flex h-full flex-col">
      <div
        className={`relative aspect-[4/3] shrink-0 overflow-hidden bg-black ${tall ? tallPhotoClass : ""}`}
      >
        <Image
          {...framedImage(story.photo.asset.url, story.photo)}
          alt={story.photo.alt ?? `${story.names} proposal photo`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={`flex flex-col gap-3 pt-6 ${tall ? "" : "flex-1"}`}>
        {story.packageTag && (
          <p className={eyebrowClass({ size: "text-[13px]" })}>
            {story.packageTag}
          </p>
        )}
        <h3
          className={`font-display text-[1.5rem] leading-[1.25] font-normal text-balance text-ink ${tall ? "lg:text-[1.9rem]" : ""}`}
        >
          {story.names}
        </h3>
        {story.quote && (
          <p className="font-display text-[17px] leading-[1.6] text-pretty text-body italic">
            &ldquo;{story.quote}&rdquo;
          </p>
        )}
        <p className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-2 text-[14px] text-body">
          {story.location && (
            <span className="inline-flex items-center gap-2">
              <FiMapPin
                aria-hidden="true"
                className="size-4 shrink-0 text-accent"
              />
              {story.location}
            </span>
          )}
          <span>{date}</span>
        </p>
        <Link
          href={`/stories/${story.slug}`}
          className="inline-flex items-center gap-3 self-start border-b border-gold pb-1 text-[14px] font-semibold tracking-[0.07em] text-ink uppercase after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gold"
        >
          {readMoreLabel}
          <FiArrowRight
            aria-hidden="true"
            className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </article>
  );
}
