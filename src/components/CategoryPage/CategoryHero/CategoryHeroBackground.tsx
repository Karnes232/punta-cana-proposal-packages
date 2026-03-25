import Image from "next/image";

interface CategoryHeroBackgroundProps {
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

export default function CategoryHeroBackground({
  image,
}: CategoryHeroBackgroundProps) {
  return (
    <>
      {/* Background image (from Sanity) */}
      {image && (
        <Image
          src={image.asset.url}
          alt={image.alt || "Proposal setup in Punta Cana"}
          fill
          priority
          className="object-cover object-center scale-[1.03] animate-[slowZoom_10s_ease_forwards] opacity-25"
          sizes="100vw"
        />
      )}

      {/* Dark gradient overlay — bottom-heavy so text stays readable */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85"
        aria-hidden="true"
      />

      {/* Subtle gold vignette at the very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />

      {/* Grain texture overlay for luxury feel */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />
    </>
  );
}
