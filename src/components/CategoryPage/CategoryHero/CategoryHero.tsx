import CategoryHeroBackground from "./CategoryHeroBackground";

import CategoryHeroEyebrow from "./CategoryHeroEyebrow";
import CategoryHeroHeading from "./CategoryHeroHeading";
import CategoryHeroDivider from "./CategoryHeroDivider";
import CategoryHeroSubheading from "./CategoryHeroSubheading";

interface CategoryHeroProps {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  /** Hero image from Sanity — same shape as homepage Hero */
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
}

export default function CategoryHero({
  image,
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
}: CategoryHeroProps) {
  return (
    <section className="relative w-full min-h-[70svh] flex items-end justify-center overflow-hidden bg-black">
      {/* ── Background layer ── */}
      <CategoryHeroBackground image={image} />

      {/* ── Gold corner accents ── */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 pb-20 md:pb-24 text-center max-w-[860px] mx-auto">
        {/* <CategoryHeroBreadcrumb items={breadcrumbItems} /> */}

        <CategoryHeroEyebrow text={eyebrow} />

        <CategoryHeroHeading line1={headingLine1} line2={headingLine2} />

        <CategoryHeroDivider />

        <CategoryHeroSubheading text={subheading} />
      </div>
    </section>
  );
}
