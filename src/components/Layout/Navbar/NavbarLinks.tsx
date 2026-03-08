"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  const pathname = usePathname();

  return (
    <ul
      className="hidden lg:flex items-center gap-8 flex-nowrap"
      role="navigation"
      aria-label="Main navigation"
    >
      {links.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href} className="shrink-0">
            <Link
              href={href}
              className={`
                relative block whitespace-nowrap text-[11.5px] font-light tracking-[0.14em] uppercase transition-colors duration-300
                after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-gold
                after:transition-all after:duration-300
                ${
                  isActive
                    ? "text-gold after:w-full"
                    : "text-white/80 hover:text-gold after:w-0 hover:after:w-full"
                }
              `}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
