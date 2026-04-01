"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import PackageGalleryLightbox from "./PackageGalleryLightbox";

const AUTO_SCROLL_MS = 4500;

interface GalleryImage {
  asset: {
    url: string;
  };
  alt: string;
  caption: {
    en: string;
    es: string;
  };
}

interface PackageGalleryProps {
  /** Gallery images from Sanity — captions already locale-resolved */
  images: GalleryImage[];
  locale: "en" | "es";
}

export default function PackageGallery({
  images,
  locale,
}: PackageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPausedRef = useRef(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const advanceAutoScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const nearEnd = el.scrollLeft >= max - 4;
    if (nearEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: el.clientWidth * 0.65, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (autoPausedRef.current || lightboxIndex !== null) return;
      advanceAutoScroll();
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(id);
  }, [images.length, advanceAutoScroll, lightboxIndex]);

  if (!images.length) return null;

  const lightboxImages = images.map((img) => ({
    url: img.asset.url,
    alt: img.alt,
    caption: img.caption,
  }));

  return (
    <section className="relative bg-black overflow-hidden py-16 lg:py-24">
      {/* Subtle top/bottom border lines */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        aria-hidden="true"
      />

      {/* Arrow buttons — desktop only */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className="
          hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 items-center justify-center
          bg-black/60 border border-white/10 backdrop-blur-sm
          text-white/50 hover:text-gold hover:border-gold/40
          transition-all duration-300 cursor-pointer
        "
        aria-label="Scroll left"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        className="
          hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 items-center justify-center
          bg-black/60 border border-white/10 backdrop-blur-sm
          text-white/50 hover:text-gold hover:border-gold/40
          transition-all duration-300 cursor-pointer
        "
        aria-label="Scroll right"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Scrollable gallery — inner w-max mx-auto centers the row when it fits the viewport */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={() => {
          autoPausedRef.current = true;
        }}
        onMouseLeave={() => {
          autoPausedRef.current = false;
        }}
        onFocusCapture={() => {
          autoPausedRef.current = true;
        }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            autoPausedRef.current = false;
          }
        }}
      >
        <div className="flex w-max mx-auto gap-0 px-0 md:gap-4 md:px-6 lg:px-12">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative w-dvw shrink-0 snap-start cursor-pointer md:w-[340px] lg:w-[400px]"
              aria-label={`View photo ${i + 1}: ${img.alt}`}
            >
              {/* Image card */}
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-white/10 group-hover:border-gold/40 transition-colors duration-300">
                <Image
                  src={img.asset.url}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 340px, 400px"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/0 group-hover:text-white/70 transition-colors duration-300"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              {/* Caption */}
              {img.caption && (
                <p className="mt-3 text-[12px] font-light text-white/40 text-center group-hover:text-white/60 transition-colors duration-300">
                  {img.caption[locale as "en" | "es"]}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PackageGalleryLightbox
          images={lightboxImages}
          activeIndex={lightboxIndex}
          locale={locale}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + images.length) % images.length : 0,
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % images.length : 0,
            )
          }
        />
      )}
    </section>
  );
}
