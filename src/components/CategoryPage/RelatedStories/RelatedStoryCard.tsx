import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface RelatedStoryData {
  slug: string;
  names: string;
  image: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  date: string;
  location: string;
  packageTag: string;
  quote: string;
  photo?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

interface RelatedStoryCardProps {
  story: RelatedStoryData;
  readMoreLabel: string;
}

export default function RelatedStoryCard({
  story,
  readMoreLabel,
}: RelatedStoryCardProps) {
  return (
    <article className="group flex flex-col md:flex-row bg-white border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden">
      {/* Photo — left side on desktop, top on mobile */}
      <div className="relative w-full md:w-2/5 min-h-[200px] md:min-h-[280px] bg-black overflow-hidden shrink-0">
        {story.image ? (
          <Image
            src={story.image.asset.url}
            alt={story.image.alt ?? `${story.names} proposal photo`}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold/30"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        )}

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
          <span className="text-[10.5px] font-light tracking-[0.06em] text-white/70">
            {story.location}
          </span>
        </div>
      </div>

      {/* Body — right side on desktop */}
      <div className="flex flex-col flex-1 px-7 py-7 lg:px-8 lg:py-8 gap-3">
        <span className="text-[10px] font-medium tracking-[0.16em] uppercase text-gold">
          {story.packageTag}
        </span>

        <h3 className="font-display font-normal text-[clamp(20px,2vw,26px)] text-black leading-tight">
          {story.names}
        </h3>

        <p className="font-light italic text-[clamp(13px,1.3vw,15px)] text-gray leading-relaxed flex-1">
          &ldquo;{story.quote}&rdquo;
        </p>

        {/* Divider + CTA */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gold/20">
          <span className="text-[10.5px] font-light tracking-[0.06em] text-gray">
            {story.date}
          </span>
          <Link
            href={`/stories/${story.slug}`}
            className="
              inline-flex items-center gap-2
              text-[10.5px] font-medium tracking-[0.14em] uppercase text-black
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
