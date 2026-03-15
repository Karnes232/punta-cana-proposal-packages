import MoreStoriesCarousel from "./MoreStoriesCarousel";
import {
  defaultMoreStoriesContent,
  type MoreStoriesStory,
  type MoreStoriesContent,
} from "./types";

interface MoreStoriesProps {
  stories: MoreStoriesStory[];
  locale: "en" | "es";
  content?: MoreStoriesContent;
}

export default function MoreStories({
  stories,
  locale,
  content = defaultMoreStoriesContent,
}: MoreStoriesProps) {
  if (!stories || stories.length === 0) return null;

  const sectionLabel =
    locale === "es" ? content.sectionLabelEs : content.sectionLabelEn;
  const heading = locale === "es" ? content.headingEs : content.headingEn;

  return (
    <section className="bg-ivory border-t border-gold/20">
      <div className="max-w-site mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-5">
            <span
              className="block w-10 h-px bg-gold/40 shrink-0"
              aria-hidden="true"
            />
            <span className="text-[10px] font-body font-medium tracking-[0.2em] uppercase text-gray whitespace-nowrap">
              {sectionLabel}
            </span>
            <span className="block flex-1 h-px bg-gold/20" aria-hidden="true" />
          </div>
          <h2 className="font-display font-normal text-fluid-h3 text-black leading-tight">
            {heading} <em className="italic text-gold">Different Stories</em>
          </h2>
        </div>

        <MoreStoriesCarousel
          stories={stories}
          content={content}
          locale={locale}
        />
      </div>
    </section>
  );
}
