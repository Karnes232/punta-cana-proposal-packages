import Image from "next/image";
import type { PostHeroImage } from "./types";

interface PostHeroBackgroundProps {
  photo: PostHeroImage;
  title: string;
}

export default function PostHeroBackground({
  photo,
  title,
}: PostHeroBackgroundProps) {
  return (
    <>
      {/* Post hero photo — full visibility, no opacity reduction */}
      <Image
        src={photo.asset.url}
        alt={photo.alt ?? `${title} hero photo`}
        fill
        priority
        className="object-cover object-center scale-[1.03] animate-[slowZoom_10s_ease_forwards]"
        sizes="100vw"
      />

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

      {/* Grain texture — matches homepage Hero */}
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
