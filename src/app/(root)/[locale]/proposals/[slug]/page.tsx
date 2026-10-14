import { notFound } from "next/navigation";
import ExperienceDetailPage from "@/components/ExperienceCatalog/ExperienceDetailPage";
import {
  findBySlug,
  nextOf,
  ofType,
} from "@/components/ExperienceCatalog/catalogData";
import {
  getExperiences,
  getCatalogContent,
} from "@/sanity/queries/ExperienceCatalog";
import { catalogMetadata } from "@/lib/seo/catalogMetadata";
import type { Locale } from "@/lib/experience/types";
import { local } from "@/lib/experience/normalize";
import { requireSiteLocale } from "@/i18n/requireLocale";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  requireSiteLocale(locale);
  const [experiences, c] = await Promise.all([
    getExperiences(),
    getCatalogContent(locale),
  ]);
  const e = findBySlug(experiences, "proposalExperience", slug);
  if (!e) notFound();
  return (
    <ExperienceDetailPage
      experience={e}
      locale={locale}
      settings={c.settings || {}}
      home={c.home}
      others={nextOf(ofType(experiences, "proposalExperience"), e)}
    />
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  requireSiteLocale(locale);
  const e = findBySlug(await getExperiences(), "proposalExperience", slug);
  if (!e) notFound();
  return catalogMetadata(
    locale,
    "/proposals/" + slug,
    e.seo,
    local(e.name, locale),
  );
}
