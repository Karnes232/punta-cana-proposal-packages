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
import {
  buttonClass,
  eyebrowClass,
  homeButtonIcon,
  homeButtonParts,
  homeH3,
  homeIcon,
} from "./styles";
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
    <div className="grid grid-cols-[1fr_1.2fr] gap-6 upto700:grid-cols-[1fr]">
      <div className="grid gap-4">
        {["proposal", "dinner"].map((kind, i) => (
          <button
            key={kind}
            className={`cursor-pointer border p-8 text-left [transition:border-color_0.2s,background_0.2s] first:py-10 ${selected === i ? "border-[#9b773d] bg-[#cfae700e]" : "border-[#ded5c4]"}`}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span className="mb-4 block text-[14px] text-[#9b773d]">
              0{i + 1}
            </span>
            <h3 className={homeH3}>{copy[kind + "Choice"]}</h3>
            <p className="mb-0 text-[16px]">{copy[kind + "Description"]}</p>
            <FiArrowRight aria-hidden="true" className={homeIcon} />
          </button>
        ))}
      </div>
      <div className="relative min-h-[480px] overflow-hidden upto700:min-h-[380px]">
        <HomePhoto
          photo={images[selected]}
          locale={locale}
          className="object-cover [transition:transform_0.4s] [:hover>&]:[transform:scale(1.03)]"
        />
        <a
          className={`${buttonClass(homeButtonParts)} absolute right-6 bottom-6 left-6`}
          href={`${prefix}/${selected === 0 ? "proposals" : "romantic-dinners"}`}
        >
          {copy[selected === 0 ? "exploreProposals" : "exploreDinners"]}
          <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
        </a>
      </div>
    </div>
  );
}
const lightboxButton =
  "grid min-h-11 min-w-11 cursor-pointer place-items-center";

const journeyIcons = [FiMapPin, FiTruck, FiSun, FiCamera, FiShield];
export function PickupJourney({
  locale,
  label,
  steps,
}: {
  locale: Locale;
  label: string;
  steps: { title: string; text: string; photo?: Image }[];
}) {
  const [selected, setSelected] = useState(0);
  const Icon = journeyIcons[selected];
  return (
    <div>
      <div
        className="mx-0 mt-10 mb-6 grid grid-cols-[repeat(5,1fr)] gap-2 upto700:grid-cols-[1fr] upto700:gap-1"
        role="group"
        aria-label={label}
      >
        {steps.map((step, i) => {
          const StepIcon = journeyIcons[i];
          return (
            <button
              key={step.title}
              aria-pressed={selected === i}
              className={`flex cursor-pointer flex-col items-center gap-4 border-b p-4 text-[14px] upto700:flex-row upto700:text-left ${selected === i ? "border-gold bg-[#cfae700a] text-gold" : "border-b-[#cfae7033]"}`}
              onClick={() => setSelected(i)}
            >
              <StepIcon aria-hidden="true" className={`h-6 w-6 ${homeIcon}`} />
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>
      <div
        className="grid min-h-[360px] grid-cols-[1fr_1fr] border border-[#cfae7033] upto700:grid-cols-[1fr]"
        aria-live="polite"
      >
        <div className="relative grid min-h-[320px] place-items-center bg-[#141416] upto700:min-h-[240px]">
          {steps[selected].photo?.url ? (
            <HomePhoto
              photo={steps[selected].photo}
              locale={locale}
              className="object-cover"
            />
          ) : (
            <Icon
              aria-hidden="true"
              className={`h-[100px] w-[100px] [stroke-width:1] ${homeIcon}`}
            />
          )}
        </div>
        <div className="self-center p-12 upto700:p-6">
          <span className={eyebrowClass()}>0{selected + 1} / 05</span>
          <h3 className={homeH3}>{steps[selected].title}</h3>
          <p className="text-[16px] text-[#c7c2b9]">{steps[selected].text}</p>
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
            <HomePhoto
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
          <HomePhoto
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
