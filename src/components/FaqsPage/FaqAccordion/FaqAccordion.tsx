"use client";

import { useState, useEffect } from "react";
import FaqAccordionList from "./FaqAccordionList";
import { Faqs } from "@/sanity/queries/FaqsPage/Faqs";
import { useTranslations } from "next-intl";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqAccordionProps {
  locale: "en" | "es";
  activeCategory: string;
  faqs: Faqs[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FaqAccordion({
  faqs,
  locale,
  activeCategory,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const t = useTranslations("FaqPage");
  // When the category filter changes, collapse any open item so the
  // newly filtered list always starts clean, at page 1.
  useEffect(() => {
    setOpenId(null);
    setCurrentPage(1);
  }, [activeCategory]);

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  // Client-side filter — fast, no network round-trip
  const visibleItems: Faqs[] =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category.value === activeCategory);

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
    <section className="bg-[#F7F5F1] py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <FaqAccordionList
          items={paginatedItems}
          locale={locale}
          openId={openId}
          onToggle={handleToggle}
        />
        {visibleItems.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded border border-gold/30 px-4 py-2 font-body text-sm text-gray transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("previous")}
            </button>
            <p className="font-body text-sm text-gray/80">
              {t("page")} {currentPage} {t("of")} {totalPages}
            </p>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded border border-gold/30 px-4 py-2 font-body text-sm text-gray transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
