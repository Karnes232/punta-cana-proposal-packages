interface FaqCategoryPillProps {
  value: string;
  label: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

export default function FaqCategoryPill({
  value,
  label,
  isActive,
  onClick,
}: FaqCategoryPillProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => onClick(value)}
      className={[
        // Base — sizing, shape, font
        "relative flex-shrink-0 h-[44px] px-5",
        "font-sans text-[11px] tracking-[0.18em] uppercase",
        "rounded-full border transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F1]",
        "whitespace-nowrap cursor-pointer",
        // Active vs idle
        isActive
          ? "bg-[#0B0B0C] border-[#0B0B0C] text-gold"
          : "bg-transparent border-[#CFAE70]/40 text-[#6E6E73] hover:border-[#CFAE70] hover:text-black",
      ].join(" ")}
    >
      {label}

      {/* Active underline dot — small gold diamond below label */}
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rotate-45 bg-gold"
        />
      )}
    </button>
  );
}
