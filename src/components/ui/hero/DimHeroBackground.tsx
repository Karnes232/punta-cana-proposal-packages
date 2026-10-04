import Image from "next/image";
import GrainOverlay from "./GrainOverlay";

interface DimHeroBackgroundProps {
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

// Photo dimmed to 80% black, used behind the FAQ and How it works heroes.
export default function DimHeroBackground({
  photo,
  altFallback,
}: DimHeroBackgroundProps) {
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
      <GrainOverlay />
    </>
  );
}
