"use client";
import type { SiteLocale } from "@/i18n/locales";
import React, { useState } from "react";
import FaqAccordion from "@/components/FaqPage/FaqAccordion/FaqAccordion";
import FaqCategoryFilter from "@/components/FaqPage/FaqCategoryFilter/FaqCategoryFilter";
import { Faqs, FaqsCategories } from "@/sanity/queries/FaqPage/FaqPage";

interface FaqContentProps {
  locale: SiteLocale;
  faqsCategories: FaqsCategories[];
  faqs: Faqs[];
}

const FaqContent = ({ locale, faqsCategories, faqs }: FaqContentProps) => {
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
        faqs={faqs}
      />
    </>
  );
};

export default FaqContent;
