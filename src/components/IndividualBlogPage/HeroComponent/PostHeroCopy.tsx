interface PostHeroCopyProps {
  title: string;
  categoryTag: string;
  publishedAt: string;
  readingTime: number;
  readTimeSuffix: string;
  locale: string;
}

export default function PostHeroCopy({
  title,
  categoryTag,
  publishedAt,
  readingTime,
  readTimeSuffix,
  locale,
}: PostHeroCopyProps) {
  const dateStr = new Date(publishedAt).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Category tag */}
      <span className="text-[10.5px] font-body font-medium tracking-[0.2em] uppercase text-gold/90">
        {categoryTag}
      </span>

      {/* Post title */}
      <h1
        className="
            font-display font-normal text-white leading-[1.08] tracking-tight
            text-[clamp(32px,5vw,64px)] max-w-[680px]
            animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:200ms]
          "
      >
        {title}
      </h1>

      {/* Gold divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block w-10 h-px bg-gold/50" />
        <span className="block w-1 h-1 rotate-45 bg-gold/70" />
        <span className="block w-10 h-px bg-gold/50" />
      </div>

      {/* Date · Reading time */}
      <p className="flex items-center gap-2 text-[11.5px] font-body font-light tracking-[0.1em] text-white/60">
        <span>{capitalizedDate}</span>
        <span className="text-gold/50" aria-hidden="true">
          ·
        </span>
        <span className="flex items-center gap-1.5">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold/70"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {readingTime} {readTimeSuffix}
        </span>
      </p>
    </div>
  );
}
