import Image from "next/image";

interface FaqHeroBackgroundProps {
  photo: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
  altFallback: string;
}

export default function FaqHeroBackground({
  photo,
  altFallback,
}: FaqHeroBackgroundProps) {
  return (
    <>
      <Image
        src={photo.asset.url}
        alt={photo.alt || altFallback}
        fill
        priority
        className="object-cover object-center scale-[1.03] animate-[slowZoom_10s_ease_forwards]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black to-transparent"
        aria-hidden="true"
      />
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
