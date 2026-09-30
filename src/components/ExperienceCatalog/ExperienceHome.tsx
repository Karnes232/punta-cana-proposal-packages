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
    <main className="ec-shell lux-home">
      <section className="lux-hero">
        <HomePhoto photo={hero} locale={locale} priority />
        <div className="lux-hero-shade" />
        <div className="lux-hero-copy">
          <p className="ec-eyebrow">
            {local(home?.eyebrow, locale) || t("eyebrow")}
          </p>
          <h1>{local(home?.headline, locale) || t("headline")}</h1>
          <p>{local(home?.subheadline, locale) || t("introduction")}</p>
          <div className="ec-actions">
            <Link className="ec-button" href={`${prefix}/proposals`}>
              {t("exploreProposals")}
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link
              className="ec-button secondary"
              href={`${prefix}/romantic-dinners`}
            >
              {t("exploreDinners")}
            </Link>
          </div>
          <p className="lux-microcopy">{t("deposit")}</p>
          <a className="lux-scroll" href="#planning" aria-label={t("planning")}>
            <FiArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>
      <section id="planning" className="lux-section">
        <p className="ec-eyebrow">
          {locale === "es"
            ? "Punta Cana · Experiencias privadas"
            : "Punta Cana · Private experiences"}
        </p>
        <h2>{t("planning")}</h2>
        <ExperienceSelector
          locale={locale}
          copy={copy}
          images={[proposalPhoto, dinnerPhoto]}
        />
      </section>
      <section
        className="lux-trust"
        aria-label={locale === "es" ? "Nuestra experiencia" : "Our experience"}
      >
        <div>
          {trust.map(([key, Icon]) => (
            <p key={key}>
              <Icon aria-hidden="true" />
              {t(key)}
            </p>
          ))}
        </div>
        <p>{t("mediaNote")}</p>
        <p>{t("deposit")}</p>
      </section>
      <section className="lux-section">
        <h2>{t("featured")}</h2>
        <div className="lux-featured">
          {proposals.map((e) => {
            const prices = e.styles
              .map((s) => s.price)
              .filter((p): p is number => typeof p === "number");
            const price = prices.length ? Math.min(...prices) : e.basePrice;
            return (
              <article key={e._id}>
                <div className="lux-featured-photo">
                  <HomePhoto
                    photo={e.styles[0]?.mainImage || e.gallery[0]?.image}
                    locale={locale}
                  />
                  {local(e.badge, locale) && (
                    <span className="lux-badge">{local(e.badge, locale)}</span>
                  )}
                </div>
                <div className="lux-featured-body">
                  <h3>{local(e.name, locale)}</h3>
                  {typeof price === "number" && (
                    <p className="lux-price">
                      {label(settings, locale, "startingAtLabel")}{" "}
                      {new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: e.currency || "USD",
                        maximumFractionDigits: 0,
                      }).format(price)}
                    </p>
                  )}
                  <p>
                    {local(e.shortDescription, locale) ||
                      t("proposalDescription")}
                  </p>
                  {e.includedDurationMinutes && (
                    <p>
                      <FiClock aria-hidden="true" /> {e.includedDurationMinutes}{" "}
                      {label(settings, locale, "minutes")}
                    </p>
                  )}
                  {local(e.location, locale) && (
                    <p>
                      <FiMapPin aria-hidden="true" />{" "}
                      {local(e.location, locale)}
                    </p>
                  )}
                  <ul>
                    {e.inclusions.slice(0, 4).map((item, i) => (
                      <li key={item._key || i}>
                        <FiCheck aria-hidden="true" />
                        {local(item.name, locale)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${prefix}/proposals#${encodeURIComponent(e.slug?.current || e._id)}`}
                  >
                    {t("customize")} <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <Link className="lux-text-link" href={`${prefix}/proposals`}>
          {t("allProposals")} <FiArrowRight aria-hidden="true" />
        </Link>
      </section>
      <section className="lux-section lux-dark">
        <div className="lux-section-inner">
          <h2>{t("journeyTitle")}</h2>
          <p className="lux-section-lead">{t("journeyIntro")}</p>
          <PickupJourney
            locale={locale}
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
      <section className="lux-section">
        <h2>{t("transformation")}</h2>
        <p className="lux-section-lead">{t("transformationText")}</p>
        <div className="lux-editorial">
          {editorial.map((photo, i) => (
            <figure key={photo.url || i}>
              <HomePhoto photo={photo} locale={locale} />
            </figure>
          ))}
        </div>
        <p className="lux-microcopy">{t("editorialNote")}</p>
      </section>
      <section className="lux-section lux-dinner">
        <div className="lux-dinner-photo">
          <HomePhoto photo={dinnerPhoto} locale={locale} />
        </div>
        <div>
          <p className="ec-eyebrow">Cabeza de Toro · Punta Cana</p>
          <h2>{t("dinnerTitle")}</h2>
          <p>{t("dinnerText")}</p>
          <p>{t("dinnerCelebrations")}</p>
          <p className="lux-price">{t("dinnerPrice")}</p>
          <p>{label(settings, locale, "dinnerExclusivity")}</p>
          <p>{t("deposit")}</p>
          <p>{label(settings, locale, "dinnerPaymentNote")}</p>
          <Link className="ec-button" href={`${prefix}/romantic-dinners`}>
            {t("exploreDinners")}
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="lux-section lux-dark">
        <div className="lux-section-inner">
          <h2>{t("howTitle")}</h2>
          <ol className="lux-how">
            {steps.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                <h3>{t("step" + step)}</h3>
                <p>{t("step" + step + "Text")}</p>
              </li>
            ))}
          </ol>
          <Link className="lux-text-link" href={`${prefix}/how-it-works`}>
            {locale === "es" ? "Cómo funciona" : "How it works"}
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="lux-section">
        <h2>{t("realMoments")}</h2>
        <MomentsGallery photos={photos} locale={locale} copy={copy} />
        <Link className="lux-text-link" href={`${prefix}/stories`}>
          {t("viewStories")}
          <FiArrowRight aria-hidden="true" />
        </Link>
      </section>
      <section className="lux-section lux-final">
        <h2>{t("startTitle")}</h2>
        <p>{t("deposit")}</p>
        <Link className="ec-button" href={`${prefix}/proposals`}>
          {t("exploreProposals")}
          <FiArrowRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
