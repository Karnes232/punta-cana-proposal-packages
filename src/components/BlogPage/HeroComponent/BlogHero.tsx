import BlogHeroEyebrow from "./BlogHeroEyebrow";
import BlogHeroHeading from "./BlogHeroHeading";
import BlogHeroDivider from "./BlogHeroDivider";
import BlogHeroSubheading from "./BlogHeroSubheading";
import StoriesHeroBackground from "@/components/StoriesPage/HeroComponent/StoriesHeroBackground";

interface BlogHeroProps {
  locale: "en" | "es";
  /** Pass Sanity data to override defaults */
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
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

export default function BlogHero({
  locale,
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
  image,
}: BlogHeroProps) {
  return (
    <section className="relative w-full bg-[#0B0B0C] overflow-hidden">
      {/* Subtle radial gold bloom behind heading */}
      <StoriesHeroBackground image={image} />
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[340px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(207,174,112,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Gold corner accents */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 pt-36 pb-24 md:pt-44 md:pb-32 text-center max-w-[720px] mx-auto">
        <BlogHeroEyebrow label={eyebrow} />
        <BlogHeroHeading line1={headingLine1} line2={headingLine2} />
        <BlogHeroDivider />
        <BlogHeroSubheading text={subheading} />
      </div>

      {/* Bottom fade into ivory content area */}
      {/* <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #F7F5F1)",
        }}
        aria-hidden="true"
      /> */}
    </section>
  );
}
