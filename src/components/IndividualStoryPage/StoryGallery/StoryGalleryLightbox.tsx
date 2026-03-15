"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryPhoto, StoryGalleryContent } from "./types";

interface StoryGalleryLightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  content: StoryGalleryContent;
  locale: "en" | "es";
}

export default function StoryGalleryLightbox({
  photos,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  content,
  locale,
}: StoryGalleryLightboxProps) {
  const photo = photos[activeIndex];
  const closeLabel =
    locale === "es" ? content.closeLabelEs : content.closeLabelEn;
  const prevLabel = locale === "es" ? content.prevLabelEs : content.prevLabelEn;
  const nextLabel = locale === "es" ? content.nextLabelEs : content.nextLabelEn;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt ?? "Photo lightbox"}
    >
      {/* ── Top bar: counter + close ── */}
      <div className="flex items-center justify-between px-6 py-5 shrink-0">
        <span className="text-[11px] font-body font-light tracking-[0.14em] text-white/40">
          {activeIndex + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="flex items-center gap-2 text-[11px] font-body font-medium tracking-[0.14em] uppercase text-white/50 hover:text-gold transition-colors duration-300"
        >
          {closeLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Photo + side nav ── */}
      <div className="flex-1 flex items-center justify-center gap-4 px-4 min-h-0">
        {/* Prev */}
        <button
          onClick={onPrev}
          aria-label={prevLabel}
          className="shrink-0 w-11 h-11 flex items-center justify-center border border-white/10 text-white/40 hover:border-gold/50 hover:text-gold transition-all duration-300 disabled:opacity-20"
          disabled={activeIndex === 0}
        >
          <svg
            width="14"
            height="14"
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

        {/* Image */}
        <div className="relative flex-1 h-full max-w-5xl">
          <Image
            key={photo.asset.url}
            src={photo.asset.url}
            alt={photo.alt ?? "Proposal photo"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          aria-label={nextLabel}
          className="shrink-0 w-11 h-11 flex items-center justify-center border border-white/10 text-white/40 hover:border-gold/50 hover:text-gold transition-all duration-300 disabled:opacity-20"
          disabled={activeIndex === photos.length - 1}
        >
          <svg
            width="14"
            height="14"
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

      {/* ── Caption + dot indicators ── */}
      <div className="shrink-0 flex flex-col items-center gap-4 px-6 py-5">
        {photo.caption && (
          <p className="text-[12px] font-body font-light text-white/50 tracking-[0.06em] text-center max-w-lg">
            {photo.caption}
          </p>
        )}
        <div className="flex items-center gap-2" aria-hidden="true">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-4 h-1 bg-gold" : "w-1 h-1 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
