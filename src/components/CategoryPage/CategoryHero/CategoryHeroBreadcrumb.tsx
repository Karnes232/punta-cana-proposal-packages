import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CategoryHeroBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function CategoryHeroBreadcrumb({
  items,
}: CategoryHeroBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:200ms]"
    >
      <ol className="flex items-center gap-2 text-[10.5px] font-light tracking-[0.18em] uppercase">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-gold/40" aria-hidden="true">
                  /
                </span>
              )}

              {isLast || !item.href ? (
                <span className="text-gold/70">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-white/40 transition-colors duration-300 hover:text-white/70"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
