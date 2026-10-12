import LegalPage from "@/components/LegalPage/LegalPage";
import { legalMetadata } from "@/components/LegalPage/legalMetadata";
import { requireLocale } from "@/i18n/requireLocale";
import type { SiteLocale } from "@/i18n/locales";

export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  return <LegalPage page="privacy-policy" locale={locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  return legalMetadata("privacy-policy", locale);
}
