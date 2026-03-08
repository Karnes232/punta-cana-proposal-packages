"use client";

import { useState, useEffect } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarCTA from "./NavbarCTA";
import NavbarMobileToggle from "./NavbarMobileToggle";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { useTranslations } from "next-intl";

interface NavbarProps {
  logo: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  } | null;
}

export default function Navbar({ logo }: NavbarProps) {
  const t = useTranslations("Navbar");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 bg-black
          transition-all duration-300
          ${
            scrolled
              ? "border-b border-gold/30 shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
              : "border-b border-gold/15"
          }
        `}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center gap-6">
          {/* Col 1 — Logo */}
          <NavbarLogo logo={logo} />

          {/* Col 2 — Links (centered) */}
          <div className="hidden lg:flex justify-center">
            <NavbarLinks links={NAV_LINKS} />
          </div>

          {/* Col 3 — CTA + Mobile toggle */}
          <div className="flex items-center justify-end">
            <NavbarCTA href="/contact" label={t("contact")} />
            <NavbarMobileToggle
              isOpen={menuOpen}
              onToggle={() => setMenuOpen((prev) => !prev)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <NavbarMobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />

      {/* Spacer so page content isn't hidden under fixed navbar */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
