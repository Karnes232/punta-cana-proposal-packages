import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PackageBookingFormClient from "./PackageBookingFormClient";
import type { VariantData } from "./VariantSelector";
import type { AddonData } from "./AddonToggle";
import { useTranslations } from "next-intl";

interface PackageBookingFormProps {
  /** Package name — already locale-resolved */
  packageName: string;
  /** Base price (used when no variant is selected) */
  basePrice: number;
  /** Variants — already locale-resolved */
  variants: VariantData[];
  /** Add-ons — already locale-resolved */
  addons: AddonData[];
  formLabels: {
    variantTitle: string;
    addonTitle: string;
    detailsTitle: string;
    name: string;
    hotel: string;
    phone: string;
    email: string;
    date: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    summaryBasePrice: string;
    summaryVariant: string;
    summaryAddons: string;
    summaryTotal: string;
  };
}

export default function PackageBookingForm({
  packageName,
  basePrice,
  variants,
  addons,
  formLabels,
}: PackageBookingFormProps) {
  const t = useTranslations("PackagePage.BookingForm");
 
  return (
    <section id="booking" className="relative bg-black overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(207,174,112,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        {/* Section header */}
        <div className="flex flex-col items-center gap-5 mb-14 lg:mb-16">
          <RevealOnScroll delay={0}>
            <div className="flex items-center justify-center gap-3">
              <span
                className="block w-8 h-px bg-gold/60"
                aria-hidden="true"
              />
              <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
                {t("eyebrow")}
              </p>
              <span
                className="block w-8 h-px bg-gold/60"
                aria-hidden="true"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h2 className="font-display font-normal text-center leading-[1.1] tracking-tight text-[clamp(28px,3.5vw,48px)]">
              <span className="block text-white">{t("headingLine1")}</span>
              <span className="block italic text-gold">{t("headingLine2")}</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div
              className="flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="block w-12 h-px bg-gold/30" />
              <span className="block w-1 h-1 rotate-45 bg-gold/50" />
              <span className="block w-12 h-px bg-gold/30" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={250}>
            <p className="text-center font-light text-white/55 leading-[1.85] text-[clamp(14px,1.5vw,17px)] max-w-[520px] mx-auto">
              {t("description")}
            </p>
          </RevealOnScroll>
        </div>

        {/* Form */}
        <RevealOnScroll delay={350}>
          <PackageBookingFormClient
            packageName={packageName}
            basePrice={basePrice}
            variants={variants}
            addons={addons}
            labels={formLabels}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}