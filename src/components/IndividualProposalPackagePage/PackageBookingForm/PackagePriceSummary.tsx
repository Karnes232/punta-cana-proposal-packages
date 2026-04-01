"use client";

import { VariantData } from "./VariantSelector";
import { AddonData } from "./AddonToggle";

interface PackagePriceSummaryProps {
  basePrice: number;
  selectedVariant: VariantData | null;
  selectedAddons: AddonData[];
  labels: {
    basePrice: string;
    variant: string;
    addons: string;
    estimatedTotal: string;
  };
}

export default function PackagePriceSummary({
  basePrice,
  selectedVariant,
  selectedAddons,
  labels,
}: PackagePriceSummaryProps) {
  const variantPrice = selectedVariant?.price ?? basePrice;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = variantPrice + addonsTotal;

  return (
    <div className="border border-gold/20 bg-white/[0.03] p-6">
      <div className="flex flex-col gap-3">
        {/* Variant or base price */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-light tracking-[0.12em] uppercase text-white/40">
            {selectedVariant ? labels.variant : labels.basePrice}
          </span>
          <span className="text-[13px] font-light text-white tabular-nums">
            {selectedVariant ? selectedVariant.name : "—"} — $
            {variantPrice.toLocaleString()}
          </span>
        </div>

        {/* Add-ons */}
        {selectedAddons.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-light tracking-[0.12em] uppercase text-white/40">
              {labels.addons}
            </span>
            {selectedAddons.map((addon, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 pl-3"
              >
                <span className="text-[12px] font-light text-white/60">
                  {addon.name}
                </span>
                <span className="text-[12px] font-light text-white/60 tabular-nums">
                  +${addon.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total */}
      <div className="w-full h-px bg-gold/20 my-4" />
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-gold/80">
          {labels.estimatedTotal}
        </span>
        <span className="text-[20px] font-medium text-gold tabular-nums">
          ${total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}