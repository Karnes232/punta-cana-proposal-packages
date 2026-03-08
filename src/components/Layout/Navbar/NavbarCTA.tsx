import Link from "next/link";

interface NavbarCTAProps {
  href?: string;
  label?: string;
}

export default function NavbarCTA({
  href = "/contact",
  label = "Contact",
}: NavbarCTAProps) {
  return (
    <div className="hidden lg:flex items-center justify-end">
      <Link
        href={href}
        className="
          inline-block text-[11px] font-medium tracking-[0.18em] uppercase
          text-gold border border-gold px-6 py-2.5
          transition-all duration-300
          hover:bg-gold hover:text-black
        "
      >
        {label}
      </Link>
    </div>
  );
}
