"use client";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import SanityPhoto from "@/components/ui/SanityPhoto";
import { localePrefix } from "@/i18n/locales";
import type { Image, Locale } from "@/lib/experience/types";
import { buttonClass } from "../ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts, homeH3, homeIcon } from "./styles";

/**
 * Proposal or romantic dinner: two choices beside a photo whose button
 * goes to the chosen page.
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
        <SanityPhoto
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
