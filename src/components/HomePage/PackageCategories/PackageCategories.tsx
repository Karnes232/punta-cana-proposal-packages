// Server Component
// All sub-components are server components.
// RevealOnScroll (inside PackageCategoriesGrid) is the only client boundary.

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PackageCategoriesEyebrow from "./PackageCategoriesEyebrow";
import PackageCategoriesHeading from "./PackageCategoriesHeading";
//import PackageCategoriesGrid from "./PackageCategoriesGrid";

import { PackageCategoryCardProps } from "./PackageCategoryCard";
import PackageCategoriesGrid from "./PackageCategoriesGrid";

interface PackageCategoriesProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  // Pass categories from Sanity, or falls back to DEFAULT_CATEGORIES
  categories?: PackageCategoryCardProps[];
  locale?: string;
}

export default function PackageCategories({
  eyebrow,
  headingLine1,
  headingLine2,
  categories,
  locale,
}: PackageCategoriesProps) {
  return (
    <section
      className="relative bg-black overflow-hidden"
      aria-label="Proposal package categories"
    >
      {/* Subtle radial glow behind the heading — gives depth to the dark bg */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/[0.04] blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-28 lg:py-36 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-5">
          <RevealOnScroll delay={0}>
            <PackageCategoriesEyebrow text={eyebrow} />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <PackageCategoriesHeading
              line1={headingLine1}
              line2={headingLine2}
            />
          </RevealOnScroll>
        </div>

        {/* Cards grid */}
        <PackageCategoriesGrid categories={categories ?? []} locale={locale} />
      </div>
    </section>
  );
}
