import type { SiteLocale } from "@/i18n/locales";
import type { ImageAsset } from "@/sanity/queries/fragments";
import { useTranslations } from "next-intl";
import PhotoHeroBackground from "@/components/ui/hero/PhotoHeroBackground";
import HeroBackLink from "@/components/ui/HeroBackLink";
import StoryHeroCopy from "./StoryHeroCopy";

interface StoryHeroProps {
  heroImage:
    | (ImageAsset & {
        alt: string;
      })
    | null;
  names: string;
  packageTag: string;
  date: string;
  location: string;
  locale: SiteLocale;
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
      <PhotoHeroBackground
        photo={heroImage}
        alt={heroImage?.alt ?? `${names} proposal photo`}
      />

      {/* ── Top: back link ── */}
      <div className="relative z-10 px-6 pt-6 md:px-12 md:pt-8">
        <HeroBackLink label={t("allStories")} href="/stories" />
      </div>

      {/* ── Bottom: names + meta ── */}
      <div className="relative z-10 px-6 pb-10 md:px-12 md:pb-14">
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
