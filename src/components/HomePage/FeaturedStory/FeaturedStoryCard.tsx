// Server Component
// The full story layout — image on one side, content on the other.
// imagePosition alternates per story for visual rhythm.

import FeaturedStoryImage from "./FeaturedStoryImage";
import FeaturedStoryMeta from "./FeaturedStoryMeta";
import FeaturedStoryQuote from "./FeaturedStoryQuote";
import FeaturedStoryCTA from "./FeaturedStoryCTA";

export interface FeaturedStoryCardProps {
  coupleName?: string;
  location?: string;
  date?: string;
  packageUsed?: string;
  quote?: string;
  imageSrc?: string;
  imageAlt?: string;
  storyHref?: string;
  storyLabel?: string;
  allStoriesHref?: string;
  allStoriesLabel?: string;
  /** Alternates image left/right for visual rhythm across multiple stories */
  imagePosition?: "left" | "right";
}

export default function FeaturedStoryCard({
  coupleName,
  location,
  date,
  packageUsed,
  quote,
  imageSrc,
  imageAlt,
  storyHref,
  storyLabel,
  allStoriesHref,
  allStoriesLabel,
  imagePosition = "left",
}: FeaturedStoryCardProps) {
  const imageFirst = imagePosition === "left";

  return (
    <div className="group grid grid-cols-1 lg:grid-cols-2 border border-gold/15 overflow-hidden">

      {/* Image panel */}
      <div className={`${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
        <FeaturedStoryImage
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          coupleName={coupleName}
        />
      </div>

      {/* Content panel */}
      <div
        className={`
          relative flex flex-col justify-center gap-8
          px-8 py-12 lg:px-14 lg:py-16
          bg-white/[0.02]
          ${imageFirst ? "lg:order-2" : "lg:order-1"}
        `}
      >
        {/* Corner accent — top left of content panel */}
        <div
          className="absolute top-0 left-0 w-10 h-10 border-t border-l border-gold/20"
          aria-hidden="true"
        />
        {/* Corner accent — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-gold/20"
          aria-hidden="true"
        />

        <FeaturedStoryMeta
          coupleName={coupleName}
          location={location}
          date={date}
          packageUsed={packageUsed}
        />

        <FeaturedStoryQuote quote={quote} />

        <FeaturedStoryCTA
          storyHref={storyHref}
          storyLabel={storyLabel}
          allStoriesHref={allStoriesHref}
          allStoriesLabel={allStoriesLabel}
        />
      </div>

    </div>
  );
}