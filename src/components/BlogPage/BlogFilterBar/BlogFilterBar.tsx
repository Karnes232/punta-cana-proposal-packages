"use client";

import { useState } from "react";

import { blogAllPostsFilterLabel } from "@/i18n/blogLocales";

interface BlogFilterBarProps {
  categories: {
    value: string;
    label: string;
  }[];
  /** App route locale (`en`, `es`, `fr`, …) for the “all posts” tab label. */
  locale: string;
  onChange?: (value: string) => void;
}

export default function BlogFilterBar({
  categories,
  locale,
  onChange,
}: BlogFilterBarProps) {
  const [active, setActive] = useState("all");

  const allTab = {
    value: "all",
    label: blogAllPostsFilterLabel(locale),
  };

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
        {renderTab(allTab.value, allTab.label)}

        {categories.map((tab) => renderTab(tab.value, tab.label))}
      </div>
    </div>
  );
}
