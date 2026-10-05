import Link from "next/link";
import {
  FiArrowDown,
  FiArrowRight,
  FiMapPin,
  FiTruck,
  FiCamera,
  FiShield,
  FiClock,
  FiUsers,
  FiCheck,
} from "react-icons/fi";
import {
  getCatalogContent,
  getDinnerPreview,
  getHomePresentation,
} from "@/sanity/queries/ExperienceCatalog";
import { local } from "@/lib/experience/normalize";
import { homeCopy, homeText } from "@/lib/experience/homeCopy";
import { label } from "@/lib/experience/labels";
import { depositText } from "@/lib/experience/dinnerPolicy";
import type { Locale, Image } from "@/lib/experience/types";
import {
  HomePhoto,
  ExperienceSelector,
  PickupJourney,
  MomentsGallery,
} from "./HomeWidgets";
import {
  actionsClass,
  buttonClass,
  eyebrowClass,
  homeButtonParts,
  shellClass,
  homeButtonIcon,
  homeDarkSection,
  homeH2,
  homeH3,
  homeIcon,
  homeSection,
  homeTextLink,
} from "./styles";
const featuredText = "text-[16px] text-[#d3cec6]";

export default async function ExperienceHome({ locale }: { locale: Locale }) {
  const [content, presentation, dinner] = await Promise.all([
    getCatalogContent(),
    getHomePresentation(),
    getDinnerPreview(),
  ]);
  const home = content.home,
    settings = content.settings || {},
    prefix = locale === "es" ? "/es" : "";
  const dinnerMoney = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  const t = (key: string) =>
    homeText(home, locale, key)
      .replaceAll("{deposit}", depositText(settings, locale))
      .replaceAll("{basePrice}", dinnerMoney(dinner?.basePrice ?? 849))
      .replaceAll("{includedGuests}", String(dinner?.includedGuests ?? 2))
      .replaceAll(
        "{additionalGuestPrice}",
        dinnerMoney(dinner?.additionalGuestPrice ?? 100),
      );
  const copy = Object.fromEntries(
    Object.keys(homeCopy).map((key) => [key, t(key)]),
  );
  const proposals = presentation.proposals;
  const proposalPhoto =
    home?.proposalSelectorImage ||
    proposals[0]?.styles[0]?.mainImage ||
    proposals[0]?.gallery[0]?.image;
  const dinnerPhoto =
    home?.dinnerSelectorImage ||
    dinner?.styles[0]?.mainImage ||
    dinner?.gallery[0]?.image;
  const hero = home?.heroImage || presentation.hero || proposalPhoto;
  const realPhotos = proposals.flatMap((e) =>
    e.gallery.map((p) => p.image).filter((p): p is Image => !!p?.url),
  );
  const photos = (home?.moments?.length ? home.moments : realPhotos)
    .filter((p, i, a) => p.url && a.findIndex((v) => v.url === p.url) === i)
    .slice(0, 8);
  const editorial = home?.editorialImages?.length
    ? home.editorialImages
    : photos.slice(0, 3);
  const trust = [
    ["trustPrivate", FiMapPin],
    ["trustLocal", FiShield],
    ["trustTransport", FiTruck],
    ["trustService", FiUsers],
    ["trustPhoto", FiCamera],
    ["trustDelivery", FiClock],
  ] as const;
  const steps = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
  ];
  return (
    <main className={shellClass()}>
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-black px-[max(24px,calc((100vw_-_1200px)/2))] pt-[176px] pb-[72px] text-ivory upto700:px-6 upto700:pt-[144px] upto700:pb-12">
        <HomePhoto
          photo={hero}
          locale={locale}
          priority
          className="-z-2 animate-[lux-hero-drift_6s_ease-out_forwards] object-cover object-center motion-reduce:[animation:none] motion-reduce:[transform:none]"
        />
        <div className="absolute inset-0 -z-1 bg-[linear-gradient(90deg,#000c,#0005),linear-gradient(0deg,#0008,transparent)]" />
        <div className="max-w-[1000px] animate-[lux-enter_0.6s_ease-out]">
          <p
            className={`${eyebrowClass({ color: "text-[#e7ca97]" })} max-w-[760px]`}
          >
            {t("eyebrow")}
          </p>
          <h1 className="max-w-[1050px] text-[clamp(3.5rem,6vw,6.5rem)] upto700:text-[clamp(2.5rem,11vw,4rem)]">
            {t("headline")}
          </h1>
          <p className="max-w-[760px] text-[18px] text-ivory upto700:text-[16px]">
            {t("introduction")}
          </p>
          <div
            className={`${actionsClass} upto700:flex-col upto700:items-stretch`}
          >
            <Link
              className={buttonClass(homeButtonParts)}
              href={`${prefix}/proposals`}
            >
              {t("exploreProposals")}
              <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
            </Link>
            <Link
              className={buttonClass({
                ...homeButtonParts,
                colors:
                  "border-[#b99a62] bg-[#0b0b0c50] [background-position:initial] text-ivory",
              })}
              href={`${prefix}/romantic-dinners`}
            >
              {t("exploreDinners")}
            </Link>
          </div>
          <p className="max-w-[780px] text-[14px] text-ivory">{t("deposit")}</p>
          <a
            className="mt-2 inline-flex border border-[#cfae7066] p-4"
            href="#planning"
            aria-label={t("planning")}
          >
            <FiArrowDown aria-hidden="true" className={homeIcon} />
          </a>
        </div>
      </section>
      <section id="planning" className={homeSection}>
        <p className={eyebrowClass({ size: "text-[16px]" })}>
          {t("planningEyebrow")}
        </p>
        <h2 className={homeH2}>{t("planning")}</h2>
        <ExperienceSelector
          locale={locale}
          copy={copy}
          images={[proposalPhoto, dinnerPhoto]}
        />
      </section>
      <section
        className="bg-black px-[max(24px,calc((100vw_-_1200px)/2))] py-12 text-ivory"
        aria-label={t("trustLabel")}
      >
        <div className="grid grid-cols-[repeat(3,1fr)] gap-6 upto700:grid-cols-[1fr_1fr] upto700:gap-4">
          {trust.map(([key, Icon]) => (
            <p
              key={key}
              className="flex items-center gap-4 text-[16px] text-inherit upto700:items-start upto700:text-[14px]"
            >
              <Icon aria-hidden="true" className={`h-6 w-6 ${homeIcon}`} />
              {t(key)}
            </p>
          ))}
        </div>
        <p className="text-[14px] text-[#c7c2b9]">{t("mediaNote")}</p>
        <p className="text-[14px] text-[#c7c2b9]">{t("deposit")}</p>
      </section>
      <section className={homeSection}>
        <h2 className={homeH2}>{t("featured")}</h2>
        <div className="grid grid-cols-3 gap-6 upto1280:gap-4 upto700:grid-cols-[1fr] upto700:gap-6">
          {proposals.map((e) => {
            const prices = e.styles
              .map((s) => s.price)
              .filter((p): p is number => typeof p === "number");
            const price = prices.length ? Math.min(...prices) : e.basePrice;
            return (
              <article
                key={e._id}
                className="flex flex-col border border-[#cfae7033] bg-[#141416] text-ivory"
              >
                <div className="relative aspect-[4/3]">
                  <HomePhoto
                    photo={e.styles[0]?.mainImage || e.gallery[0]?.image}
                    locale={locale}
                    className="object-cover"
                  />
                  {local(e.badge, locale) && (
                    <span className="absolute bottom-4 left-4 bg-[#0b0b0ce6] px-4 py-2 text-[14px] text-gold">
                      {local(e.badge, locale)}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 upto1280:p-5">
                  <h3 className={`${homeH3} italic`}>
                    {local(e.name, locale)}
                  </h3>
                  {typeof price === "number" && (
                    <p className="text-[16px] font-semibold text-gold">
                      {label(settings, locale, "startingAtLabel")}{" "}
                      {new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: e.currency || "USD",
                        maximumFractionDigits: 0,
                      }).format(price)}
                    </p>
                  )}
                  <p className={featuredText}>
                    {local(e.shortDescription, locale) ||
                      t("proposalDescription")}
                  </p>
                  {e.includedDurationMinutes && (
                    <p className={featuredText}>
                      <FiClock aria-hidden="true" className={homeIcon} />{" "}
                      {e.includedDurationMinutes}{" "}
                      {label(settings, locale, "minutes")}
                    </p>
                  )}
                  {local(e.location, locale) && (
                    <p className={featuredText}>
                      <FiMapPin aria-hidden="true" className={homeIcon} />{" "}
                      {local(e.location, locale)}
                    </p>
                  )}
                  <ul className="mx-0 mt-2 mb-6">
                    {e.inclusions.slice(0, 4).map((item, i) => (
                      <li
                        key={item._key || i}
                        className="mb-2 flex items-baseline gap-2 text-[14px] text-[#d3cec6]"
                      >
                        <FiCheck aria-hidden="true" className={homeIcon} />
                        {local(item.name, locale)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${prefix}/proposals#${encodeURIComponent(e.slug?.current || e._id)}`}
                    className="mt-auto flex items-center gap-2 border-t border-t-[#cfae7033] pt-6 text-[14px] text-gold"
                  >
                    {t("customize")}{" "}
                    <FiArrowRight aria-hidden="true" className={homeIcon} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <Link className={homeTextLink} href={`${prefix}/proposals`}>
          {t("allProposals")}{" "}
          <FiArrowRight aria-hidden="true" className={homeIcon} />
        </Link>
      </section>
      <section className={homeDarkSection}>
        <div className="m-auto max-w-[1200px]">
          <h2 className={homeH2}>{t("journeyTitle")}</h2>
          <p className="mb-8 max-w-[800px] text-[16px] text-[#c7c2b9]">
            {t("journeyIntro")}
          </p>
          <PickupJourney
            locale={locale}
            label={t("journeyLabel")}
            steps={steps.slice(0, 5).map((step, i) => ({
              title: t("journey" + step),
              text: t("journey" + step + "Text"),
              photo:
                home?.journeyImages?.[i] ||
                (i === 2 ? proposalPhoto : i === 3 ? photos[1] : undefined),
            }))}
          />
        </div>
      </section>
      <section className={homeSection}>
        <h2 className={homeH2}>{t("transformation")}</h2>
        <p className="mb-8 max-w-[800px] text-[16px]">
          {t("transformationText")}
        </p>
        <div className="grid grid-cols-[1fr_1.4fr_1fr] items-center gap-4 upto700:gap-2">
          {editorial.map((photo, i) => (
            <figure
              key={photo.url || i}
              className="relative aspect-[3/4] nth-2:aspect-[4/5]"
            >
              <HomePhoto
                photo={photo}
                locale={locale}
                className="object-cover"
              />
            </figure>
          ))}
        </div>
        <p className="max-w-[780px] text-[14px]">{t("editorialNote")}</p>
      </section>
      <section
        className={`${homeSection} grid grid-cols-[1fr_1fr] items-center gap-12 border-t border-t-[#ded5c4] upto700:grid-cols-[1fr]`}
      >
        <div className="relative h-full min-h-[660px] upto700:min-h-[400px]">
          <HomePhoto
            photo={dinnerPhoto}
            locale={locale}
            className="object-cover"
          />
        </div>
        <div>
          <p className={eyebrowClass({ size: "text-[16px]" })}>
            Cabeza de Toro · Punta Cana
          </p>
          <h2 className={homeH2}>{t("dinnerTitle")}</h2>
          <p className="text-[16px]">{t("dinnerText")}</p>
          <p className="text-[16px]">{t("dinnerCelebrations")}</p>
          <p className="text-[16px] font-semibold text-[#9b773d]">
            {t("dinnerPrice")}
          </p>
          <p className="text-[16px]">
            {label(settings, locale, "dinnerExclusivity")}
          </p>
          <p className="text-[16px]">{t("deposit")}</p>
          <p className="text-[16px]">
            {label(settings, locale, "dinnerPaymentNote")}
          </p>
          <Link
            className={buttonClass(homeButtonParts)}
            href={`${prefix}/romantic-dinners`}
          >
            {t("exploreDinners")}
            <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
          </Link>
        </div>
      </section>
      <section className={homeDarkSection}>
        <div className="m-auto max-w-[1200px]">
          <h2 className={homeH2}>{t("howTitle")}</h2>
          <ol className="grid list-none grid-cols-[repeat(4,1fr)] gap-x-6 gap-y-10 upto1280:grid-cols-[repeat(2,1fr)] upto700:grid-cols-[1fr_1fr] upto700:gap-x-4 upto700:gap-y-8">
            {steps.map((step, i) => (
              <li key={step} className="border-t border-t-[#cfae7044] pt-6">
                <span className="text-[14px] text-gold">0{i + 1}</span>
                <h3 className="mt-4 text-[1.4rem] leading-[1.25] upto700:text-[1.25rem]">
                  {t("step" + step)}
                </h3>
                <p className="text-[16px] text-[#c7c2b9] upto700:text-[14px]">
                  {t("step" + step + "Text")}
                </p>
              </li>
            ))}
          </ol>
          <Link className={homeTextLink} href={`${prefix}/how-it-works`}>
            {t("howItWorksLink")}
            <FiArrowRight aria-hidden="true" className={homeIcon} />
          </Link>
        </div>
      </section>
      <section className={homeSection}>
        <h2 className={homeH2}>{t("realMoments")}</h2>
        <MomentsGallery photos={photos} locale={locale} copy={copy} />
        <Link className={homeTextLink} href={`${prefix}/stories`}>
          {t("viewStories")}
          <FiArrowRight aria-hidden="true" className={homeIcon} />
        </Link>
      </section>
      <section
        className={`${homeSection} border-t border-t-[#ded5c4] text-center`}
      >
        <h2 className={`${homeH2} mx-auto`}>{t("startTitle")}</h2>
        <p className="text-[16px]">{t("deposit")}</p>
        <Link
          className={buttonClass(homeButtonParts)}
          href={`${prefix}/proposals`}
        >
          {t("exploreProposals")}
          <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
        </Link>
      </section>
    </main>
  );
}
