import PackageDescription from "@/components/IndividualProposalPackagePage/DescriptionComponent/PackageDescription";
import PackageHero from "@/components/IndividualProposalPackagePage/HeroComponent/PackageHero";
import PackageBookingForm from "@/components/IndividualProposalPackagePage/PackageBookingForm/PackageBookingForm";
import PackageGallery from "@/components/IndividualProposalPackagePage/PackageGallery/PackageGallery";
import PackageInclusions from "@/components/IndividualProposalPackagePage/PackageInclusions/PackageInclusions";
import { individualProposalPackageQuery } from "@/sanity/queries/ProposalPackages/IndividualProposalPackage";
import { getTranslations } from "next-intl/server";

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
