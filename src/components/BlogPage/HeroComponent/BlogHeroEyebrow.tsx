interface BlogHeroEyebrowProps {
    label: string;
  }
  
  export default function BlogHeroEyebrow({ label }: BlogHeroEyebrowProps) {
    return (
      <div
        className="flex items-center justify-center gap-3 animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:200ms]"
      >
        <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
        <p className="text-[10.5px] font-body font-light tracking-[0.28em] uppercase text-gold/80">
          {label}
        </p>
        <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
      </div>
    );
  }