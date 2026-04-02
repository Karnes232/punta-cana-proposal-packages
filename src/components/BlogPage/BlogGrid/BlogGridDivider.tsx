interface BlogGridDividerProps {
  label: string;
}

export default function BlogGridDivider({ label }: BlogGridDividerProps) {
  return (
    <div className="flex items-center gap-5 mb-8" aria-hidden="true">
      <span className="block w-10 h-px bg-gold/40 shrink-0" />
      <span className="text-[10px] font-body font-medium tracking-[0.2em] uppercase text-gray whitespace-nowrap">
        {label}
      </span>
      <span className="block flex-1 h-px bg-gold/20" />
    </div>
  );
}
