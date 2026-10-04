"use client";

import { useState } from "react";
import HowItWorksFaqFilters from "./HowItWorksFaqFilters";
import HowItWorksFaqItem from "./HowItWorksFaqItem";
import type { FAQLocale } from "./types";
import { faqUIContent } from "./types";
import {
  HowItWorksFaqs,
  HowItWorksFaqsCategories,
} from "@/sanity/queries/HowItWorksPage/HowItWorksFaqs";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksFaqAccordionProps {
  items: HowItWorksFaqs[];
  locale: FAQLocale;
  faqsCategories: HowItWorksFaqsCategories[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksFaqAccordion({
  items,
  locale,
  faqsCategories,
}: HowItWorksFaqAccordionProps) {
  const t = faqUIContent[locale];
  const filterOptions = [
    { id: "all", label: t.categories.all },
    ...faqsCategories.map((c) => ({
      id: c.name[locale],
      label: c.name[locale],
    })),
  ];
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openKey, setOpenKey] = useState<string | null>(items[0]?._key ?? null);

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category?.name[locale] === activeCategory);

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setOpenKey(null); // collapse all on category switch
  }

  function handleToggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <div>
      {/* Filter pills */}
      <HowItWorksFaqFilters
        options={filterOptions}
        active={activeCategory}
        onChange={handleCategoryChange}
      />

      {/* Accordion list */}
      <div
        className="
          relative
          border border-gold/20 rounded-sm
          divide-y divide-gold/15
          overflow-hidden
        "
      >
        {filtered.length === 0 ? (
          <p className="px-6 py-8 text-center font-body font-light text-gray text-sm">
            {locale === "es"
              ? "No hay preguntas en esta categoría."
              : "No questions in this category."}
          </p>
        ) : (
          filtered.map((item) => (
            <div key={item._key} className="relative">
              <HowItWorksFaqItem
                question={item.question[locale]}
                answer={item.answer[locale]}
                isOpen={openKey === item._key}
                onToggle={() => handleToggle(item._key)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
