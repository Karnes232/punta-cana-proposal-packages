interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PackageHeroBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function PackageHeroBreadcrumb({
  items,
}: PackageHeroBreadcrumbProps) {
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

              <span className="text-gold/70">{item.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
