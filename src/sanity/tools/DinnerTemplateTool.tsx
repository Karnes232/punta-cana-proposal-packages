"use client";
import { useState } from "react";
import { useClient } from "sanity";
import {
  dinnerTemplateId,
  dinnerTemplateFields,
  templateMenus,
  templateAddons,
} from "@/lib/experience/dinnerTemplate";
export default function DinnerTemplateTool() {
  const client = useClient({ apiVersion: "2026-03-07" });
  const [status, setStatus] = useState("");
  return (
    <div style={{ padding: 32, maxWidth: 780, margin: "auto" }}>
      <h1>Plantilla de cena romántica</h1>
      <p>
        USD 849 · 2 personas · 120 minutos. Incluye transporte desde toda Punta
        Cana, tres espacios para montajes y dos opciones por cada tiempo del
        menú. Extras: rosas, vinos espumantes premium, chocolates y neón Happy
        Anniversary.
      </p>
      <p>
        Se guardará como borrador inactivo. Los platos y montajes son espacios
        de plantilla: reemplaza nombres y añade fotografías reales. Confirma
        límites, disponibilidad y precios de extras antes de publicar.
      </p>
      <button
        disabled={status === "Guardando…"}
        onClick={async () => {
          setStatus("Guardando…");
          try {
            const documents = [...templateMenus, ...templateAddons];
            const existingIds = await client.fetch<string[]>(
              "*[_id in $ids]._id",
              { ids: documents.flatMap((d) => [d._id, "drafts." + d._id]) },
              { perspective: "raw" },
            );
            const existing = new Set(
              existingIds.map((id) => id.replace(/^drafts\./, "")),
            );
            let tx = client.transaction();
            for (const d of documents.filter((d) => !existing.has(d._id)))
              tx = tx.createIfNotExists<{ _id: string; _type: string }>({
                ...d,
                _id: "drafts." + d._id,
              });
            const current = await client.fetch(
              "*[_id in $ids][0]",
              { ids: [dinnerTemplateId, "drafts." + dinnerTemplateId] },
              { perspective: "raw" },
            );
            tx = tx
              .createIfNotExists({
                ...current,
                ...(current ? {} : dinnerTemplateFields),
                _id: "drafts." + dinnerTemplateId,
                _type: "romanticDinnerExperience",
              })
              .patch("drafts." + dinnerTemplateId, (p) =>
                p.setIfMissing(dinnerTemplateFields),
              );
            await tx.commit();
            setStatus(
              "Plantilla guardada en Sanity. Abre EXPERIENCES → Romantic Dinner. No se publicó contenido.",
            );
          } catch (error) {
            setStatus(
              error instanceof Error ? error.message : "No se pudo guardar.",
            );
          }
        }}
      >
        Guardar plantilla en Sanity
      </button>
      <p role="status">{status}</p>
    </div>
  );
}
