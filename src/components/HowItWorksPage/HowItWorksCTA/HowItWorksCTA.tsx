import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksCTAOrnament from "./HowItWorksCTAOrnament";
import HowItWorksCTACopy from "./HowItWorksCTACopy";
import HowItWorksCTAButtons from "./HowItWorksCTAButtons";
import { howItWorksCTAContent, HowItWorksCTALocale } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksCTAProps {
  eyebrow: string;
  scriptLine: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  primaryCTA: string;
  primaryHref: string;
  secondaryCTA: string;
  secondaryHref: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksCTA({
  eyebrow,
  scriptLine,
  heading,
  headingAccent,
  subheading,
  primaryCTA,
  primaryHref,
  secondaryCTA,
  secondaryHref,
}: HowItWorksCTAProps) {
  return (
    <section
      className="relative w-full bg-black py-28 md:py-36 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Top ornament — vertical line + diamond dropping in from above */}
      <HowItWorksCTAOrnament />

      {/* Radial glow — faint warmth behind the heading */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(207,174,112,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Corner ornaments — thin gold lines in two opposing corners */}
      <span
        className="absolute top-8 left-8 block w-10 h-10 border-t border-l border-gold/20"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-8 right-8 block w-10 h-10 border-b border-r border-gold/20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 flex flex-col items-center gap-8">
        <RevealOnScroll>
          <HowItWorksCTACopy
            eyebrow={eyebrow}
            scriptLine={scriptLine}
            heading={heading}
            headingAccent={headingAccent}
            subheading={subheading}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <HowItWorksCTAButtons
            primaryLabel={primaryCTA}
            primaryHref={primaryHref}
            secondaryLabel={secondaryCTA}
            secondaryHref={secondaryHref}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
