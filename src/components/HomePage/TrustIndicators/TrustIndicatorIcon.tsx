// Server Component — all icons are monoline SVGs, consistent with brand style

export type TrustIconType =
  | "proposals"
  | "rating"
  | "private"
  | "location"
  | "experience"
  | "support";

interface TrustIndicatorIconProps {
  icon: TrustIconType;
}

const iconPaths: Record<TrustIconType, React.ReactNode> = {
  proposals: (
    // Ring / diamond — proposals count
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M8 12H3m18 0h-5" />
      <path d="M12 8V3m0 18v-5" />
      <path d="M6.34 6.34l1.42 1.42m8.49 8.49l1.41 1.41" />
      <path d="M17.66 6.34l-1.42 1.42M7.76 16.24l-1.41 1.41" />
    </>
  ),
  rating: (
    // Star — 5-star rating
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  private: (
    // Lock — private / exclusive setup
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  location: (
    // Map pin — Punta Cana location
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  experience: (
    // Award ribbon — years of experience
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
  support: (
    // Headphones — personal support
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </>
  ),
};

export default function TrustIndicatorIcon({ icon }: TrustIndicatorIconProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold"
      aria-hidden="true"
    >
      {iconPaths[icon]}
    </svg>
  );
}
