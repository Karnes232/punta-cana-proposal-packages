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
}

const DEFAULT_CATEGORIES: PackageCategoryCardProps[] = [
  {
    title: "Classic Proposals",
    description:
      "Timeless setups crafted with roses, candles, and the warm glow of the Caribbean sunset. Elegant, intimate, and deeply romantic.",
    href: "/classic-proposals",
    imageSrc: "https://picsum.photos/200/300?random=1", // replace with Sanity image URL or static path
    imageAlt: "Classic romantic proposal setup on a Punta Cana beach at sunset",
  },
  {
    title: "Modern Proposals",
    description:
      "Contemporary arrangements with clean lines, unique florals, and unexpected details. For couples who love style with a personal touch.",
    href: "/modern-proposals",
    imageSrc: undefined,
    imageAlt: "Modern proposal setup with stylish decor in Punta Cana",
  },
  {
    title: "Dining Proposals",
    description:
      "A private table for two, an exquisite menu, and the perfect moment. Because the best proposals deserve the finest setting.",
    href: "/dining-proposals",
    imageSrc: undefined,
    imageAlt: "Private dining proposal setup with candlelight in Punta Cana",
  },
];

export default function PackageCategories({
  eyebrow,
  headingLine1,
  headingLine2,
  categories = DEFAULT_CATEGORIES,
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
        <PackageCategoriesGrid categories={categories} />
      </div>
    </section>
  );
}
