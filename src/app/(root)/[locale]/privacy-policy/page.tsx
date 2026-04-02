// Server Component
// Used for Privacy Policy, Terms of Service, and any other legal/text-heavy pages.
// Ivory background, generous padding, max-width prose column.

import BlockContent from "@/components/BlockContent/BlockContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackSiteMetadata,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import { getLegalDocuments } from "@/sanity/queries/LegalDocuments/LegalDocuments";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";

export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [legalDocuments, structuredData] = await Promise.all([
    getLegalDocuments("privacy-policy"),
    getStructuredData("privacy-policy"),
  ]);
  return (
    <div className="min-h-screen bg-ivory">
      <JsonLd
        id="structured-data-schema"
        data={structuredData?.seo?.structuredData[locale as "en" | "es"]}
      />
      {/* Page header */}
      <div className="relative bg-black border-b border-gold/15 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-gold/[0.04] blur-[80px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 py-20 flex flex-col items-center gap-4">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="block w-6 h-px bg-gold/50" aria-hidden="true" />
            <p className="text-[10px] font-light tracking-[0.28em] uppercase text-gold">
              Legal
            </p>
            <span className="block w-6 h-px bg-gold/50" aria-hidden="true" />
          </div>

          {/* Title */}
          <h1 className="font-display italic font-normal text-white text-center text-[clamp(28px,4vw,52px)] leading-tight">
            {locale === "en" ? "Privacy Policy" : "Política de Privacidad"}
          </h1>
        </div>
      </div>

      {/* Faint diagonal texture on ivory */}
      <div className="relative">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #CFAE70 0px,
              #CFAE70 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <BlockContent
            content={legalDocuments.content}
            language={locale as "en" | "es"}
          />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  const pageSeo = await getPageSeo("privacy-policy");
  const path = "/privacy-policy";
  const canonicalUrl = siteCanonicalUrl(locale, path);
  if (!pageSeo) {
    return fallbackSiteMetadata(locale, path, canonicalUrl);
  }

  return buildSeoMetadata({
    locale,
    path,
    canonicalUrl,
    meta: pageSeo.seo.meta[locale],
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      image: pageSeo.seo.openGraph.image,
    },
    noIndex: pageSeo.seo.noIndex,
    noFollow: pageSeo.seo.noFollow,
  });
}
