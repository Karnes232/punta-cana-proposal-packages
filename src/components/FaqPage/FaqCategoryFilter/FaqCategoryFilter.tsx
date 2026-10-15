"use client";
import { local } from "@/lib/experience/normalize";
import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";

import { useState } from "react";
import FaqCategoryPill from "./FaqCategoryPill";
import { FaqsCategories } from "@/sanity/queries/FaqPage/FaqPage";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqCategoryFilterProps {
  locale: SiteLocale;
  /** The categories that have questions. */
  faqsCategories: FaqsCategories[];
  /** Called whenever the user selects a different category. */
  onCategoryChange: (category: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

/** The category buttons, kept under the navbar while the list scrolls. */
export default function FaqCategoryFilter({
  faqsCategories,
  locale,
  onCategoryChange,
}: FaqCategoryFilterProps) {
  const t = useTranslations("FaqPage");
  const [active, setActive] = useState<string>("all");

  function handleSelect(value: string) {
    if (value === active) return;
    setActive(value);
    onCategoryChange(value);
  }

  return (
    <div className="sticky top-[88px] z-20 border-b border-line bg-paper upto700:top-[72px]">
      <div className="relative">
        {/* A fade at the row's end hints that it scrolls sideways. */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-paper to-transparent xl:hidden"
          aria-hidden="true"
        />
        <div
          role="group"
          aria-label={t("filterLabel")}
          className="scrollbar-hide mx-auto flex max-w-5xl flex-nowrap items-center gap-3 overflow-x-auto px-6 py-4 md:px-12 xl:flex-wrap xl:justify-center xl:overflow-x-visible"
        >
          <FaqCategoryPill
            value="all"
            label={t("all")}
            isActive={active === "all"}
            onClick={handleSelect}
          />
          {faqsCategories.map((cat: FaqsCategories) => (
            <FaqCategoryPill
              key={cat.value}
              value={cat.value}
              label={local(cat.label, locale)}
              isActive={active === cat.value}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
