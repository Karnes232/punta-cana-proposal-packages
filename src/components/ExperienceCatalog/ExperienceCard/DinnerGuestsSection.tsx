import { id, local } from "@/lib/experience/normalize";

import Accordion from "../Accordion";
import type { CardSectionProps } from "./types";

const stepperClass =
  "h-[46px] w-[46px] cursor-pointer border border-(--ec-border) text-[1.3rem] disabled:cursor-default disabled:opacity-35";

/** Romantic dinners: occasion and number of guests. */
export default function DinnerGuestsSection({
  experience,
  locale,
  t,
  money,
  state,
}: CardSectionProps) {
  const {
    guestCount,
    changeGuestCount,
    occasion,
    selectedOccasionId,
    setSelectedOccasionId,
    customOccasion,
    setCustomOccasion,
  } = state;
  const includedGuests = Number(experience.includedGuests);

  return (
    <Accordion
      title={t("occasionGuests")}
      summary={
        (local(occasion?.name, locale) || customOccasion || t("occasion")) +
        " · " +
        guestCount +
        " " +
        t("guests")
      }
    >
      <div
        className="flex items-center justify-between gap-3"
        role="group"
        aria-label={t("guests")}
      >
        <span>{t("guests")}</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className={stepperClass}
            aria-label={t("removeGuest")}
            disabled={
              guestCount <=
              (experience.minimumGuests ?? experience.includedGuests ?? 2)
            }
            onClick={() => changeGuestCount(guestCount - 1)}
          >
            −
          </button>
          <output aria-live="polite" className="min-w-5 text-center">
            {guestCount}
          </output>
          <button
            type="button"
            className={stepperClass}
            aria-label={t("addGuest")}
            disabled={
              experience.additionalGuestPrice == null ||
              (experience.maximumGuests != null &&
                guestCount >= experience.maximumGuests)
            }
            onClick={() => changeGuestCount(guestCount + 1)}
          >
            +
          </button>
        </div>
      </div>
      <small>
        {experience.includedGuests} {t("includedLabel")}{" "}
        {guestCount > includedGuests &&
          " · +" +
            (guestCount - includedGuests) +
            " · +" +
            money(
              (guestCount - includedGuests) *
                (experience.additionalGuestPrice || 0),
            )}
      </small>
      {!experience.maximumGuests && <small>{t("capacityPending")}</small>}
      <label>
        {t("occasion")}
        <select
          value={selectedOccasionId}
          onChange={(event) => {
            setSelectedOccasionId(event.target.value);
            setCustomOccasion("");
          }}
        >
          <option value="">{t("customOccasion")}</option>
          {experience.occasions.map((option) => (
            <option key={id(option)} value={id(option)}>
              {local(option.name, locale)}
            </option>
          ))}
        </select>
      </label>
      {(!occasion || occasion.allowCustomMessage) && (
        <label>
          {t("customOccasion")}
          <input
            value={customOccasion}
            maxLength={500}
            onChange={(event) => setCustomOccasion(event.target.value)}
          />
        </label>
      )}
    </Accordion>
  );
}
