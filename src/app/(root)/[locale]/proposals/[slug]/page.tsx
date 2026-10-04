import { notFound } from "next/navigation";
import {
  getExperiences,
  getCatalogContent,
} from "@/sanity/queries/ExperienceCatalog";
import { catalogMetadata } from "@/lib/seo/catalogMetadata";
import ExperienceCard from "@/components/ExperienceCatalog/ExperienceCard";
import type { Locale } from "@/lib/experience/types";
import { local } from "@/lib/experience/normalize";
import { requireLocale } from "@/i18n/requireLocale";
import { wrapClass } from "@/components/ExperienceCatalog/styles";
async function data(slug: string) {
  return (await getExperiences()).find(
    (e) => e._type === "proposalExperience" && e.slug?.current === slug,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  requireLocale(locale);
  const [e, c] = await Promise.all([data(slug), getCatalogContent()]);
  if (!e) notFound();
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: local(e.name, locale),
    description: local(e.shortDescription, locale),
    image: e.gallery[0]?.image?.url,
  };
  return (
    <main className="ec-shell">
      <div className={wrapClass} style={{ maxWidth: 850 }}>
        <h1>{local(e.name, locale)}</h1>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(json).replaceAll(
              "<",
              String.fromCharCode(92) + "u003c",
            ),
          }}
        />
        <ExperienceCard
          experience={e}
          locale={locale}
          settings={c.settings || {}}
        />
      </div>
    </main>
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  requireLocale(locale);
  const e = await data(slug);
  if (!e) notFound();
  return catalogMetadata(
    locale,
    "/proposals/" + slug,
    e.seo,
    local(e.name, locale),
  );
}
