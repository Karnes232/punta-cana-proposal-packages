import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { StoryCardData } from "./types";

interface StoryCardProps {
  story: StoryCardData;
  readMoreLabel: string;
  /** Controls photo aspect ratio in the asymmetric grid */
  variant: "tall" | "wide" | "standard";
}

const photoHeights: Record<StoryCardProps["variant"], string> = {
  tall: "min-h-[300px] md:min-h-[360px]",
  wide: "min-h-[200px] md:min-h-[240px]",
  standard: "min-h-[200px] md:min-h-[220px]",
};

export default function StoryCard({
  story,
  readMoreLabel,
  variant,
}: StoryCardProps) {
  return (
    <article className="group flex flex-col bg-white border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden h-full">
      {/* Photo */}
      <div
        className={`relative ${photoHeights[variant]} bg-black overflow-hidden shrink-0`}
      >
        <Image
          src={story.photo.asset.url}
          alt={story.photo.alt ?? `${story.names} proposal photo`}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          aria-hidden="true"
        />
        {/* Location tag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <span
            className="block w-1 h-1 rounded-full bg-gold shrink-0"
            aria-hidden="true"
          />
          <span className="text-[10.5px] font-body font-light tracking-[0.06em] text-white/70">
            {story.location}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 py-7 gap-3">
        <span className="text-[10px] font-body font-medium tracking-[0.16em] uppercase text-gold">
          {story.packageTag}
        </span>

        <h3 className="font-display font-normal text-fluid-h5 text-black leading-tight">
          {story.names}
        </h3>

        <p className="font-body font-light italic text-fluid-sm text-gray leading-relaxed flex-1">
          "{story.quote}"
        </p>

        {/* Divider + CTA */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gold/20">
          <span className="text-[10.5px] font-body font-light tracking-[0.06em] text-gray">
            {story.date}
          </span>
          <Link
            href={`/stories/${story.slug}`}
            className="
              inline-flex items-center gap-2
              text-[10.5px] font-body font-medium tracking-[0.14em] uppercase text-black
              transition-colors duration-300 hover:text-gold
              group/link
            "
          >
            {readMoreLabel}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover/link:translate-x-1"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
