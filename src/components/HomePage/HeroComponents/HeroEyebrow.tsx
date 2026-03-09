interface HeroEyebrowProps {
  text?: string;
}

export default function HeroEyebrow({
  text = "Punta Cana, Dominican Republic",
}: HeroEyebrowProps) {
  return (
    <div className="flex items-center justify-center gap-3 animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:200ms]">
      {/* Left line */}
      <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />

      <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
        {text}
      </p>

      {/* Right line */}
      <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
    </div>
  );
}
