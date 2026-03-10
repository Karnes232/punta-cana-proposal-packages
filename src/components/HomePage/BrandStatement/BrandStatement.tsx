// Server Component
// RevealOnScroll is the only client boundary — a thin wrapper around each
// animated block. Everything else renders on the server.

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BrandStatementOrnament from "./BrandStatementOrnament";
import BrandStatementQuote from "./BrandStatementQuote";
import BrandStatementBody from "./BrandStatementBody";
import BrandStatementSignature from "./BrandStatementSignature";
//import BrandStatementSignature from "./BrandStatementSignature";

interface BrandStatementProps {
  quote?: string;
  body?: string;
  signature?: string;
}

export default function BrandStatement({
  quote,
  body,
  signature,
}: BrandStatementProps) {
  return (
    <section
      className="relative bg-ivory overflow-hidden"
      aria-label="About Punta Cana Proposal Packages"
    >
      {/* Faint diagonal gold texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #CFAE70 0px,
            #CFAE70 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Left + right edge gold hairlines */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-6 lg:px-12 py-28 lg:py-36 flex flex-col items-center gap-10">
        <RevealOnScroll delay={0}>
          <BrandStatementOrnament />
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <BrandStatementQuote quote={quote} />
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <BrandStatementBody text={body} />
        </RevealOnScroll>

        <RevealOnScroll delay={450}>
          <BrandStatementSignature text={signature} />
        </RevealOnScroll>

        <RevealOnScroll delay={550}>
          <BrandStatementOrnament />
        </RevealOnScroll>
      </div>
    </section>
  );
}
