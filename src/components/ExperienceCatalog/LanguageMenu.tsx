"use client";
import { useEffect, useId, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";
import {
  isBlogOnlyLocale,
  LANGUAGE_NAMES,
  type AppLocale,
} from "@/i18n/locales";

/**
 * The header's language switcher: a button with the current language that
 * opens the list of languages this page exists in. A disclosure of links
 * (not an ARIA menu): Escape or a click outside closes it.
 *
 * Inline (in the phone menu), the same links are listed directly under a
 * "Language" heading, with no button.
 */
export default function LanguageMenu({
  current,
  languages,
  hrefFor,
  label,
  inline = false,
  onPick,
}: {
  current: AppLocale;
  languages: readonly AppLocale[];
  hrefFor: (language: AppLocale) => string;
  /** "Language" in the visitor's language. */
  label: string;
  inline?: boolean;
  /** Called when a language is chosen (the phone menu closes itself). */
  onPick?: () => void;
}) {
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

  const siteLanguages = languages.filter((l) => !isBlogOnlyLocale(l));
  const blogLanguages = languages.filter((l) => isBlogOnlyLocale(l));
  const item = (language: AppLocale) => (
    <li key={language}>
      <a
        href={hrefFor(language)}
        lang={language}
        hrefLang={language}
        aria-current={language === current ? "true" : undefined}
        className={`flex min-h-11 items-center gap-4 text-[14px] normal-case tracking-normal transition-colors duration-200 [&:hover]:text-gold ${inline ? "" : "justify-between px-4"} ${language === current ? "text-gold" : inline ? "text-ivory/80" : "text-ivory"}`}
        onClick={() => {
          setOpen(false);
          onPick?.();
        }}
      >
        <span dir={language === "ar" ? "rtl" : undefined}>
          {LANGUAGE_NAMES[language]}
        </span>
        {language === current && <FiCheck aria-hidden />}
      </a>
    </li>
  );

  if (inline)
    return (
      <div>
        <p className="mb-1 text-[11px] tracking-[0.2em] text-ivory/50 uppercase">
          {label}
        </p>
        <ul className="flex flex-wrap gap-x-6">{siteLanguages.map(item)}</ul>
        {blogLanguages.length > 0 && (
          <>
            <p className="mt-2 border-t border-t-gold/15 pt-3 pb-1 text-[11px] tracking-[0.2em] text-ivory/50 uppercase">
              Blog
            </p>
            <ul className="flex flex-wrap gap-x-6">
              {blogLanguages.map(item)}
            </ul>
          </>
        )}
      </div>
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
          <ul>{siteLanguages.map(item)}</ul>
          {blogLanguages.length > 0 && (
            <>
              <p className="mx-4 mt-2 border-t border-t-[rgba(207,174,112,0.2)] pt-3 pb-1 text-[11px] tracking-[0.2em] text-ivory/50 uppercase">
                Blog
              </p>
              <ul>{blogLanguages.map(item)}</ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
