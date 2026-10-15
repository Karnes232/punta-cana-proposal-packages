import SectionLabelDivider from "@/components/ui/SectionLabelDivider";
import GalleryGrid from "./GalleryGrid";
import type { GalleryPhoto } from "./types";

interface GalleryProps {
  photos: GalleryPhoto[];
  /** Heading above the grid, e.g. "The Proposal". */
  sectionLabel: string;
}

export default function Gallery({ photos, sectionLabel }: GalleryProps) {
  if (!photos || photos.length === 0) return null;

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <SectionLabelDivider label={sectionLabel} />
        <GalleryGrid photos={photos} />
      </div>
    </section>
  );
}
