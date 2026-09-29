"use client";
import {
  approvedMenu,
  approvedBeverages,
  approvedAddons,
  approvedDinnerPrices,
} from "@/lib/experience/approvedDinnerContent";
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
      <hr style={{ margin: "24px 0" }} />
      <h2>Actualizar contenido aprobado</h2>
      <p>
        849 USD · mínimo 2 invitados · 100 USD por invitado adicional · 120
        minutos. 23 platos, 10 cócteles y 3 vinos incluidos; fotógrafo 299 USD y
        videógrafo 449 USD como extras. Conserva los montajes y límites
        actuales. La cena seguirá inactiva si aún no está publicada.
      </p>
      <button
        disabled={status === "Guardando…"}
        onClick={async () => {
          setStatus("Guardando…");
          try {
            const ids = [dinnerTemplateId, "drafts." + dinnerTemplateId];
            const rows = await client.fetch<
              Array<Record<string, unknown> & { _id: string }>
            >("*[_id in $ids]", { ids }, { perspective: "raw" });
            const current =
              rows.find((d) => d._id.startsWith("drafts.")) || rows[0];
            if (!current) throw new Error("No se encontró la cena existente.");
            const docs = [
              ...approvedMenu,
              ...approvedBeverages,
              ...approvedAddons,
            ];
            const existing = await client.fetch<string[]>(
              "*[_id in $ids]._id",
              { ids: docs.flatMap((d) => [d._id, "drafts." + d._id]) },
              { perspective: "raw" },
            );
            let tx = client.transaction();
            for (const d of docs)
              if (
                !existing.includes(d._id) &&
                !existing.includes("drafts." + d._id)
              )
                tx = tx.createIfNotExists<{ _id: string; _type: string }>(d);
            const refs = (documents: Array<{ _id: string }>) =>
              documents.map((d) => ({
                _key: d._id,
                _type: "reference",
                _ref: d._id,
              }));
            const merge = (key: string, documents: Array<{ _id: string }>) => {
              const old = (current[key] || []) as Array<{ _ref: string }>;
              return [
                ...old.filter(
                  (r) =>
                    !r._ref.startsWith("dinner-template-starter-") &&
                    !r._ref.startsWith("dinner-template-main-") &&
                    !r._ref.startsWith("dinner-template-dessert-"),
                ),
                ...refs(
                  documents.filter((d) => !old.some((r) => r._ref === d._id)),
                ),
              ];
            };
            const fields = {
              ...approvedDinnerPrices,
              menuItems: merge("menuItems", approvedMenu),
              beverages: merge("beverages", approvedBeverages),
              availableAddons: merge("availableAddons", approvedAddons),
            };
            // The public inactive document enables a CMS-backed preview; it is excluded from the commercial catalog.
            const { _rev, _createdAt, _updatedAt, ...content } = current;
            void _rev;
            void _createdAt;
            void _updatedAt;
            tx = tx.createIfNotExists({
              ...content,
              _id: dinnerTemplateId,
              _type: "romanticDinnerExperience",
              active: false,
            });
            tx = tx.patch(dinnerTemplateId, (p) => p.set(fields));
            if (rows.some((d) => d._id === "drafts." + dinnerTemplateId))
              tx = tx.patch("drafts." + dinnerTemplateId, (p) => p.set(fields));
            await tx.commit();
            setStatus(
              "Contenido aprobado guardado: 23 platos, 13 bebidas y 2 extras. Tarifas actualizadas; sin activar la cena ni cambiar montajes.",
            );
          } catch (error) {
            setStatus(
              error instanceof Error ? error.message : "No se pudo guardar.",
            );
          }
        }}
      >
        Guardar menú y tarifas aprobadas
      </button>
      <p role="status">{status}</p>
    </div>
  );
}
