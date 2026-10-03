import { notFound } from "next/navigation";

// Unknown paths under a locale render the localized [locale]/not-found.tsx
// inside the site layout, instead of the global English 404.
export default function CatchAllPage() {
  notFound();
}
