export default function ContactTrustBarDivider() {
  return (
    <div
      className="hidden sm:flex flex-col items-center justify-center gap-1 self-stretch"
      aria-hidden="true"
    >
      <span className="block w-px flex-1 bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
    </div>
  );
}
