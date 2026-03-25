export default function CategoryHeroDivider() {
  return (
    <div
      className="
        flex items-center justify-center gap-3
        animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:500ms]
      "
      aria-hidden="true"
    >
      <span className="block w-12 h-px bg-gold/30" />
      {/* Diamond ornament */}
      <span className="block w-1 h-1 rotate-45 bg-gold/50" />
      <span className="block w-12 h-px bg-gold/30" />
    </div>
  );
}
