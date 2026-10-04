import CardCarousel from "@/components/ui/CardCarousel";
import MoreSection from "@/components/ui/MoreSection";
import MoreStoriesCard from "./MoreStoriesCard";
import { type MoreStoriesStory } from "./types";

interface MoreStoriesProps {
  stories: MoreStoriesStory[];
  locale: "en" | "es";
}

export default function MoreStories({ stories, locale }: MoreStoriesProps) {
  if (!stories || stories.length === 0) return null;

  const es = locale === "es";

  return (
    <MoreSection
      label={es ? "Más Historias" : "More Stories"}
      heading={es ? "Mismo Paquete," : "Same Package,"}
      headingAccent={es ? "Historias Diferentes" : "Different Stories"}
    >
      <CardCarousel
        prevLabel={es ? "Anterior" : "Previous"}
        nextLabel={es ? "Siguiente" : "Next"}
      >
        {stories.map((story) => (
          <MoreStoriesCard
            key={story.slug}
            story={story}
            readMoreLabel={es ? "Leer Historia" : "Read Story"}
          />
        ))}
      </CardCarousel>
    </MoreSection>
  );
}
