import { useState } from "react";

import type { Settings } from "@/lib/experience/types";

import Accordion from "../Accordion";
import AvailabilityForm from "../AvailabilityForm";
import RequestDialog from "../RequestDialog";
import type { CardSectionProps } from "./types";
import { buttonClass } from "../styles";

const breakdownRow =
  "flex justify-between gap-4 py-[3px] last:border-t last:border-t-(--ec-border) last:font-semibold";

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
      <div
        data-testid="purchase"
        className="sticky bottom-0 z-10 mt-6 border-t border-t-gold bg-white pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))] in-[.ec-proposal-card]:bg-[#141416]"
      >
        <div
          className="m-0 grid grid-cols-[1fr_auto] items-center border-none bg-[position:0_0] p-0 upto800:text-[0.85rem] in-[.ec-proposal-card]:text-ivory"
          aria-live="polite"
          data-testid="total"
        >
          <span>{t("estimatedTotalLabel")}</span>
          <strong className="font-display text-[1.65rem] font-normal upto390:text-[1.4rem]">
            {estimate ? money(estimate.estimatedTotal) : "—"}
          </strong>
          {estimate?.quoteRequired && (
            <small className="col-span-full">{t("quotePending")}</small>
          )}
          {dinner && (
            <small className="col-span-full">
              {t("duration")}:{" "}
              {estimate?.durationMinutes ?? experience.includedDurationMinutes}{" "}
              {t("minutes")}
            </small>
          )}
        </div>
        <Accordion compact title={t("priceDetails")}>
          {estimate && (
            <dl className="m-0 text-[0.8rem]">
              {BREAKDOWN.map(([key, prefix]) => {
                const amount = estimate.lines
                  .filter((line) => line.kind.startsWith(prefix))
                  .reduce((sum, line) => sum + line.amount, 0);
                return amount > 0 ? (
                  <div key={key} className={breakdownRow}>
                    <dt>{t(key)}</dt>
                    <dd>{money(amount)}</dd>
                  </div>
                ) : null;
              })}
              <div className={breakdownRow}>
                <dt>{t("estimatedTotalLabel")}</dt>
                <dd>{money(estimate.estimatedTotal)}</dd>
              </div>
            </dl>
          )}
        </Accordion>
        {!canRequest && <small>{t("completeHint")}</small>}
        <button
          className={`${buttonClass()} w-full`}
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
            closeLabel={t("close")}
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
