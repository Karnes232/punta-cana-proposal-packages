import PackageDescription from "@/components/IndividualProposalPackagePage/DescriptionComponent/PackageDescription";
import PackageHero from "@/components/IndividualProposalPackagePage/HeroComponent/PackageHero";
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
    </main>
  );
}
