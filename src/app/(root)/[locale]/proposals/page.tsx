import Catalog from "@/components/ExperienceCatalog/Catalog";
import JsonLd from "@/components/seo/JsonLd";
import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import { getCatalogContent } from "@/sanity/queries/ExperienceCatalog";
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
  const structuredData = await getStructuredData("proposals", locale);
  return (
    <>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <Catalog locale={locale} section="proposals" />
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
    "/proposals",
    "proposals",
    label(c.settings, locale, "proposalSectionTitle"),
  );
}
