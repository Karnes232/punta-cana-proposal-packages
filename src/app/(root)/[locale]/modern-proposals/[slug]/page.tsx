import PackageDescription from "@/components/IndividualProposalPackagePage/DescriptionComponent/PackageDescription";
import PackageHero from "@/components/IndividualProposalPackagePage/HeroComponent/PackageHero";
import PackageBookingForm from "@/components/IndividualProposalPackagePage/PackageBookingForm/PackageBookingForm";
import PackageGallery from "@/components/IndividualProposalPackagePage/PackageGallery/PackageGallery";
import PackageInclusions from "@/components/IndividualProposalPackagePage/PackageInclusions/PackageInclusions";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import {
  individualProposalPackageQuery,
  individualStorySEOQuery,
} from "@/sanity/queries/ProposalPackages/IndividualProposalPackage";
import { getTranslations } from "next-intl/server";
import Script from "next/script";

export default async function ModernProposalsSlug({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const [individualProposalPackage] = await Promise.all([
    individualProposalPackageQuery(slug),
  ]);
  const t = await getTranslations("PackagePage.PackageHero");
  const formLabels = await getTranslations("PackagePage.BookingForm");
  return (
    <main>
      {individualProposalPackage?.seo?.structuredData[
        locale as "en" | "es"
      ] && (
        <Script
          id="structured-data-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              individualProposalPackage?.seo?.structuredData[
                locale as "en" | "es"
              ],
            ),
          }}
        />
      )}
      <PackageHero
        name={individualProposalPackage.name[locale as "en" | "es"]}
        price={individualProposalPackage.price}
        image={individualProposalPackage.image}
        breadcrumbs={[
          { label: t("modernProposals"), href: "/modern-proposals" },
        ]}
      />
      <PackageDescription
        description={
          individualProposalPackage.description[locale as "en" | "es"]
        }
      />
      <PackageGallery
        images={individualProposalPackage.gallery}
        locale={locale as "en" | "es"}
      />
      <PackageInclusions
        inclusions={individualProposalPackage.inclusions}
        locale={locale as "en" | "es"}
      />
      <PackageBookingForm
        category="modern"
        packageName={individualProposalPackage.name[locale as "en" | "es"]}
        basePrice={individualProposalPackage.price}
        variants={individualProposalPackage.variants.map((variant) => ({
          name: variant.name[locale as "en" | "es"],
          description: variant.description[locale as "en" | "es"],
          price: variant.price,
          image: variant.image,
        }))}
        addons={individualProposalPackage?.addons?.map((addon) => ({
          name: addon.name[locale as "en" | "es"],
          description: addon.description[locale as "en" | "es"],
          price: addon.price,
          icon: addon.icon,
        }))}
        formLabels={{
          variantTitle: formLabels("variantTitle"),
          addonTitle: formLabels("addonTitle"),
          detailsTitle: formLabels("detailsTitle"),
          name: formLabels("name"),
          hotel: formLabels("hotel"),
          phone: formLabels("phone"),
          email: formLabels("email"),
          date: formLabels("date"),
          notes: formLabels("notes"),
          notesPlaceholder: formLabels("notesPlaceholder"),
          submit: formLabels("submit"),
          submitting: formLabels("submitting"),
          successTitle: formLabels("successTitle"),
          successMessage: formLabels("successMessage"),
          summaryBasePrice: formLabels("summaryBasePrice"),
          summaryVariant: formLabels("summaryVariant"),
          summaryAddons: formLabels("summaryAddons"),
          summaryTotal: formLabels("summaryTotal"),
        }}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>;
}) {
  const { slug, locale } = await params;
  const individualProposalPackage = await individualStorySEOQuery(slug);
  if (!individualProposalPackage) {
    return {};
  }

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = `https://puntacanaproposalpackages.com/modern-proposals/${slug}`;
  } else {
    canonicalUrl = `https://puntacanaproposalpackages.com/es/modern-proposals/${slug}`;
  }

  return {
    title: individualProposalPackage.seo.meta[locale].title,
    description: individualProposalPackage.seo.meta[locale].description,
    keywords: individualProposalPackage.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: individualProposalPackage.seo.openGraph[locale].title,
      description: individualProposalPackage.seo.openGraph[locale].description,
      images: individualProposalPackage.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !individualProposalPackage.seo.noIndex,
      follow: !individualProposalPackage.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, `/modern-proposals/${slug}`),
    },
  };
}
