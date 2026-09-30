"use client";
import NextImage from "next/image";
import { useRef, useState } from "react";
import {
  FiArrowRight,
  FiMapPin,
  FiTruck,
  FiSun,
  FiCamera,
  FiShield,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import type { Image, Locale } from "@/lib/experience/types";
import { local } from "@/lib/experience/normalize";
export function HomePhoto({
  photo,
  locale,
  priority = false,
  className = "",
}: {
  photo?: Image;
  locale: Locale;
  priority?: boolean;
  className?: string;
}) {
  return photo?.url ? (
    <NextImage
      className={className}
      src={photo.url}
      alt={local(photo.alt, locale)}
      fill
      sizes={priority ? "100vw" : "(max-width: 700px) 100vw, 65vw"}
      priority={priority}
      quality={80}
    />
  ) : null;
}
export function ExperienceSelector({
  locale,
  copy,
  images,
}: {
  locale: Locale;
  copy: Record<string, string>;
  images: (Image | undefined)[];
}) {
  const [selected, setSelected] = useState(0);
  const prefix = locale === "es" ? "/es" : "";
  return (
    <div className="lux-selector">
      <div className="lux-selector-options">
        {["proposal", "dinner"].map((kind, i) => (
          <button
            key={kind}
            className={selected === i ? "is-active" : ""}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span className="lux-index">0{i + 1}</span>
            <h3>{copy[kind + "Choice"]}</h3>
            <p>{copy[kind + "Description"]}</p>
            <FiArrowRight aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="lux-selector-image">
        <HomePhoto photo={images[selected]} locale={locale} />
        <a
          className="ec-button"
          href={`${prefix}/${selected === 0 ? "proposals" : "romantic-dinners"}`}
        >
          {copy[selected === 0 ? "exploreProposals" : "exploreDinners"]}
          <FiArrowRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
const journeyIcons = [FiMapPin, FiTruck, FiSun, FiCamera, FiShield];
export function PickupJourney({
  locale,
  steps,
}: {
  locale: Locale;
  steps: { title: string; text: string; photo?: Image }[];
}) {
  const [selected, setSelected] = useState(0);
  const Icon = journeyIcons[selected];
  return (
    <div className="lux-journey">
      <div
        className="lux-journey-buttons"
        role="group"
        aria-label={locale === "es" ? "Tu recorrido" : "Your journey"}
      >
        {steps.map((step, i) => {
          const StepIcon = journeyIcons[i];
          return (
            <button
              key={step.title}
              aria-pressed={selected === i}
              className={selected === i ? "is-active" : ""}
              onClick={() => setSelected(i)}
            >
              <StepIcon aria-hidden="true" />
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>
      <div className="lux-journey-panel" aria-live="polite">
        <div className="lux-journey-visual">
          {steps[selected].photo?.url ? (
            <HomePhoto photo={steps[selected].photo} locale={locale} />
          ) : (
            <Icon aria-hidden="true" className="lux-journey-symbol" />
          )}
        </div>
        <div>
          <span className="ec-eyebrow">0{selected + 1} / 05</span>
          <h3>{steps[selected].title}</h3>
          <p>{steps[selected].text}</p>
        </div>
      </div>
    </div>
  );
}
export function MomentsGallery({
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
      <div className="lux-moments">
        {photos.map((photo, i) => (
          <button
            key={photo.url}
            aria-label={`${copy.galleryOpen} ${i + 1}`}
            onClick={() => {
              setSelected(i);
              dialog.current?.showModal();
            }}
          >
            <HomePhoto photo={photo} locale={locale} />
            <span aria-hidden="true">+</span>
          </button>
        ))}
      </div>
      <dialog
        className="lux-lightbox"
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
          className="lux-lightbox-close"
          onClick={() => dialog.current?.close()}
          aria-label={copy.close}
          autoFocus
        >
          <FiX />
        </button>
        <div className="lux-lightbox-photo">
          <HomePhoto photo={photos[selected]} locale={locale} />
        </div>
        <div className="lux-lightbox-controls">
          <button onClick={() => move(-1)} aria-label={copy.previous}>
            <FiChevronLeft />
          </button>
          <p aria-live="polite">
            {selected + 1} / {photos.length}
          </p>
          <button onClick={() => move(1)} aria-label={copy.next}>
            <FiChevronRight />
          </button>
        </div>
      </dialog>
    </>
  );
}
