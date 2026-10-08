"use client";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import SanityPhoto from "@/components/ui/SanityPhoto";
import type { Image, Locale } from "@/lib/experience/types";
import { homeIcon } from "./styles";

const lightboxButton =
  "grid min-h-11 min-w-11 cursor-pointer place-items-center";

/**
 * A photo grid; a photo opens in a lightbox dialog, where the arrow buttons
 * and keys move through the photos.
 */
export default function MomentsGallery({
  photos,
  locale,
  copy,
}: {
  photos: Image[];
  locale: Locale;
  copy: Record<string, string>;
}) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const move = (delta: number) =>
    setSelected((i) => (i + delta + photos.length) % photos.length);
  return (
    <>
      <div className="grid grid-cols-[repeat(4,1fr)] gap-4 upto700:grid-cols-[1fr_1fr] upto700:gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.url}
            aria-label={`${copy.galleryOpen} ${i + 1}`}
            className="relative aspect-[3/4] cursor-zoom-in overflow-hidden nth-[5n+1]:[grid-column:span_2] nth-[5n+1]:aspect-[3/2]"
            onClick={() => {
              setSelected(i);
              dialog.current?.showModal();
            }}
          >
            <SanityPhoto
              photo={photo}
              locale={locale}
              className="object-cover [transition:transform_0.3s] [:hover>&]:[transform:scale(1.03)]"
            />
            <span
              aria-hidden="true"
              className="absolute right-4 bottom-4 bg-black px-3 py-1 text-ivory"
            >
              +
            </span>
          </button>
        ))}
      </div>
      <dialog
        className="m-auto max-h-[95svh] w-[min(1100px,95vw)] border border-[#cfae7055] bg-black p-6 text-ivory backdrop:bg-[#000d] upto700:p-3"
        ref={dialog}
        aria-label={copy.realMoments}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <button
          className={`ml-auto ${lightboxButton}`}
          onClick={() => dialog.current?.close()}
          aria-label={copy.close}
          autoFocus
        >
          <FiX className={homeIcon} />
        </button>
        <div className="relative h-[70svh] upto700:h-[60svh]">
          <SanityPhoto
            photo={photos[selected]}
            locale={locale}
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center gap-6">
          <button
            className={lightboxButton}
            onClick={() => move(-1)}
            aria-label={copy.previous}
          >
            <FiChevronLeft className={homeIcon} />
          </button>
          <p aria-live="polite" className="text-[16px] text-ivory">
            {selected + 1} / {photos.length}
          </p>
          <button
            className={lightboxButton}
            onClick={() => move(1)}
            aria-label={copy.next}
          >
            <FiChevronRight className={homeIcon} />
          </button>
        </div>
      </dialog>
    </>
  );
}
