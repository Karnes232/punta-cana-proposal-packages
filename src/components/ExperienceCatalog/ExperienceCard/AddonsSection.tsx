import { id, local } from "@/lib/experience/normalize";
import type { Experience } from "@/lib/experience/types";

import Accordion from "../Accordion";
import type { CardSectionProps } from "./types";

const MULTIPLIABLE = ["perUnit", "perHour", "per30Minutes", "quoteOnly"];

/**
 * The most units of a timed add-on that still fit a dinner's maximum length,
 * given the time other selected add-ons already use.
 */
function maxUnitsWithinDuration(
  experience: Experience,
  addon: Experience["availableAddons"][number],
  selectedAddons: Record<string, number>,
) {
  const otherMinutes = Object.entries(selectedAddons).reduce(
    (sum, [key, quantity]) =>
      sum +
      (key === id(addon)
        ? 0
        : (experience.availableAddons.find((other) => id(other) === key)
            ?.durationMinutesPerUnit || 0) * quantity),
    0,
  );
  return Math.floor(
    ((experience.maximumDurationMinutes || 0) -
      (experience.includedDurationMinutes || 0) -
      otherMinutes) /
      (addon.durationMinutesPerUnit || 1),
  );
}

/** Optional extras with their price and, where it applies, a quantity. */
export default function AddonsSection({
  experience,
  locale,
  t,
  money,
  state,
}: CardSectionProps) {
  const {
    dinner,
    selectedAddons,
    changeAddon,
    guestCount,
    selectedAddonNames,
    estimate,
  } = state;
  const extrasTotal =
    estimate?.lines
      .filter((line) => line.kind.startsWith("addon:"))
      .reduce((sum, line) => sum + line.amount, 0) || 0;

  return (
    <Accordion
      title={t("extras")}
      summary={
        selectedAddonNames.length
          ? `${selectedAddonNames.join(" · ")} · +${money(extrasTotal)}${estimate?.quoteRequired ? " · " + t("quotePending") : ""}`
          : t("noExtras")
      }
    >
      {experience.availableAddons.map((addon) => {
        const key = id(addon);
        const quantity = selectedAddons[key] || 0;
        const canMultiply = MULTIPLIABLE.includes(addon.pricingType);
        const min = Math.max(1, addon.minimumQuantity || 1);
        let max = addon.maximumQuantity || 100;
        if (addon.durationMinutesPerUnit && dinner)
          max = Math.min(
            max,
            maxUnitsWithinDuration(experience, addon, selectedAddons),
          );
        return (
          <div key={key} className="ec-addon">
            <label className="ec-check">
              <input
                type="checkbox"
                checked={!!quantity}
                disabled={!quantity && max < min}
                onChange={(event) =>
                  changeAddon(key, event.target.checked ? min : 0)
                }
              />
              <span>
                {local(addon.name, locale)}
                <small>{local(addon.description, locale)}</small>
              </span>
              <span>
                {addon.pricingType === "quoteOnly"
                  ? t("quotePending")
                  : money(
                      (addon.price || 0) *
                        (addon.pricingType === "perPerson" ? guestCount : 1),
                    )}
              </span>
            </label>
            {!!quantity && canMultiply && (
              <label>
                {t("quantity")}
                <input
                  type="number"
                  min={min}
                  max={max}
                  value={quantity}
                  onChange={(event) =>
                    changeAddon(key, Number(event.target.value))
                  }
                />
              </label>
            )}
          </div>
        );
      })}
    </Accordion>
  );
}
