import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PackageCard, { PackageCardProps } from "./PackageCard";

interface PackageGridProps {
  /** Array of packages — fetched from Sanity, filtered by category */
  packages: {
    image: {
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
    name: {
      en: string;
      es: string;
    };
    price: number;
    description: {
      en: string;
      es: string;
    };
    inclusions: {
      en: string;
      es: string;
    }[];
  }[];
  locale: "en" | "es";
}

export default function PackageGrid({ packages, locale }: PackageGridProps) {
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
            <RevealOnScroll
              key={pkg.name.en}
              delay={i * 120}
              className="h-full"
            >
              <PackageCard
                name={pkg.name[locale]}
                slug={pkg.name[locale]}
                image={pkg.image}
                price={pkg.price}
                description={pkg.description[locale]}
                inclusions={pkg.inclusions.map(
                  (inclusion) => inclusion[locale],
                )}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
