import Image from "next/image";
import GrainOverlay from "./GrainOverlay";

interface ListingHeroBackgroundProps {
  image?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
}

// Faded photo behind the blog and stories listing heroes.
export default function ListingHeroBackground({
  image,
}: ListingHeroBackgroundProps) {
  return (
    <>
      {/* Background image (from Sanity) — same treatment as Home Hero */}
      {image?.asset?.url && (
        <Image
          src={image.asset.url}
          alt={image.alt || "Stories hero background"}
          fill
          priority
          className="object-cover object-center scale-[1.03] animate-[slowZoom_10s_ease_forwards] opacity-25"
          sizes="100vw"
        />
      )}

      {/* Dark gradient overlay — bottom-heavy so text stays readable */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/85"
        aria-hidden="true"
      />

      {/* Subtle vignette at the very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent"
        aria-hidden="true"
      />

      <GrainOverlay />
    </>
  );
}
