import CatalogContactBand from "@/components/ExperienceCatalog/CatalogContactBand";
import CatalogEmpty from "@/components/ExperienceCatalog/CatalogEmpty";
import CatalogHero from "@/components/ExperienceCatalog/CatalogHero";
import CatalogIntroduction from "@/components/ExperienceCatalog/CatalogIntroduction";
import ProposalGrid from "@/components/ExperienceCatalog/ProposalGrid";
import { proposalsHeroPhoto } from "@/components/ExperienceCatalog/catalogData";
import { shellClass, wrapClass } from "@/components/ExperienceCatalog/styles";
import { localePrefix } from "@/i18n/locales";
import { label } from "@/lib/experience/labels";
import type { Experience, Locale, Settings } from "@/lib/experience/types";
import type { CatalogPage } from "@/sanity/queries/ExperienceCatalog/catalogPage";

/**
 * The proposals page: hero, introduction, the package grid (or a note when
 * there are none) and the contact band. The route fetches its data.
 */
export default function ProposalsPage({
  locale,
  settings,
  page,
  proposals,
  preview,
}: {
  locale: Locale;
  /** Catalog text with this page's own texts applied. */
  settings: Settings;
  page: CatalogPage;
  proposals: Experience[];
  /** A preview host (localhost, deploy previews): no empty-catalog note. */
  preview: boolean;
}) {
  const t = (key: string) => label(settings, locale, key),
    prefix = localePrefix(locale);
  return (
    <main className={shellClass(true)}>
      <CatalogHero
        dinner={false}
        locale={locale}
        settings={settings}
        image={proposalsHeroPhoto(page, proposals)}
      />
      <div className={wrapClass}>
        <section
          className="scroll-mt-[100px] bg-black px-0 py-9 text-ivory [--ec-border:#cfae7033] [--ec-ink:#f7f5f1] [--ec-muted:#b9b7b5] upto800:py-7"
          id="proposals"
        >
          <CatalogIntroduction
            dinner={false}
            standalone={false}
            locale={locale}
            settings={settings}
          />
          <div id="packages" className="scroll-mt-[120px]" />
          {proposals.length > 0 ? (
            <ProposalGrid
              experiences={proposals}
              locale={locale}
              settings={settings}
            />
          ) : preview ? null : (
            <CatalogEmpty
              message={t("emptyProposals")}
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
