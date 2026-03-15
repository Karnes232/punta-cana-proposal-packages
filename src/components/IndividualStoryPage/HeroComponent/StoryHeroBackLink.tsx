import { Link } from "@/i18n/navigation";

interface StoryHeroBackLinkProps {
  label: string;
}

export default function StoryHeroBackLink({ label }: StoryHeroBackLinkProps) {
  return (
    <Link
      href="/stories"
      className="
        inline-flex items-center gap-2
        text-[10.5px] font-body font-medium tracking-[0.16em] uppercase
        text-white/60 hover:text-gold
        transition-colors duration-300
        group
      "
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-x-1"
        aria-hidden="true"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      {label}
    </Link>
  );
}
