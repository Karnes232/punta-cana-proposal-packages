interface FaqContactStripEyebrowProps {
  label: string;
}

export default function FaqContactStripEyebrow({
  label,
}: FaqContactStripEyebrowProps) {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className="block w-8 h-px bg-gold/60" />
      <p className="text-[10.5px] font-body font-light tracking-[0.28em] uppercase text-gold/80">
        {label}
      </p>
      <span className="block w-8 h-px bg-gold/60" />
    </div>
  );
}
