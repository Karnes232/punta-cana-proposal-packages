import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import HomePage from "@/components/HomePage/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/experience/types";
import { requireLocale } from "@/i18n/requireLocale";
import {
  getCatalogContent,
  getDinnerPreview,
  getHomePresentation,
} from "@/sanity/queries/ExperienceCatalog";
import { getStructuredData } from "@/sanity/queries/SEO/seo";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const [content, presentation, dinner, structuredData] = await Promise.all([
    getCatalogContent(locale),
    getHomePresentation(),
    getDinnerPreview(),
    getStructuredData("home", locale),
  ]);
  return (
    <>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <HomePage
        locale={locale}
        content={content}
        proposals={presentation.proposals}
        dinner={dinner}
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
  requireLocale(locale);
  return catalogPageMetadata(
    locale,
    "",
    "home",
    "Punta Cana Proposal Packages",
  );
}
