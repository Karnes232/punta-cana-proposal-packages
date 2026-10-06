import Image from "next/image";
import GrainOverlay from "./GrainOverlay";

interface PhotoHeroBackgroundProps {
  photo: { asset: { url: string } } | null;
  alt: string;
}

// Full-strength photo with a bottom-heavy scrim, used behind blog post and story heroes.
export default function PhotoHeroBackground({
  photo,
  alt,
}: PhotoHeroBackgroundProps) {
  return (
    <>
      {/* Photo — full visibility, no opacity reduction */}
      {photo?.asset?.url && (
        <Image
          src={photo.asset.url}
          alt={alt}
          fill
          priority
          className="object-cover object-center scale-[1.03] animate-[slowZoom_10s_ease_forwards]"
          sizes="100vw"
        />
      )}
      {/* Scrim — transparent top, heavy black bottom for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80"
        aria-hidden="true"
      />

      {/* Extra bottom anchor so copy always reads cleanly */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />

      <GrainOverlay />
    </>
  );
}
