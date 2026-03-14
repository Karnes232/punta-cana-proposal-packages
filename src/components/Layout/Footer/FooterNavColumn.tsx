import { Link } from "@/i18n/navigation";

interface FooterNavColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

export default function FooterNavColumn({
  title,
  links,
}: FooterNavColumnProps) {
  return (
    <div className="flex flex-col">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[13px] font-light text-white/55 tracking-[0.02em] transition-colors duration-300 hover:text-gold"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
