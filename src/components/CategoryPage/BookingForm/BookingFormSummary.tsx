"use client";

import { useCustomization } from "@/components/CategoryPage/CustomizationSelector/CustomizationContext";

interface BookingFormSummaryProps {
  labels: {
    package: string;
    tier: string;
    color: string;
    floral: string;
    tone: string;
    estimated: string;
    noPackage: string;
    standard: string;
    premium: string;
    notSelected: string;
  };
}

export default function BookingFormSummary({
  labels,
}: BookingFormSummaryProps) {
  const { state, totalPrice } = useCustomization();

  const items = [
    {
      label: labels.package,
      value: state.selectedPackage?.name ?? labels.noPackage,
      highlight: !!state.selectedPackage,
    },
    {
      label: labels.tier,
      value:
        state.tier === "premium"
          ? `${labels.premium} (+$${state.premiumUplift})`
          : labels.standard,
      highlight: state.tier === "premium",
    },
    {
      label: labels.color,
      value: state.color ?? labels.notSelected,
      highlight: !!state.color,
    },
    {
      label: labels.floral,
      value: state.floral ?? labels.notSelected,
      highlight: !!state.floral,
    },
    {
      label: labels.tone,
      value: state.tone ?? labels.notSelected,
      highlight: !!state.tone,
    },
  ];

  return (
    <div className="border border-gold/20 bg-white/[0.03] p-6">
      {/* Summary rows */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-[11px] font-light tracking-[0.12em] uppercase text-white/40">
              {item.label}
            </span>
            <span
              className={`text-[13px] font-light text-right ${
                item.highlight ? "text-white" : "text-white/30"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Total price */}
      {totalPrice !== null && (
        <>
          <div className="w-full h-px bg-gold/20 my-4" />
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-gold/80">
              {labels.estimated}
            </span>
            <span className="text-[20px] font-medium text-gold tabular-nums">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
