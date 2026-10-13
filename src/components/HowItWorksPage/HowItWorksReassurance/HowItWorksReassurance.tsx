import { useTranslations } from "next-intl";
import HowItWorksReassuranceItem from "./HowItWorksReassuranceItem";
import { ReassuranceItem } from "@/sanity/queries/HowItWorksPage/HowItWorksPage";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksReassuranceProps {
  items?: ReassuranceItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/** The black strip of reasons to book, four across on desktop. */
export default function HowItWorksReassurance({
  items = [],
}: HowItWorksReassuranceProps) {
  const t = useTranslations("HowItWorksPage");

  return (
    <section
      className="w-full bg-[#0B0B0C] px-6 py-16 md:px-10 md:py-20"
      aria-label={t("whyChooseUs")}
    >
      <ul className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <HowItWorksReassuranceItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
