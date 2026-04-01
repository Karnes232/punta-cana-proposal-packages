"use client";

import Image from "next/image";

export interface VariantData {
  name: string;
  description?: string;
  price: number;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

interface VariantSelectorProps {
  variants: VariantData[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  title: string;
}

export default function VariantSelector({
  variants,
  selectedIndex,
  onSelect,
  title,
}: VariantSelectorProps) {
  if (!variants.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
        {title}
      </h3>

      <div className="grid grid-cols-2 items-stretch lg:grid-cols-4 gap-4">
        {variants.map((variant, i) => {
          const isSelected = selectedIndex === i;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={`
                group/v relative flex h-full min-h-0 flex-col overflow-hidden text-left
                border transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? "border-gold/70 bg-gold/[0.08] ring-1 ring-gold/30"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }
              `}
              aria-pressed={isSelected}
            >
              {/* Preview image */}
              {variant.image ? (
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={variant.image.asset.url}
                    alt={variant.image.alt ?? variant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/v:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-gold/30 bg-gold/10" />
                </div>
              )}

              {/* Body — fixed text slots so every card aligns in the grid */}
              <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-4">
                <span
                  className={`block min-h-9 text-[13px] font-medium leading-snug line-clamp-2 transition-colors duration-300 ${
                    isSelected ? "text-gold" : "text-white group-hover/v:text-white/90"
                  }`}
                >
                  {variant.name}
                </span>

                <span
                  className="block min-h-[4.4rem] text-[11px] font-light leading-[1.6] text-white/40 line-clamp-4"
                  aria-hidden={!variant.description}
                >
                  {variant.description ?? ""}
                </span>

                <span className="mt-auto text-[16px] font-medium text-gold tabular-nums">
                  ${variant.price.toLocaleString()}
                </span>
              </div>

              {/* Selected corners */}
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