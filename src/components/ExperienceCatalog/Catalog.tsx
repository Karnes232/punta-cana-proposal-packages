/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { dinnerPreview } from "@/lib/experience/dinnerTemplate";
import {
  getDinnerPreview,
  getLegacyProposals,
  getCatalogContent,
  getExperiences,
} from "@/sanity/queries/ExperienceCatalog";
import { local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
import type { Locale, Seo } from "@/lib/experience/types";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo } from "@/sanity/queries/SEO/seo";
import CatalogIntroduction from "./CatalogIntroduction";
import ProposalGrid from "./ProposalGrid";
import RomanticDinnerCard from "./RomanticDinnerCard";
export function catalogMetadata(
  locale: Locale,
  path: string,
  seo?: Seo,
  title?: string,
): Metadata {
  return {
    title: local(seo?.title, locale) || title,
    description: local(seo?.description, locale) || undefined,
    alternates: {
      canonical: siteCanonicalUrl(locale, path),
      languages: {
        en: siteCanonicalUrl("en", path),
        es: siteCanonicalUrl("es", path),
        "x-default": siteCanonicalUrl("en", path),
      },
    },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: seo?.image?.url ? { images: [seo.image.url] } : undefined,
  };
}
export async function catalogPageMetadata(
  locale: Locale,
  path: string,
  seo?: Seo,
  title?: string,
): Promise<Metadata> {
  const previous =
    path === "" || path === "/contact"
      ? await getPageSeo(path === "" ? "home" : "contact")
      : null;
  const preserved: Seo = {
    title: {
      en: previous?.seo?.meta?.en?.title,
      es: previous?.seo?.meta?.es?.title,
    },
    description: {
      en: previous?.seo?.meta?.en?.description,
      es: previous?.seo?.meta?.es?.description,
    },
    image: previous?.seo?.openGraph?.image
      ? { url: previous.seo.openGraph.image.url }
      : undefined,
    noIndex: previous?.seo?.noIndex,
  };
  return catalogMetadata(
    locale,
    path,
    {
      ...preserved,
      ...seo,
      title: { ...preserved.title, ...seo?.title },
      description: { ...preserved.description, ...seo?.description },
    },
    title,
  );
}
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
  const host = (
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host") ||
    ""
  )
    .split(",")[0]
    .trim();
  const showTemplate =
    /^localhost(:\d+)?$/.test(host) ||
    /^deploy-preview-\d+--[^.]+\.netlify\.app$/.test(host);
  const cmsDinnerPreview =
    (!section || section === "romantic-dinners") &&
    (showTemplate ||
      !experiences.some((e) => e._type === "romanticDinnerExperience"))
      ? await getDinnerPreview()
      : null;
  const legacyProposals =
    !section || section === "proposals" ? await getLegacyProposals() : [];
  const settings = content.settings || {},
    home = content.home;
  const t = (key: string) => label(settings, locale, key),
    prefix = locale === "es" ? "/es" : "";
  return (
    <main
      className={`ec-shell ${section === "proposals" ? "ec-proposal-page" : ""}`}
    >
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
                  standalone={!!section}
                  locale={locale}
                  settings={settings}
                />
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
                {!dinner && (rows.length > 0 || legacyProposals.length > 0) ? (
                  <>
                    {showTemplate && legacyProposals.length > 0 && (
                      <p className="ec-preview-caption">
                        {locale === "es"
                          ? "Vista previa interactiva del catálogo de Sanity. Las solicitudes de los ejemplos no se envían."
                          : "Interactive preview of the Sanity catalog. Example requests are not sent."}
                      </p>
                    )}
                    <ProposalGrid
                      experiences={[
                        ...rows,
                        ...legacyProposals.filter(
                          (e) =>
                            !rows.some(
                              (row) => row.slug?.current === e.slug?.current,
                            ),
                        ),
                      ]}
                      demoIds={
                        showTemplate ? legacyProposals.map((e) => e._id) : []
                      }
                      locale={locale}
                      settings={settings}
                    />
                  </>
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
