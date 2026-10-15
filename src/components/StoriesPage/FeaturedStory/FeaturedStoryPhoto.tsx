import Image from "next/image";
import { framedImage } from "@/sanity/lib/image";
import type { StoriesPageFeaturedStory } from "@/sanity/queries/StoriesPage/StoriesPage";

interface FeaturedStoryPhotoProps {
  photo: StoriesPageFeaturedStory["heroPhoto"];
  names: string;
}

export default function FeaturedStoryPhoto({
  photo,
  names,
}: FeaturedStoryPhotoProps) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-black">
      {photo?.asset?.url && (
        <Image
          {...framedImage(photo.asset.url, photo)}
          alt={photo.alt ?? `${names} proposal photo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  );
}
