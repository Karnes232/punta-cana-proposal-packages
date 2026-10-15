import HeroDivider from "@/components/ui/hero/HeroDivider";
import type { ImageAsset } from "@/sanity/queries/fragments";
import HeroEyebrow from "@/components/ui/hero/HeroEyebrow";
import HeroHeading from "@/components/ui/hero/HeroHeading";
import HeroSubheading from "@/components/ui/hero/HeroSubheading";
import ListingHeroBackground from "@/components/ui/hero/ListingHeroBackground";

interface BlogHeroProps {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  image?: ImageAsset & {
    alt?: string;
  };
}

/** The blog's hero: the same faded photo and centred title as Stories. */
export default function BlogHero({
  eyebrow,
  headingLine1,
  headingLine2,
  subheading,
  image,
}: BlogHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <ListingHeroBackground image={image} />
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center gap-6 px-6 py-28 text-center md:py-36">
        <HeroEyebrow label={eyebrow} />
        <HeroHeading line1={headingLine1} line2={headingLine2} />
        <HeroDivider />
        <HeroSubheading text={subheading} />
      </div>
    </section>
  );
}
