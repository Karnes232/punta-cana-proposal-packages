import { useState } from "react";

import type { Settings } from "@/lib/experience/types";

import Accordion from "../Accordion";
import AvailabilityForm from "../AvailabilityForm";
import RequestDialog from "../RequestDialog";
import type { CardSectionProps } from "./types";

/** Price breakdown rows: label key and the price-line prefix they sum. */
const BREAKDOWN = [
  ["baseExperience", "base"],
  ["additionalGuests", "guests"],
  ["menuSupplements", "menu:"],
  ["drinkSupplements", "beverage:"],
  ["extras", "addon:"],
] as const;

/**
 * Estimated total, price details and the request button, which opens the
 * request form (in a dialog from the proposals grid, inline elsewhere).
 */
export default function PurchaseSummary({
  experience,
  locale,
  t,
  money,
  state,
  settings,
  demo,
  inDialog,
}: CardSectionProps & {
  settings: Settings;
  demo: boolean;
  inDialog: boolean;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const { dinner, estimate, ready, selection } = state;
  const canRequest = demo || ready;

  const form = (
    <AvailabilityForm
      locale={locale}
      settings={settings}
      demo={demo}
      dinner={dinner}
      experienceId={experience._id}
      selection={selection}
    />
  );

  return (
    <>
      <div className="ec-purchase">
        <div className="ec-total" aria-live="polite">
          <span>{t("estimatedTotalLabel")}</span>
          <strong>{estimate ? money(estimate.estimatedTotal) : "—"}</strong>
          {estimate?.quoteRequired && <small>{t("quotePending")}</small>}
          {dinner && (
            <small>
              {t("duration")}:{" "}
              {estimate?.durationMinutes ?? experience.includedDurationMinutes}{" "}
              {t("minutes")}
            </small>
          )}
        </div>
        <Accordion compact title={t("priceDetails")}>
          {estimate && (
            <dl className="ec-breakdown">
              {BREAKDOWN.map(([key, prefix]) => {
                const amount = estimate.lines
                  .filter((line) => line.kind.startsWith(prefix))
                  .reduce((sum, line) => sum + line.amount, 0);
                return amount > 0 ? (
                  <div key={key}>
                    <dt>{t(key)}</dt>
                    <dd>{money(amount)}</dd>
                  </div>
                ) : null;
              })}
              <div>
                <dt>{t("estimatedTotalLabel")}</dt>
                <dd>{money(estimate.estimatedTotal)}</dd>
              </div>
            </dl>
          )}
        </Accordion>
        {!canRequest && <small>{t("completeHint")}</small>}
        <button
          className="ec-button"
          aria-expanded={formOpen}
          disabled={!canRequest}
          onClick={() => setFormOpen(!formOpen)}
        >
          {t(dinner ? "requestDinnerDate" : "availabilityButtonLabel")}
        </button>
      </div>
      {formOpen &&
        canRequest &&
        (inDialog ? (
          <RequestDialog
            title={t("availabilityButtonLabel")}
            closeLabel={locale === "es" ? "Cerrar" : "Close"}
            onClose={() => setFormOpen(false)}
          >
            {" "}
            {form}
          </RequestDialog>
        ) : (
          form
        ))}
    </>
  );
}
