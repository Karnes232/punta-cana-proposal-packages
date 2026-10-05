interface MetaItemProps {
  label: string;
  value: string;
}

export function MetaItem({ label, value }: MetaItemProps) {
  return (
    <div className="flex flex-col gap-1 px-8 py-4 md:px-10">
      <span className="text-[9.5px] font-body font-medium tracking-[0.2em] uppercase text-gray">
        {label}
      </span>
      <span className="text-[13px] font-body font-light tracking-[0.04em] text-black">
        {value}
      </span>
    </div>
  );
}

export function MetaDivider() {
  return (
    <span
      className="self-stretch w-px bg-gold/20 my-3 shrink-0"
      aria-hidden="true"
    />
  );
}
