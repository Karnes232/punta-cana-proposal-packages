interface HeroDividerProps {
  // How it works uses a slightly larger centre diamond.
  diamond?: "sm" | "lg";
}

export default function HeroDivider({ diamond = "sm" }: HeroDividerProps) {
  return (
    <div
      className="flex items-center justify-center gap-3 animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:500ms]"
      aria-hidden="true"
    >
      <span className="block w-12 h-px bg-gold/30" />
      <span
        className={`block ${diamond === "lg" ? "w-1.5 h-1.5" : "w-1 h-1"} rotate-45 bg-gold/50`}
      />
      <span className="block w-12 h-px bg-gold/30" />
    </div>
  );
}
