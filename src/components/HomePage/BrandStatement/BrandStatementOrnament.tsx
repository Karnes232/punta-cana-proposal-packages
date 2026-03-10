// Server Component — no client code needed

interface BrandStatementOrnamentProps {
  className?: string;
}

export default function BrandStatementOrnament({
  className = "",
}: BrandStatementOrnamentProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="block w-16 h-px bg-gold" />
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        className="text-gold"
      >
        <rect
          x="5"
          y="0.5"
          width="6.36"
          height="6.36"
          transform="rotate(45 5 5)"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <rect
          x="5"
          y="2.5"
          width="3.54"
          height="3.54"
          transform="rotate(45 5 5)"
          fill="currentColor"
        />
      </svg>
      <span className="block w-16 h-px bg-gold" />
    </div>
  );
}
