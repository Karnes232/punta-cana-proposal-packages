// Server Component

interface HowItWorksEyebrowProps {
  text?: string;
}

export default function HowItWorksEyebrow({
  text = "The Process",
}: HowItWorksEyebrowProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
      <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold">
        {text}
      </p>
      <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
    </div>
  );
}
