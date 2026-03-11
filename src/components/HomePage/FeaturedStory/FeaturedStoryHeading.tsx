// Server Component

interface FeaturedStoryHeadingProps {
    text?: string;
  }
  
  export default function FeaturedStoryHeading({
    text = "She said yes.",
  }: FeaturedStoryHeadingProps) {
    return (
      <h2 className="font-display italic font-normal text-center text-white leading-tight text-[clamp(32px,4vw,54px)]">
        {text}
      </h2>
    );
  }