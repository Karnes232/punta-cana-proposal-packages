"use client";

import { useState, useEffect } from "react";
import { FaqItem, FAQ_ITEMS } from "./types";
import FaqAccordionList from "./FaqAccordionList";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqAccordionProps {
  locale: "en" | "es";
  activeCategory: string;
  /** Optionally inject items (e.g. from Sanity). Falls back to static seed data. */
  items?: FaqItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqAccordion({
  locale,
  activeCategory,
  items = FAQ_ITEMS,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  // When the category filter changes, collapse any open item so the
  // newly filtered list always starts clean.
  useEffect(() => {
    setOpenId(null);
  }, [activeCategory]);

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  // Client-side filter — fast, no network round-trip
  const visibleItems: FaqItem[] =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className="bg-[#F7F5F1] py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <FaqAccordionList
          items={visibleItems}
          locale={locale}
          openId={openId}
          onToggle={handleToggle}
        />
      </div>
    </section>
  );
}
