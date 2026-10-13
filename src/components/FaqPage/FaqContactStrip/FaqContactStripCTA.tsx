import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";

interface FaqContactStripCTAProps {
  label: string;
}

/** The link to the contact page; it fills with gold on hover. */
export default function FaqContactStripCTA({ label }: FaqContactStripCTAProps) {
  return (
    <Link
      href="/contact"
      className="group mt-3 inline-flex min-h-12 items-center gap-3 border border-gold px-10 text-[13px] font-medium tracking-[0.16em] text-ivory uppercase transition-colors duration-300 hover:bg-gold hover:text-black"
    >
      {label}
      <FiArrowRight
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  );
}
