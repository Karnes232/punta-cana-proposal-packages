// Server Component
// Ivory background — gold is decorative only (top borders, icon strokes).
// All readable text uses text-black or text-gray.

import TrustIndicatorsGrid from "./TrustIndicatorsGrid";

import { TrustIndicatorItemProps } from "./TrustIndicatorItem";

interface TrustIndicatorsProps {
  items?: TrustIndicatorItemProps[];
}

export default function TrustIndicators({ items = [] }: TrustIndicatorsProps) {
  return (
    <section
      className="relative bg-ivory overflow-hidden"
      aria-label="Why couples trust us"
    >
      {/* Faint diagonal texture — consistent with other ivory sections */}
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

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <TrustIndicatorsGrid items={items} />
      </div>
    </section>
  );
}
