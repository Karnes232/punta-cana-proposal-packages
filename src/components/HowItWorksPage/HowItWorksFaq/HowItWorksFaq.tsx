import type { SiteLocale } from "@/i18n/locales";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksFaqHeader from "./HowItWorksFaqHeader";
import HowItWorksFaqAccordion from "./HowItWorksFaqAccordion";
import {
  HowItWorksFaqs,
  HowItWorksFaqsCategories,
} from "@/sanity/queries/HowItWorksPage/HowItWorksFaqs";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksFaqProps {
  locale: SiteLocale;
  faqsCategories: HowItWorksFaqsCategories[];
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  faqs: HowItWorksFaqs[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default async function HowItWorksFaq({
  locale,
  faqsCategories,
  eyebrow,
  heading,
  headingAccent,
  subheading,
  faqs,
}: HowItWorksFaqProps) {
  const items = faqs;

  return (
    <section
      className="relative w-full bg-[#F7F5F1] py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <RevealOnScroll>
          <HowItWorksFaqHeader
            eyebrow={eyebrow}
            heading={heading}
            headingAccent={headingAccent}
            subheading={subheading}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          {/* Accordion is a client component — receives pre-fetched items as props */}
          <HowItWorksFaqAccordion
            items={items}
            locale={locale}
            faqsCategories={faqsCategories}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
