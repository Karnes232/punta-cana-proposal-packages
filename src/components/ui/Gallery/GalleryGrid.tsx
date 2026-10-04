"use client";

import { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import GalleryLightbox from "./GalleryLightbox";
import { GALLERY_VISIBLE_COUNT, type GalleryPhoto } from "./types";

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const t = useTranslations("Gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = photos.slice(0, GALLERY_VISIBLE_COUNT);
  const remainingCount = photos.length - GALLERY_VISIBLE_COUNT;
  const hasOverflow = remainingCount > 0;

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function goPrev() {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }

  function goNext() {
    setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gold/10">
        {visiblePhotos.map((photo, i) => {
          const isLastVisible = i === GALLERY_VISIBLE_COUNT - 1;
          const showOverlay = isLastVisible && hasOverflow;

          return (
            <button
              key={photo.asset.url}
              onClick={() => openLightbox(i)}
              className="relative aspect-square overflow-hidden bg-black group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={photo.alt ?? `Open photo ${i + 1}`}
            >
              <Image
                src={photo.asset.url}
                alt={photo.alt ?? `Proposal photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Default hover scrim */}
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                aria-hidden="true"
              />

              {/* +N overflow tile */}
              {showOverlay && (
                <div
                  className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1"
                  aria-hidden="true"
                >
                  <span className="font-display font-normal italic text-white text-[clamp(28px,4vw,48px)] leading-none">
                    +{remainingCount}
                  </span>
                  <span className="text-[10px] font-body font-medium tracking-[0.18em] uppercase text-white/60">
                    {t("viewAll", { count: photos.length })}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox — rendered in a portal to escape stacking contexts */}
      {lightboxIndex !== null &&
        createPortal(
          <GalleryLightbox
            photos={photos}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />,
          document.body,
        )}
    </>
  );
}
