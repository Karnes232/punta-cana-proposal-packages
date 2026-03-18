export default function HowItWorksCTAOrnament() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
      aria-hidden="true"
    >
      {/* Vertical drop line */}
      <span className="block w-px h-10 bg-gradient-to-b from-transparent to-gold/40" />
      {/* Diamond */}
      <span className="block w-1.5 h-1.5 rotate-45 bg-gold/50 mt-0.5" />
    </div>
  );
}
