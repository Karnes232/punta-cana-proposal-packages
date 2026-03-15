interface StoryPullQuoteProps {
  quote: string;
}

export default function StoryPullQuote({ quote }: StoryPullQuoteProps) {
  return (
    <blockquote className="border-l-2 border-gold/50 pl-6 py-1 my-8">
      <p className="font-display font-normal italic text-fluid-h4 text-black/80 leading-relaxed">
        "{quote}"
      </p>
    </blockquote>
  );
}
