import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FaqContactStripEyebrow from "./FaqContactStripEyebrow";
import FaqContactStripHeading from "./FaqContactStripHeading";
import FaqContactStripDivider from "./FaqContactStripDivider";
import FaqContactStripBody from "./FaqContactStripBody";
import FaqContactStripCTA from "./FaqContactStripCTA";

// ─── Bilingual content ────────────────────────────────────────────────────────

const content = {
  en: {
    eyebrow: "We're Here to Help",
    line1: "Still Have",
    line2: "Questions?",
    body: "Our team is happy to walk you through every detail. Reach out and we'll respond within 24 hours.",
    cta: "Contact Us",
  },
  es: {
    eyebrow: "Estamos Para Ayudarte",
    line1: "¿Tienes Más",
    line2: "Preguntas?",
    body: "Nuestro equipo está disponible para orientarte en cada detalle. Escríbenos y te respondemos en menos de 24 horas.",
    cta: "Contáctanos",
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqContactStripProps {
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqContactStrip({ locale }: FaqContactStripProps) {
  const t = content[locale];

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Top border rule — gold gradient, echoes the filter bar divider */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(207,174,112,0.4), transparent)",
        }}
      />

      {/* Corner ornaments — top-left */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/25 pointer-events-none"
        aria-hidden="true"
      />
      {/* Corner ornaments — top-right */}
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/25 pointer-events-none"
        aria-hidden="true"
      />
      {/* Corner ornaments — bottom-left */}
      <div
        className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-gold/25 pointer-events-none"
        aria-hidden="true"
      />
      {/* Corner ornaments — bottom-right */}
      <div
        className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-gold/25 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-24 md:py-32 text-center max-w-[680px] mx-auto">
        <RevealOnScroll>
          <FaqContactStripEyebrow label={t.eyebrow} />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <FaqContactStripHeading line1={t.line1} line2={t.line2} />
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <FaqContactStripDivider />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <FaqContactStripBody text={t.body} />
        </RevealOnScroll>

        <RevealOnScroll delay={280}>
          <FaqContactStripCTA label={t.cta} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
