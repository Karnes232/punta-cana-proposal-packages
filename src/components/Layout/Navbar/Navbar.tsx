"use client";
import { useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { useBlogLanguageAlternates } from "@/components/BlogLanguageAlternates/BlogLanguageAlternatesContext";
import { ALL_LOCALES, localePrefix, SITE_LOCALES } from "@/i18n/locales";
import { label } from "@/lib/experience/labels";
import type { Locale, Settings } from "@/lib/experience/types";
import DesktopNav from "./DesktopNav";
import { keepFocusInside } from "./focus";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";
import NavbarLogo from "./NavbarLogo";
import { isBlogPath, languageHref, pagePath } from "./navigation";
import type { CallToAction, LanguageOptions, Translate } from "./types";
import { useMobileMenu } from "./useMobileMenu";
import { useScrolled } from "./useScrolled";

/**
 * The site header: logo, then the desktop bar or (up to 1280px) the Menu
 * button and its full-screen sheet. Transparent over the home page's photo
 * until the page scrolls.
 */
export default function Navbar({
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
  const pathname = usePathname() || "/";
  const { path, urlLanguage } = pagePath(pathname);
  const prefix = localePrefix(locale);
  const { alternates } = useBlogLanguageAlternates();
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheetId = useId();
  const [sentinel, scrolled] = useScrolled();
  const menu = useMobileMenu(pathname);

  const t: Translate = (key) => label(settings, locale, key);
  const dinner = path.startsWith("/romantic-dinners");
  const cta: CallToAction = {
    href: `${prefix}/${dinner ? "romantic-dinners" : "proposals"}`,
    label: t(dinner ? "planCelebration" : "planProposal"),
  };
  const languages: LanguageOptions = {
    current: urlLanguage,
    languages: isBlogPath(path) ? ALL_LOCALES : SITE_LOCALES,
    hrefFor: (language) => languageHref(language, path, alternates),
    label: t("languageLabel"),
  };

  const solid = path !== "/" || scrolled || menu.open;
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
            : menu.open
              ? // Solid while the menu is open: a backdrop filter would make
                // the header, not the screen, the menu's frame.
                "border-gold/20 bg-black"
              : `border-gold/20 bg-black/90 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-black ${scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.35)]" : ""}`
        }`}
        onKeyDown={(event) => {
          if (!menu.open || !header.current) return;
          if (event.key === "Escape") {
            menu.close();
            menuButton.current?.focus();
            return;
          }
          keepFocusInside(event, header.current);
        }}
      >
        <div className="m-auto flex min-h-(--header-h) max-w-[1280px] items-center justify-between gap-6 px-6">
          <NavbarLogo
            href={prefix || "/"}
            logo={logo}
            companyName={companyName}
            homeLabel={t("navHome")}
          />
          <DesktopNav
            path={path}
            prefix={prefix}
            t={t}
            languages={languages}
            cta={cta}
          />
          <MenuButton
            ref={menuButton}
            open={menu.open}
            controls={sheetId}
            label={t("menu")}
            onClick={menu.toggle}
          />
        </div>
        {menu.open && (
          <MobileMenu
            id={sheetId}
            path={path}
            prefix={prefix}
            t={t}
            languages={languages}
            cta={cta}
            onClose={menu.close}
          />
        )}
      </header>
    </>
  );
}
