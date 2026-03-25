"use client";

import Image from "next/image";

export interface OptionItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Preview image URL (from Sanity or static) */
  imageUrl?: string;
  /** Which tier(s) this option is available in */
  tier: "standard" | "premium" | "both";
}

interface OptionGroupProps {
  /** Section label (e.g. "Color Palette") */
  title: string;
  /** The options to display */
  options: OptionItem[];
  /** Currently selected option id */
  selectedId: string | null;
  /** Currently active tier — filters which options are shown */
  activeTier: "standard" | "premium";
  /** Callback when an option is selected */
  onSelect: (label: string) => void;
}

export default function OptionGroup({
  title,
  options,
  selectedId,
  activeTier,
  onSelect,
}: OptionGroupProps) {
  // Filter options by tier
  const visibleOptions = options.filter(
    (opt) => opt.tier === "both" || opt.tier === activeTier,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Group label */}
      <h4 className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
        {title}
      </h4>

      {/* Options row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {visibleOptions.map((opt) => {
          const isSelected = selectedId === opt.label;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.label)}
              className={`
                group/opt relative flex flex-col items-center gap-3 p-4
                border transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? "border-gold/60 bg-gold/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                }
              `}
              aria-pressed={isSelected}
            >
              {/* Image preview */}
              {opt.imageUrl ? (
                <div className="relative w-full aspect-[3/2] overflow-hidden">
                  <Image
                    src={opt.imageUrl}
                    alt={opt.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/opt:scale-105"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                </div>
              ) : (
                /* Color swatch fallback when no image */
                <div className="w-full aspect-[3/2] bg-gradient-to-br from-white/10 to-white/[0.03] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-gold/30 bg-gold/10" />
                </div>
              )}

              {/* Label */}
              <span
                className={`
                  text-[12px] font-light tracking-[0.08em]
                  transition-colors duration-300
                  ${isSelected ? "text-gold" : "text-white/60 group-hover/opt:text-white/80"}
                `}
              >
                {opt.label}
              </span>

              {/* Selected indicator — gold corner marks */}
              {isSelected && (
                <>
                  <div
                    className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/70"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/70"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
