"use client";
import React, { useState } from "react";
import FaqAccordion from "@/components/FaqsPage/FaqAccordion/FaqAccordion";
import FaqCategoryFilter from "@/components/FaqsPage/FaqCategoryFilter/FaqCategoryFilter";
import { Faqs, FaqsCategories } from "@/sanity/queries/FaqsPage/Faqs";

interface FaqsContentProps {
  locale: "en" | "es";
  faqsCategories: FaqsCategories[];
  faqs: Faqs[];
}

const FaqsContent = ({ locale, faqsCategories, faqs }: FaqsContentProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <>
      <FaqCategoryFilter
        locale={locale as "en" | "es"}
        onCategoryChange={setActiveCategory}
        faqsCategories={faqsCategories}
      />
      <FaqAccordion
        activeCategory={activeCategory}
        locale={locale as "en" | "es"}
        faqs={faqs}
      />
    </>
  );
};

export default FaqsContent;
