"use client";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FAQFilterOption {
  id: string;
  label: string;
}

interface HowItWorksFAQFiltersProps {
  options: FAQFilterOption[];
  active: string;
  onChange: (id: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksFAQFilters({
  options,
  active,
  onChange,
}: HowItWorksFAQFiltersProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2 mb-10"
      role="tablist"
      aria-label="Filter FAQ by category"
    >
      {options.map(({ id, label }) => {
        const isActive = id === active;

        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`
              px-4 py-1.5
              text-[11px] font-light tracking-[0.2em] uppercase
              border rounded-sm
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60
              ${
                isActive
                  ? "border-gold/70 text-gold bg-gold/5"
                  : "border-gold/20 text-gray hover:border-gold/40 hover:text-black"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
