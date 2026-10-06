import { getCatalogContent } from "@/sanity/queries/ExperienceCatalog";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { label } from "@/lib/experience/labels";
import type { Locale } from "@/lib/experience/types";
import AvailabilityForm from "@/components/ExperienceCatalog/AvailabilityForm";
import { catalogPageMetadata } from "@/lib/seo/catalogMetadata";
import { requireSiteLocale } from "@/i18n/requireLocale";
import { shellClass, wrapClass } from "@/components/ExperienceCatalog/styles";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  requireSiteLocale(locale);
  const [content, company] = await Promise.all([
    getCatalogContent(locale),
    getGeneralLayout(),
  ]);
  const c = content.contact,
    settings = content.settings || {};
  return (
    <main className={shellClass()}>
      <div className={wrapClass}>
        <h1>{c?.heading || label(settings, locale, "contactUsLabel")}</h1>
        <p>{c?.description}</p>
        <div className="grid grid-cols-[2fr_1fr] gap-[50px] upto800:grid-cols-[1fr]">
          <AvailabilityForm locale={locale} settings={settings} />
          <aside>
            {company?.telephone && (
              <p>
                <a href={"tel:" + company.telephone}>{company.telephone}</a>
              </p>
            )}
            {company?.email && (
              <p>
                <a href={"mailto:" + company.email}>{company.email}</a>
              </p>
            )}
            {company?.whatsapp && (
              <p>
                <a
                  href={"https://wa.me/" + company.whatsapp.replace(/\D/g, "")}
                >
                  WhatsApp
                </a>
              </p>
            )}
            <p>{c?.businessInformation}</p>
          </aside>
        </div>
      </div>
    </main>
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
