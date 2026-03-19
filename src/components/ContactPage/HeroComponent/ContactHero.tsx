import ContactHeroEyebrow from "./ContactHeroEyebrow";
import ContactHeroHeading from "./ContactHeroHeading";
import ContactHeroDivider from "./ContactHeroDivider";
import ContactHeroSubheading from "./ContactHeroSubheading";

// ─── Bilingual content ────────────────────────────────────────────────────────

const content = {
  en: {
    eyebrow: "Get in Touch",
    line1: "Let's Plan",
    line2: "Your Moment",
    subheading:
      "Tell us about your vision and we'll take care of every detail — from the first message to the perfect proposal.",
  },
  es: {
    eyebrow: "Contáctanos",
    line1: "Planifiquemos",
    line2: "Tu Momento",
    subheading:
      "Cuéntanos tu visión y nosotros nos encargamos de cada detalle — desde el primer mensaje hasta la propuesta perfecta.",
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface ContactHeroProps {
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactHero({ locale }: ContactHeroProps) {
  const t = content[locale];

  return (
    <section
      className="
        relative w-full bg-[#0B0B0C]
        pt-40 pb-28
        flex flex-col items-center justify-center gap-6 text-center overflow-hidden
      "
      aria-labelledby="contact-heading"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(207,174,112,0.06) 0%, transparent 70%)",
        }}
      />

      <ContactHeroEyebrow label={t.eyebrow} />
      <ContactHeroHeading line1={t.line1} line2={t.line2} />
      <ContactHeroDivider />
      <ContactHeroSubheading text={t.subheading} />

      {/* Bottom fade into ivory content area */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #F7F5F1)" }}
      /> */}
    </section>
  );
}
