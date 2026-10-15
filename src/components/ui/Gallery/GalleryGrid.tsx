"use client";

import { useState } from "react";
import { framedImage } from "@/sanity/lib/image";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import GalleryLightbox from "./GalleryLightbox";
import { GALLERY_VISIBLE_COUNT, type GalleryPhoto } from "./types";

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

/**
 * Columns and tile shape by photo count, so one or two photos fill the row
 * instead of leaving empty cells.
 */
function layoutFor(count: number) {
  if (count === 1) {
    return { grid: "grid-cols-1", tile: "aspect-[3/2]", firstTile: "" };
  }
  if (count === 2) {
    return { grid: "grid-cols-2", tile: "aspect-[4/3]", firstTile: "" };
  }
  return {
    grid: "grid-cols-2 md:grid-cols-3",
    tile: "aspect-square",
    // An odd count on two phone columns would leave the last photo alone, so
    // the first one spans the row instead.
    firstTile:
      count % 2 === 1
        ? "col-span-2 aspect-[3/2] md:col-span-1 md:aspect-square"
        : "",
  };
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const t = useTranslations("Gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = photos.slice(0, GALLERY_VISIBLE_COUNT);
  const remainingCount = photos.length - GALLERY_VISIBLE_COUNT;
  const hasOverflow = remainingCount > 0;
  const layout = layoutFor(visiblePhotos.length);

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
      <div className={`grid gap-2 ${layout.grid}`}>
        {visiblePhotos.map((photo, i) => {
          const isLastVisible = i === GALLERY_VISIBLE_COUNT - 1;
          const showOverlay = isLastVisible && hasOverflow;

          return (
            <button
              // Index first: a gallery can hold the same photo twice.
              key={`${i}-${photo.asset.url}`}
              type="button"
              onClick={() => openLightbox(i)}
              className={`group relative cursor-pointer overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${i === 0 && layout.firstTile ? layout.firstTile : layout.tile}`}
              aria-label={photo.alt ?? `Open photo ${i + 1}`}
            >
              <Image
                {...framedImage(photo.asset.url, photo)}
                alt={photo.alt ?? `Proposal photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                sizes={
                  visiblePhotos.length === 1
                    ? "(max-width: 1024px) 100vw, 1024px"
                    : "(max-width: 768px) 50vw, 33vw"
                }
              />

              {/* Default hover scrim */}
              <div
                className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15"
                aria-hidden="true"
              />

              {/* +N overflow tile */}
              {showOverlay && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60"
                  aria-hidden="true"
                >
                  <span className="font-display text-[clamp(28px,4vw,48px)] leading-none font-normal text-ivory">
                    +{remainingCount}
                  </span>
                  <span className="text-[13px] tracking-[0.12em] text-ivory/85 uppercase">
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
