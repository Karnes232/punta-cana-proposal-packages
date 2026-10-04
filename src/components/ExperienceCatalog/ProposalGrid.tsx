"use client";
import { useEffect, useState } from "react";
import type { Experience, Locale, Settings } from "@/lib/experience/types";
import ExperienceCard from "./ExperienceCard";
export default function ProposalGrid({
  experiences,
  locale,
  settings,
  demoIds = [],
}: {
  experiences: Experience[];
  locale: Locale;
  settings: Settings;
  demoIds?: string[];
}) {
  const [selectedId, setSelected] = useState<string>();
  useEffect(() => {
    const sync = () => {
      let anchor = "";
      try {
        anchor = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const match = experiences.find(
        (e) => (e.slug?.current || e._id) === anchor,
      );
      if (match) setSelected(match._id);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", sync);
    };
  }, [experiences]);
  return (
    <div className="grid grid-cols-2 [align-items:start] gap-7 upto800:grid-cols-[1fr] upto800:gap-6">
      {experiences.map((e) => (
        <ExperienceCard
          key={e._id}
          experience={e}
          locale={locale}
          settings={settings}
          demo={demoIds.includes(e._id)}
          selectable
          selected={selectedId === e._id}
          onSelect={() => setSelected(e._id)}
        />
      ))}
    </div>
  );
}
