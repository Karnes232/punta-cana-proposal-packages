"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import type { Image, Photo, Locale, Settings } from "@/lib/experience/types";
import { local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
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
  ].filter((p) => p.image?.url);
  if (!slides.length) return null;
  const index = Math.min(galleryIndex, slides.length - 1),
    slide = slides[index];
  const move = (delta: number) =>
    setGalleryIndex((index + delta + slides.length) % slides.length);
  return (
    <div
      className="ec-gallery"
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
      <img
        src={slide.image?.url}
        alt={local(slide.alt || slide.image?.alt, locale)}
        loading="lazy"
        width={1000}
        height={750}
      />
      {"caption" in slide && local(slide.caption, locale) && (
        <p className="ec-caption">{local(slide.caption, locale)}</p>
      )}
      {slides.length > 1 && (
        <div className="ec-gallery-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={label(settings, locale, "previous")}
          >
            ←
          </button>
          <div>
            {slides.map((_, i) => (
              <button
                type="button"
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
