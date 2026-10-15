import RomanticDinnersPage from "@/components/RomanticDinnersPage/RomanticDinnersPage";
import { ofType } from "@/components/ExperienceCatalog/catalogData";
import JsonLd from "@/components/seo/JsonLd";
import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import {
  getCatalogContent,
  getCatalogPage,
  getDinnerPreview,
  getExperiences,
  withCatalogPage,
} from "@/sanity/queries/ExperienceCatalog";
import { getStructuredData } from "@/sanity/queries/SEO/seo";
import { label } from "@/lib/experience/labels";
import type { Locale } from "@/lib/experience/types";
import { requireSiteLocale } from "@/i18n/requireLocale";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireSiteLocale(locale);
  const [experiences, content, page, structuredData] = await Promise.all([
    getExperiences(),
    getCatalogContent(locale),
    getCatalogPage("romanticDinnersPage", locale),
    getStructuredData("romantic-dinners", locale),
  ]);
  const dinners = ofType(experiences, "romanticDinnerExperience");
  // The dinner template: the inquiry card while no dinner is published.
  const template = dinners.length === 0 ? await getDinnerPreview() : null;
  // The page's own texts, photo and contact heading (its page document).
  const settings = withCatalogPage(content.settings || {}, page);
  return (
    <>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <RomanticDinnersPage
        locale={locale}
        settings={settings}
        page={page}
        dinners={dinners}
        template={template}
      />
    </>
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireSiteLocale(locale);
  const c = await getCatalogContent(locale);
  return catalogPageMetadata(
    locale,
    "/romantic-dinners",
    "romantic-dinners",
    label(c.settings, locale, "dinnerSectionTitle"),
  );
}
