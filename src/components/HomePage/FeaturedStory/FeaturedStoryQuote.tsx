// Server Component

interface FeaturedStoryQuoteProps {
    quote?: string;
  }
  
  export default function FeaturedStoryQuote({
    quote = "Everything was absolutely perfect. We couldn't have imagined a more beautiful moment — the setup, the sunset, every single detail was beyond our expectations.",
  }: FeaturedStoryQuoteProps) {
    return (
      <blockquote className="relative pl-5 border-l border-gold/40">
        {/* Decorative large quote mark */}
        <span
          className="absolute -top-3 -left-1 font-display text-5xl leading-none text-gold/15 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="font-light text-white/65 text-[14.5px] leading-[1.9] italic">
          {quote}
        </p>
      </blockquote>
    );
  }