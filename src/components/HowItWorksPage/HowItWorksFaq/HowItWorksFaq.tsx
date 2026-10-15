import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { homeIcon, homeTextLink } from "@/components/HomePage/styles";
import HowItWorksSectionHeader from "../HowItWorksSectionHeader";
import HowItWorksFaqAccordion from "./HowItWorksFaqAccordion";
import { HowItWorksFaqs } from "@/sanity/queries/HowItWorksPage/HowItWorksPage";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksFaqProps {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  faqs: HowItWorksFaqs[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/** A few common questions, with a link on to the full FAQ page. */
export default function HowItWorksFaq({
  eyebrow,
  heading,
  headingAccent,
  subheading,
  faqs,
}: HowItWorksFaqProps) {
  const t = useTranslations("HowItWorksPage");

  return (
    <section
      className="w-full bg-paper px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <HowItWorksSectionHeader
          id="faq-heading"
          eyebrow={eyebrow}
          heading={heading}
          headingAccent={headingAccent}
          subheading={subheading}
        />
        <HowItWorksFaqAccordion items={faqs} />
        <Link href="/faq" className={homeTextLink}>
          {t("allQuestions")}
          <FiArrowRight aria-hidden="true" className={homeIcon} />
        </Link>
      </div>
    </section>
  );
}
