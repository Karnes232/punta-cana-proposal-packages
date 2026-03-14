import StoriesHeroBackground from "./StoriesHeroBackground";
import StoriesHeroEyebrow from "./StoriesHeroEyebrow";
import StoriesHeroHeading from "./StoriesHeroHeading";
import StoriesHeroDivider from "./StoriesHeroDivider";
import StoriesHeroSubheading from "./StoriesHeroSubheading";

export default function StoriesHero({
  image,
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
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
      <StoriesHeroBackground image={image} />

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
        <StoriesHeroEyebrow text={eyebrow} />
        <StoriesHeroHeading
          headingLine1={headingLine1}
          headingLine2={headingLine2}
        />
        <StoriesHeroDivider />
        <StoriesHeroSubheading text={subheading} />
      </div>

      {/* ── Bottom fade into ivory content area ── */}
      {/* <div
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#F7F5F1] pointer-events-none"
        aria-hidden="true"
      /> */}
    </section>
  );
}
