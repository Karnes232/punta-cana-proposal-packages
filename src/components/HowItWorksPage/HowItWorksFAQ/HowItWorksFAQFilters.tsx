"use client";

import type { FAQCategory } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksFAQFiltersProps {
  categories:      Record<"all" | FAQCategory, string>;
  active:          "all" | FAQCategory;
  onChange:        (cat: "all" | FAQCategory) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksFAQFilters({
  categories,
  active,
  onChange,
}: HowItWorksFAQFiltersProps) {
  const keys = Object.keys(categories) as Array<"all" | FAQCategory>;

  return (
    <div
      className="flex flex-wrap justify-center gap-2 mb-10"
      role="tablist"
      aria-label="Filter FAQ by category"
    >
      {keys.map((key) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={`
              px-4 py-1.5
              text-[11px] font-light tracking-[0.2em] uppercase
              border rounded-sm
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60
              ${
                isActive
                  ? "border-gold/70 text-gold bg-gold/5"
                  : "border-gold/20 text-gray hover:border-gold/40 hover:text-black"
              }
            `}
          >
            {categories[key]}
          </button>
        );
      })}
    </div>
  );
}