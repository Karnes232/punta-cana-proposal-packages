"use client";

import { useState } from "react";
import FaqCategoryPill from "./FaqCategoryPill";
import { FAQ_CATEGORIES } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqCategoryFilterProps {
  locale: "en" | "es";
  /** Called whenever the user selects a different category. */
  onCategoryChange: (category: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqCategoryFilter({
  locale,
  onCategoryChange,
}: FaqCategoryFilterProps) {
  const [active, setActive] = useState<string>("all");

  function handleSelect(value: string) {
    if (value === active) return;
    setActive(value);
    onCategoryChange(value);
  }

  return (
    <div
      className="
        sticky top-[72px] z-20
        bg-[#F7F5F1]/95 backdrop-blur-sm
        border-b border-[#CFAE70]/20
      "
    >
      {/*
        Fade masks on left/right indicate scrollability on mobile.
        The masks are purely visual — no JS needed.
      */}
      <div className="relative">
        {/* Left fade (scroll hint; hidden when pills wrap on xl) */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 xl:hidden"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to right, #F7F5F1, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 xl:hidden"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to left, #F7F5F1, transparent)",
          }}
        />

        {/* Pill row: horizontal scroll below xl; wraps on xl+ */}
        <div
          role="tablist"
          aria-label={
            locale === "es" ? "Filtrar por categoría" : "Filter by category"
          }
          className="
            flex flex-nowrap items-center gap-3
            overflow-x-auto scrollbar-hide
            xl:flex-wrap xl:overflow-x-visible xl:justify-center
            px-6 md:px-12 py-5
            max-w-5xl mx-auto
          "
        >
          {FAQ_CATEGORIES.map((cat) => (
            <FaqCategoryPill
              key={cat.value}
              value={cat.value}
              label={locale === "es" ? cat.labelEs : cat.labelEn}
              isActive={active === cat.value}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Gold rule at very bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#CFAE70]/30 to-transparent" />
    </div>
  );
}
