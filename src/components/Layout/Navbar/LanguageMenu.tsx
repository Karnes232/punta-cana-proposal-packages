"use client";
import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown, FiGlobe } from "react-icons/fi";
import { LANGUAGE_NAMES } from "@/i18n/locales";
import LanguageLink from "./LanguageLink";
import { splitLanguages } from "./navigation";
import type { LanguageOptions } from "./types";

/**
 * The desktop language switcher: a button with the current language that
 * opens the list of languages this page exists in. A disclosure of links
 * (not an ARIA menu): Escape or a click outside closes it.
 */
export default function LanguageMenu({
  current,
  languages,
  hrefFor,
  label,
}: LanguageOptions) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const { site, blog } = splitLanguages(languages);
  const link = (language: (typeof languages)[number]) => (
    <LanguageLink
      key={language}
      language={language}
      current={current}
      href={hrefFor(language)}
      onPick={() => setOpen(false)}
    />
  );

  return (
    <div
      ref={root}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${label}: ${LANGUAGE_NAMES[current]}`}
        onClick={() => setOpen((value) => !value)}
        className={`flex min-h-11 cursor-pointer items-center gap-1.5 px-1 text-[13px] tracking-[0.1em] uppercase transition-colors duration-200 [&:hover]:text-ivory ${open ? "text-gold" : "text-ivory/80"}`}
      >
        <FiGlobe aria-hidden />
        {current}
        <FiChevronDown
          aria-hidden
          className={`transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          id={panelId}
          className="absolute top-full right-0 z-10 mt-2 min-w-44 border border-[rgba(207,174,112,0.25)] bg-black py-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
        >
          <ul>{site.map(link)}</ul>
          {blog.length > 0 && (
            <>
              <p className="mx-4 mt-2 border-t border-t-[rgba(207,174,112,0.2)] pt-3 pb-1 text-[11px] tracking-[0.2em] text-ivory/50 uppercase">
                Blog
              </p>
              <ul>{blog.map(link)}</ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
