import Image from "next/image";
import { framedImage } from "@/sanity/lib/image";
import type { FeaturedPost } from "@/sanity/queries/BlogPage/BlogPage";

interface FeaturedPostPhotoProps {
  photo: FeaturedPost["heroPhoto"];
  title: string;
}

export default function FeaturedPostPhoto({
  photo,
  title,
}: FeaturedPostPhotoProps) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-black">
      {photo?.asset?.url && (
        <Image
          {...framedImage(photo.asset.url, photo)}
          alt={photo.alt ?? `${title} hero photo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  );
}
