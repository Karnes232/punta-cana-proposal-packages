"use client";

import { useState, type FormEvent } from "react";
import VariantSelector, { VariantData } from "./VariantSelector";
import AddonToggle, { AddonData } from "./AddonToggle";
import PackagePriceSummary from "./PackagePriceSummary";

interface PackageBookingFormClientProps {
  packageName: string;
  basePrice: number;
  variants: VariantData[];
  addons: AddonData[];
  labels: {
    variantTitle: string;
    addonTitle: string;
    detailsTitle: string;
    name: string;
    hotel: string;
    phone: string;
    email: string;
    date: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    summaryBasePrice: string;
    summaryVariant: string;
    summaryAddons: string;
    summaryTotal: string;
  };
}

export default function PackageBookingFormClient({
  packageName,
  basePrice,
  variants,
  addons,
  labels,
}: PackageBookingFormClientProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [selectedAddonIndices, setSelectedAddonIndices] = useState<Set<number>>(
    new Set(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedVariant =
    selectedVariantIndex !== null ? variants[selectedVariantIndex] : null;

  const selectedAddons = Array.from(selectedAddonIndices).map((i) => addons[i]);

  const handleAddonToggle = (index: number) => {
    setSelectedAddonIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const variantPrice = selectedVariant?.price ?? basePrice;
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);

    const payload = {
      packageName,
      variant: selectedVariant?.name ?? null,
      variantPrice,
      addons: selectedAddons.map((a) => ({ name: a.name, price: a.price })),
      addonsTotal,
      estimatedTotal: variantPrice + addonsTotal,
      name: formData.get("name"),
      hotel: formData.get("hotel"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date: formData.get("date"),
      notes: formData.get("notes"),
    };

    // TODO: POST to API route
    console.log("Package booking submission:", payload);

    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // ── Success state ──
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-5 py-12 animate-[fadeSlideUp_0.5s_ease_forwards]">
        <div className="w-16 h-16 flex items-center justify-center border border-gold/40 rounded-full">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display italic font-normal text-[clamp(22px,2.5vw,32px)] text-white text-center">
          {labels.successTitle}
        </h3>
        <p className="text-[clamp(14px,1.5vw,17px)] font-light text-white/55 text-center max-w-[400px] leading-[1.85]">
          {labels.successMessage}
        </p>
      </div>
    );
  }

  // ── Form ──
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      {/* Step 1 — Variants */}
      {variants.length > 0 && (
        <VariantSelector
          variants={variants}
          selectedIndex={selectedVariantIndex}
          onSelect={setSelectedVariantIndex}
          title={labels.variantTitle}
        />
      )}

      {/* Step 2 — Add-ons */}
      {addons.length > 0 && (
        <AddonToggle
          addons={addons}
          selectedIndices={selectedAddonIndices}
          onToggle={handleAddonToggle}
          title={labels.addonTitle}
        />
      )}

      {/* Price summary */}
      <PackagePriceSummary
        basePrice={basePrice}
        selectedVariant={selectedVariant}
        selectedAddons={selectedAddons}
        labels={{
          basePrice: labels.summaryBasePrice,
          variant: labels.summaryVariant,
          addons: labels.summaryAddons,
          estimatedTotal: labels.summaryTotal,
        }}
      />

      {/* Step 3 — Contact fields */}
      <div className="flex flex-col gap-6">
        <h3 className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
          {labels.detailsTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="pkg-name"
              className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
            >
              {labels.name} <span className="text-gold/70">*</span>
            </label>
            <input
              id="pkg-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-gold/50 focus:bg-white/[0.06]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="pkg-hotel"
              className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
            >
              {labels.hotel} <span className="text-gold/70">*</span>
            </label>
            <input
              id="pkg-hotel"
              name="hotel"
              type="text"
              required
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-gold/50 focus:bg-white/[0.06]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="pkg-phone"
              className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
            >
              {labels.phone} <span className="text-gold/70">*</span>
            </label>
            <input
              id="pkg-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-gold/50 focus:bg-white/[0.06]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="pkg-email"
              className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
            >
              {labels.email} <span className="text-gold/70">*</span>
            </label>
            <input
              id="pkg-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-gold/50 focus:bg-white/[0.06]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="pkg-date"
            className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
          >
            {labels.date} <span className="text-gold/70">*</span>
          </label>
          <input
            id="pkg-date"
            name="date"
            type="date"
            required
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-gold/50 focus:bg-white/[0.06]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="pkg-notes"
            className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
          >
            {labels.notes}
          </label>
          <textarea
            id="pkg-notes"
            name="notes"
            rows={3}
            maxLength={500}
            placeholder={labels.notesPlaceholder}
            className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 resize-none focus:border-gold/50 focus:bg-white/[0.06]"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          inline-flex items-center justify-center gap-2.5
          bg-gold text-black cursor-pointer
          text-[11.5px] font-medium tracking-[0.18em] uppercase
          px-8 py-4 w-full sm:w-auto sm:self-center
          transition-all duration-300
          hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(207,174,112,0.25)]
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-spin"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="60"
                strokeLinecap="round"
              />
            </svg>
            {labels.submitting}
          </>
        ) : (
          <>
            {labels.submit}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
