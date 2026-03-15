import { useTranslations } from "next-intl";
import StoryHeroBackground from "./StoryHeroBackground";
import StoryHeroBackLink from "./StoryHeroBackLink";
import StoryHeroCopy from "./StoryHeroCopy";

interface StoryHeroProps {
  heroImage: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  } | null;
  names: string;
  packageTag: string;
  date: string;
  location: string;
  locale: "en" | "es";
}

export default function StoryHero({
  heroImage,
  names,
  packageTag,
  date,
  location,
  locale,
}: StoryHeroProps) {
  const t = useTranslations("IndividualStoryPage");
  return (
    <section className="relative w-full min-h-[70svh] md:min-h-[80svh] flex flex-col justify-between overflow-hidden bg-black">
      {/* ── Background photo + scrim ── */}
      <StoryHeroBackground photo={heroImage} names={names} />

      {/* ── Gold corner accents ── */}
      <div
        className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Top: back link ── */}
      <div className="relative z-10 px-8 pt-8 md:px-12 md:pt-10">
        <StoryHeroBackLink label={t("allStories") as string} />
      </div>

      {/* ── Bottom: names + meta ── */}
      <div className="relative z-10 px-8 pb-10 md:px-12 md:pb-14">
        <StoryHeroCopy
          names={names}
          packageTag={packageTag}
          date={date}
          location={location}
          locale={locale}
        />
      </div>
    </section>
  );
}
