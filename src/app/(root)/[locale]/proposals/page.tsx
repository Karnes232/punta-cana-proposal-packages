import Catalog from "@/components/ExperienceCatalog/Catalog";
import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import { getCatalogContent } from "@/sanity/queries/ExperienceCatalog";
import { label } from "@/lib/experience/labels";
import type { Locale } from "@/lib/experience/types";
import { requireLocale } from "@/i18n/requireLocale";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  return <Catalog locale={locale} section="proposals" />;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const c = await getCatalogContent(locale);
  return catalogPageMetadata(
    locale,
    "/proposals",
    "proposals",
    label(c.settings, locale, "proposalSectionTitle"),
  );
}
