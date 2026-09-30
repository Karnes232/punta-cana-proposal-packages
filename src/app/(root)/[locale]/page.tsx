import { catalogPageMetadata } from "@/components/ExperienceCatalog/Catalog";
import { getCatalogContent } from "@/sanity/queries/ExperienceCatalog";
import ExperienceHome from "@/components/ExperienceCatalog/ExperienceHome";
import type { Locale } from "@/lib/experience/types";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ExperienceHome locale={locale} />;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = await getCatalogContent();
  return catalogPageMetadata(
    locale,
    "",
    c.home?.seo,
    "Punta Cana Proposal Packages",
  );
}
