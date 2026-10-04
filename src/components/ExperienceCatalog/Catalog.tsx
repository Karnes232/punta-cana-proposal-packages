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
import ExperienceCard from "./ExperienceCard";
import { PROPOSALS_HERO_SLUG } from "@/sanity/constants";
import { getRequestHost, isPreviewHost } from "@/lib/requestHost";
import { buttonClass, shellClass, wrapClass } from "./styles";
export default async function Catalog({
  locale,
  section,
}: {
  locale: Locale;
  section: "proposals" | "romantic-dinners";
}) {
  const [experiences, content] = await Promise.all([
    getExperiences(),
    getCatalogContent(),
  ]);
  const requestHeaders = await headers();
  const showTemplate = isPreviewHost(getRequestHost(requestHeaders));
  const cmsDinnerPreview =
    section === "romantic-dinners" &&
    (showTemplate ||
      !experiences.some((e) => e._type === "romanticDinnerExperience"))
      ? await getDinnerPreview()
      : null;
  const settings = content.settings || {},
    home = content.home;
  const t = (key: string) => label(settings, locale, key),
    prefix = locale === "es" ? "/es" : "";
  return (
    <main className={shellClass(section === "proposals")}>
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
      <div className={wrapClass}>
        {(["proposals", "romantic-dinners"] as const)
          .filter((k) => section === k)
          .map((key) => {
            const dinner = key === "romantic-dinners",
              rows = experiences.filter(
                (e) =>
                  e._type ===
                  (dinner ? "romanticDinnerExperience" : "proposalExperience"),
              );
            return (
              <section
                className={`scroll-mt-[100px] ${
                  dinner
                    ? "py-14 upto800:py-9"
                    : "bg-black px-0 py-9 text-ivory [--ec-border:#cfae7033] [--ec-ink:#f7f5f1] [--ec-muted:#b9b7b5] upto800:py-7"
                }`}
                id={key}
                key={key}
              >
                <CatalogIntroduction
                  dinner={dinner}
                  standalone={false}
                  locale={locale}
                  settings={settings}
                />
                <div id="packages" className="scroll-mt-[120px]" />
                {dinner && (showTemplate || rows.length === 0) && (
                  <>
                    <div className="my-5 border-l-[3px] border-l-gold bg-white px-6 py-[18px] text-[0.85rem] text-[#6e6e73]">
                      {showTemplate
                        ? locale === "es"
                          ? "Ejemplo editable · Tres montajes con imágenes de referencia de Sanity. Menú y tarifas configurados; capacidad final pendiente de confirmar."
                          : "Editable example · Three setups with reference images from Sanity. Menu and prices configured; final capacity awaiting confirmation."
                        : locale === "es"
                          ? "Personaliza tu cena y envíanos tu fecha preferida. Nuestro equipo confirmará personalmente la capacidad y disponibilidad de tu celebración."
                          : "Personalize your dinner and send us your preferred date. Our team will personally confirm capacity and availability for your celebration."}
                    </div>
                    <div className="m-auto max-w-[1000px]">
                      <ExperienceCard
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
                  <div className="m-auto grid max-w-[1000px] grid-cols-[1fr] [align-items:start] gap-7">
                    {rows.map((e) => (
                      <ExperienceCard
                        key={e._id}
                        experience={e}
                        locale={locale}
                        settings={settings}
                      />
                    ))}
                  </div>
                ) : showTemplate ? null : (
                  <div className="rounded-[4px] border border-(--ec-border) p-[38px]">
                    <p>{t(dinner ? "emptyDinners" : "emptyProposals")}</p>
                    <Link href={prefix + "/contact"}>
                      {t("contactUsLabel")} →
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        <section className="border-t border-t-(--ec-border) py-[45px]">
          {local(home?.contactHeading, locale) && (
            <h2>{local(home?.contactHeading, locale)}</h2>
          )}
          <Link
            className={buttonClass({ secondary: true })}
            href={`${prefix}/contact`}
          >
            {t("contactUsLabel")} →
          </Link>
        </section>
      </div>
    </main>
  );
}
