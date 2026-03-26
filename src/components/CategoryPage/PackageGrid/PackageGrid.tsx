import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PackageCard, { PackageCardProps } from "./PackageCard";

interface PackageGridProps {
  /** Array of packages — fetched from Sanity, filtered by category */
  packages: PackageCardProps[];
}

export default function PackageGrid({ packages }: PackageGridProps) {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(207,174,112,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <RevealOnScroll key={pkg.slug} delay={i * 120} className="h-full">
              <PackageCard {...pkg} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
