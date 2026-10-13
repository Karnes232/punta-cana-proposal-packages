interface StoryPullQuoteProps {
  quote: string;
}

export default function StoryPullQuote({ quote }: StoryPullQuoteProps) {
  return (
    <blockquote className="mb-12 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.45] text-balance text-black italic">
      &ldquo;{quote}&rdquo;
    </blockquote>
  );
}
