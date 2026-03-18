export default function HowItWorksStepConnector() {
  return (
    <div className="flex flex-col items-center gap-1 py-1" aria-hidden="true">
      <span className="block w-px h-8 border-l border-dashed border-gold/30" />
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        className="text-gold/40"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="block w-px h-8 border-l border-dashed border-gold/30" />
    </div>
  );
}
