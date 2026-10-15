"use client";
import NextImage from "next/image";
import { framedImage } from "@/sanity/lib/image";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Image, Photo, Locale, Settings } from "@/lib/experience/types";
import { local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";

const arrowClass =
  "grid size-11 cursor-pointer place-items-center text-(--ec-ink) [transition:color_0.2s] hover:text-accent";

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
        {...framedImage(slide.image!.url!, slide.image)}
        sizes="(max-width: 800px) 100vw, (max-width: 1200px) 80vw, 1000px"
        quality={80}
        alt={local(slide.alt || slide.image?.alt, locale)}
        loading="lazy"
        width={1000}
        height={750}
        className="aspect-[4/3] w-full md:aspect-[3/2] animate-[ec-photo_180ms_ease] object-cover in-[.ec-proposal-card]:aspect-[3/2] in-[.ec-proposal-card]:h-auto"
      />
      {"caption" in slide && local(slide.caption, locale) && (
        <p className="px-[15px] text-[0.8rem]">
          {local(slide.caption, locale)}
        </p>
      )}
      {slides.length > 1 && (
        <div className="flex items-center justify-between gap-2.5 bg-surface px-2 in-[.ec-proposal-card]:bg-[#141416]">
          <button
            type="button"
            className={arrowClass}
            onClick={() => move(-1)}
            aria-label={label(settings, locale, "previous")}
          >
            <FiChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <div className="flex items-center">
            {slides.map((_, i) => (
              <button
                type="button"
                className="group grid h-11 w-6 cursor-pointer place-items-center"
                key={i}
                aria-label={`${label(settings, locale, "photo")} ${i + 1}`}
                aria-current={index === i ? "true" : undefined}
                onClick={() => setGalleryIndex(i)}
              >
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full border [transition:background-color_0.2s] ${index === i ? "border-accent bg-accent" : "border-accent/60 group-hover:bg-accent/40"}`}
                />
              </button>
            ))}
            <span
              aria-hidden="true"
              className="ml-3 text-[13px] text-(--ec-muted) tabular-nums"
            >
              {index + 1} / {slides.length}
            </span>
          </div>
          <button
            type="button"
            className={arrowClass}
            onClick={() => move(1)}
            aria-label={label(settings, locale, "next")}
          >
            <FiChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
