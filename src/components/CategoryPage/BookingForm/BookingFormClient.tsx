"use client";

import { useState, type FormEvent } from "react";
import { useCustomization } from "@/components/CategoryPage/CustomizationSelector/CustomizationContext";
import BookingFormInput from "./BookingFormInput";
import BookingFormTextarea from "./BookingFormTextarea";
import BookingFormSummary from "./BookingFormSummary";

interface BookingFormClientProps {
  labels: {
    heading: string;
    subheading: string;
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
    // Summary labels
    summaryPackage: string;
    summaryTier: string;
    summaryColor: string;
    summaryFloral: string;
    summaryTone: string;
    summaryEstimated: string;
    summaryNoPackage: string;
    summaryStandard: string;
    summaryPremium: string;
    summaryNotSelected: string;
  };
}

export default function BookingFormClient({ labels }: BookingFormClientProps) {
  const { state, totalPrice } = useCustomization();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Build submission payload
    const payload = {
      // Form fields
      name: formData.get("name"),
      hotel: formData.get("hotel"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date: formData.get("date"),
      notes: formData.get("notes"),
      // Customization selections
      selectedPackage: state.selectedPackage?.name ?? null,
      selectedPackageSlug: state.selectedPackage?.slug ?? null,
      tier: state.tier,
      color: state.color,
      floral: state.floral,
      tone: state.tone,
      estimatedPrice: totalPrice,
    };

    // TODO: POST to API route
    console.log("Booking submission:", payload);

    // Simulate success
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // ── Success state ──
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-5 py-12 animate-[fadeSlideUp_0.5s_ease_forwards]">
        {/* Gold checkmark */}
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
    <div className="flex flex-col gap-10">
      {/* Summary of selections */}
      <BookingFormSummary
        labels={{
          package: labels.summaryPackage,
          tier: labels.summaryTier,
          color: labels.summaryColor,
          floral: labels.summaryFloral,
          tone: labels.summaryTone,
          estimated: labels.summaryEstimated,
          noPackage: labels.summaryNoPackage,
          standard: labels.summaryStandard,
          premium: labels.summaryPremium,
          notSelected: labels.summaryNotSelected,
        }}
      />

      {/* Form fields */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Row 1: Name + Hotel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BookingFormInput
            label={labels.name}
            id="booking-name"
            name="name"
            type="text"
            required
            autoComplete="name"
          />
          <BookingFormInput
            label={labels.hotel}
            id="booking-hotel"
            name="hotel"
            type="text"
            required
          />
        </div>

        {/* Row 2: Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BookingFormInput
            label={labels.phone}
            id="booking-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
          />
          <BookingFormInput
            label={labels.email}
            id="booking-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>

        {/* Row 3: Date */}
        <BookingFormInput
          label={labels.date}
          id="booking-date"
          name="date"
          type="date"
          required
          min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
        />

        {/* Row 4: Notes */}
        <BookingFormTextarea
          label={labels.notes}
          id="booking-notes"
          name="notes"
          placeholder={labels.notesPlaceholder}
          maxLength={500}
        />

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
              {/* Simple spinner */}
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
    </div>
  );
}
