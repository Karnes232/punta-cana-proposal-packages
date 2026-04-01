import { ReactNode } from "react";

interface ContactFormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  /** Shown below the control; linked via `id={htmlFor + "-error"}` for aria-describedby */
  error?: string;
}

export default function ContactFormField({
  label,
  htmlFor,
  children,
  error,
}: ContactFormFieldProps) {
  const errorId = `${htmlFor}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-[10.5px] font-body font-medium tracking-[0.14em] uppercase text-black/60"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-[12px] font-body font-light text-red-800 leading-snug"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
