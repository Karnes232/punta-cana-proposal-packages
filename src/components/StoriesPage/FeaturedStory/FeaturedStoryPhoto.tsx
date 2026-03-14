import Image from "next/image";
import type { FeaturedStoryImage } from "./types";

interface FeaturedStoryPhotoProps {
  photo: FeaturedStoryImage;
  names: string;
  eyebrow: string;
  location: string;
}

export default function FeaturedStoryPhoto({
  photo,
  names,
  eyebrow,
  location,
}: FeaturedStoryPhotoProps) {
  return (
    <div className="relative min-h-[420px] md:min-h-[500px] bg-black overflow-hidden">
      {/* Couple photo */}
      <Image
        src={photo.asset.url}
        alt={photo.alt ?? `${names} proposal photo`}
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Dark scrim so overlays stay readable */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30"
        aria-hidden="true"
      />

      {/* Featured eyebrow badge — top left */}
      <span className="absolute top-6 left-6 text-[10px] font-body font-medium tracking-[0.18em] uppercase bg-gold text-black px-3 py-1.5">
        {eyebrow}
      </span>

      {/* Location tag — bottom left */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2">
        {/* Pin dot */}
        <span className="block w-1 h-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
        <span className="text-[11px] font-body font-light tracking-[0.08em] text-white/70">
          {location}
        </span>
      </div>
    </div>
  );
}