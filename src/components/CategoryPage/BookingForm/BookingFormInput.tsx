"use client";

import { type InputHTMLAttributes } from "react";

interface BookingFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function BookingFormInput({
  label,
  id,
  ...props
}: BookingFormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10.5px] font-light tracking-[0.18em] uppercase text-white/50"
      >
        {label}
        {props.required && (
          <span className="text-gold/70 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        className="
          w-full bg-white/[0.04] border border-white/10 px-4 py-3
          text-[14px] font-light text-white placeholder:text-white/25
          outline-none transition-all duration-300
          focus:border-gold/50 focus:bg-white/[0.06]
        "
        {...props}
      />
    </div>
  );
}
