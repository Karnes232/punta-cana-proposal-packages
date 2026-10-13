import HowItWorksCTACopy from "./HowItWorksCTACopy";
import HowItWorksCTAButtons from "./HowItWorksCTAButtons";

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

/** The black band closing the page, with the booking buttons. */
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
      className="w-full bg-black px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8">
        <HowItWorksCTACopy
          eyebrow={eyebrow}
          scriptLine={scriptLine}
          heading={heading}
          headingAccent={headingAccent}
          subheading={subheading}
        />
        <HowItWorksCTAButtons
          primaryLabel={primaryCTA}
          primaryHref={primaryHref}
          secondaryLabel={secondaryCTA}
          secondaryHref={secondaryHref}
        />
      </div>
    </section>
  );
}
