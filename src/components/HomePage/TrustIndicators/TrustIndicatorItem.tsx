// Server Component
// Ivory background — gold is decorative (icon, top border).
// All text is black or gray.

import TrustIndicatorIcon, { TrustIconType } from "./TrustIndicatorIcon";

export interface TrustIndicatorItemProps {
  icon: TrustIconType;
  value: string; // e.g. "150+" or "5-Star"
  label: string; // e.g. "Proposals Planned"
  sublabel?: string; // optional small line below label
}

export default function TrustIndicatorItem({
  icon,
  value,
  label,
  sublabel,
}: TrustIndicatorItemProps) {
  return (
    <div
      className="
      group relative flex flex-col items-center text-center gap-5
      px-6 py-10
      border-t border-gold/30
      hover:border-gold/70
      transition-colors duration-300
    "
    >
      {/* Icon */}
      <TrustIndicatorIcon icon={icon} />

      {/* Value */}
      <div className="flex flex-col gap-1.5">
        <p
          className="
          font-display italic font-normal text-black leading-none
          text-[clamp(32px,3.5vw,48px)]
          tracking-tight
        "
        >
          {value}
        </p>

        {/* Label */}
        <p className="text-[12px] font-light tracking-[0.12em] uppercase text-gray">
          {label}
        </p>

        {/* Sublabel */}
        {sublabel && (
          <p className="text-[11px] font-light text-black/35 tracking-wide">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}
