// Server Component
// Dark background — gold used freely on text and decorative elements.
// This is the final conversion push before the footer.

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CTABannerEyebrow from "./CTABannerEyebrow";
import CTABannerHeading from "./CTABannerHeading";
import CTABannerSubheading from "./CTABannerSubheading";
import CTABannerActions from "./CTABannerActions";
import CTABannerOrnament from "./CTABannerOrnament";

interface CTABannerProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <section
      className="relative bg-black overflow-hidden"
      aria-label="Plan your proposal"
    >
      {/* Radial gold glow — centered, very subtle */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[800px] h-[400px] rounded-full bg-gold/[0.05] blur-[120px]" />
      </div>

      {/* Top border */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />

      {/* Bottom border */}
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />

      {/* Corner accents */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-gold/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-[860px] mx-auto px-6 lg:px-12 py-28 lg:py-36 flex flex-col items-center gap-10">
        <RevealOnScroll delay={0}>
          <CTABannerOrnament />
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <CTABannerEyebrow text={eyebrow} />
        </RevealOnScroll>

        <RevealOnScroll delay={280}>
          <CTABannerHeading line1={headingLine1} line2={headingLine2} />
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <CTABannerSubheading text={subheading} />
        </RevealOnScroll>

        <RevealOnScroll delay={520}>
          <CTABannerActions
            primaryLabel={primaryLabel}
            primaryHref={primaryHref}
            secondaryLabel={secondaryLabel}
            secondaryHref={secondaryHref}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={620}>
          <CTABannerOrnament />
        </RevealOnScroll>
      </div>
    </section>
  );
}
