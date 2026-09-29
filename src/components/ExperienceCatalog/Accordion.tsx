"use client";
import { useId, useState, type ReactNode } from "react";

export default function Accordion({
  title,
  summary,
  children,
  className = "",
}: {
  title: string;
  summary?: string;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <section className={`ec-accordion ${className}`}>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <span>
          {title}
          {summary && <small>{summary}</small>}
        </span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className="ec-accordion-panel"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <div>
          <div className="ec-accordion-content">{children}</div>
        </div>
      </div>
    </section>
  );
}
