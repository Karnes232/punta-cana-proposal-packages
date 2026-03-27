import { Link } from "@/i18n/navigation";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import RelatedStoryCard, { RelatedStoryData } from "./RelatedStoryCard";
import { relatedStories } from "@/sanity/queries/StoriesPage.ts/IndividualStory";

interface RelatedStoriesProps {
  locale?: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  readMore: string;
  viewAll: string;
  /** Override stories from Sanity */
  stories?: relatedStories[];
}

export default function RelatedStories({
  locale = "en",
  stories,
  eyebrow,
  headingLine1,
  headingLine2,
  description,
  readMore,
  viewAll,
}: RelatedStoriesProps) {
  const storyList = stories ?? [];

  if (!storyList.length) return null;

  return (
    <section className="relative bg-ivory overflow-hidden">
      {/* Faint diagonal gold texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #CFAE70 0px,
            #CFAE70 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Edge hairlines */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Section header */}
        <div className="flex flex-col items-center gap-5 mb-14 lg:mb-16">
          <RevealOnScroll delay={0}>
            {/* Ornament */}
            <div
              className="flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="block w-16 h-px bg-gold/40" />
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="text-gold/60"
              >
                <rect
                  x="5"
                  y="0.5"
                  width="6.36"
                  height="6.36"
                  transform="rotate(45 5 5)"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <rect
                  x="5"
                  y="2.5"
                  width="3.54"
                  height="3.54"
                  transform="rotate(45 5 5)"
                  fill="currentColor"
                />
              </svg>
              <span className="block w-16 h-px bg-gold/40" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
              <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
                {eyebrow}
              </p>
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <h2 className="font-display font-normal text-center leading-[1.2] tracking-[-0.01em] text-[clamp(28px,3.5vw,48px)]">
              <span className="block text-black">{headingLine1}</span>
              <span className="block italic text-gold">{headingLine2}</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <p className="text-center font-light text-gray leading-[1.85] text-[clamp(14px,1.5vw,17px)] max-w-[520px] mx-auto">
              {description}
            </p>
          </RevealOnScroll>
        </div>

        {/* Story cards */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {storyList.map((story, i) => (
            <RevealOnScroll key={story.slug?.current} delay={400 + i * 150}>
              <RelatedStoryCard
                story={story as unknown as RelatedStoryData}
                readMoreLabel={readMore}
                locale={locale as "en" | "es"}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* View All link */}
        <RevealOnScroll delay={400 + storyList.length * 150}>
          <div className="flex justify-center mt-12 lg:mt-14">
            <Link
              href="/stories"
              className="
                inline-flex items-center gap-2.5
                border border-gold/30 text-black
                text-[11px] font-medium tracking-[0.18em] uppercase
                px-8 py-4
                transition-all duration-300
                hover:border-gold/60 hover:text-gold
                group
              "
            >
              {viewAll}
              <svg
                width="14"
                height="14"
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
        </RevealOnScroll>

        {/* Bottom ornament */}
        <RevealOnScroll delay={500 + storyList.length * 150}>
          <div
            className="flex items-center justify-center gap-3 mt-14 lg:mt-16"
            aria-hidden="true"
          >
            <span className="block w-16 h-px bg-gold/40" />
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="text-gold/60"
            >
              <rect
                x="5"
                y="0.5"
                width="6.36"
                height="6.36"
                transform="rotate(45 5 5)"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <rect
                x="5"
                y="2.5"
                width="3.54"
                height="3.54"
                transform="rotate(45 5 5)"
                fill="currentColor"
              />
            </svg>
            <span className="block w-16 h-px bg-gold/40" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
