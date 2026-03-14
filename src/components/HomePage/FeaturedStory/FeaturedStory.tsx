// Server Component
// Key pattern: FeaturedStoryCard components are rendered on the server,
// then passed as React.ReactNode[] into FeaturedStoryCarousel (client).
// This means story content is SSR'd — the client boundary only manages
// the active index, never re-renders the story markup itself.

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FeaturedStoryEyebrow from "./FeaturedStoryEyebrow";
import FeaturedStoryHeading from "./FeaturedStoryHeading";
import FeaturedStoryCard, { FeaturedStoryCardProps } from "./FeaturedStoryCard";
import FeaturedStoryCarousel from "./FeaturedStoryCarousel";

interface FeaturedStoryProps {
  eyebrow?: string;
  heading?: string;
  stories?: FeaturedStoryCardProps[];
  locale?: string;
}

export default function FeaturedStory({
  eyebrow,
  heading,
  stories = [],
  locale,
}: FeaturedStoryProps) {
  console.log(stories);
  // Pre-render each card on the server — passed as nodes into the client carousel
  const slides = stories.map((story, i) => (
    <FeaturedStoryCard
      key={i}
      {...story}
      imagePosition={i % 2 === 0 ? "left" : "right"}
      locale={locale}
    />
  ));

  return (
    <section
      className="relative bg-black overflow-hidden"
      aria-label="Featured couple stories"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full bg-gold/[0.03] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-28 lg:py-36 flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col items-center gap-5">
          <RevealOnScroll delay={0}>
            <FeaturedStoryEyebrow text={eyebrow} />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <FeaturedStoryHeading text={heading} />
          </RevealOnScroll>
        </div>

        {/* Carousel — client island, receives server-rendered slides */}
        <RevealOnScroll delay={300}>
          <FeaturedStoryCarousel slides={slides} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
