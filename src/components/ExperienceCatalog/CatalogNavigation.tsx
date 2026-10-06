"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const mobile = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
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
  const languageMenu = (
    <LanguageMenu
      current={urlLanguage}
      languages={blog ? ALL_LOCALES : SITE_LOCALES}
      hrefFor={languageHref}
      label={t("languageLabel")}
    />
  );
  // The links render twice: in the desktop bar and in the mobile menu.
  const items = (inMenu: boolean) => (
    <>
      {links.map(([href, key]) => (
        <a
          key={href}
          href={`${prefix}/${href}`}
          aria-current={path === `/${href}` ? "page" : undefined}
          className={
            inMenu
              ? "upto1280:block upto1280:py-3"
              : href === "contact"
                ? // A later rule in the old stylesheet cancelled hover and
                  // current-page styling for the contact link; kept as-is.
                  "border-none whitespace-nowrap"
                : `whitespace-nowrap [&:hover]:text-gold ${path === `/${href}` ? "border-b border-b-gold text-gold" : ""}`
          }
          onClick={() => {
            if (mobile.current) mobile.current.open = false;
          }}
        >
          {t(key)}
        </a>
      ))}
      {/* On narrow screens the language menu sits in the header bar. */}
      {!inMenu && languageMenu}
      <a
        className={`border border-gold p-3 text-gold ${inMenu ? "upto1280:block" : "whitespace-nowrap"}`}
        href={`${prefix}/${dinner ? "romantic-dinners" : "proposals"}`}
      >
        {t(dinner ? "planCelebration" : "planProposal")}
      </a>
    </>
  );
  return (
    <header
      className={`sticky top-0 z-40 border-b text-ivory [transition:background_0.25s] motion-reduce:[animation:none] motion-reduce:[scroll-behavior:auto] motion-reduce:[transition:none] [&_:focus-visible]:[outline-offset:5px] [&_:focus-visible]:[outline:2px_solid_#cfae70] ${path === "/" ? "-mb-[104px] upto700:-mb-[88px]" : ""} ${path === "/" && !scrolled ? "border-[#ffffff18] bg-transparent bg-[linear-gradient(#0b0b0cbf,#0b0b0c40)]" : "border-[rgba(207,174,112,0.22)] bg-black"}`}
    >
      <div className="m-auto flex min-h-[104px] max-w-[1280px] items-center justify-between gap-6 px-6 py-2 upto1280:flex-wrap upto700:min-h-[88px] upto700:py-1">
        <a
          href={prefix || "/"}
          aria-label={`${companyName || "Punta Cana Proposal Packages"} — ${t("navHome")}`}
        >
          {logo ? (
            <img
              src={logo}
              alt={companyName || "Punta Cana Proposal Packages"}
              width={88}
              height={88}
              className="h-[88px] w-[88px] bg-[position:0_0] object-contain upto700:h-20 upto700:w-20"
            />
          ) : (
            <span>{companyName || "Punta Cana Proposal Packages"}</span>
          )}
        </a>
        <nav
          className="flex items-center gap-4 text-[14px] tracking-[0.07em] uppercase upto1280:hidden"
          aria-label={t("menu")}
        >
          {items(false)}
        </nav>
        <div className="hidden upto1280:ml-auto upto1280:block">
          {languageMenu}
        </div>
        <details
          ref={mobile}
          className="hidden upto1280:block upto1280:open:w-full"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              mobile.current!.open = false;
              mobile.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary className="upto1280:[[open]>&]:text-right">
            {t("menu")}
          </summary>
          <nav
            className="upto1280:static upto1280:bg-black upto1280:p-6 upto800:flex upto800:flex-col upto800:gap-5 upto800:border-b upto800:border-gold"
            aria-label={t("menu")}
          >
            {items(true)}
          </nav>
        </details>
      </div>
    </header>
  );
}
