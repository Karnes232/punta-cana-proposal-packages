"use client";

// Client Component — justified because:
//   - useState for active slide index
//   - onClick handlers for dot navigation
// All story content (FeaturedStoryCard and children) are server components
// rendered as props.children — they are NOT re-rendered on the client.

import { useState } from "react";

interface FeaturedStoryCarouselProps {
  slides: React.ReactNode[];
}

export default function FeaturedStoryCarousel({
  slides,
}: FeaturedStoryCarouselProps) {
  const [active, setActive] = useState(1);

  if (slides.length === 0) return null;

  // Single story — no carousel needed
  if (slides.length === 1) return <>{slides[0]}</>;

  return (
    <div className="flex flex-col gap-8">
      {/* Slide */}
      <div>{slides[active]}</div>

      {/* Dot navigation */}
      <div
        className="flex items-center justify-center gap-3"
        role="tablist"
        aria-label="Story navigation"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Story ${i + 1}`}
            onClick={() => setActive(i)}
            className="flex items-center justify-center w-10 h-10 group"
          >
            {/* Visible line — small, but the whole 40×40 area is clickable */}
            <span
              className={`
                block h-px transition-all duration-300
                ${
                  i === active
                    ? "w-8 bg-gold"
                    : "w-3 bg-white/25 group-hover:bg-white/50 group-hover:w-5"
                }
              `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
