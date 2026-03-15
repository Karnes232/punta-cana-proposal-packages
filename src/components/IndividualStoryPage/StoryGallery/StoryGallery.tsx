import StoryGalleryGrid from "./StoryGalleryGrid";
import {
  defaultStoryGalleryContent,
  type GalleryPhoto,
  type StoryGalleryContent,
} from "./types";

interface StoryGalleryProps {
  photos: GalleryPhoto[];
  locale: "en" | "es";
  content?: StoryGalleryContent;
}

export default function StoryGallery({
  photos,
  locale,
  content = defaultStoryGalleryContent,
}: StoryGalleryProps) {
  if (!photos || photos.length === 0) return null;

  const sectionLabel =
    locale === "es" ? content.sectionLabelEs : content.sectionLabelEn;

  return (
    <section className="bg-ivory">
      <div className="max-w-site mx-auto px-6 md:px-12 pb-16 md:pb-24">
        {/* Section divider label */}
        <div className="flex items-center gap-5 mb-8">
          <span
            className="block w-10 h-px bg-gold/40 shrink-0"
            aria-hidden="true"
          />
          <span className="text-[10px] font-body font-medium tracking-[0.2em] uppercase text-gray whitespace-nowrap">
            {sectionLabel}
          </span>
          <span className="block flex-1 h-px bg-gold/20" aria-hidden="true" />
        </div>

        <StoryGalleryGrid photos={photos} content={content} locale={locale} />
      </div>
    </section>
  );
}
