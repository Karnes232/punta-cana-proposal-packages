/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { proposalPreview } from "@/lib/experience/proposalTemplate";
import { dinnerPreview } from "@/lib/experience/dinnerTemplate";
import {
  getCatalogContent,
  getExperiences,
} from "@/sanity/queries/ExperienceCatalog";
import { local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
import type { Locale, Seo } from "@/lib/experience/types";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getPageSeo } from "@/sanity/queries/SEO/seo";
import ProposalCard from "./ProposalCard";
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
    !!section &&
    (/^localhost(:\d+)?$/.test(host) ||
      /^deploy-preview-\d+--[^.]+\.netlify\.app$/.test(host));
  const settings = content.settings || {},
    home = content.home;
  const t = (key: string) => label(settings, locale, key),
    prefix = locale === "es" ? "/es" : "";
  return (
    <main className="ec-shell">
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
            const Heading = section ? "h1" : "h2";
            return (
              <section className="ec-section" id={key} key={key}>
                <div className="ec-section-heading">
                  <Heading>
                    {t(dinner ? "dinnerSectionTitle" : "proposalSectionTitle")}
                  </Heading>
                  <p>
                    {t(
                      dinner
                        ? "dinnerSectionDescription"
                        : "proposalSectionDescription",
                    )}
                  </p>
                </div>
                {showTemplate && (
                  <>
                    <div className="ec-template-note">
                      {!dinner ? (
                        locale === "es" ? (
                          "Plantilla de propuesta · Solo vista previa, no reservable. Montajes, fotos, inclusiones y precios pendientes de completar en Sanity."
                        ) : (
                          "Proposal template · Preview only, not bookable. Setups, photographs, inclusions and prices must be completed in Sanity."
                        )
                      ) : (
                        <>
                          {locale === "es"
                            ? "Plantilla interactiva · Solo vista previa. Los nombres de montajes y platos son espacios por completar; no es una oferta reservable. Extras pendientes de cotización."
                            : "Interactive template · Preview only. Setup and dish names are slots to complete, not a bookable offer. Extras require a quote."}
                        </>
                      )}
                    </div>
                    <div className="ec-dinner-grid">
                      <ProposalCard
                        experience={
                          dinner ? dinnerPreview() : proposalPreview()
                        }
                        locale={locale}
                        settings={settings}
                        demo
                      />
                    </div>
                  </>
                )}
                {rows.length ? (
                  <div
                    className={dinner ? "ec-grid ec-dinner-grid" : "ec-grid"}
                  >
                    {rows.map((e) =>
                      dinner ? (
                        <RomanticDinnerCard
                          key={e._id}
                          experience={e}
                          locale={locale}
                          settings={settings}
                        />
                      ) : (
                        <ProposalCard
                          key={e._id}
                          experience={e}
                          locale={locale}
                          settings={settings}
                        />
                      ),
                    )}
                  </div>
                ) : showTemplate ? null : (
                  <div className="ec-empty">
                    <p>{t(dinner ? "emptyDinners" : "emptyProposals")}</p>
                    <Link href={`${prefix}/contact`}>
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
