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
        locale={locale}
        onCategoryChange={setActiveCategory}
        faqsCategories={faqsCategories}
      />
      {/* Keyed by category so a filter change starts collapsed, on page 1. */}
      <FaqAccordion
        key={activeCategory}
        activeCategory={activeCategory}
        locale={locale}
        faqs={faqs}
      />
    </>
  );
};

export default FaqsContent;
