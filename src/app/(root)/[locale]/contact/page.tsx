import { getCatalogContent } from "@/sanity/queries/ExperienceCatalog";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { getStructuredData } from "@/sanity/queries/SEO/seo";
import JsonLd from "@/components/seo/JsonLd";
import { label } from "@/lib/experience/labels";
import type { Locale } from "@/lib/experience/types";
import AvailabilityForm from "@/components/ExperienceCatalog/AvailabilityForm";
import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import { requireSiteLocale } from "@/i18n/requireLocale";
import { shellClass } from "@/components/ExperienceCatalog/styles";
import CompanyContactList from "@/components/Layout/Footer/CompanyContactList";
import PageHeader from "@/components/PageHeader/PageHeader";

// A phone, email or profile link in the side column.
const contactLink =
  "inline-flex min-h-11 items-center gap-2.5 text-[15px] text-(--ec-ink) underline-offset-4 hover:underline";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireSiteLocale(locale);
  const [content, company, structuredData] = await Promise.all([
    getCatalogContent(locale),
    getGeneralLayout(),
    getStructuredData("contact", locale),
  ]);
  const c = content.contact,
    settings = content.settings || {};
  return (
    <>
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData}
      />
      <main className={shellClass()}>
        <PageHeader
          title={c?.heading || label(settings, locale, "contactUsLabel")}
        >
          {c?.description && (
            <p className="mt-4 mb-0 max-w-[60ch] text-[17px] leading-[1.7] text-[#c7c2b9]">
              {c.description}
            </p>
          )}
        </PageHeader>
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 lg:px-12 lg:py-16">
          <AvailabilityForm locale={locale} settings={settings} />
          <aside className="border-t border-black/10 pt-6 lg:sticky lg:top-28 lg:self-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <CompanyContactList company={company} linkClass={contactLink} />
            {c?.businessInformation && (
              <p className="mt-4 mb-0 text-[15px] leading-[1.7] whitespace-pre-line">
                {c.businessInformation}
              </p>
            )}
          </aside>
        </div>
      </main>
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
    "/contact",
    "contact",
    label(c.settings, locale, "contactUsLabel"),
  );
}
