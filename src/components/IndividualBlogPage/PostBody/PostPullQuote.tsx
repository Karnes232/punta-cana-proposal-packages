interface PostPullQuoteProps {
  excerpt: string;
}

export default function PostPullQuote({ excerpt }: PostPullQuoteProps) {
  return (
    <blockquote className="border-l-2 border-gold/40 pl-6 mb-12">
      <p className="font-display font-normal italic text-fluid-lg text-black/75 leading-relaxed">
        {excerpt}
      </p>
    </blockquote>
  );
}
