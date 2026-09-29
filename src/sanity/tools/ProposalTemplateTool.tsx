"use client";
import { populateVisualTemplate } from "./populateVisualTemplate";
import { useState } from "react";
import { useClient } from "sanity";
import {
  proposalTemplateId,
  proposalTemplateFields,
  proposalTemplateAddons as templateAddons,
} from "@/lib/experience/proposalTemplate";
export default function ProposalTemplateTool() {
  const client = useClient({ apiVersion: "2026-03-07" });
  const [status, setStatus] = useState("");
  return (
    <div style={{ padding: 32, maxWidth: 780, margin: "auto" }}>
      <h1>Plantilla de propuesta de matrimonio</h1>
      <p>
        Un paquete de ejemplo con tres estilos, tres espacios de fotografías,
        una inclusión por definir y tres extras opcionales. Todos los precios
        quedan pendientes, sin inventar importes.
      </p>
      <p>
        Se guardará como borrador inactivo. Reemplaza los textos de plantilla y
        carga fotos y precios reales antes de publicar. El precio del estilo es
        el precio completo de la variante.
      </p>
      <button
        disabled={status === "Guardando…"}
        onClick={async () => {
          setStatus("Guardando…");
          try {
            const documents = templateAddons;
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
              { ids: [proposalTemplateId, "drafts." + proposalTemplateId] },
              { perspective: "raw" },
            );
            tx = tx
              .createIfNotExists({
                ...current,
                ...(current ? {} : proposalTemplateFields),
                _id: "drafts." + proposalTemplateId,
                _type: "proposalExperience",
              })
              .patch("drafts." + proposalTemplateId, (p) =>
                p.setIfMissing(proposalTemplateFields),
              );
            await tx.commit();
            setStatus(
              "Plantilla guardada en Sanity. Abre EXPERIENCES → Proposals. No se publicó contenido.",
            );
          } catch (error) {
            setStatus(
              error instanceof Error ? error.message : "No se pudo guardar.",
            );
          }
        }}
      >
        Guardar plantilla de propuesta en Sanity
      </button>
      <hr style={{ margin: "24px 0" }} />
      <h2>Ejemplo visual con imágenes de Sanity</h2>
      <p>
        Completa la plantilla existente con el paquete Llama Eterna:
        fotografías, estilos, inclusiones, extras y precios de referencia del
        catálogo. No activa reservas ni modifica el paquete original.
      </p>
      <button
        disabled={status === "Guardando…"}
        onClick={async () => {
          setStatus("Guardando…");
          try {
            await populateVisualTemplate(client, "proposal");
            setStatus(
              "Ejemplo visual guardado en Sanity. Imágenes y contenido editables; experiencia inactiva.",
            );
          } catch (error) {
            setStatus(
              error instanceof Error ? error.message : "No se pudo guardar.",
            );
          }
        }}
      >
        Guardar ejemplo visual de propuesta
      </button>
      <p role="status">{status}</p>
    </div>
  );
}
