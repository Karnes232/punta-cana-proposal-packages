interface WhatsIncludedIconProps {
  name: string;
  className?: string;
}

const icons: Record<string, React.ReactNode> = {
  camera: (
    <>
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  car: (
    <>
      <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2" />
      <circle cx="7.5" cy="17" r="2" />
      <circle cx="16.5" cy="17" r="2" />
    </>
  ),
  wine: (
    <>
      <path d="M8 2h8l-1 7a5 5 0 0 1-3 4.5A5 5 0 0 1 9 9L8 2z" />
      <line x1="12" y1="13.5" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a4 4 0 0 1 0 7" />
      <path d="M12 2a4 4 0 0 0 0 7" />
      <path d="M19 7a4 4 0 0 1-4.5 5" />
      <path d="M5 7a4 4 0 0 0 4.5 5" />
      <path d="M19 17a4 4 0 0 0-4.5-5" />
      <path d="M5 17a4 4 0 0 1 4.5-5" />
      <line x1="12" y1="15" x2="12" y2="22" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  candle: (
    <>
      <rect x="9" y="10" width="6" height="12" rx="1" />
      <line x1="12" y1="10" x2="12" y2="6" />
      <path d="M12 6c-1-2 1-4 0-5 1 1 3 3 0 5" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  utensils: (
    <>
      <path d="M3 2v7a4 4 0 0 0 4 4h0" />
      <path d="M7 2v7a4 4 0 0 1-4 4" />
      <line x1="5" y1="2" x2="5" y2="22" />
      <line x1="19" y1="2" x2="19" y2="9" />
      <path d="M19 9a3 3 0 0 1-3 3h0" />
      <path d="M19 9a3 3 0 0 0 3 3" />
      <line x1="19" y1="12" x2="19" y2="22" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
};

export default function WhatsIncludedIcon({
  name,
  className = "",
}: WhatsIncludedIconProps) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-gold ${className}`}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
