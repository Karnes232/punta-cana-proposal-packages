import Image from "next/image";
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
          src={photo.asset.url}
          alt={photo.alt ?? `${names} proposal photo`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  );
}
