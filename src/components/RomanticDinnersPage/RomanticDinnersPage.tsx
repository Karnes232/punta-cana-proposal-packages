import CatalogContactBand from "@/components/ExperienceCatalog/CatalogContactBand";
import CatalogEmpty from "@/components/ExperienceCatalog/CatalogEmpty";
import CatalogHero from "@/components/ExperienceCatalog/CatalogHero";
import CatalogIntroduction from "@/components/ExperienceCatalog/CatalogIntroduction";
import ExperienceCard from "@/components/ExperienceCatalog/ExperienceCard";
import { dinnersHeroPhoto } from "@/components/ExperienceCatalog/catalogData";
import { shellClass, wrapClass } from "@/components/ExperienceCatalog/styles";
import { localePrefix } from "@/i18n/locales";
import { dinnerPreview } from "@/lib/experience/dinnerTemplate";
import { label } from "@/lib/experience/labels";
import type { Experience, Locale, Settings } from "@/lib/experience/types";
import type { CatalogPage } from "@/sanity/queries/ExperienceCatalog/catalogPage";

/**
 * The romantic dinners page: hero, introduction, the dinners and the contact
 * band. On preview hosts the dinner template is shown as a demo; with no
 * dinners published, visitors get a card to send an inquiry instead.
 */
export default function RomanticDinnersPage({
  locale,
  settings,
  page,
  dinners,
  template,
  preview,
}: {
  locale: Locale;
  /** Catalog text with this page's own texts applied. */
  settings: Settings;
  page: CatalogPage;
  dinners: Experience[];
  /** The dinner template from the Studio, when it is needed. */
  template: Experience | null;
  /** A preview host (localhost, deploy previews). */
  preview: boolean;
}) {
  const t = (key: string) => label(settings, locale, key),
    prefix = localePrefix(locale);
  return (
    <main className={shellClass(false)}>
      <CatalogHero
        dinner
        locale={locale}
        settings={settings}
        image={dinnersHeroPhoto(page, dinners, template)}
      />
      <div className={wrapClass}>
        <section
          className="scroll-mt-[100px] py-14 upto800:py-9"
          id="romantic-dinners"
        >
          <CatalogIntroduction
            dinner
            standalone={false}
            locale={locale}
            settings={settings}
          />
          <div id="packages" className="scroll-mt-[120px]" />
          {(preview || dinners.length === 0) && (
            <>
              <div className="my-5 border-l-[3px] border-l-gold bg-white px-6 py-[18px] text-[0.85rem] text-[#6e6e73]">
                {t(preview ? "dinnerTemplatePreviewNote" : "dinnerInquiryNote")}
              </div>
              <div className="m-auto max-w-[1000px]">
                <ExperienceCard
                  experience={template || dinnerPreview()}
                  locale={locale}
                  settings={settings}
                  demo={preview}
                  contactOnly={!preview}
                />
              </div>
            </>
          )}
          {dinners.length ? (
            <div className="m-auto grid max-w-[1000px] grid-cols-[1fr] [align-items:start] gap-7">
              {dinners.map((e) => (
                <ExperienceCard
                  key={e._id}
                  experience={e}
                  locale={locale}
                  settings={settings}
                />
              ))}
            </div>
          ) : preview ? null : (
            <CatalogEmpty
              message={t("emptyDinners")}
              contactLabel={t("contactUsLabel")}
              prefix={prefix}
            />
          )}
        </section>
        <CatalogContactBand
          heading={page.contactHeading}
          label={t("contactUsLabel")}
          prefix={prefix}
        />
      </div>
    </main>
  );
}
