interface PackageCardInclusionsProps {
  items: string[];
}

export default function PackageCardInclusions({
  items,
}: PackageCardInclusionsProps) {
  if (!items.length) return null;

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1.5 min-h-[36px]">
      {items.slice(0, 4).map((item, i) => (
        <li key={i} className="flex items-center gap-1.5 min-w-0">
          <span
            className="block w-1 h-1 rounded-full bg-gold/60 shrink-0"
            aria-hidden="true"
          />
          <span className="text-[12px] font-light text-white/50 leading-tight truncate">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
