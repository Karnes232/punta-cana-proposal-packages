import HeroEyebrow from "@/components/ui/hero/HeroEyebrow";
import HowItWorksHeroHeading from "./HowItWorksHeroHeading";
import HeroDivider from "@/components/ui/hero/HeroDivider";
import HowItWorksHeroSubheading from "./HowItWorksHeroSubheading";
import DimHeroBackground from "@/components/ui/hero/DimHeroBackground";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksHeroProps {
  heroImage?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
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

      {/* Subtle radial glow behind heading */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(207,174,112,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        <HeroEyebrow label={eyebrow} />
        <HowItWorksHeroHeading line1={headingLine1} line2={headingLine2} />
        <HeroDivider diamond="lg" />
        <HowItWorksHeroSubheading text={subheading} />
      </div>
    </section>
  );
}
