"use client";

import { useState } from "react";
import FaqAccordionItem from "@/components/FaqPage/FaqAccordion/FaqAccordionItem";
import { HowItWorksFaqs } from "@/sanity/queries/HowItWorksPage/HowItWorksPage";

/** The page's questions, one open at a time, all closed to start. */
export default function HowItWorksFaqAccordion({
  items,
}: {
  items: HowItWorksFaqs[];
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="border-t border-black/10">
      {items.map((item) => (
        <FaqAccordionItem
          key={item._key}
          item={item}
          isOpen={openKey === item._key}
          onToggle={() =>
            setOpenKey((prev) => (prev === item._key ? null : item._key))
          }
        />
      ))}
    </div>
  );
}
