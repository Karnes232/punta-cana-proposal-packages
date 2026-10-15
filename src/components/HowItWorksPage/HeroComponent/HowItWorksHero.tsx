import HeroEyebrow from "@/components/ui/hero/HeroEyebrow";
import type { ImageAsset } from "@/sanity/queries/fragments";
import HowItWorksHeroHeading from "./HowItWorksHeroHeading";
import HeroDivider from "@/components/ui/hero/HeroDivider";
import HowItWorksHeroSubheading from "./HowItWorksHeroSubheading";
import DimHeroBackground from "@/components/ui/hero/DimHeroBackground";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksHeroProps {
  heroImage?: ImageAsset & {
    alt: string;
  };
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksHero({
  heroImage,
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
}: HowItWorksHeroProps) {
  const imageAltFallback =
    [headingLine1, headingLine2].filter(Boolean).join(" ") ||
    eyebrow ||
    "How it works";

  return (
    <section
      className="
        relative w-full bg-black
        pt-40 pb-28
        flex flex-col items-center justify-center gap-6 text-center overflow-hidden
      "
      aria-labelledby="how-it-works-heading"
    >
      {heroImage ? (
        <DimHeroBackground photo={heroImage} altFallback={imageAltFallback} />
      ) : null}

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6">
        <HeroEyebrow label={eyebrow} />
        <HowItWorksHeroHeading
          id="how-it-works-heading"
          line1={headingLine1}
          line2={headingLine2}
        />
        <HeroDivider diamond="lg" />
        <HowItWorksHeroSubheading text={subheading} />
      </div>
    </section>
  );
}
