// Client Component
// Handles all interactive navbar behavior:
//   - Scroll detection: listens to window scroll and sets `scrolled` state.
//     Rather than re-rendering the server-rendered <header>, it writes a
//     `data-scrolled` attribute onto it via an inline <script> — this lets
//     the CSS `data-[scrolled=true]:*` selectors in Navbar.tsx react instantly.
//   - Mobile menu: tracks open/closed state and locks body scroll while open.
//   - Language switcher and nav links are rendered here so they can read
//     the current locale from next-intl's useTranslations/useLocale hooks.

"use client";

import { useState, useEffect } from "react";
import NavbarLinks from "./NavbarLinks";
import NavbarCTA from "./NavbarCTA";
import NavbarMobileToggle from "./NavbarMobileToggle";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

export default function NavbarClient() {
  const t = useTranslations("Navbar");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const NAV_LINKS = [
    { label: t("classic"), href: "/classic-proposals" },
    { label: t("modern"), href: "/modern-proposals" },
    { label: t("dining"), href: "/dining-proposals" },
    { label: t("stories"), href: "/stories" },
    { label: t("howItWorks"), href: "/how-it-works" },
  ];

  return (
    <>
      {/* Scroll-aware border — applied to the parent via data attribute */}
      <style>{`
        [data-scrolled="true"] { 
          border-bottom-color: rgba(207,174,112,0.3);
          box-shadow: 0 4px 40px rgba(0,0,0,0.6);
        }
      `}</style>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('navbar')?.setAttribute('data-scrolled', ${scrolled})`,
        }}
      />

      {/* Desktop links + CTA */}
      <div className="hidden lg:flex justify-center">
        <NavbarLinks links={NAV_LINKS} />
      </div>
      <div className="flex items-center justify-end gap-4">
        <div className="hidden lg:flex items-center justify-end gap-4">
          <LanguageSwitcher />
        </div>
        <NavbarCTA />
        <NavbarMobileToggle
          isOpen={menuOpen}
          onToggle={() => setMenuOpen((p) => !p)}
        />
      </div>

      {/* Mobile drawer */}
      <NavbarMobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
