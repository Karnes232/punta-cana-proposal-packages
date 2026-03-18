import FaqHeroEyebrow from "./FaqHeroEyebrow";
import FaqHeroHeading from "./FaqHeroHeading";
import FaqHeroDivider from "./FaqHeroDivider";
import FaqHeroSubheading from "./FaqHeroSubheading";

// ─── Bilingual content ────────────────────────────────────────────────────────

const content = {
  en: {
    eyebrow: "Frequently Asked Questions",
    line1: "Answers to Every",
    line2: "Detail & Doubt",
    subheading:
      "Everything you need to know before you get down on one knee — from booking to the perfect moment.",
  },
  es: {
    eyebrow: "Preguntas Frecuentes",
    line1: "Respuestas a Cada",
    line2: "Duda y Detalle",
    subheading:
      "Todo lo que necesitas saber antes de arrodillarte — desde la reserva hasta el momento perfecto.",
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqHeroProps {
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default async function FaqHero({ locale }: FaqHeroProps) {
  console.log(content[locale]);
  return (
    <section
      className="
        relative w-full bg-[#0B0B0C]
        pt-40 pb-28
        flex flex-col items-center justify-center gap-6 text-center overflow-hidden
      "
      aria-labelledby="faq-heading"
    >
      {/* Subtle radial glow behind heading */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(207,174,112,0.06) 0%, transparent 70%)",
        }}
      />

      <FaqHeroEyebrow label={content[locale].eyebrow} />
      <FaqHeroHeading
        line1={content[locale].line1}
        line2={content[locale].line2}
      />
      <FaqHeroDivider />
      <FaqHeroSubheading text={content[locale].subheading} />

      {/* Bottom fade into ivory content area */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, #F7F5F1)",
        }}
      /> */}
    </section>
  );
}
