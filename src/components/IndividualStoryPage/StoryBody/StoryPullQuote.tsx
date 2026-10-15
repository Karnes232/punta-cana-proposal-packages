interface StoryPullQuoteProps {
  quote: string;
}

export default function StoryPullQuote({ quote }: StoryPullQuoteProps) {
  return (
    <blockquote className="mb-12 font-display text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.45] text-balance text-ink italic">
      &ldquo;{quote}&rdquo;
    </blockquote>
  );
}
