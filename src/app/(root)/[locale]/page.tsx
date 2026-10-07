import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import HomePage from "@/components/HomePage/HomePage";
import type { Locale } from "@/lib/experience/types";
import { requireLocale } from "@/i18n/requireLocale";
import {
  getCatalogContent,
  getDinnerPreview,
  getHomePresentation,
} from "@/sanity/queries/ExperienceCatalog";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  const [content, presentation, dinner] = await Promise.all([
    getCatalogContent(locale),
    getHomePresentation(),
    getDinnerPreview(),
  ]);
  return (
    <HomePage
      locale={locale}
      content={content}
      proposals={presentation.proposals}
      dinner={dinner}
    />
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
