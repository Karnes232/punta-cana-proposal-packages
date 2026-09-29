"use client";
/* eslint-disable @next/next/no-img-element */
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
  const pathname = usePathname() || "/";
  const path = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  const prefix = locale === "es" ? "/es" : "";
  const links = [
    ["proposals", "proposalSectionTitle"],
    ["romantic-dinners", "dinnerSectionTitle"],
    ["contact", "contactUsLabel"],
  ];
  const items = (
    <>
      {links.map(([href, key]) => (
        <a key={href} href={`${prefix}/${href}`}>
          {label(settings, locale, key)}
        </a>
      ))}
      <div aria-label="Language / Idioma">
        <a
          href={path}
          lang="en"
          aria-current={locale === "en" ? "true" : undefined}
        >
          EN
        </a>{" "}
        /{" "}
        <a
          href={`/es${path === "/" ? "" : path}`}
          lang="es"
          aria-current={locale === "es" ? "true" : undefined}
        >
          ES
        </a>
      </div>
    </>
  );
  return (
    <header className="ec-header">
      <div className="ec-header-inner">
        <a
          href={prefix || "/"}
          className="ec-logo"
          aria-label={`${companyName || "Punta Cana Proposal Packages"} — Home`}
        >
          {logo ? (
            <img
              src={logo}
              alt={companyName || "Punta Cana Proposal Packages"}
              width={64}
              height={64}
            />
          ) : (
            <span>{companyName || "Punta Cana Proposal Packages"}</span>
          )}
        </a>
        <nav className="ec-nav">{items}</nav>
        <details className="ec-mobile">
          <summary>{label(settings, locale, "menu")}</summary>
          <nav>{items}</nav>
        </details>
      </div>
    </header>
  );
}
