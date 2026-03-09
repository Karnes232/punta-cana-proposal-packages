export default function HeroScrollIndicator() {
  return (
    <div
      className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2
          animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:1100ms]
        "
      aria-hidden="true"
    >
      <span className="text-[9px] font-light tracking-[0.28em] uppercase text-white/30">
        Scroll
      </span>
      {/* Animated scroll line */}
      <div className="relative w-px h-10 bg-white/10 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-gold animate-[scrollLine_1.8s_ease-in-out_infinite]"
          style={{ height: "40%" }}
        />
      </div>
    </div>
  );
}
