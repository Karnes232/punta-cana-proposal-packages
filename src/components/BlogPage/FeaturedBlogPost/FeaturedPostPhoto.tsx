import Image from "next/image";
import type { FeaturedPostImage } from "./types";

interface FeaturedPostPhotoProps {
  photo: FeaturedPostImage;
  title: string;
  eyebrow: string;
  readingTime: number;
  readTimeSuffix: string;
}

export default function FeaturedPostPhoto({
  photo,
  title,
  eyebrow,
  readingTime,
  readTimeSuffix,
}: FeaturedPostPhotoProps) {
  return (
    <div className="relative min-h-[420px] md:min-h-[500px] bg-black overflow-hidden">
      {/* Post hero photo */}
      <Image
        src={photo.asset.url}
        alt={photo.alt ?? `${title} hero photo`}
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

      {/* Reading time — bottom left */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2">
        {/* Clock icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-[11px] font-body font-light tracking-[0.08em] text-white/70">
          {readingTime} {readTimeSuffix}
        </span>
      </div>
    </div>
  );
}