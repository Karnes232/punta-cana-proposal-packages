"use client";

import { useRef, useState, useEffect } from "react";
import MoreBlogsCard from "./MoreBlogsCard";

const MoreBlogsCarousel = ({
  blogs,
  locale,
}: {
  blogs: any[];
  locale: string;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const readMoreLabel = locale === "es" ? "Leer Historia" : "Read Story";
  const prevLabel = locale === "es" ? "Anterior" : "Previous";
  const nextLabel = locale === "es" ? "Siguiente" : "Next";

  // How far to scroll per button press — one card width + gap
  const SCROLL_AMOUNT = 380;

  function updateButtons() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateButtons);
  }, [blogs]);

  function scrollBy(direction: "prev" | "next") {
    trackRef.current?.scrollBy({
      left: direction === "next" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  }
  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {blogs.map((blog) => (
          <div
            key={blog.slug}
            className="shrink-0 w-[80vw] sm:w-[45vw] lg:w-[360px] snap-start"
          >
            <MoreBlogsCard
              blog={blog}
              readMoreLabel={readMoreLabel}
              locale={locale}
            />
          </div>
        ))}
      </div>

      {/* Prev / Next buttons — only shown when scrollable */}
      {blogs.length > 1 && (
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => scrollBy("prev")}
            disabled={!canPrev}
            aria-label={prevLabel}
            className="w-10 h-10 flex items-center justify-center border border-gold/30 text-black/40 transition-all duration-300 hover:border-gold hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            onClick={() => scrollBy("next")}
            disabled={!canNext}
            aria-label={nextLabel}
            className="w-10 h-10 flex items-center justify-center border border-gold/30 text-black/40 transition-all duration-300 hover:border-gold hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreBlogsCarousel;
