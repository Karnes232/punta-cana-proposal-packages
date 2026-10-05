"use client";

interface LoadMoreProps {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
}

export default function LoadMore({
  label,
  onClick,
  isLoading = false,
}: LoadMoreProps) {
  return (
    <div className="flex justify-center my-16">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="
          inline-flex items-center gap-3
          text-[11px] font-body font-medium tracking-[0.18em] uppercase text-black
          border border-gold/40 px-12 py-4
          transition-all duration-300
          hover:bg-black hover:text-gold hover:border-black
          disabled:opacity-40 disabled:cursor-not-allowed
          group
        "
      >
        {isLoading ? (
          <>
            {/* Minimal spinner */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-spin"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            {label}
          </>
        ) : (
          <>
            {label}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-1"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
