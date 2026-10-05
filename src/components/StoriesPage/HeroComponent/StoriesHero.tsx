import ListingHeroBackground from "@/components/ui/hero/ListingHeroBackground";
import HeroDivider from "@/components/ui/hero/HeroDivider";
import HeroEyebrow from "@/components/ui/hero/HeroEyebrow";
import HeroHeading from "@/components/ui/hero/HeroHeading";
import HeroSubheading from "@/components/ui/hero/HeroSubheading";

export default function StoriesHero({
  image,
  eyebrow = "Real Proposals · Real Moments",
  headingLine1 = "Their Stories,",
  headingLine2 = "Your Inspiration",
  subheading = "Every couple who trusted us with their most important moment. Read their stories and begin imagining yours.",
}: {
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
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  subheading?: string;
}) {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* ── Background layer (same treatment as Home Hero) ── */}
      <ListingHeroBackground image={image} />

      {/* ── Radial gold bloom — decorative, bottom-centered ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(207,174,112,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Gold corner accents — matching homepage Hero ── */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-28 md:py-36 text-center max-w-[800px] mx-auto">
        <HeroEyebrow label={eyebrow} />
        <HeroHeading line1={headingLine1} line2={headingLine2} />
        <HeroDivider />
        <HeroSubheading text={subheading} />
      </div>
    </section>
  );
}
