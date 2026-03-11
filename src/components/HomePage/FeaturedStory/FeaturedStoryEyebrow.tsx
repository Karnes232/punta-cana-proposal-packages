// Server Component

interface FeaturedStoryEyebrowProps {
    text?: string;
  }
  
  export default function FeaturedStoryEyebrow({
    text = "Real Moments",
  }: FeaturedStoryEyebrowProps) {
    return (
      <div className="flex items-center justify-center gap-3">
        <span className="block w-8 h-px bg-gold/50" aria-hidden="true" />
        <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold">
          {text}
        </p>
        <span className="block w-8 h-px bg-gold/50" aria-hidden="true" />
      </div>
    );
  }