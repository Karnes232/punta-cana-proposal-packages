import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CategoryIntroOrnament from "./CategoryIntroOrnament";
import CategoryIntroEyebrow from "./CategoryIntroEyebrow";
import CategoryIntroHeading from "./CategoryIntroHeading";
import CategoryIntroDescription from "./CategoryIntroDescription";

type CategorySlug = "classic" | "modern" | "dining";

interface CategoryIntroProps {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export default function CategoryIntro({
  eyebrow,
  headingLine1,
  headingLine2,
  description,
}: CategoryIntroProps) {
  return (
    <section
      className="relative bg-ivory overflow-hidden"
      aria-label={headingLine1 + " " + headingLine2}
    >
      {/* Faint diagonal gold texture — matches BrandStatement */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #CFAE70 0px,
            #CFAE70 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Left + right edge gold hairlines */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-6 lg:px-12 py-24 lg:py-32 flex flex-col items-center gap-8">
        <RevealOnScroll delay={0}>
          <CategoryIntroOrnament />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <CategoryIntroEyebrow text={eyebrow} />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <CategoryIntroHeading line1={headingLine1} line2={headingLine2} />
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <CategoryIntroDescription text={description} />
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <CategoryIntroOrnament />
        </RevealOnScroll>
      </div>
    </section>
  );
}
