"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useBlogLanguageAlternates } from "@/components/BlogLanguageAlternates/BlogLanguageAlternatesContext";
import { usePathname } from "next/navigation";
import type { Locale, Settings } from "@/lib/experience/types";
import { label } from "@/lib/experience/labels";
import {
  ALL_LOCALES,
  isSiteLocale,
  localePrefix,
  SITE_LOCALES,
  type AppLocale,
} from "@/i18n/locales";
import LanguageMenu from "./LanguageMenu";

const LOCALE_SEGMENT = new RegExp(`^/(${ALL_LOCALES.join("|")})(?=/|$)`);

// Where the desktop bar takes over from the Menu button (upto1280 ends).
const DESKTOP = "(min-width: 1281px)";

export default function CatalogNavigation({
  locale,
  settings,
  logo,
  companyName,
}: {
  locale: Locale;
  settings: Settings;
  logo?: string;
  companyName?: string;
}) {
  const pathname = usePathname() || "/",
    path = pathname.replace(LOCALE_SEGMENT, "") || "/",
    prefix = localePrefix(locale);
  // The page's language from its URL: blog pages can be in a blog-only
  // language (e.g. /de/blog) while the menu itself is in English.
  const urlLanguage = (pathname.match(LOCALE_SEGMENT)?.[1] ??
    "en") as AppLocale;
  const blog = path === "/blog" || path.startsWith("/blog/");
  const { alternates } = useBlogLanguageAlternates();
  const languagePath = (language: string) =>
    path.startsWith("/blog/")
      ? alternates?.find((a) => a.language === language)?.path || "/blog"
      : path;

  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const sheetId = useId();
  const [scrolled, setScrolled] = useState(false);
  // The page the phone menu was opened on: moving to another page closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  // Scrolled once the 24px marker at the top of the page leaves the screen.
  useEffect(() => {
    const marker = sentinel.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  // While the menu covers the page: no page scroll, and it closes if the
  // window grows into the desktop layout.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const desktop = window.matchMedia(DESKTOP);
    const closeOnDesktop = () => {
      if (desktop.matches) setOpenOn(null);
    };
    root.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      root.style.overflow = "";
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const t = (key: string) => label(settings, locale, key);
  const dinner = path.startsWith("/romantic-dinners");
  const links = [
    ["", "navHome"],
    ["proposals", "navProposals"],
    ["romantic-dinners", "navDinners"],
    ["how-it-works", "navHow"],
    ["faq", "navFaq"],
    ["contact", "contactUsLabel"],
  ];
  // The page itself, or (for gold) a page inside its section.
  const isPage = (href: string) => path === `/${href}`;
  const inSection = (href: string) =>
    isPage(href) || (href !== "" && path.startsWith(`/${href}/`));
  const ctaHref = `${prefix}/${dinner ? "romantic-dinners" : "proposals"}`;
  const ctaLabel = t(dinner ? "planCelebration" : "planProposal");
  const languageHref = (language: AppLocale) => {
    const target = languagePath(language);
    // Blog-only languages always have their prefix (localePrefix is for
    // site languages, where English has none).
    const languagePrefix = isSiteLocale(language)
      ? localePrefix(language)
      : `/${language}`;
    return languagePrefix
      ? `${languagePrefix}${target === "/" ? "" : target}`
      : target;
  };
  const languageMenu = (inline: boolean) => (
    <LanguageMenu
      current={urlLanguage}
      languages={blog ? ALL_LOCALES : SITE_LOCALES}
      hrefFor={languageHref}
      label={t("languageLabel")}
      inline={inline}
      onPick={inline ? close : undefined}
    />
  );

  const solid = path !== "/" || scrolled || open;
  return (
    <>
      <div
        ref={sentinel}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-6 w-px"
      />
      <header
        ref={header}
        className={`sticky top-0 z-40 border-b text-ivory [--header-h:88px] [transition:background-color_0.25s,box-shadow_0.25s] motion-reduce:[transition:none] upto700:[--header-h:72px] [&_:focus-visible]:[outline-offset:5px] [&_:focus-visible]:[outline:2px_solid_#cfae70] ${path === "/" ? "-mb-(--header-h)" : ""} ${
          !solid
            ? "border-[#ffffff18] bg-transparent bg-[linear-gradient(#0b0b0cbf,#0b0b0c40)]"
            : open
              ? // Solid while the menu is open: a backdrop filter would make
                // the header, not the screen, the menu's frame.
                "border-gold/20 bg-black"
              : `border-gold/20 bg-black/90 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-black ${scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.35)]" : ""}`
        }`}
        onKeyDown={(event) => {
          if (!open) return;
          if (event.key === "Escape") {
            close();
            menuButton.current?.focus();
            return;
          }
          // Keep focus in the header: the page behind the menu is covered.
          if (event.key !== "Tab" || !header.current) return;
          const focusable = [
            ...header.current.querySelectorAll<HTMLElement>("a[href], button"),
          ].filter((element) => element.getClientRects().length > 0);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="m-auto flex min-h-(--header-h) max-w-[1280px] items-center justify-between gap-6 px-6">
          <a
            href={prefix || "/"}
            aria-label={`${companyName || "Punta Cana Proposal Packages"} — ${t("navHome")}`}
          >
            {logo ? (
              <img
                src={logo}
                alt={companyName || "Punta Cana Proposal Packages"}
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-contain upto700:h-[60px] upto700:w-[60px]"
              />
            ) : (
              <span>{companyName || "Punta Cana Proposal Packages"}</span>
            )}
          </a>
          <nav
            className="flex items-center gap-4 text-[13px] tracking-[0.1em] uppercase upto1280:hidden"
            aria-label={t("menu")}
          >
            {/* The logo links home, which leaves room for longer labels
                (French only fits without Home). */}
            {links.slice(1).map(([href, key]) => (
              <a
                key={href}
                href={`${prefix}/${href}`}
                aria-current={isPage(href) ? "page" : undefined}
                className={`relative py-2 whitespace-nowrap transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:bg-gold after:transition-transform after:duration-200 after:ease-out motion-reduce:transition-none motion-reduce:after:transition-none ${
                  inSection(href)
                    ? "text-gold after:scale-x-100"
                    : "text-ivory/80 after:scale-x-0 focus-visible:after:scale-x-100 [&:hover]:text-ivory [&:hover]:after:scale-x-100"
                }`}
              >
                {t(key)}
              </a>
            ))}
            <span aria-hidden className="h-5 w-px bg-ivory/20" />
            {languageMenu(false)}
            <a
              href={ctaHref}
              className="border border-gold px-5 py-2.5 whitespace-nowrap text-gold transition-[color,background-color,transform] duration-200 focus-visible:bg-gold focus-visible:text-black active:scale-[0.98] motion-reduce:transition-none [&:hover]:bg-gold [&:hover]:text-black"
            >
              {ctaLabel}
            </a>
          </nav>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls={sheetId}
            onClick={() => setOpenOn(open ? null : pathname)}
            className="hidden min-h-11 cursor-pointer items-center gap-2 px-1 text-[13px] tracking-[0.12em] text-ivory uppercase transition-colors duration-200 upto1280:flex [&:hover]:text-gold"
          >
            {open ? (
              <FiX aria-hidden className="text-[20px]" />
            ) : (
              <FiMenu aria-hidden className="text-[20px]" />
            )}
            {t("menu")}
          </button>
        </div>
        {open && (
          <div
            id={sheetId}
            className="fixed inset-x-0 top-(--header-h) bottom-0 hidden overflow-y-auto bg-black motion-safe:animate-[ec-sheet-in_200ms_ease-out] upto1280:block"
          >
            <nav
              aria-label={t("menu")}
              className="m-auto flex min-h-full max-w-[640px] flex-col px-6 pt-4 pb-[max(24px,env(safe-area-inset-bottom))]"
            >
              <ul>
                {links.map(([href, key], index) => (
                  <li
                    key={href}
                    className="border-b border-gold/15 motion-safe:animate-[ec-rise_300ms_ease-out_both]"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <a
                      href={`${prefix}/${href}`}
                      aria-current={isPage(href) ? "page" : undefined}
                      onClick={close}
                      className={`flex min-h-14 items-center gap-3 font-display text-[26px] transition-colors duration-200 ${inSection(href) ? "text-gold" : "text-ivory [&:hover]:text-gold"}`}
                    >
                      {inSection(href) && (
                        <span aria-hidden className="h-px w-5 bg-gold" />
                      )}
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8">{languageMenu(true)}</div>
              <div className="mt-auto pt-8">
                <a
                  href={ctaHref}
                  onClick={close}
                  className="block bg-gold px-5 py-4 text-center text-[13px] tracking-[0.12em] text-black uppercase transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none"
                >
                  {ctaLabel}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
