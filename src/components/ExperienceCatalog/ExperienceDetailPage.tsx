import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import FeaturedProposalCard from "@/components/HomePage/FeaturedProposalCard";
import HomeTextLink from "@/components/HomePage/HomeTextLink";
import { startingPrice } from "@/components/HomePage/homeData";
import { homeH2 } from "@/components/HomePage/styles";
import JsonLd from "@/components/seo/JsonLd";
import CtaStrip from "@/components/ui/CtaStrip";
import { localePrefix } from "@/i18n/locales";
import { homeText } from "@/lib/experience/homeCopy";
import { label } from "@/lib/experience/labels";
import { local } from "@/lib/experience/normalize";
import { sanityImageUrl } from "@/sanity/lib/image";
import type {
  Experience,
  Home,
  Locale,
  Settings,
} from "@/lib/experience/types";
import ExperienceCard from "./ExperienceCard";
import { moneyFormatter } from "./ExperienceCard/money";
import { shellClass, wrapClass } from "./styles";

/**
 * A package's own page (a proposal or a romantic dinner): a link back to
 * its catalog, the name and price, the package with its photos kept in view,
 * more proposals and the closing contact strip.
 */
export default function ExperienceDetailPage({
  experience: e,
  locale,
  settings,
  home,
  others,
}: {
  experience: Experience;
  locale: Locale;
  settings: Settings;
  home: Home | null;
  /** Other proposals to suggest; empty for dinners. */
  others: Experience[];
}) {
  const t = (key: string) => label(settings, locale, key);
  const prefix = localePrefix(locale);
  const dinner = e._type === "romanticDinnerExperience";
  const catalogHref = `${prefix}${dinner ? "/romantic-dinners" : "/proposals"}`;
  const money = moneyFormatter(locale, settings, e.currency || "USD");
  const from = dinner ? e.basePrice : startingPrice(e);
  const photo = e.gallery[0]?.image;
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: local(e.name, locale),
    description: local(e.shortDescription, locale),
    image: photo?.url ? sanityImageUrl(photo.url, photo) : undefined,
  };
  return (
    <main className={shellClass()}>
      <JsonLd data={json} />
      <div className={wrapClass}>
        <Link
          href={catalogHref}
          className="inline-flex min-h-11 items-center gap-2 text-[14px] text-body [transition:color_0.2s] hover:text-accent"
        >
          <FiArrowLeft aria-hidden="true" className="size-4 text-accent" />
          {t(dinner ? "navDinners" : "navProposals")}
        </Link>
        <header className="mt-4 mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h1 className="m-0 max-w-[20ch] text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-balance">
            {local(e.name, locale)}
          </h1>
          {typeof from === "number" && (
            <p className="m-0 text-[18px] font-medium text-accent tabular-nums">
              {dinner ? local(e.priceLabel, locale) : t("startingAtLabel")}{" "}
              {money(from)}
            </p>
          )}
        </header>
        <ExperienceCard
          experience={e}
          locale={locale}
          settings={settings}
          layout="split"
        />
      </div>
      {others.length > 0 && (
        <section className="m-auto max-w-[1280px] px-7 py-20 upto800:px-5 upto800:py-14 upto390:px-3.5">
          <h2 className={homeH2}>{t("moreProposalsHeading")}</h2>
          <div className="grid grid-cols-3 gap-6 upto1280:gap-4 upto700:grid-cols-[1fr] upto700:gap-6">
            {others.map((other) => (
              <FeaturedProposalCard
                key={other._id}
                experience={other}
                locale={locale}
                prefix={prefix}
                settings={settings}
                t={(key) => homeText(home, locale, key)}
                href={`${prefix}/proposals/${other.slug?.current}`}
              />
            ))}
          </div>
          <HomeTextLink href={catalogHref}>
            {homeText(home, locale, "allProposals")}
          </HomeTextLink>
        </section>
      )}
      <CtaStrip
        heading={t("contactHeading")}
        ctaLabel={t("contactUsLabel")}
        ctaHref="/contact"
      />
    </main>
  );
}
