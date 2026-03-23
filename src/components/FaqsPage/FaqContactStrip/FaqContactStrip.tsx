import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FaqContactStripEyebrow from "./FaqContactStripEyebrow";
import FaqContactStripHeading from "./FaqContactStripHeading";
import FaqContactStripDivider from "./FaqContactStripDivider";
import FaqContactStripBody from "./FaqContactStripBody";
import FaqContactStripCTA from "./FaqContactStripCTA";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqContactStripProps {
  eyebrow: string;
  line1: string;
  line2: string;
  body: string;
  cta: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqContactStrip({
  eyebrow,
  line1,
  line2,
  body,
  cta,
}: FaqContactStripProps) {
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
          <FaqContactStripEyebrow label={eyebrow} />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <FaqContactStripHeading line1={line1} line2={line2} />
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <FaqContactStripDivider />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <FaqContactStripBody text={body} />
        </RevealOnScroll>

        <RevealOnScroll delay={280}>
          <FaqContactStripCTA label={cta} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
