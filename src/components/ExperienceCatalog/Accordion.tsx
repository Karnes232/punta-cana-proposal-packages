"use client";
import { useId, useState, type ReactNode } from "react";

export default function Accordion({
  title,
  summary,
  children,
  className = "",
  compact = false,
}: {
  title: string;
  summary?: string;
  children: ReactNode;
  className?: string;
  // Tighter variant used inside the price summary.
  compact?: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <section
      className={`${compact ? "border-none" : "border-t border-t-(--ec-border)"} ${className}`}
    >
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className={`flex w-full cursor-pointer items-center justify-between gap-4 text-left font-semibold ${compact ? "min-h-8 py-[3px] text-[0.75rem]" : "min-h-14 py-[18px] text-[0.9rem]"}`}
      >
        <span>
          {title}
          {summary && <small className="mt-1 font-normal">{summary}</small>}
        </span>
        <span aria-hidden="true" className="flex-none text-[1.25rem]">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className="invisible grid grid-rows-[0fr] [transition:grid-template-rows_180ms_ease,visibility_180ms] data-[open=true]:visible data-[open=true]:grid-rows-[1fr]"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={
              compact ? "max-h-[30vh] overflow-auto pb-2" : "pb-[18px]"
            }
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
