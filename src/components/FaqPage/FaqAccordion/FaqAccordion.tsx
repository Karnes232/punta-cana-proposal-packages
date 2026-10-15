"use client";

import { useState } from "react";
import FaqAccordionList from "./FaqAccordionList";
import { Faqs } from "@/sanity/queries/FaqPage/FaqPage";
import { useTranslations } from "next-intl";

// A Previous / Next button under the list.
const pagerButton =
  "min-h-11 cursor-pointer border border-line px-5 text-[14px] text-ink transition-colors duration-200 hover:border-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqAccordionProps {
  activeCategory: string;
  faqs: Faqs[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqAccordion({
  faqs,
  activeCategory,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const t = useTranslations("FaqPage");

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  // Client-side filter — fast, no network round-trip
  const visibleItems: Faqs[] =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category?.value === activeCategory);

  const totalPages = Math.max(
    1,
    Math.ceil(visibleItems.length / ITEMS_PER_PAGE),
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = visibleItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <section className="bg-paper py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <FaqAccordionList
          items={paginatedItems}
          openId={openId}
          onToggle={handleToggle}
        />
        {visibleItems.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={pagerButton}
            >
              {t("previous")}
            </button>
            <p className="text-[14px] text-body tabular-nums">
              {t("page")} {currentPage} {t("of")} {totalPages}
            </p>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={pagerButton}
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
