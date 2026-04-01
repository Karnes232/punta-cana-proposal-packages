"use client";

import WhatsIncludedIcon from "@/components/CategoryPage/WhatsIncluded/WhatsIncludedIcon";

export interface AddonData {
  name: string;
  description?: string;
  price: number;
  icon?: string;
}

interface AddonToggleProps {
  addons: AddonData[];
  selectedIndices: Set<number>;
  onToggle: (index: number) => void;
  title: string;
}

export default function AddonToggle({
  addons,
  selectedIndices,
  onToggle,
  title,
}: AddonToggleProps) {
  if (!addons.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
        {title}
      </h3>

      <div className="grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addons.map((addon, i) => {
          const isSelected = selectedIndices.has(i);

          return (
            <button
              key={i}
              type="button"
              onClick={() => onToggle(i)}
              className={`
                group/a relative flex h-full min-h-0 items-start gap-4 p-5 text-left
                border transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? "border-gold/60 bg-gold/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                }
              `}
              aria-pressed={isSelected}
            >
              {/* Checkbox indicator */}
              <div
                className={`
                  shrink-0 w-5 h-5 mt-0.5 border transition-all duration-300 flex items-center justify-center
                  ${isSelected ? "border-gold bg-gold/20" : "border-white/20"}
                `}
              >
                {isSelected && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Content — fixed text slots so every card aligns in the grid */}
              <div className="flex min-h-0 flex-1 flex-col gap-1.5 min-w-0">
                <div className="flex items-start gap-2">
                  {addon.icon && (
                    <WhatsIncludedIcon
                      name={addon.icon}
                      className="!w-4 !h-4 shrink-0 mt-0.5"
                    />
                  )}
                  <span
                    className={`block md:min-h-11 flex-1 text-[13px] font-medium leading-snug line-clamp-2 transition-colors duration-300 ${
                      isSelected ? "text-gold" : "text-white"
                    }`}
                  >
                    {addon.name}
                  </span>
                </div>

                <span
                  className="block md:min-h-[4.4rem] text-[11px] font-light leading-[1.6] text-white/40 line-clamp-4"
                  aria-hidden={!addon.description}
                >
                  {addon.description ?? ""}
                </span>

                <span className="mt-auto text-[14px] font-medium text-gold/80 tabular-nums">
                  +${addon.price.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}