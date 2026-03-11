// Server Component

import Image from "next/image";

interface FeaturedStoryImageProps {
  imageSrc?: string;
  imageAlt?: string;
  coupleName?: string;
}

export default function FeaturedStoryImage({
  imageSrc,
  imageAlt = "Couple proposal photo",
  coupleName,
}: FeaturedStoryImageProps) {
  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-0 overflow-hidden">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      ) : (
        /* Placeholder */
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] flex flex-col items-center justify-center gap-3">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold/25"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {coupleName && (
            <p className="text-white/20 font-display italic text-sm">{coupleName}</p>
          )}
        </div>
      )}

      {/* Gradient fade toward the content side — right for odd, left for even */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden lg:block"
        aria-hidden="true"
      />

      {/* Bottom scrim for small screens */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden"
        aria-hidden="true"
      />

      {/* Gold border accent — left edge */}
      <div
        className="absolute top-8 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}