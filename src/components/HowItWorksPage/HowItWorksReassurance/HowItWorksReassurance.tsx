import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksReassuranceItem from "./HowItWorksReassuranceItem";
import { ReassuranceItem } from "@/sanity/queries/HowItWorksPage/HowItWorksSteps";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksReassuranceProps {
  items?: ReassuranceItem[];
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksReassurance({
  items = [],
  locale,
}: HowItWorksReassuranceProps) {
  return (
    <section
      className="relative w-full bg-[#0B0B0C] py-16 md:py-20"
      aria-label={locale === "es" ? "Por qué elegirnos" : "Why choose us"}
    >
      {/* Top gold hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gold/20"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <RevealOnScroll>
          {/* 4-col on md+, 2-col on sm, 1-col on xs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 divide-gold/15">
            {items?.map((item, index) => (
              <HowItWorksReassuranceItem
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title[locale as "en" | "es"],
                  caption: item.caption[locale as "en" | "es"],
                }}
                index={index}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Bottom gold hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gold/20"
        aria-hidden="true"
      />
    </section>
  );
}
