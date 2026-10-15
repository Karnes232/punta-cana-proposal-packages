interface FaqCategoryPillProps {
  value: string;
  label: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

const base =
  "min-h-11 shrink-0 cursor-pointer border px-5 text-[13px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

/** One category button in the FAQ filter; the chosen one is black. */
export default function FaqCategoryPill({
  value,
  label,
  isActive,
  onClick,
}: FaqCategoryPillProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onClick(value)}
      className={`${base} ${
        isActive
          ? "border-ink bg-ink text-paper"
          : "border-line bg-transparent text-ink hover:border-gold"
      }`}
    >
      {label}
    </button>
  );
}
