// Server Component
// Renders the fixed header shell (logo + layout structure).
// All client-side behavior — scroll detection, mobile menu, language switcher —
// lives in NavbarClient so this file stays a server component and avoids
// sending unnecessary JS to the browser.

import NavbarLogo from "./NavbarLogo";
import NavbarClient from "./NavbarClient";

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
  return (
    <>
      <header
        id="navbar"
        className="
      fixed top-0 left-0 right-0 z-50 bg-black
      border-b border-gold/15
      transition-all duration-300
      data-[scrolled=true]:border-gold/30
      data-[scrolled=true]:shadow-[0_4px_40px_rgba(0,0,0,0.6)]
    "
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center gap-6">
          {/* Col 1 — Logo */}
          <NavbarLogo logo={logo} />
          <NavbarClient />
          {/* Col 2 — Links (centered) */}
          {/*   <div className="hidden lg:flex justify-center">
            <NavbarLinks links={NAV_LINKS} />
          </div>

          {/* Col 3 — CTA + Mobile toggle */}
          {/*  <div className="flex items-center justify-end">
            <NavbarCTA href="/contact" label={t("contact")} />
            <NavbarMobileToggle
            isOpen={menuOpen}
            onToggle={() => setMenuOpen((prev) => !prev)}
          />
        </div>
        */}
        </div>
      </header>

      {/* Mobile Menu */}
      {/*   <NavbarMobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />

      {/* Spacer so page content isn't hidden under fixed navbar */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
