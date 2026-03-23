import BlockContent from "@/components/BlockContent/BlockContent";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { getLegalDocuments } from "@/sanity/queries/LegalDocuments/LegalDocuments";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import Script from "next/script";

export default async function Terms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [legalDocuments, structuredData] = await Promise.all([
    getLegalDocuments("terms-of-service"),
    getStructuredData("terms-of-service"),
  ]);
  return (
    <div className="min-h-screen bg-ivory">
      {structuredData?.seo?.structuredData[locale as "en" | "es"] && (
        <Script
          id="structured-data-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData.seo.structuredData[locale as "en" | "es"],
            ),
          }}
        />
      )}
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
            {locale === "en" ? "Terms of Service" : "Términos de Servicio"}
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
  const pageSeo = await getPageSeo("terms-of-service");
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/terms-of-service";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/terms-of-service";
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, "/terms-of-service"),
    },
  };
}
