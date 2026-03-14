"use client";

import { useState } from "react";

interface StoriesFilterBarProps {
  content: {
    type: {
      value: string;
      label: {
        en: string;
        es: string;
      };
    }[];
  };
  locale: "en" | "es";
  onChange?: (value: string) => void;
}

export default function StoriesFilterBar({
  content,
  locale,
  onChange,
}: StoriesFilterBarProps) {
  const [active, setActive] = useState("all");

  // "All" is a UI concern — always present, never comes from Sanity
  const allTab = { value: "all", label: locale === "es" ? "Todas" : "All Stories" };

  function handleSelect(value: string) {
    setActive(value);
    onChange?.(value);
  }

  function renderTab(value: string, label: string) {
    const isActive = active === value;
    return (
      <button
        key={value}
        onClick={() => handleSelect(value)}
        className={`
          relative px-6 py-5 shrink-0
          text-[10.5px] font-body font-medium tracking-[0.18em] uppercase
          transition-colors duration-300
          ${isActive ? "text-gold" : "text-white/35 hover:text-white/65"}
        `}
      >
        {label}
        <span
          className={`
            absolute bottom-0 left-0 right-0 h-px bg-gold
            transition-opacity duration-300
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <div className="w-full bg-black border-t border-gold/20 overflow-x-auto">
      <div className="flex items-center min-w-max px-6 md:px-12 mx-auto max-w-site">
        {/* All tab — hardcoded, always first */}
        {renderTab(allTab.value, allTab.label)}

        {/* Package type tabs — from Sanity */}
        {content.type.map((tab) => {
          const label = tab.label[locale];
          return renderTab(tab.value, label);
        })}
      </div>
    </div>
  );
}