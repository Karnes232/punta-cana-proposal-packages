import Image from "next/image";
import { framedImage } from "@/sanity/lib/image";
import type { ImageAsset } from "@/sanity/queries/fragments";
import GrainOverlay from "./GrainOverlay";

interface DimHeroBackgroundProps {
  photo: ImageAsset & {
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
      {photo?.asset?.url && (
        <Image
          {...framedImage(photo.asset.url, photo)}
          alt={photo.alt || altFallback}
          fill
          priority
          className="object-cover scale-[1.03] animate-[slowZoom_10s_ease_forwards]"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black to-transparent"
        aria-hidden="true"
      />
      <GrainOverlay />
    </>
  );
}
