import HeroBackground from "./HeroBackground";
import HeroEyebrow from "./HeroEyebrow";
import HeroHeading from "./HeroHeading";
import HeroDivider from "./HeroDivider";
import HeroSubheading from "./HeroSubheading";
import HeroCTA from "./HeroCTA";

import HeroScrollIndicator from "./HeroScrollIndicator";

interface HeroProps {
  /** Full-bleed background image URL (from Sanity or static /public path) */
  image?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };

  /** Eyebrow label above the heading */
  eyebrow?: string;

  /** Heading — split into three lines for layout control */
  headingLine1?: string;
  headingLine2?: string;
  headingLine3?: string;

  /** Subheading paragraph */
  subheading?: string;

  /** CTA buttons */
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function Hero({
  image,
  eyebrow,
  headingLine1,
  headingLine2,
  headingLine3,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      {/* ── Background layer ── */}
      <HeroBackground image={image} />

      {/* ── Gold corner accents ── */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 left-8 w-10 h-10 border-b border-l border-gold/30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 right-8 w-10 h-10 border-b border-r border-gold/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-[860px] mx-auto">
        <HeroEyebrow text={eyebrow} />

        <HeroHeading
          line1={headingLine1}
          line2={headingLine2}
          line3={headingLine3}
        />

        <HeroDivider />

        <HeroSubheading text={subheading} />

        <HeroCTA
          primaryLabel={primaryLabel}
          primaryHref={primaryHref}
          secondaryLabel={secondaryLabel}
          secondaryHref={secondaryHref}
        />
      </div>

      {/* ── Scroll indicator ── */}
      <HeroScrollIndicator />
    </section>
  );
}
