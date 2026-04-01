import PackageDescription from "@/components/IndividualProposalPackagePage/DescriptionComponent/PackageDescription";
import PackageHero from "@/components/IndividualProposalPackagePage/HeroComponent/PackageHero";
import PackageBookingForm from "@/components/IndividualProposalPackagePage/PackageBookingForm/PackageBookingForm";
import PackageGallery from "@/components/IndividualProposalPackagePage/PackageGallery/PackageGallery";
import PackageInclusions from "@/components/IndividualProposalPackagePage/PackageInclusions/PackageInclusions";
import { individualProposalPackageQuery } from "@/sanity/queries/ProposalPackages/IndividualProposalPackage";
import { getTranslations } from "next-intl/server";

export default async function DiningProposalsSlug({
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
          { label: t("diningProposals"), href: "/dining-proposals" },
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
        addons={individualProposalPackage.addons.map((addon) => ({
          name: addon.name[locale as "en" | "es"],
          description: addon.description[locale as "en" | "es"],
          price: addon.price,
          icon: addon.icon,
        }))}
        formLabels={{
          variantTitle:
            locale === "es" ? "Elige Tu Estilo" : "Choose Your Style",
          addonTitle:
            locale === "es"
              ? "Agrega Extras (Opcional)"
              : "Add Extras (Optional)",
          detailsTitle: locale === "es" ? "Tus Datos" : "Your Details",
          name: locale === "es" ? "Nombre Completo" : "Full Name",
          hotel: "Hotel / Resort",
          phone: locale === "es" ? "Número de Teléfono" : "Phone Number",
          email: locale === "es" ? "Correo Electrónico" : "Email Address",
          date: locale === "es" ? "Fecha de la Propuesta" : "Proposal Date",
          notes:
            locale === "es"
              ? "¿Algo más que quieras contarnos?"
              : "Anything else you'd like us to know?",
          notesPlaceholder:
            locale === "es"
              ? "Solicitudes especiales, preferencias de horario, sorpresas…"
              : "Special requests, timing preferences, surprises…",
          submit:
            locale === "es"
              ? "Enviar Solicitud de Reserva"
              : "Submit Booking Request",
          submitting: locale === "es" ? "Enviando…" : "Sending…",
          successTitle: locale === "es" ? "¡Gracias!" : "Thank You!",
          successMessage:
            locale === "es"
              ? "Hemos recibido tu solicitud y nos pondremos en contacto en menos de 24 horas."
              : "We've received your request and will be in touch within 24 hours.",
          summaryBasePrice: locale === "es" ? "Precio Base" : "Base Price",
          summaryVariant: locale === "es" ? "Variante" : "Variant",
          summaryAddons: locale === "es" ? "Extras" : "Add-ons",
          summaryTotal: locale === "es" ? "Total Estimado" : "Estimated Total",
        }}
      />
    </main>
  );
}
