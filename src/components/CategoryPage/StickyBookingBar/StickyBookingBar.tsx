"use client";

import { useState, useEffect, useRef } from "react";
import { useCustomization } from "@/components/CategoryPage/CustomizationSelector/CustomizationContext";

interface StickyBookingBarProps {
  labels: {
    startingAt: string;
    bookNow: string;
    selectPackage: string;
  };
}

export default function StickyBookingBar({ labels }: StickyBookingBarProps) {
  const { state, totalPrice } = useCustomization();
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        // Show after scrolling past 70vh (roughly past the hero)
        const pastHero = window.scrollY > window.innerHeight * 0.7;

        // Hide when the booking form is in viewport
        const bookingEl = document.getElementById("booking");
        let bookingVisible = false;
        if (bookingEl) {
          const rect = bookingEl.getBoundingClientRect();
          bookingVisible = rect.top < window.innerHeight && rect.bottom > 0;
        }

        setVisible(pastHero && !bookingVisible);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const displayPrice = totalPrice ?? state.selectedPackage?.price ?? null;

  return (
    <div
      className={`
        fixed bottom-0 inset-x-0 z-50 lg:hidden
        transition-transform duration-300 ease-out
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
      role="complementary"
      aria-label="Booking bar"
    >
      {/* Top edge — subtle gold line */}
      <div className="h-px bg-gold/30" aria-hidden="true" />

      {/* Bar */}
      <div className="bg-black/95 backdrop-blur-md px-5 py-3.5 flex items-center justify-between gap-4">
        {/* Left: price or package info */}
        <div className="flex flex-col min-w-0">
          {state.selectedPackage ? (
            <>
              <span className="text-[11px] font-light text-white/50 truncate">
                {state.selectedPackage.name}
                {state.tier === "premium" && (
                  <span className="text-gold/60"> · Premium</span>
                )}
              </span>
              <span className="text-[18px] font-medium text-gold tabular-nums leading-tight">
                ${displayPrice?.toLocaleString()}
              </span>
            </>
          ) : (
            <>
              <span className="text-[11px] font-light text-white/40">
                {labels.selectPackage}
              </span>
              {displayPrice !== null && (
                <>
                  <span className="text-[10px] font-light tracking-[0.1em] uppercase text-white/35">
                    {labels.startingAt}
                  </span>
                  <span className="text-[18px] font-medium text-gold tabular-nums leading-tight">
                    ${displayPrice.toLocaleString()}
                  </span>
                </>
              )}
            </>
          )}
        </div>

        {/* Right: CTA button */}
        <button
          type="button"
          onClick={scrollToBooking}
          className="
            shrink-0 inline-flex items-center gap-2
            bg-gold text-black cursor-pointer
            text-[11px] font-medium tracking-[0.16em] uppercase
            px-6 py-3
            transition-all duration-300
            hover:bg-gold/90 active:scale-[0.97]
          "
        >
          {labels.bookNow}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </button>
      </div>

      {/* Safe area padding for notched devices */}
      <div className="bg-black/95 h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
