import type { ReassuranceItem } from "./types";
import {
  IconPrivate,
  IconTeam,
  IconInclusive,
  IconMemories,
} from "./ReassuranceIcons";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  private: IconPrivate,
  team: IconTeam,
  inclusive: IconInclusive,
  memories: IconMemories,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksReassuranceItemProps {
  item: ReassuranceItem;
  /** Index used to stagger the border-top reveal on hover */
  index: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksReassuranceItem({
  item,
}: HowItWorksReassuranceItemProps) {
  const Icon = iconMap[item.id];

  return (
    <div
      className="
        group
        flex flex-col items-center gap-4
        px-6 py-8
        border-l border-gold/15
        first:border-l-0
        text-center
        transition-colors duration-300
      "
    >
      {/* Icon container */}
      <div
        className="
          w-14 h-14
          flex items-center justify-center
          border border-gold/30
          rounded-sm
          text-gold/60
          transition-colors duration-300
          group-hover:border-gold/60
          group-hover:text-gold
        "
        aria-hidden="true"
      >
        {Icon && <Icon className="w-7 h-7" />}
      </div>

      {/* Title */}
      <h3 className="font-display font-normal text-white text-[clamp(15px,1.4vw,18px)] leading-tight">
        {item.title}
      </h3>

      {/* Gold hairline divider */}
      <span className="block w-6 h-px bg-gold/30" aria-hidden="true" />

      {/* Caption — decorative gold rule respected: this is gray text, not gold */}
      <p className="font-body font-light text-white/45 text-[13px] leading-[1.7] max-w-[180px]">
        {item.caption}
      </p>
    </div>
  );
}