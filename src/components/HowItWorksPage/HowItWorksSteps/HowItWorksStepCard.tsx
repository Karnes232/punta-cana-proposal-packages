import type { Step } from "./types";

// ─── SVG icons (monoline, gold) ───────────────────────────────────────────────

const StepIcons: Record<string, React.FC<{ className?: string }>> = {
  "01": ({ className }) => (
    // Package / gift box
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="8"
        y="16"
        width="24"
        height="18"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M8 22h24" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 16v18" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M20 16c0 0-4-8 0-8s4 8 0 8z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M20 16c0 0 4-8 0-8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "02": ({ className }) => (
    // Message / chat bubble
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 10h24a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H14l-6 4V11a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M14 17h12M14 21h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "03": ({ className }) => (
    // Calendar / date lock
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="7"
        y="11"
        width="26"
        height="22"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M7 18h26" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M14 7v6M26 7v6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="20" cy="26" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M20 24v2l1.2 1.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  "04": ({ className }) => (
    // Star / magic wand — "we handle it"
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 8l2.8 8.6H32l-7.4 5.4 2.8 8.6L20 25.2l-7.4 5.4 2.8-8.6L8 16.6h9.2L20 8z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "05": ({ className }) => (
    // Ring / diamond
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 14l-6 8 12 10 12-10-6-8H14z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8 22h24M14 14l6 8 6-8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksStepCardProps {
  step: Step;
  /** Even index = icon on the right; odd index = icon on the left */
  index: number;
  /** Last step gets the gold accent treatment */
  isLast?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksStepCard({
  step,
  index,
  isLast = false,
}: HowItWorksStepCardProps) {
  const Icon = StepIcons[step.number];
  const isEven = index % 2 === 0; // even → text left, icon right

  return (
    <div
      className={`
        group relative flex items-center gap-8 md:gap-14
        rounded-sm border px-8 py-8 md:px-12 md:py-10
        transition-shadow duration-300 hover:shadow-md
        ${
          isLast
            ? "bg-[#0B0B0C] border-gold/40 hover:border-gold/60"
            : "bg-white border-gold/20 hover:border-gold/40"
        }
        ${isEven ? "flex-row" : "flex-row-reverse"}
      `}
    >
      {/* Step number watermark */}
      <span
        className={`
          absolute select-none pointer-events-none
          font-display font-normal leading-none
          text-[clamp(80px,10vw,120px)]
          ${isEven ? "right-6 top-2" : "left-6 top-2"}
          ${isLast ? "text-white/5" : "text-black/4"}
        `}
        aria-hidden="true"
      >
        {step.number}
      </span>

      {/* Text block */}
      <div className="flex-1 flex flex-col gap-3 relative z-10">
        {/* Label tag */}
        <span
          className={`
            self-start text-[9.5px] font-light tracking-[0.25em] uppercase
            border px-2.5 py-1
            ${isLast ? "text-gold border-gold/40" : "text-gold/70 border-gold/25"}
          `}
        >
          {step.label}
        </span>

        {/* Title */}
        <h3
          className={`
            font-display font-normal leading-[1.2]
            text-[clamp(20px,2.2vw,28px)]
            ${isLast ? "text-white" : "text-black"}
          `}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className={`
            font-body font-light leading-[1.8] text-[clamp(13px,1.2vw,15px)] max-w-md
            ${isLast ? "text-white/55" : "text-gray"}
          `}
        >
          {step.description}
        </p>
      </div>

      {/* Icon block */}
      <div
        className={`
          relative z-10 flex-shrink-0
          w-16 h-16 md:w-20 md:h-20
          flex items-center justify-center
          border rounded-sm
          transition-colors duration-300
          ${
            isLast
              ? "border-gold/40 text-gold group-hover:border-gold/70"
              : "border-gold/25 text-gold/60 group-hover:border-gold/50 group-hover:text-gold"
          }
        `}
        aria-hidden="true"
      >
        {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10" />}
      </div>
    </div>
  );
}
