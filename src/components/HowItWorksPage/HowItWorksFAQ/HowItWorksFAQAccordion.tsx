"use client";

import { useState } from "react";
import HowItWorksFAQFilters from "./HowItWorksFAQFilters";
import HowItWorksFAQItem from "./HowItWorksFAQItem";
import type { FAQItem, FAQCategory, FAQLocale } from "./types";
import { faqUIContent } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksFAQAccordionProps {
  items:  FAQItem[];
  locale: FAQLocale;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksFAQAccordion({
  items,
  locale,
}: HowItWorksFAQAccordionProps) {
  const { categories } = faqUIContent[locale];

  const [activeCategory, setActiveCategory] = useState<"all" | FAQCategory>("all");
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleCategoryChange(cat: "all" | FAQCategory) {
    setActiveCategory(cat);
    setOpenId(null); // collapse all on category switch
  }

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div>
      {/* Filter pills */}
      <HowItWorksFAQFilters
        categories={categories}
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
            {locale === "es" ? "No hay preguntas en esta categoría." : "No questions in this category."}
          </p>
        ) : (
          filtered.map((item) => (
            <div key={item._id} className="relative">
              <HowItWorksFAQItem
                question={item.question[locale]}
                answer={item.answer[locale]}
                isOpen={openId === item._id}
                onToggle={() => handleToggle(item._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}