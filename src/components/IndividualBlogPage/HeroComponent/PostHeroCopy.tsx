import { FiClock } from "react-icons/fi";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";
import { formatSanityDate } from "@/lib/formatDate";

interface PostHeroCopyProps {
  title: string;
  categoryTag: string;
  publishedAt: string;
  readingTime: number;
  readTimeSuffix: string;
  locale: string;
}

/** The category, the title, and when it was published and how long it takes. */
export default function PostHeroCopy({
  title,
  categoryTag,
  publishedAt,
  readingTime,
  readTimeSuffix,
  locale,
}: PostHeroCopyProps) {
  const date = formatSanityDate(publishedAt, locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-4">
      {categoryTag && (
        <p className={eyebrowClass({ color: "text-gold" })}>{categoryTag}</p>
      )}
      <h1 className="max-w-[20ch] font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.1] font-normal text-balance text-ivory">
        {title}
      </h1>
      <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-ivory/85">
        {date && <span>{date}</span>}
        {readingTime > 0 && (
          <span className="inline-flex items-center gap-2">
            <FiClock aria-hidden="true" className="size-4 shrink-0 text-gold" />
            {readingTime} {readTimeSuffix}
          </span>
        )}
      </p>
    </div>
  );
}
