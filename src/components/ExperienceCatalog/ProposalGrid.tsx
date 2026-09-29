"use client";
import { useState } from "react";
import type { Experience, Locale, Settings } from "@/lib/experience/types";
import ProposalCard from "./ProposalCard";
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
  return (
    <div className="ec-grid ec-proposal-grid">
      {experiences.map((e) => (
        <ProposalCard
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
