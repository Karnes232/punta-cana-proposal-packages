/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { headers } from "next/headers";
import { dinnerPreview } from "@/lib/experience/dinnerTemplate";
import {
  getDinnerPreview,
  getCatalogContent,
  getExperiences,
} from "@/sanity/queries/ExperienceCatalog";
import { local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
import type { Locale } from "@/lib/experience/types";
import CatalogHero from "./CatalogHero";
import CatalogIntroduction from "./CatalogIntroduction";
import ProposalGrid from "./ProposalGrid";
import RomanticDinnerCard from "./RomanticDinnerCard";
import { PROPOSALS_HERO_SLUG } from "@/sanity/constants";
import { getRequestHost, isPreviewHost } from "@/lib/requestHost";
export default async function Catalog({
  locale,
  section,
}: {
  locale: Locale;
  section?: "proposals" | "romantic-dinners";
}) {
  const [experiences, content] = await Promise.all([
    getExperiences(),
    getCatalogContent(),
  ]);
  const requestHeaders = await headers();
  const showTemplate = isPreviewHost(getRequestHost(requestHeaders));
  const cmsDinnerPreview =
    (!section || section === "romantic-dinners") &&
    (showTemplate ||
      !experiences.some((e) => e._type === "romanticDinnerExperience"))
      ? await getDinnerPreview()
      : null;
  const settings = content.settings || {},
    home = content.home;
  const t = (key: string) => label(settings, locale, key),
    prefix = locale === "es" ? "/es" : "";
  return (
    <main
      className={`ec-shell ${section === "proposals" ? "ec-proposal-page" : ""}`}
    >
      {section && (
        <CatalogHero
          dinner={section === "romantic-dinners"}
          locale={locale}
          settings={settings}
          image={
            section === "romantic-dinners"
              ? home?.dinnerHeroImage ||
                experiences.find((e) => e._type === "romanticDinnerExperience")
                  ?.gallery[0]?.image ||
                cmsDinnerPreview?.styles[1]?.mainImage ||
                cmsDinnerPreview?.gallery[0]?.image
              : home?.proposalHeroImage ||
                experiences.find(
                  (e) =>
                    e._type === "proposalExperience" &&
                    e.slug?.current === PROPOSALS_HERO_SLUG,
                )?.gallery[0]?.image ||
                experiences.find((e) => e._type === "proposalExperience")
                  ?.gallery[0]?.image
          }
        />
      )}
      <div className="ec-wrap">
        {!section && (
          <section className="ec-hero">
            <div>
              {local(home?.eyebrow, locale) && (
                <p className="ec-eyebrow">{local(home?.eyebrow, locale)}</p>
              )}
              <h1>
                {local(home?.headline, locale) ||
                  "Punta Cana Proposal Packages"}
              </h1>
              {local(home?.subheadline, locale) && (
                <p>{local(home?.subheadline, locale)}</p>
              )}
              <div className="ec-actions">
                <a className="ec-button" href="#proposals">
                  {local(home?.primaryCTA, locale) || t("proposalSectionTitle")}
                </a>
                <a className="ec-button secondary" href="#romantic-dinners">
                  {local(home?.secondaryCTA, locale) || t("dinnerSectionTitle")}
                </a>
              </div>
            </div>
            {home?.heroImage?.url && (
              <img
                src={home.heroImage.url}
                alt={local(home.heroImage.alt, locale)}
                width={1200}
                height={600}
              />
            )}
          </section>
        )}
        {(["proposals", "romantic-dinners"] as const)
          .filter((k) => !section || section === k)
          .map((key) => {
            const dinner = key === "romantic-dinners",
              rows = experiences.filter(
                (e) =>
                  e._type ===
                  (dinner ? "romanticDinnerExperience" : "proposalExperience"),
              );
            return (
              <section
                className={`ec-section ${!dinner ? "ec-proposals-section" : ""}`}
                id={key}
                key={key}
              >
                <CatalogIntroduction
                  dinner={dinner}
                  standalone={false}
                  locale={locale}
                  settings={settings}
                />
                <div id="packages" className="ec-scroll-target" />
                {dinner && (showTemplate || rows.length === 0) && (
                  <>
                    <div className="ec-template-note">
                      {showTemplate
                        ? locale === "es"
                          ? "Ejemplo editable · Tres montajes con imágenes de referencia de Sanity. Menú y tarifas configurados; capacidad final pendiente de confirmar."
                          : "Editable example · Three setups with reference images from Sanity. Menu and prices configured; final capacity awaiting confirmation."
                        : locale === "es"
                          ? "Personaliza tu cena y envíanos tu fecha preferida. Nuestro equipo confirmará personalmente la capacidad y disponibilidad de tu celebración."
                          : "Personalize your dinner and send us your preferred date. Our team will personally confirm capacity and availability for your celebration."}
                    </div>
                    <div className="ec-dinner-grid">
                      <RomanticDinnerCard
                        experience={cmsDinnerPreview || dinnerPreview()}
                        locale={locale}
                        settings={settings}
                        demo={showTemplate}
                        contactOnly={!showTemplate}
                      />
                    </div>
                  </>
                )}
                {!dinner && rows.length > 0 ? (
                  <ProposalGrid
                    experiences={rows}
                    locale={locale}
                    settings={settings}
                  />
                ) : rows.length ? (
                  <div className="ec-grid ec-dinner-grid">
                    {rows.map((e) => (
                      <RomanticDinnerCard
                        key={e._id}
                        experience={e}
                        locale={locale}
                        settings={settings}
                      />
                    ))}
                  </div>
                ) : showTemplate ? null : (
                  <div className="ec-empty">
                    <p>{t(dinner ? "emptyDinners" : "emptyProposals")}</p>
                    <Link href={prefix + "/contact"}>
                      {t("contactUsLabel")} →
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        <section className="ec-contact-cta">
          {local(home?.contactHeading, locale) && (
            <h2>{local(home?.contactHeading, locale)}</h2>
          )}
          <Link className="ec-button secondary" href={`${prefix}/contact`}>
            {t("contactUsLabel")} →
          </Link>
        </section>
      </div>
    </main>
  );
}
