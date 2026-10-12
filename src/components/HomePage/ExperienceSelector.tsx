"use client";
import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import SanityPhoto from "@/components/ui/SanityPhoto";
import { localePrefix } from "@/i18n/locales";
import type { Image, Locale } from "@/lib/experience/types";
import { buttonClass } from "../ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts, homeH3 } from "./styles";

/**
 * Proposal or romantic dinner: two choices (the chosen one checked) beside
 * a photo whose button goes to the chosen page.
 */
export default function ExperienceSelector({
  locale,
  copy,
  images,
}: {
  locale: Locale;
  copy: Record<string, string>;
  images: (Image | undefined)[];
}) {
  const [selected, setSelected] = useState(0);
  const prefix = localePrefix(locale);
  return (
    <div className="grid grid-cols-[1fr_1.2fr] gap-6 upto700:grid-cols-[1fr]">
      <div className="grid gap-4">
        {["proposal", "dinner"].map((kind, i) => (
          <button
            key={kind}
            className={`flex cursor-pointer flex-col justify-center border p-8 text-left [transition:border-color_0.2s,background_0.2s] upto700:p-6 ${selected === i ? "border-[#9b773d] bg-[#cfae7014]" : "border-[#ded5c4] hover:border-[#cfae70]"}`}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span className="flex items-start justify-between gap-4">
              <h3 className={homeH3}>{copy[kind + "Choice"]}</h3>
              <span
                className={`mt-1 grid h-8 w-8 shrink-0 place-items-center border ${selected === i ? "border-gold bg-gold text-black" : "border-[#ded5c4] text-[#9b773d]"}`}
              >
                {selected === i ? (
                  <FiCheck aria-hidden="true" />
                ) : (
                  <FiArrowRight aria-hidden="true" />
                )}
              </span>
            </span>
            <p className="mb-0 text-[16px]">{copy[kind + "Description"]}</p>
          </button>
        ))}
      </div>
      <div className="relative min-h-[480px] overflow-hidden upto700:min-h-[380px]">
        <SanityPhoto
          key={selected}
          photo={images[selected]}
          locale={locale}
          className="animate-[ec-photo_0.4s_ease-out] object-cover [transition:transform_0.4s] [:hover>&]:[transform:scale(1.03)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(0deg,#0b0b0cb3,transparent)]"
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
