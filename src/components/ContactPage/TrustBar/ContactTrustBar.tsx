// Server Component
// Sits between ContactBody and Footer.
// bg-black continues from ContactBody — no visual break between sections.
// Border-top gold gradient provides the only separation.

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactTrustBarStat from "./ContactTrustBarStat";
import ContactTrustBarDivider from "./ContactTrustBarDivider";

interface ContactTrustBarProps {
  trustBarStats: {
    value: {
      en: string;
      es: string;
    };
    label: {
      en: string;
      es: string;
    };
  }[];
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactTrustBar({
  trustBarStats,
  locale,
}: ContactTrustBarProps) {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Top gold gradient rule — separates from ContactBody without a hard line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(207,174,112,0.2), transparent)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-0">
            {trustBarStats.map((stat, i) => (
              <div key={stat.label[locale]} className="contents">
                <div className="flex-1 flex items-center justify-center px-8">
                  <ContactTrustBarStat
                    value={stat.value[locale]}
                    label={stat.label[locale]}
                  />
                </div>

                {/* Vertical divider between items, not after the last */}
                {i < trustBarStats.length - 1 && <ContactTrustBarDivider />}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
