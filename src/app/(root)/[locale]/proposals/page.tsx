import { headers } from "next/headers";
import ProposalsPage from "@/components/ProposalsPage/ProposalsPage";
import { ofType } from "@/components/ExperienceCatalog/catalogData";
import JsonLd from "@/components/seo/JsonLd";
import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import { getRequestHost, isPreviewHost } from "@/lib/requestHost";
import {
  getCatalogContent,
  getCatalogPage,
  getExperiences,
  withCatalogPage,
} from "@/sanity/queries/ExperienceCatalog";
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
  const [experiences, content, page, structuredData] = await Promise.all([
    getExperiences(),
    getCatalogContent(locale),
    getCatalogPage("proposalsPage", locale),
    getStructuredData("proposals", locale),
  ]);
  // Preview hosts (localhost, deploy previews) show the Studio's templates.
  const preview = isPreviewHost(getRequestHost(await headers()));
  // The page's own texts, photo and contact heading (its page document).
  const settings = withCatalogPage(content.settings || {}, page);
  return (
    <>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <ProposalsPage
        locale={locale}
        settings={settings}
        page={page}
        proposals={ofType(experiences, "proposalExperience")}
        preview={preview}
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
  requireSiteLocale(locale);
  const c = await getCatalogContent(locale);
  return catalogPageMetadata(
    locale,
    "/proposals",
    "proposals",
    label(c.settings, locale, "proposalSectionTitle"),
  );
}
