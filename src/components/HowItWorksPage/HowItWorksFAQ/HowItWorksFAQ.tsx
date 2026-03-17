// adjust to your sanity client path
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksFAQHeader from "./HowItWorksFAQHeader";
import HowItWorksFAQAccordion from "./HowItWorksFAQAccordion";
import { faqQuery, faqUIContent, placeholderFAQItems } from "./types";
import type { FAQItem, FAQLocale } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksFAQProps {
  locale: FAQLocale;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default async function HowItWorksFAQ({ locale }: HowItWorksFAQProps) {
  const items = placeholderFAQItems
  const t = faqUIContent[locale];

  return (
    <section
      className="relative w-full bg-[#F7F5F1] py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">

        <RevealOnScroll>
          <HowItWorksFAQHeader
            eyebrow={t.eyebrow}
            heading={t.heading}
            headingAccent={t.headingAccent}
            subheading={t.subheading}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          {/* Accordion is a client component — receives pre-fetched items as props */}
          <HowItWorksFAQAccordion items={items} locale={locale} />
        </RevealOnScroll>

      </div>
    </section>
  );
}