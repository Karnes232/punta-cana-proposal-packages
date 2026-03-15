import { Link } from "@/i18n/navigation";
import type { FeaturedStoryData, FeaturedStoryContent } from "./types";

interface FeaturedStoryCopyProps {
  story: FeaturedStoryData;
  content: FeaturedStoryContent;
  locale: "en" | "es";
}

export default function FeaturedStoryCopy({
  story,
  content,
  locale,
}: FeaturedStoryCopyProps) {
  const ctaLabel = locale === "es" ? content.ctaLabelEs : content.ctaLabelEn;
  const proposedPrefix =
    locale === "es" ? content.proposedPrefixEs : content.proposedPrefixEn;

  return (
    <div className="flex flex-col justify-center gap-7 px-8 py-12 md:px-12 md:py-16 bg-white">
      {/* Package type tag */}
      <span className="text-[10.5px] font-body font-medium tracking-[0.18em] uppercase text-gold">
        {story.packageTag}
      </span>

      {/* Names + date */}
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-normal text-fluid-h3 text-black leading-[1.1]">
          {story.names}
        </h2>
        <p className="text-[12px] font-body font-light tracking-[0.06em] text-gray">
          {proposedPrefix} · {story.date}
        </p>
      </div>

      {/* Gold rule */}
      <span className="block w-10 h-px bg-gold/40" aria-hidden="true" />

      {/* Pull quote */}
      <blockquote className="border-l border-gold/40 pl-5">
        <p className="font-display font-normal italic text-fluid-lg text-black/80 leading-relaxed">
          "{story.quote}"
        </p>
      </blockquote>

      {/* CTA */}
      <Link
        href={`/stories/${story.slug}`}
        className="
          inline-flex items-center gap-3 self-start
          text-[11px] font-body font-medium tracking-[0.18em] uppercase
          border border-black/20 text-black
          px-7 py-3.5
          transition-all duration-300
          hover:bg-black hover:text-gold hover:border-black
          group
        "
      >
        {ctaLabel}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}
