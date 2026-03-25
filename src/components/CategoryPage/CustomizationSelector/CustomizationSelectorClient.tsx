"use client";

import { useCustomization } from "./CustomizationContext";
import TierToggle from "./TierToggle";
import OptionGroup, { OptionItem } from "./OptionGroup";

interface CustomizationSelectorClientProps {
  colors: OptionItem[];
  florals: OptionItem[];
  tones: OptionItem[];
  /** Bilingual labels */
  labels: {
    tierStandard: string;
    tierPremium: string;
    colorTitle: string;
    floralTitle: string;
    toneTitle: string;
  };
}

export default function CustomizationSelectorClient({
  colors,
  florals,
  tones,
  labels,
}: CustomizationSelectorClientProps) {
  const { state, setColor, setFloral, setTone } = useCustomization();

  return (
    <div className="flex flex-col gap-10">
      {/* Tier toggle */}
      <TierToggle
        standardLabel={labels.tierStandard}
        premiumLabel={labels.tierPremium}
      />

      {/* Options grid — 3 groups side by side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
        <OptionGroup
          title={labels.colorTitle}
          options={colors}
          selectedId={state.color}
          activeTier={state.tier}
          onSelect={setColor}
        />

        <OptionGroup
          title={labels.floralTitle}
          options={florals}
          selectedId={state.floral}
          activeTier={state.tier}
          onSelect={setFloral}
        />

        <OptionGroup
          title={labels.toneTitle}
          options={tones}
          selectedId={state.tone}
          activeTier={state.tier}
          onSelect={setTone}
        />
      </div>

      {/* Note about premium options appearing/changing */}
      {state.tier === "premium" && (
        <p className="text-center text-[12px] font-light text-gold/60 animate-[fadeSlideUp_0.4s_ease_forwards]">
          Premium options unlocked — elevated florals, richer palettes, and
          exclusive styling.
        </p>
      )}
    </div>
  );
}
