// adjust to your sanity client path
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksFAQHeader from "./HowItWorksFAQHeader";
import HowItWorksFAQAccordion from "./HowItWorksFAQAccordion";
import { faqQuery, faqUIContent, placeholderFAQItems } from "./types";
import type { FAQItem, FAQLocale } from "./types";
import {
  HowItWorksFaqs,
  HowItWorksFaqsCategories,
} from "@/sanity/queries/HowItWorksPage/HowItWorksFaqs";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksFAQProps {
  locale: "en" | "es";
  faqsCategories: HowItWorksFaqsCategories[];
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  faqs: HowItWorksFaqs[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default async function HowItWorksFAQ({
  locale,
  faqsCategories,
  eyebrow,
  heading,
  headingAccent,
  subheading,
  faqs,
}: HowItWorksFAQProps) {
  const items = faqs;

  return (
    <section
      className="relative w-full bg-[#F7F5F1] py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <RevealOnScroll>
          <HowItWorksFAQHeader
            eyebrow={eyebrow}
            heading={heading}
            headingAccent={headingAccent}
            subheading={subheading}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          {/* Accordion is a client component — receives pre-fetched items as props */}
          <HowItWorksFAQAccordion
            items={items}
            locale={locale}
            faqsCategories={faqsCategories}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
