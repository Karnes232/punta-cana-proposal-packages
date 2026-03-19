// Server Component
// Sits between ContactBody and Footer.
// bg-black continues from ContactBody — no visual break between sections.
// Border-top gold gradient provides the only separation.

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactTrustBarStat from "./ContactTrustBarStat";
import ContactTrustBarDivider from "./ContactTrustBarDivider";

// ─── Bilingual content ────────────────────────────────────────────────────────

const content = {
  en: {
    stats: [
      { value: "< 24h", label: "Response Time" },
      { value: "200+", label: "Proposals Delivered" },
      { value: "100%", label: "Would Do It Again" },
    ],
  },
  es: {
    stats: [
      { value: "< 24h", label: "Tiempo de Respuesta" },
      { value: "200+", label: "Propuestas Realizadas" },
      { value: "100%", label: "Lo Harían de Nuevo" },
    ],
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface ContactTrustBarProps {
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactTrustBar({ locale }: ContactTrustBarProps) {
  const { stats } = content[locale];

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
            {stats.map((stat, i) => (
              <div key={stat.label} className="contents">
                <div className="flex-1 flex items-center justify-center px-8">
                  <ContactTrustBarStat value={stat.value} label={stat.label} />
                </div>

                {/* Vertical divider between items, not after the last */}
                {i < stats.length - 1 && <ContactTrustBarDivider />}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
