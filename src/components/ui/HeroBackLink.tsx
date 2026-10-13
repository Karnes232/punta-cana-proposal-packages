import { FiArrowLeft } from "react-icons/fi";
import { Link } from "@/i18n/navigation";

interface HeroBackLinkProps {
  label: string;
  href: string;
}

/** "← All stories" at the top of a photo hero (story, blog post). */
export default function HeroBackLink({ label, href }: HeroBackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 text-[13px] tracking-[0.12em] text-ivory/80 uppercase transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <FiArrowLeft
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
      />
      {label}
    </Link>
  );
}
