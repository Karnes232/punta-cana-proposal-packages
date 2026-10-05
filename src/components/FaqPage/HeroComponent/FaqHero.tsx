import HeroDivider from "@/components/ui/hero/HeroDivider";
import HeroEyebrow from "@/components/ui/hero/HeroEyebrow";
import HeroHeading from "@/components/ui/hero/HeroHeading";
import HeroSubheading from "@/components/ui/hero/HeroSubheading";
import DimHeroBackground from "@/components/ui/hero/DimHeroBackground";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqHeroProps {
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

export default async function FaqHero({
  heroImage,
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
}: FaqHeroProps) {
  const imageAltFallback =
    [headingLine1, headingLine2].filter(Boolean).join(" ") || eyebrow || "FAQ";

  return (
    <section
      className="
        relative w-full bg-[#0B0B0C]
        pt-40 pb-28
        flex flex-col items-center justify-center gap-6 text-center overflow-hidden
      "
      aria-labelledby="faq-heading"
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
        <HeroHeading
          id="faq-heading"
          line1={headingLine1}
          line2={headingLine2}
        />
        <HeroDivider />
        <HeroSubheading text={subheading} />
      </div>
    </section>
  );
}
