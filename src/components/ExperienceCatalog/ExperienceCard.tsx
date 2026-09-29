"use client";
import { useState } from "react";
import type {
  Experience,
  Locale,
  Settings,
  Selection,
  Course,
} from "@/lib/experience/types";
import { local, id } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
import { calculate } from "@/lib/experience/pricing";
import ExperienceGallery from "./ExperienceGallery";
import AvailabilityForm from "./AvailabilityForm";
export default function ExperienceCard({
  experience: e,
  locale,
  settings,
}: {
  experience: Experience;
  locale: Locale;
  settings: Settings;
}) {
  const dinner = e._type === "romanticDinnerExperience";
  const [selectedStyleId, setStyle] = useState(id(e.styles[0] || {}));
  const [selectedAddons, setAddons] = useState<Record<string, number>>({});
  const [guestCount, setGuests] = useState(dinner ? e.includedGuests || 2 : 1);
  const [guestMenus, setMenus] = useState<Selection["guestMenus"]>([]);
  const [selectedBeverages, setBeverages] = useState<string[]>([]);
  const [selectedOccasionId, setOccasion] = useState("");
  const [customOccasion, setCustom] = useState("");
  const [availabilityOpen, setAvailability] = useState(false);
  const t = (key: string) => label(settings, locale, key);
  const money = (n: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: e.currency || "USD",
    })
      .formatToParts(n)
      .map((part) =>
        part.type === "currency"
          ? settings.currencySymbol?.[locale] || part.value
          : part.value,
      )
      .join("");
  const style = e.styles.find((v) => id(v) === selectedStyleId);
  const occasion = e.occasions.find((v) => id(v) === selectedOccasionId);
  const selection: Selection = {
    selectedStyleId: selectedStyleId || undefined,
    addons: selectedAddons,
    guestCount,
    guestMenus,
    beverages: selectedBeverages,
    selectedOccasionId: selectedOccasionId || undefined,
    customOccasion: customOccasion || undefined,
  };
  let estimate: ReturnType<typeof calculate> | undefined;
  try {
    estimate = calculate(e, selection);
  } catch {}
  let ready = true;
  try {
    calculate(e, selection, true);
  } catch {
    ready = false;
  }
  function addonChange(key: string, quantity: number) {
    const next = { ...selectedAddons };
    if (quantity) next[key] = quantity;
    else delete next[key];
    try {
      calculate(e, { ...selection, addons: next });
      setAddons(next);
    } catch {}
  }
  return (
    <article className="ec-card" id={e.slug?.current || e._id}>
      <ExperienceGallery
        key={selectedStyleId}
        selectedStyleImage={style?.mainImage}
        gallery={e.gallery}
        locale={locale}
        settings={settings}
      />
      <div className="ec-card-body">
        <div className="ec-card-heading">
          <h2>{local(e.name, locale)}</h2>
          <span>
            {local(e.priceLabel, locale)}{" "}
            {money(
              dinner ? e.basePrice || 0 : (style?.price ?? e.basePrice ?? 0),
            )}
          </span>
        </div>
        <p>{local(e.shortDescription, locale)}</p>
        {e.styles.length > 0 && (
          <fieldset>
            <legend>{t("selectStyleLabel")}</legend>
            <div className="ec-style-options">
              {e.styles.map((v) => (
                <label
                  key={id(v)}
                  className={id(v) === selectedStyleId ? "selected" : ""}
                >
                  <input
                    type="radio"
                    name={`style-${e._id}`}
                    value={id(v)}
                    checked={id(v) === selectedStyleId}
                    onChange={() => setStyle(id(v))}
                  />
                  {local(v.name, locale)}
                </label>
              ))}
            </div>
            {style && <p>{local(style.description, locale)}</p>}
          </fieldset>
        )}
        {e.inclusions.length > 0 && (
          <details>
            <summary>{t("includedLabel")}</summary>
            <ul>
              {e.inclusions.map((v) => (
                <li key={id(v)}>
                  {local(v.name, locale)} {local(v.description, locale)}
                </li>
              ))}
            </ul>
          </details>
        )}
        {dinner && (
          <>
            <label>
              {t("guests")}
              <input
                type="number"
                min={e.includedGuests}
                max={
                  e.additionalGuestPrice === undefined
                    ? e.includedGuests
                    : e.maximumGuests
                }
                value={guestCount}
                onChange={(event) => {
                  const n = Number(event.target.value);
                  if (
                    Number.isInteger(n) &&
                    n >= Number(e.includedGuests) &&
                    n <= Number(e.maximumGuests)
                  ) {
                    setGuests(n);
                    setMenus((old) => old.slice(0, n));
                  }
                }}
              />
            </label>
            <label>
              {t("occasion")}
              <select
                value={selectedOccasionId}
                onChange={(event) => {
                  setOccasion(event.target.value);
                  setCustom("");
                }}
              >
                <option value="">{t("customOccasion")}</option>
                {e.occasions.map((v) => (
                  <option key={id(v)} value={id(v)}>
                    {local(v.name, locale)}
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
                  onChange={(event) => setCustom(event.target.value)}
                />
              </label>
            )}
            {e.menuItems.length > 0 && (
              <details open>
                <summary>{t("menu")}</summary>
                {Array.from({ length: guestCount }, (_, i) => (
                  <fieldset key={i}>
                    <legend>
                      {t("guest")} {i + 1}
                    </legend>
                    {(["starter", "main", "dessert"] as Course[]).map(
                      (course) => {
                        const items = e.menuItems.filter(
                          (v) => v.courseType === course,
                        );
                        const selected = items.find(
                          (v) => id(v) === guestMenus[i]?.[course],
                        );
                        return items.length > 0 ? (
                          <label key={course}>
                            {t(course)}
                            <select
                              value={guestMenus[i]?.[course] || ""}
                              onChange={(event) =>
                                setMenus((old) =>
                                  Array.from({ length: guestCount }, (_, j) =>
                                    j === i
                                      ? {
                                          ...old[j],
                                          [course]: event.target.value,
                                        }
                                      : { ...old[j] },
                                  ),
                                )
                              }
                            >
                              <option value="">{t("select")}</option>
                              {items.map((v) => (
                                <option key={id(v)} value={id(v)}>
                                  {local(v.name, locale)}
                                  {v.included
                                    ? ""
                                    : ` (+${money(v.supplementPrice || 0)})`}
                                </option>
                              ))}
                            </select>
                            {selected && (
                              <small>
                                {local(selected.description, locale)}{" "}
                                {selected.dietaryTags?.join(" · ")}{" "}
                                {local(selected.allergenInformation, locale)}
                              </small>
                            )}
                          </label>
                        ) : null;
                      },
                    )}
                  </fieldset>
                ))}
              </details>
            )}
            {e.beverages.length > 0 && (
              <fieldset>
                <legend>{t("beverages")}</legend>
                {e.beverages.map((v) => (
                  <label className="ec-check" key={id(v)}>
                    <input
                      type="checkbox"
                      checked={selectedBeverages.includes(id(v))}
                      onChange={(event) =>
                        setBeverages((old) =>
                          event.target.checked
                            ? [...old, id(v)]
                            : old.filter((x) => x !== id(v)),
                        )
                      }
                    />
                    {local(v.name, locale)}{" "}
                    {v.included
                      ? t("includedLabel")
                      : `+${money(v.supplementPrice || 0)}`}
                  </label>
                ))}
              </fieldset>
            )}
          </>
        )}
        {e.availableAddons.length > 0 && (
          <fieldset>
            <legend>{t("addonsLabel")}</legend>
            {e.availableAddons.map((a) => {
              const key = id(a),
                quantity = selectedAddons[key] || 0;
              const canMultiply = [
                "perUnit",
                "perHour",
                "per30Minutes",
                "quoteOnly",
              ].includes(a.pricingType);
              const min = Math.max(1, a.minimumQuantity || 1);
              let max = a.maximumQuantity || 100;
              if (a.durationMinutesPerUnit && dinner) {
                const others = Object.entries(selectedAddons).reduce(
                  (sum, [k, q]) =>
                    sum +
                    (k === key
                      ? 0
                      : (e.availableAddons.find((x) => id(x) === k)
                          ?.durationMinutesPerUnit || 0) * q),
                  0,
                );
                max = Math.min(
                  max,
                  Math.floor(
                    ((e.maximumDurationMinutes || 0) -
                      (e.includedDurationMinutes || 0) -
                      others) /
                      a.durationMinutesPerUnit,
                  ),
                );
              }
              return (
                <div key={key} className="ec-addon">
                  <label className="ec-check">
                    <input
                      type="checkbox"
                      checked={!!quantity}
                      disabled={!quantity && max < min}
                      onChange={(event) =>
                        addonChange(key, event.target.checked ? min : 0)
                      }
                    />
                    <span>
                      {local(a.name, locale)}
                      <small>{local(a.description, locale)}</small>
                    </span>
                    <span>
                      {a.pricingType === "quoteOnly"
                        ? t("quotePending")
                        : money(
                            (a.price || 0) *
                              (a.pricingType === "perPerson" ? guestCount : 1),
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
                          addonChange(key, Number(event.target.value))
                        }
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </fieldset>
        )}
        <div className="ec-total" aria-live="polite">
          <span>{t("estimatedTotalLabel")}</span>
          <strong>{estimate ? money(estimate.estimatedTotal) : "—"}</strong>
          {estimate?.quoteRequired && <small>{t("quotePending")}</small>}
          {dinner && (
            <small>
              {t("duration")}:{" "}
              {estimate?.durationMinutes ?? e.includedDurationMinutes}{" "}
              {t("minutes")}
            </small>
          )}
        </div>
        <button
          className="ec-button"
          aria-expanded={availabilityOpen}
          disabled={!ready}
          onClick={() => setAvailability(!availabilityOpen)}
        >
          {t("availabilityButtonLabel")}
        </button>
        {availabilityOpen && ready && (
          <AvailabilityForm
            locale={locale}
            settings={settings}
            experienceId={e._id}
            selection={selection}
          />
        )}
        {local(e.longDescription, locale) && (
          <p>{local(e.longDescription, locale)}</p>
        )}
      </div>
    </article>
  );
}
