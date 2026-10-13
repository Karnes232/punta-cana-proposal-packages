"use client";
import type { SiteLocale } from "@/i18n/locales";
import { local } from "@/lib/experience/normalize";
import type { Localized } from "@/lib/experience/types";
import { useTranslations } from "next-intl";

interface StoriesFilterBarProps {
  content: {
    value: string;
    label: Localized;
  }[];
  locale: SiteLocale;
  /** "all" or a story type value. */
  active: string;
  onChange: (value: string) => void;
}

const tabClass =
  "relative min-h-12 shrink-0 cursor-pointer px-5 text-[13px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold";

/** The story-type tabs on the black band under the hero. */
export default function StoriesFilterBar({
  content,
  locale,
  active,
  onChange,
}: StoriesFilterBarProps) {
  const t = useTranslations("StoriesPage");

  function renderTab(value: string, label: string) {
    const isActive = active === value;
    return (
      <button
        key={value}
        type="button"
        aria-pressed={isActive}
        onClick={() => onChange(value)}
        className={`${tabClass} ${isActive ? "text-gold" : "text-ivory/70 hover:text-ivory"}`}
      >
        {label}
        <span
          aria-hidden="true"
          className={`absolute inset-x-5 bottom-0 h-0.5 bg-gold transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}
        />
      </button>
    );
  }

  return (
    <div className="relative border-t border-white/10 bg-black">
      {/* A fade at the row's end hints that it scrolls sideways. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-black to-transparent md:hidden"
      />
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="mx-auto flex max-w-site [scrollbar-width:none] items-center overflow-x-auto px-1 md:px-5"
      >
        {renderTab("all", t("all"))}
        {content.map((tab) => renderTab(tab.value, local(tab.label, locale)))}
      </div>
    </div>
  );
}
