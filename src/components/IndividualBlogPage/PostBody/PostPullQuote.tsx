interface PostPullQuoteProps {
  excerpt: string;
}

/** The post's excerpt as a lead paragraph above the article. */
export default function PostPullQuote({ excerpt }: PostPullQuoteProps) {
  return (
    <p className="mb-10 font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.5] text-pretty text-black">
      {excerpt}
    </p>
  );
}
