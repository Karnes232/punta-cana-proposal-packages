import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import ExperienceHome from "@/components/ExperienceCatalog/ExperienceHome";
import type { Locale } from "@/lib/experience/types";
import { requireLocale } from "@/i18n/requireLocale";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  return <ExperienceHome locale={locale} />;
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
