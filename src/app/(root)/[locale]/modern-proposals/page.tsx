import BookingForm from "@/components/CategoryPage/BookingForm/BookingForm";
import CategoryHero from "@/components/CategoryPage/CategoryHero/CategoryHero";
import CategoryIntro from "@/components/CategoryPage/CategoryIntro/CategoryIntro";
import { CustomizationProvider } from "@/components/CategoryPage/CustomizationSelector/CustomizationContext";
import CustomizationSelector from "@/components/CategoryPage/CustomizationSelector/CustomizationSelector";

import PackageGrid from "@/components/CategoryPage/PackageGrid/PackageGrid";
import RelatedStories from "@/components/CategoryPage/RelatedStories/RelatedStories";
import StickyBookingBar from "@/components/CategoryPage/StickyBookingBar/StickyBookingBar";
import WhatsIncluded from "@/components/CategoryPage/WhatsIncluded/WhatsIncluded";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo";
import { proposalPackagesQuery } from "@/sanity/queries/ProposalPackages/ProposalPackages";
import Script from "next/script";
import { getProposalPackageHeader } from "@/sanity/queries/ProposalPackages/ProposalPackageHeaders";

export default async function ModernProposals({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [structuredData, proposalPackage, proposalPackageHeader] =
    await Promise.all([
      getStructuredData("modern-proposals"),
      proposalPackagesQuery("modern-proposals"),
      getProposalPackageHeader(),
    ]);

  const labels =
    locale === "es"
      ? {
          startingAt: "Desde",
          bookNow: "Reservar",
          selectPackage: "Selecciona un paquete arriba",
        }
      : {
          startingAt: "Starting at",
          bookNow: "Book Now",
          selectPackage: "Select a package above",
        };
  return (
    <main>
      {structuredData.seo.structuredData[locale as "en" | "es"] && (
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
      <CategoryHero
        image={proposalPackage.heroImage}
        eyebrow={proposalPackage.heroEyebrow[locale as "en" | "es"]}
        headingLine1={proposalPackage.heroHeadingLine1[locale as "en" | "es"]}
        headingLine2={proposalPackage.heroHeadingLine2[locale as "en" | "es"]}
        subheading={proposalPackage.heroSubheading[locale as "en" | "es"]}
      />
      <CategoryIntro
        eyebrow={proposalPackage.introEyebrow[locale as "en" | "es"]}
        headingLine1={proposalPackage.introHeadingLine1[locale as "en" | "es"]}
        headingLine2={proposalPackage.introHeadingLine2[locale as "en" | "es"]}
        description={proposalPackage.introDescription[locale as "en" | "es"]}
      />
      <CustomizationProvider premiumUplift={450}>
        <PackageGrid
          packages={proposalPackage.packages}
          locale={locale as "en" | "es"}
        />
        <CustomizationSelector
          eyeBrow={
            proposalPackageHeader.CustomizationSelectorEyebrow[
              locale as "en" | "es"
            ]
          }
          headingLine1={
            proposalPackageHeader.CustomizationSelectorHeadingLine1[
              locale as "en" | "es"
            ]
          }
          headingLine2={
            proposalPackageHeader.CustomizationSelectorHeadingLine2[
              locale as "en" | "es"
            ]
          }
          description={
            proposalPackageHeader.CustomizationSelectorDescription[
              locale as "en" | "es"
            ]
          }
        />
        <WhatsIncluded
          eyebrow={
            proposalPackageHeader.WhatsIncludedEyebrow[locale as "en" | "es"]
          }
          headingLine1={
            proposalPackageHeader.WhatsIncludedHeadingLine1[
              locale as "en" | "es"
            ]
          }
          headingLine2={
            proposalPackageHeader.WhatsIncludedHeadingLine2[
              locale as "en" | "es"
            ]
          }
          description={
            proposalPackageHeader.WhatsIncludedDescription[
              locale as "en" | "es"
            ]
          }
          locale={locale as "en" | "es"}
        />
        <BookingForm
          eyebrow={
            proposalPackageHeader.BookingFormEyebrow[locale as "en" | "es"]
          }
          headingLine1={
            proposalPackageHeader.BookingFormHeadingLine1[locale as "en" | "es"]
          }
          headingLine2={
            proposalPackageHeader.BookingFormHeadingLine2[locale as "en" | "es"]
          }
          description={
            proposalPackageHeader.BookingFormDescription[locale as "en" | "es"]
          }
        />
        <StickyBookingBar labels={labels} />
      </CustomizationProvider>
      <RelatedStories category="modern" locale={locale} />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  const pageSeo = await getPageSeo("modern-proposals");
  if (!pageSeo) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = "https://puntacanaproposalpackages.com/modern-proposals";
  } else {
    canonicalUrl = "https://puntacanaproposalpackages.com/es/modern-proposals";
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
      ...generateHreflangAlternates(locale, "/modern-proposals"),
    },
  };
}
