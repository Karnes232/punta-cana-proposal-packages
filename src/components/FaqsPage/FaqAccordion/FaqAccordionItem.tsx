import { useRef, useEffect, useState } from "react";
import { Faqs } from "@/sanity/queries/FaqsPage/Faqs";

interface FaqAccordionItemProps {
  item: Faqs;
  locale: "en" | "es";
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqAccordionItem({
  item,
  locale,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const question = locale === "es" ? item.question.es : item.question.en;
  const answer = locale === "es" ? item.answer.es : item.answer.en;

  // Measure real content height so CSS can transition 0 → exact px.
  // Re-measures whenever isOpen toggles (fonts may have shifted layout).
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className={[
        "border-b border-gold/15 transition-colors duration-300",
        // Left border accent when open — matches LegalSidebar active state
        "border-l-2",
        isOpen ? "border-l-gold" : "border-l-transparent",
      ].join(" ")}
    >
      {/* ── Question row (trigger) ─────────────────────────────── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={[
          "w-full flex items-center justify-between gap-6",
          "pl-6 pr-6 py-6 text-left cursor-pointer group",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-inset",
        ].join(" ")}
      >
        {/* Question text */}
        <span
          className={[
            "font-display font-normal text-[17px] leading-snug transition-colors duration-300",
            isOpen ? "text-black" : "text-black/70 group-hover:text-black",
          ].join(" ")}
        >
          {question}
        </span>

        {/* Icon — circle with plus that rotates 45° to become × */}
        <span
          aria-hidden="true"
          className={[
            "flex-shrink-0 flex items-center justify-center",
            "w-[30px] h-[30px] rounded-full border",
            "transition-all duration-300",
            isOpen
              ? "border-gold bg-gold/10 rotate-45"
              : "border-gold/30 bg-transparent group-hover:border-gold",
          ].join(" ")}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            aria-hidden="true"
          >
            {/* Vertical bar */}
            <line
              x1="5.5"
              y1="1"
              x2="5.5"
              y2="10"
              stroke="#CFAE70"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            {/* Horizontal bar */}
            <line
              x1="1"
              y1="5.5"
              x2="10"
              y2="5.5"
              stroke="#CFAE70"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* ── Answer panel (animated height) ────────────────────── */}
      <div
        aria-hidden={!isOpen}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          overflow: "hidden",
          transition: "max-height 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={contentRef} className="pl-6 pr-14 pb-7">
          {/* Gold rule separator */}
          <div className="w-8 h-px bg-gold/40 mb-5" aria-hidden="true" />

          <p className="font-body font-light text-[15px] text-gray leading-[1.85]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
