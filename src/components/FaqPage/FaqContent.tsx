"use client";
import type { SiteLocale } from "@/i18n/locales";
import React, { useState } from "react";
import FaqAccordion from "@/components/FaqPage/FaqAccordion/FaqAccordion";
import FaqCategoryFilter from "@/components/FaqPage/FaqCategoryFilter/FaqCategoryFilter";
import { Faqs, FaqsCategories } from "@/sanity/queries/FaqPage/FaqPage";
import { categoriesInUse } from "./faqCategories";

interface FaqContentProps {
  locale: SiteLocale;
  faqsCategories: FaqsCategories[];
  faqs: Faqs[];
}

const FaqContent = ({ locale, faqsCategories, faqs }: FaqContentProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // Only categories with questions get a button; with fewer than two there
  // is nothing to filter.
  const categories = categoriesInUse(faqsCategories, faqs);

  return (
    <>
      {categories.length > 1 && (
        <FaqCategoryFilter
          locale={locale}
          onCategoryChange={setActiveCategory}
          faqsCategories={categories}
        />
      )}
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
