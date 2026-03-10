// Server Component — pure markup, no interactivity

interface BrandStatementQuoteProps {
  quote?: string;
}

export default function BrandStatementQuote({
  quote = "We design the moment you've been dreaming about.",
}: BrandStatementQuoteProps) {
  return (
    <blockquote className="text-center">
      <span
        className="block font-display text-[80px] leading-none text-gold select-none -mb-6"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <p className="font-display italic font-normal text-black leading-[1.25] tracking-[-0.01em] text-[clamp(28px,3.5vw,48px)]">
        {quote}
      </p>
    </blockquote>
  );
}
