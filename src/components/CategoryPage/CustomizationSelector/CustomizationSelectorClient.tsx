"use client";

import { useCustomization } from "./CustomizationContext";
import TierToggle from "./TierToggle";
import OptionGroup, { OptionItem } from "./OptionGroup";
import { useLocale } from "next-intl";

interface CustomizationSelectorClientProps {
  /** Category-level options (not per-package) */
  /** Bilingual labels */
  labels: {
    tierStandard: string;
    tierPremium: string;
    colorTitle: string;
    floralTitle: string;
    toneTitle: string;
    noPackageSelected: string;
    premiumUnlocked: string;
  };
}

export default function CustomizationSelectorClient({
  labels,
}: CustomizationSelectorClientProps) {
  const locale = useLocale();
  const { state, setColor, setFloral, setTone } = useCustomization();

  // Build color OptionItems from the selected package's colorCustomizationOptions
  const colorOptions: {id: string; label: any; tier: "standard" | "premium" | "both"}[] =
    state.selectedPackage?.colorCustomizationOptions?.map((opt, i) => ({
      id: `color-${i}`,
      label: opt.label[locale as "en" | "es" as keyof typeof opt.label] ?? '',
      tier: opt.tier === "standard" || opt.tier === "premium" ? opt.tier : "both",
    })) ?? [];

  const floralOptions: {id: string; label: any; tier: "standard" | "premium" | "both"}[] =
    state.selectedPackage?.floralCustomizationOptions?.map((opt, i) => ({
      id: `floral-${i}`,
      label: opt.label[locale as "en" | "es" as keyof typeof opt.label] ?? '',
      tier: opt.tier === "standard" || opt.tier === "premium" ? opt.tier : "both",
    })) ?? [];

  const toneOptions: {id: string; label: any; tier: "standard" | "premium" | "both"}[] =
    state.selectedPackage?.toneCustomizationOptions?.map((opt, i) => ({
      id: `tone-${i}`,
      label: opt.label[locale as "en" | "es" as keyof typeof opt.label] ?? '',
      tier: opt.tier === "standard" || opt.tier === "premium" ? opt.tier : "both",
    })) ?? [];

  const hasPackage = !!state.selectedPackage;
  const hasColors = colorOptions.length > 0;

  return (
    <div className="flex flex-col gap-10">
      {/* Tier toggle */}
      <TierToggle
        standardLabel={labels.tierStandard}
        premiumLabel={labels.tierPremium}
      />

      {/* No package selected message */}
      {!hasPackage && (
        <p className="text-center text-[13px] font-light text-white/40 py-4">
          {labels.noPackageSelected}
        </p>
      )}

      {/* Options grid */}
      {hasPackage && (
        <div
          className={`grid grid-cols-1 gap-10 lg:gap-8 ${
            hasColors ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {/* Colors — from selected package */}
          {hasColors && (
            <OptionGroup
              title={labels.colorTitle}
              options={colorOptions}
              selectedId={state.color}
              activeTier={state.tier}
              onSelect={setColor}
            />
          )}

          {/* Florals — category-level */}
          <OptionGroup
            title={labels.floralTitle}
            options={floralOptions}
            selectedId={state.floral}
            activeTier={state.tier}
            onSelect={setFloral}
          />

          {/* Tones — category-level */}
          <OptionGroup
            title={labels.toneTitle}
            options={toneOptions}
            selectedId={state.tone}
            activeTier={state.tier}
            onSelect={setTone}
          />
        </div>
      )}

      {/* Premium note */}
      {state.tier === "premium" && hasPackage && (
        <p className="text-center text-[12px] font-light text-gold/60 animate-[fadeSlideUp_0.4s_ease_forwards]">
          {labels.premiumUnlocked}
        </p>
      )}
    </div>
  );
}