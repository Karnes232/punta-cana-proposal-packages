import Catalog, {
  catalogMetadata,
} from "@/components/ExperienceCatalog/Catalog";
import { getCatalogContent } from "@/sanity/queries/ExperienceCatalog";
import { label } from "@/lib/experience/labels";
import type { Locale } from "@/lib/experience/types";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <Catalog locale={locale} section="proposals" />;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = await getCatalogContent();
  return catalogMetadata(
    locale,
    "/proposals",
    undefined,
    label(c.settings, locale, "proposalSectionTitle"),
  );
}
