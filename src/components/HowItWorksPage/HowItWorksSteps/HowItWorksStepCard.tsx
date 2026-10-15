import type { IconType } from "react-icons";
import {
  FiCalendar,
  FiGift,
  FiHeart,
  FiMessageCircle,
  FiStar,
} from "react-icons/fi";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";

// Choose, connect, confirm, relax, the moment; later steps reuse the last.
const stepIcons: IconType[] = [
  FiGift,
  FiMessageCircle,
  FiCalendar,
  FiStar,
  FiHeart,
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksStepCardProps {
  step: {
    label: string;
    title: string;
    description: string;
  };
  /** Position in the list; odd positions sit on the right on desktop. */
  index: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * One step: an icon, then its number and label, title and description.
 * Stacked on phones; on desktop every second step mirrors to the right.
 */
export default function HowItWorksStepCard({
  step,
  index,
}: HowItWorksStepCardProps) {
  const Icon = stepIcons[Math.min(index, stepIcons.length - 1)];
  const number = (index + 1).toString().padStart(2, "0");
  const mirrored = index % 2 === 1;

  return (
    <li
      className={`flex flex-col gap-5 md:w-[60%] md:gap-8 ${
        mirrored
          ? "md:ml-auto md:flex-row-reverse md:text-right"
          : "md:flex-row"
      }`}
    >
      <div
        className="flex size-14 shrink-0 items-center justify-center border border-gold/40 text-gold"
        aria-hidden="true"
      >
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col gap-3">
        <p className={eyebrowClass()}>
          {number} · {step.label}
        </p>
        <h3 className="font-display text-[clamp(1.5rem,2.4vw,1.9rem)] leading-[1.25] font-normal text-balance text-ink">
          {step.title}
        </h3>
        <p
          className={`max-w-[52ch] text-[16px] leading-[1.75] text-pretty text-body ${
            mirrored ? "md:ml-auto" : ""
          }`}
        >
          {step.description}
        </p>
      </div>
    </li>
  );
}
