"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function NavbarMobileMenu({
  isOpen,
  onClose,
  links,
}: NavbarMobileMenuProps) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`
          lg:hidden fixed top-0 right-0 h-full w-72 bg-black z-50
          border-l border-gold/20 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-gold/15">
        <LanguageSwitcher />   {/* 👈 replaces the "Menu" span */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-gold/70 hover:text-gold transition-colors duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 pt-8 gap-1 flex-1">
          {links.map(({ label, href }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
                className={`
                  text-[12px] font-light tracking-[0.16em] uppercase py-3
                  border-b border-white/5 transition-colors duration-200
                  ${isActive ? "text-gold" : "text-white/70 hover:text-gold"}
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile CTA */}
        <div className="px-6 pb-10">
          <Link
            href="/contact"
            onClick={onClose}
            className="
              block w-full text-center text-[11px] font-medium tracking-[0.18em] uppercase
              text-gold border border-gold px-6 py-3
              transition-all duration-300 hover:bg-gold hover:text-black
            "
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </>
  );
}
