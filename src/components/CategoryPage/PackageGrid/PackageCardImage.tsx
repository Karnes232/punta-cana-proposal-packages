import Image from "next/image";

interface PackageCardImageProps {
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  title: string;
  badge?: string;
}

export default function PackageCardImage({
  image,
  title,
  badge,
}: PackageCardImageProps) {
  return (
    <div className="relative w-full overflow-hidden aspect-[4/3]">
      {image ? (
        <Image
          src={image.asset.url}
          alt={image.alt ?? title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold/30"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        aria-hidden="true"
      />

      {/* Gold shimmer line on hover */}
      <div
        className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-500"
        aria-hidden="true"
      />

      {/* Optional badge */}
      {badge && (
        <div className="absolute top-4 right-4 bg-gold text-black text-[9px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5">
          {badge}
        </div>
      )}
    </div>
  );
}
