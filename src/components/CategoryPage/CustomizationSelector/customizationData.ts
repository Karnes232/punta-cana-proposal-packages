import { OptionItem } from "./OptionGroup";

type CategorySlug = "classic" | "modern" | "dining";

interface CategoryOptions {
  colors: OptionItem[];
  florals: OptionItem[];
  tones: OptionItem[];
}

export const CUSTOMIZATION_OPTIONS: Record<CategorySlug, CategoryOptions> = {
  classic: {
    colors: [
      { id: "c-blush", label: "Blush Pink", tier: "both" },
      { id: "c-ivory", label: "Ivory & White", tier: "both" },
      { id: "c-burgundy", label: "Burgundy", tier: "both" },
      { id: "c-garden", label: "Garden Rose", tier: "premium" },
    ],
    florals: [
      { id: "f-roses", label: "Classic Roses", tier: "both" },
      { id: "f-mixed", label: "Mixed Bouquet", tier: "both" },
      { id: "f-garden", label: "Lush Garden", tier: "premium" },
    ],
    tones: [
      { id: "t-romantic", label: "Romantic", tier: "both" },
      { id: "t-warm", label: "Warm & Golden", tier: "both" },
      { id: "t-fairytale", label: "Fairytale", tier: "premium" },
    ],
  },
  modern: {
    colors: [
      { id: "c-white", label: "All White", tier: "both" },
      { id: "c-sage", label: "Sage & Ivory", tier: "both" },
      { id: "c-terracotta", label: "Terracotta", tier: "both" },
      { id: "c-noir", label: "Black Accent", tier: "premium" },
    ],
    florals: [
      { id: "f-pampas", label: "Pampas Grass", tier: "both" },
      { id: "f-tropical", label: "Tropical Mix", tier: "both" },
      { id: "f-sculptural", label: "Sculptural Florals", tier: "premium" },
    ],
    tones: [
      { id: "t-minimal", label: "Minimalist", tier: "both" },
      { id: "t-boho", label: "Boho Chic", tier: "both" },
      { id: "t-editorial", label: "Editorial", tier: "premium" },
    ],
  },
  dining: {
    colors: [
      { id: "c-candlelight", label: "Candlelight", tier: "both" },
      { id: "c-ocean", label: "Ocean & White", tier: "both" },
      { id: "c-midnight", label: "Midnight Gold", tier: "both" },
      { id: "c-royal", label: "Royal Burgundy", tier: "premium" },
    ],
    florals: [
      { id: "f-centerpiece", label: "Table Centerpiece", tier: "both" },
      { id: "f-garland", label: "Trailing Garland", tier: "both" },
      { id: "f-lush", label: "Lush Tablescape", tier: "premium" },
    ],
    tones: [
      { id: "t-intimate", label: "Intimate", tier: "both" },
      { id: "t-tropical-eve", label: "Tropical Evening", tier: "both" },
      { id: "t-blacktie", label: "Black Tie", tier: "premium" },
    ],
  },
};
