import { ReactNode } from "react";

interface ContactFormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

export default function ContactFormField({
  label,
  htmlFor,
  children,
}: ContactFormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-[10.5px] font-body font-medium tracking-[0.14em] uppercase text-black/60"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
