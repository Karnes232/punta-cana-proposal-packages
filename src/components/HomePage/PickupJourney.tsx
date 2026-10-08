"use client";
import { useState } from "react";
import { FiCamera, FiMapPin, FiShield, FiSun, FiTruck } from "react-icons/fi";
import SanityPhoto from "@/components/ui/SanityPhoto";
import type { Image, Locale } from "@/lib/experience/types";
import { eyebrowClass } from "../ExperienceCatalog/styles";
import { homeH3, homeIcon } from "./styles";

const journeyIcons = [FiMapPin, FiTruck, FiSun, FiCamera, FiShield];

/**
 * The five steps of the day as buttons; the chosen one shows its photo (or
 * its icon, large) beside its text.
 */
export default function PickupJourney({
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
            <SanityPhoto
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
