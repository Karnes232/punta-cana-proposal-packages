import { getTranslations } from "next-intl/server";
import { FiChevronDown } from "react-icons/fi";
import BlockContent from "@/components/BlockContent/BlockContent";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";
import HomeTextLink from "@/components/HomePage/HomeTextLink";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/PageHeader/PageHeader";
import { localePrefix, toSiteLocale } from "@/i18n/locales";
import { formatSanityDate } from "@/lib/formatDate";
import { getLegalDocuments } from "@/sanity/queries/LegalDocuments/LegalDocuments";
import { getStructuredData } from "@/sanity/queries/SEO/seo";
import { legalSections, type LegalSection } from "./legalSections";

export type LegalPageName = "terms-of-service" | "privacy-policy";

const TITLE_KEY = {
  "terms-of-service": "termsTitle",
  "privacy-policy": "privacyTitle",
} as const;

const sectionLink =
  "text-[14px] leading-[1.45] text-body underline-offset-4 hover:text-ink hover:underline";

/** The section links, in the order they appear in the text. */
function SectionList({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="grid list-none gap-3">
      {sections.map((section) => (
        <li key={section.anchor}>
          <a className={sectionLink} href={`#${section.anchor}`}>
            {section.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * A legal page (terms, privacy): title and last edit on a black band, then
 * the Studio text beside its list of sections (folded away on phones), and
 * a line pointing to the contact page.
 */
export default async function LegalPage({
  page,
  locale,
}: {
  page: LegalPageName;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "LegalPage" });
  const lang = toSiteLocale(locale);
  const [legalDocument, structuredData] = await Promise.all([
    getLegalDocuments(page, lang),
    getStructuredData(page, lang),
  ]);
  const { blocks, sections } = legalSections(legalDocument?.content);
  const updated = formatSanityDate(legalDocument?.updatedAt, lang, {
    dateStyle: "long",
  });

  return (
    <div className="min-h-screen bg-paper">
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <PageHeader eyebrow={t("eyebrow")} title={t(TITLE_KEY[page])}>
        {updated && (
          <p className="mt-4 text-[14px] text-[#c7c2b9]">
            {t("lastUpdated", { date: updated })}
          </p>
        )}
      </PageHeader>

      <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-12 lg:grid-cols-[220px_minmax(0,58ch)] lg:gap-16 lg:px-12 lg:py-16">
        {sections.length > 1 && (
          <nav
            aria-label={t("onThisPage")}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <details className="group border-y border-line py-4 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] tracking-[0.14em] text-ink uppercase [&::-webkit-details-marker]:hidden">
                {t("onThisPage")}
                <FiChevronDown
                  aria-hidden="true"
                  className="text-gold [transition:transform_0.2s] group-open:rotate-180"
                />
              </summary>
              <div className="mt-5">
                <SectionList sections={sections} />
              </div>
            </details>
            <div className="hidden lg:block">
              <p className={`${eyebrowClass({ size: "text-[12px]" })} mb-5`}>
                {t("onThisPage")}
              </p>
              <SectionList sections={sections} />
            </div>
          </nav>
        )}
        <article className="min-w-0 lg:col-start-2">
          <BlockContent content={blocks} />
          <footer className="mt-16 border-t border-line pt-8">
            <p className="text-[16px] text-body">{t("questions")}</p>
            <HomeTextLink href={`${localePrefix(locale)}/contact`}>
              {t("contactLink")}
            </HomeTextLink>
          </footer>
        </article>
      </div>
    </div>
  );
}
