"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { ALL_LOCALES } from "@/i18n/blogLocales";
import {
  useBlogLanguageAlternates,
  type BlogNavAlternate,
} from "./BlogLanguageAlternatesContext";

const GOLD = "#CFAE70";
const GOLD_BG = "#CFAE70";
const TEXT_ON_GOLD = "#0B0B0C";

function localeOrderIndex(language: string): number {
  const i = (ALL_LOCALES as readonly string[]).indexOf(language);
  return i === -1 ? 999 : i;
}

function sortAlternates(alternates: BlogNavAlternate[]): BlogNavAlternate[] {
  return [...alternates].sort(
    (a, b) => localeOrderIndex(a.language) - localeOrderIndex(b.language),
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { alternates: blogAlternates } = useBlogLanguageAlternates();

  const sortedBlogAlternates = useMemo(
    () =>
      blogAlternates && blogAlternates.length > 0
        ? sortAlternates(blogAlternates)
        : null,
    [blogAlternates],
  );

  if (sortedBlogAlternates && sortedBlogAlternates.length > 0) {
    return (
      <BlogNavLanguageMenu
        alternates={sortedBlogAlternates}
        currentLocale={locale}
        isPending={isPending}
        startTransition={startTransition}
        router={router}
      />
    );
  }

  return (
    <SiteLanguageToggle
      locale={locale}
      pathname={pathname}
      isPending={isPending}
      startTransition={startTransition}
      router={router}
    />
  );
}

function SiteLanguageToggle({
  locale,
  pathname,
  isPending,
  startTransition,
  router,
}: {
  locale: string;
  pathname: string;
  isPending: boolean;
  startTransition: (cb: () => void) => void;
  router: ReturnType<typeof useRouter>;
}) {
  const isEN = locale === "en";

  function switchLocale(next: "en" | "es") {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className="h-[34px] relative flex items-center gap-0 rounded-sm overflow-hidden"
      style={{
        border: `1px solid ${GOLD}`,
        opacity: isPending ? 0.6 : 1,
        transition: "opacity 300ms ease",
      }}
      aria-label="Language switcher"
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: isEN ? 0 : "50%",
          width: "50%",
          background: GOLD_BG,
          transition: "left 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
        }}
      />

      <LangButton label="EN" active={isEN} onClick={() => switchLocale("en")} />
      <LangButton
        label="ES"
        active={!isEN}
        onClick={() => switchLocale("es")}
      />
    </div>
  );
}

function BlogNavLanguageMenu({
  alternates,
  currentLocale,
  isPending,
  startTransition,
  router,
}: {
  alternates: BlogNavAlternate[];
  currentLocale: string;
  isPending: boolean;
  startTransition: (cb: () => void) => void;
  router: ReturnType<typeof useRouter>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const currentLabel = currentLocale.toUpperCase();

  function goTo(alt: BlogNavAlternate) {
    if (alt.language === currentLocale) {
      close();
      return;
    }
    startTransition(() => {
      router.replace(alt.path, { locale: alt.language });
      close();
    });
  }

  if (alternates.length === 1) {
    return (
      <div
        className="h-[34px] flex items-center justify-center rounded-sm px-3"
        style={{
          border: `1px solid ${GOLD}`,
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: GOLD,
        }}
        aria-label={`Blog language ${currentLabel}`}
      >
        {currentLabel}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Blog languages"
        disabled={isPending}
        onClick={() => setOpen((o) => !o)}
        className="h-[34px] min-w-[72px] px-3 rounded-sm flex items-center justify-center gap-1"
        style={{
          border: `1px solid ${GOLD}`,
          opacity: isPending ? 0.6 : 1,
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: GOLD,
          background: "transparent",
          cursor: "pointer",
          transition: "opacity 300ms ease",
        }}
      >
        {currentLabel}
        <span aria-hidden className="text-[0.55rem] opacity-80">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Available translations"
          className="absolute right-0 top-full mt-1 z-60 min-w-full py-1 rounded-sm shadow-lg bg-black border border-gold/30"
          style={{ borderColor: "rgba(207,174,112,0.35)" }}
        >
          {alternates.map((alt) => {
            const active = alt.language === currentLocale;
            const label = alt.language.toUpperCase();
            return (
              <li key={alt.language} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  disabled={active}
                  onClick={() => goTo(alt)}
                  className="w-full text-left px-3 py-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: active ? TEXT_ON_GOLD : GOLD,
                    background: active ? GOLD_BG : "transparent",
                    border: "none",
                    cursor: active ? "default" : "pointer",
                  }}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function LangButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      aria-pressed={active}
      aria-label={`Switch to ${label}`}
      style={{
        position: "relative",
        zIndex: 1,
        minWidth: 44,
        height: "38.5px",
        padding: "0 14px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        color: active ? TEXT_ON_GOLD : GOLD,
        background: "transparent",
        border: "none",
        cursor: active ? "default" : "pointer",
        transition: "color 350ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {label}
    </button>
  );
}
