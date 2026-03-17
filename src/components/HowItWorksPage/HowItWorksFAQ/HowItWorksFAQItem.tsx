"use client";

interface HowItWorksFAQItemProps {
  question:  string;
  answer:    string;
  isOpen:    boolean;
  onToggle:  () => void;
}

export default function HowItWorksFAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: HowItWorksFAQItemProps) {
  return (
    <div
      className={`
        border-b border-gold/15 last:border-b-0
        transition-colors duration-200
        ${isOpen ? "bg-white" : "bg-transparent hover:bg-white/60"}
      `}
    >
      <button
        className="
          w-full flex items-center justify-between gap-6
          px-6 py-5 text-left
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
          group
        "
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {/* Gold left accent bar — visible when open */}
        <span
          className={`
            absolute left-0 top-0 bottom-0 w-0.5 bg-gold
            transition-opacity duration-300
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden="true"
          style={{ position: "absolute" }}
        />

        {/* Question text */}
        <span
          className={`
            font-body font-normal text-[clamp(14px,1.3vw,16px)] leading-snug
            transition-colors duration-200
            ${isOpen ? "text-black" : "text-black/70 group-hover:text-black"}
          `}
        >
          {question}
        </span>

        {/* Plus / minus icon */}
        <span
          className="
            flex-shrink-0 w-7 h-7
            flex items-center justify-center
            border border-gold/30 rounded-sm
            text-gold/60 text-lg leading-none
            transition-all duration-300
            group-hover:border-gold/50 group-hover:text-gold
          "
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 14 14"
            fill="none"
            className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
          >
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer — animated expand/collapse via max-height */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        aria-hidden={!isOpen}
      >
        <p className="px-6 pb-5 font-body font-light text-gray text-[clamp(13px,1.2vw,15px)] leading-[1.8]">
          {answer}
        </p>
      </div>
    </div>
  );
}