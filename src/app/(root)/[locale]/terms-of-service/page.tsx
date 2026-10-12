import LegalPage from "@/components/LegalPage/LegalPage";
import { legalMetadata } from "@/components/LegalPage/legalMetadata";
import { requireLocale } from "@/i18n/requireLocale";
import type { SiteLocale } from "@/i18n/locales";

export default async function Terms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  return <LegalPage page="terms-of-service" locale={locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  requireLocale(locale);
  return legalMetadata("terms-of-service", locale);
}
