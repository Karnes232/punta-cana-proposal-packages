"use client";

import { useCustomization } from "./CustomizationContext";

interface TierToggleProps {
  standardLabel?: string;
  premiumLabel?: string;
}

export default function TierToggle({
  standardLabel = "Standard",
  premiumLabel = "Premium",
}: TierToggleProps) {
  const { state, setTier } = useCustomization();
  const isPremium = state.tier === "premium";

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Toggle container */}
      <div className="relative inline-flex items-center bg-white/[0.06] border border-gold/20 p-1">
        {/* Sliding gold pill — uses inline style for dynamic translateX */}
        <div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gold/15 border border-gold/40 transition-transform duration-300 ease-out"
          style={{
            transform: isPremium
              ? "translateX(calc(100% + 8px))"
              : "translateX(0)",
          }}
          aria-hidden="true"
        />

        {/* Standard button */}
        <button
          type="button"
          onClick={() => setTier("standard")}
          className={`
            relative z-10 px-6 py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase
            transition-colors duration-300 min-w-[140px] cursor-pointer
            ${state.tier === "standard" ? "text-gold" : "text-white/50 hover:text-white/70"}
          `}
          aria-pressed={state.tier === "standard"}
        >
          {standardLabel}
        </button>

        {/* Premium button */}
        <button
          type="button"
          onClick={() => setTier("premium")}
          className={`
            relative z-10 px-6 py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase
            transition-colors duration-300 min-w-[140px] cursor-pointer
            ${state.tier === "premium" ? "text-gold" : "text-white/50 hover:text-white/70"}
          `}
          aria-pressed={state.tier === "premium"}
        >
          {premiumLabel}
          <span className="ml-1.5 text-[10px] font-light text-gold/70">
            +${state.premiumUplift}
          </span>
        </button>
      </div>
    </div>
  );
}
