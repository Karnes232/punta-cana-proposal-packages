"use client";

import { type TextareaHTMLAttributes } from "react";

interface BookingFormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function BookingFormTextarea({
  label,
  id,
  ...props
}: BookingFormTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        className="
          w-full bg-white/[0.04] border border-white/10 px-4 py-3
          text-[14px] font-light text-white placeholder:text-white/25
          outline-none transition-all duration-300 resize-none
          focus:border-gold/50 focus:bg-white/[0.06]
        "
        {...props}
      />
    </div>
  );
}
