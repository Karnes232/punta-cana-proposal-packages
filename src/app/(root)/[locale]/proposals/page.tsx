import Catalog, {
  catalogMetadata,
} from "@/components/ExperienceCatalog/Catalog";
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
  const c = await getCatalogContent();
  return catalogMetadata(
    locale,
    "/proposals",
    undefined,
    label(c.settings, locale, "proposalSectionTitle"),
  );
}
