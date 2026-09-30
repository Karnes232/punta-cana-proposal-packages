"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useBlogLanguageAlternates } from "@/components/LanguageSwitcher/BlogLanguageAlternatesContext";
import { usePathname } from "next/navigation";
import type { Locale, Settings } from "@/lib/experience/types";
import { label } from "@/lib/experience/labels";
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
    path = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/",
    prefix = locale === "es" ? "/es" : "";
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
  const items = (
    <>
      {links.map(([href, key]) => (
        <a
          key={href}
          href={`${prefix}/${href}`}
          aria-current={path === `/${href}` ? "page" : undefined}
          onClick={() => {
            if (mobile.current) mobile.current.open = false;
          }}
        >
          {t(key)}
        </a>
      ))}
      <div className="ec-languages" aria-label="Language / Idioma">
        <a
          href={languagePath("en")}
          lang="en"
          aria-current={locale === "en" ? "true" : undefined}
        >
          EN
        </a>
        <span aria-hidden="true"> / </span>
        <a
          href={`/es${languagePath("es") === "/" ? "" : languagePath("es")}`}
          lang="es"
          aria-current={locale === "es" ? "true" : undefined}
        >
          ES
        </a>
      </div>
      <a
        className="ec-nav-cta"
        href={`${prefix}/${dinner ? "romantic-dinners" : "proposals"}`}
      >
        {t(dinner ? "planCelebration" : "planProposal")}
      </a>
    </>
  );
  return (
    <header
      className={`ec-header ${path === "/" ? "ec-header-home" : ""} ${path === "/" && !scrolled ? "ec-header-hero" : ""}`}
    >
      <div className="ec-header-inner">
        <a
          className="ec-logo"
          href={prefix || "/"}
          aria-label={`${companyName || "Punta Cana Proposal Packages"} — ${t("navHome")}`}
        >
          {logo ? (
            <img
              src={logo}
              alt={companyName || "Punta Cana Proposal Packages"}
              width={88}
              height={88}
            />
          ) : (
            <span>{companyName || "Punta Cana Proposal Packages"}</span>
          )}
        </a>
        <nav className="ec-nav" aria-label={t("menu")}>
          {items}
        </nav>
        <details
          ref={mobile}
          className="ec-mobile"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              mobile.current!.open = false;
              mobile.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>{t("menu")}</summary>
          <nav aria-label={t("menu")}>{items}</nav>
        </details>
      </div>
    </header>
  );
}
