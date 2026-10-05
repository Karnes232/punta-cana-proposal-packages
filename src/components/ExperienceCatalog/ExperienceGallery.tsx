"use client";
import NextImage from "next/image";
import { useRef, useState } from "react";
import type { Image, Photo, Locale, Settings } from "@/lib/experience/types";
import { local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";

const controlClass = "min-h-8 min-w-8 cursor-pointer";

export default function ExperienceGallery({
  selectedStyleImage,
  gallery,
  locale,
  settings,
}: {
  selectedStyleImage?: Image;
  gallery: Photo[];
  locale: Locale;
  settings: Settings;
}) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const start = useRef<number | null>(null);
  const slides = [
    ...(selectedStyleImage?.url
      ? [{ image: selectedStyleImage, alt: selectedStyleImage.alt }]
      : []),
    ...gallery,
  ].filter(
    (p, index, all) =>
      p.image?.url &&
      all.findIndex((other) => other.image?.url === p.image?.url) === index,
  );
  if (!slides.length) return null;
  const index = Math.min(galleryIndex, slides.length - 1),
    slide = slides[index];
  const move = (delta: number) =>
    setGalleryIndex((index + delta + slides.length) % slides.length);
  return (
    <div
      className="relative touch-pan-y"
      data-testid="gallery"
      tabIndex={0}
      aria-label={label(settings, locale, "photo")}
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
      onTouchStart={(e) => {
        start.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (start.current !== null) {
          const distance = start.current - e.changedTouches[0].clientX;
          if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1);
          start.current = null;
        }
      }}
    >
      <NextImage
        src={slide.image!.url!}
        sizes="(max-width: 800px) 100vw, (max-width: 1200px) 80vw, 1000px"
        quality={80}
        alt={local(slide.alt || slide.image?.alt, locale)}
        loading="lazy"
        width={1000}
        height={750}
        className="aspect-[4/3] w-full animate-[ec-photo_180ms_ease] object-cover in-[.ec-proposal-card]:aspect-[3/2] in-[.ec-proposal-card]:h-auto"
      />
      {"caption" in slide && local(slide.caption, locale) && (
        <p className="px-[15px] text-[0.8rem]">
          {local(slide.caption, locale)}
        </p>
      )}
      {slides.length > 1 && (
        <div className="flex justify-between gap-2.5 bg-white px-4 py-2 in-[.ec-proposal-card]:bg-[#141416] in-[.ec-proposal-card]:px-3 in-[.ec-proposal-card]:py-0.5 in-[.ec-proposal-card]:text-gold">
          <button
            type="button"
            className={controlClass}
            onClick={() => move(-1)}
            aria-label={label(settings, locale, "previous")}
          >
            ←
          </button>
          <div>
            {slides.map((_, i) => (
              <button
                type="button"
                className={controlClass}
                key={i}
                aria-label={`${label(settings, locale, "photo")} ${i + 1}`}
                aria-current={index === i ? "true" : undefined}
                onClick={() => setGalleryIndex(i)}
              >
                {index === i ? "●" : "○"}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={controlClass}
            onClick={() => move(1)}
            aria-label={label(settings, locale, "next")}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
