// Server Component

import Link from "next/link";

interface FeaturedStoryCTAProps {
  storyHref?: string;
  storyLabel?: string;
  allStoriesHref?: string;
  allStoriesLabel?: string;
}

export default function FeaturedStoryCTA({
  storyHref = "/stories/example",
  storyLabel = "Read Their Story",
  allStoriesHref = "/stories",
  allStoriesLabel = "View All Stories",
}: FeaturedStoryCTAProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
      {/* Primary — read this story */}
      <Link
        href={storyHref}
        className="
          inline-flex items-center gap-2.5
          text-[11px] font-medium tracking-[0.18em] uppercase
          text-gold border border-gold px-6 py-3
          transition-all duration-300
          hover:bg-gold hover:text-black
          group
        "
      >
        {storyLabel}
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

      {/* Secondary — view all */}
      <Link
        href={allStoriesHref}
        className="
          inline-flex items-center gap-1.5
          text-[11px] font-light tracking-[0.14em] uppercase
          text-white/40 transition-colors duration-300
          hover:text-gold
        "
      >
        {allStoriesLabel}
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}