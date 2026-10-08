import { localePrefix } from "@/i18n/locales";
import { depositText } from "@/lib/experience/dinnerPolicy";
import { homeCopy, homeText } from "@/lib/experience/homeCopy";
import type { Experience, Locale } from "@/lib/experience/types";
import type { CatalogContent } from "@/sanity/queries/ExperienceCatalog";
import { shellClass } from "../ExperienceCatalog/styles";
import DinnerSection from "./DinnerSection";
import FeaturedProposals from "./FeaturedProposals";
import HomeHero from "./HomeHero";
import { homePhotos, type HomeText } from "./homeData";
import HowItWorksSteps from "./HowItWorksSteps";
import JourneySection from "./JourneySection";
import MomentsSection from "./MomentsSection";
import PlanningSection from "./PlanningSection";
import StartSection from "./StartSection";
import TransformationSection from "./TransformationSection";
import TrustStrip from "./TrustStrip";

/** The home page, section by section. The route fetches its data. */
export default function HomePage({
  locale,
  content,
  proposals,
  dinner,
}: {
  locale: Locale;
  content: CatalogContent;
  /** The featured proposal packages. */
  proposals: Experience[];
  /** The romantic dinner, for its photo and prices. */
  dinner: Experience | null;
}) {
  const home = content.home,
    settings = content.settings || {},
    prefix = localePrefix(locale);
  const dinnerMoney = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  const t: HomeText = (key) =>
    homeText(home, locale, key)
      .replaceAll("{deposit}", depositText(settings, locale))
      .replaceAll("{basePrice}", dinnerMoney(dinner?.basePrice ?? 849))
      .replaceAll("{includedGuests}", String(dinner?.includedGuests ?? 2))
      .replaceAll(
        "{additionalGuestPrice}",
        dinnerMoney(dinner?.additionalGuestPrice ?? 100),
      );
  // The same texts as a plain object, for the client components.
  const copy = Object.fromEntries(
    Object.keys(homeCopy).map((key) => [key, t(key)]),
  );
  const photos = homePhotos(home, proposals, dinner);

  return (
    <main className={shellClass()}>
      <HomeHero locale={locale} prefix={prefix} t={t} photo={photos.hero} />
      <PlanningSection
        locale={locale}
        t={t}
        copy={copy}
        proposalPhoto={photos.proposalPhoto}
        dinnerPhoto={photos.dinnerPhoto}
      />
      <TrustStrip t={t} />
      <FeaturedProposals
        proposals={proposals}
        locale={locale}
        prefix={prefix}
        settings={settings}
        t={t}
      />
      <JourneySection locale={locale} t={t} photos={photos.journey} />
      <TransformationSection locale={locale} t={t} photos={photos.editorial} />
      <DinnerSection
        locale={locale}
        prefix={prefix}
        settings={settings}
        t={t}
        photo={photos.dinnerPhoto}
      />
      <HowItWorksSteps prefix={prefix} t={t} />
      <MomentsSection
        locale={locale}
        prefix={prefix}
        t={t}
        copy={copy}
        photos={photos.photos}
      />
      <StartSection prefix={prefix} t={t} />
    </main>
  );
}
