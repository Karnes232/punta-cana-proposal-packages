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
import Accordion from "./Accordion";
import AvailabilityForm from "./AvailabilityForm";
export default function ExperienceCard({
  experience: e,
  locale,
  settings,
  demo = false,
}: {
  experience: Experience;
  locale: Locale;
  settings: Settings;
  demo?: boolean;
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
  const cocktails = e.beverages.filter((v) => v.type === "welcomeDrink");
  const sharedDrinks = e.beverages.filter((v) => v.type !== "welcomeDrink");
  const courses: Course[] = ["starter", "main", "dessert"];
  const menuComplete = (i: number) =>
    courses.every((c) => !!guestMenus[i]?.[c]) &&
    (!cocktails.length || !!guestMenus[i]?.welcomeCocktail);
  const completed = Array.from({ length: guestCount }, (_, i) =>
    menuComplete(i),
  ).filter(Boolean).length;
  const cocktailCount = guestMenus.filter((m) => m.welcomeCocktail).length;
  const extraNames = e.availableAddons
    .filter((a) => selectedAddons[id(a)])
    .map((a) => local(a.name, locale));
  const changeGuests = (n: number) => {
    setGuests(n);
    setMenus((old) => old.slice(0, n));
  };
  const setGuestOption = (
    i: number,
    key: Course | "welcomeCocktail",
    value: string,
  ) =>
    setMenus((old) =>
      Array.from({ length: guestCount }, (_, j) =>
        j === i ? { ...old[j], [key]: value } : { ...old[j] },
      ),
    );
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
      if (demo) {
        setAddons(next);
        return;
      }
      calculate(e, { ...selection, addons: next });
      setAddons(next);
    } catch {}
  }
  return (
    <article className="ec-card" id={e.slug?.current || e._id}>
      {demo && !style?.mainImage?.url && (
        <div className="ec-template-media">
          <span>
            {locale === "es" ? "Plantilla de montaje" : "Setup template"}
          </span>
          <strong>{local(style?.name, locale)}</strong>
          <small>
            {locale === "es"
              ? "Fotografía real pendiente de cargar en Sanity"
              : "Real photograph to be added in Sanity"}
          </small>
        </div>
      )}
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
            {demo &&
            !dinner &&
            style?.price === undefined &&
            e.basePrice === undefined
              ? locale === "es"
                ? "Precio por definir"
                : "Price to be defined"
              : money(
                  dinner
                    ? e.basePrice || 0
                    : (style?.price ?? e.basePrice ?? 0),
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
          <Accordion className="ec-inclusions" title={t("includedLabel")}>
            <ul>
              {e.inclusions.map((v) => (
                <li key={id(v)}>
                  {local(v.name, locale)} {local(v.description, locale)}
                </li>
              ))}
            </ul>
          </Accordion>
        )}
        {dinner && (
          <>
            <Accordion
              title={t("occasionGuests")}
              summary={
                (local(occasion?.name, locale) ||
                  customOccasion ||
                  t("occasion")) +
                " · " +
                guestCount +
                " " +
                t("guests")
              }
            >
              <div
                className="ec-guest-control"
                role="group"
                aria-label={t("guests")}
              >
                <span>{t("guests")}</span>
                <div>
                  <button
                    type="button"
                    aria-label={t("removeGuest")}
                    disabled={
                      guestCount <= (e.minimumGuests ?? e.includedGuests ?? 2)
                    }
                    onClick={() => changeGuests(guestCount - 1)}
                  >
                    −
                  </button>
                  <output aria-live="polite">{guestCount}</output>
                  <button
                    type="button"
                    aria-label={t("addGuest")}
                    disabled={
                      e.additionalGuestPrice === undefined ||
                      !e.maximumGuests ||
                      guestCount >= e.maximumGuests
                    }
                    onClick={() => changeGuests(guestCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <small>
                {e.includedGuests} {t("includedLabel")}{" "}
                {guestCount > Number(e.includedGuests) &&
                  " · +" +
                    (guestCount - Number(e.includedGuests)) +
                    " · +" +
                    money(
                      (guestCount - Number(e.includedGuests)) *
                        (e.additionalGuestPrice || 0),
                    )}
              </small>
              {!e.maximumGuests && <small>{t("capacityPending")}</small>}
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
            </Accordion>
            {(dinner || e.menuItems.length > 0) && (
              <Accordion
                title={t("foodMenu")}
                summary={`${completed} / ${guestCount} ${t("menusCompleted")}`}
              >
                <div className="ec-guest-menus">
                  {Array.from({ length: guestCount }, (_, i) => (
                    <Accordion
                      key={i}
                      title={`${t("guest")} ${i + 1}`}
                      summary={
                        menuComplete(i) ? t("menuSelected") : t("chooseMenu")
                      }
                    >
                      {(["starter", "main", "dessert"] as Course[]).map(
                        (course) => {
                          const items = e.menuItems.filter(
                            (v) => v.courseType === course,
                          );
                          const selected = items.find(
                            (v) => id(v) === guestMenus[i]?.[course],
                          );
                          return (
                            <label key={course}>
                              {t(course)}
                              <select
                                disabled={!items.length}
                                value={guestMenus[i]?.[course] || ""}
                                onChange={(event) =>
                                  setMenus((old) =>
                                    Array.from(
                                      { length: guestCount },
                                      (_, j) =>
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
                                    {v.dietaryType === "vegan"
                                      ? " · Ve"
                                      : v.dietaryType === "vegetarian"
                                        ? " · V"
                                        : ""}
                                    {v.included
                                      ? ""
                                      : ` (+${money(v.supplementPrice || 0)})`}
                                  </option>
                                ))}
                              </select>
                              {selected && (
                                <small>
                                  {selected.dietaryType &&
                                    selected.dietaryType !== "regular" && (
                                      <span
                                        className="ec-dietary"
                                        title={t(selected.dietaryType)}
                                      >
                                        {selected.dietaryType === "vegan"
                                          ? "Ve"
                                          : "V"}{" "}
                                        · {t(selected.dietaryType)}
                                      </span>
                                    )}{" "}
                                  {local(selected.description, locale)}{" "}
                                  {selected.dietaryTags?.join(" · ")}{" "}
                                  {local(selected.allergenInformation, locale)}
                                </small>
                              )}
                            </label>
                          );
                        },
                      )}
                      {cocktails.length > 0 && (
                        <label>
                          {t("welcomeCocktail")}
                          <select
                            value={guestMenus[i]?.welcomeCocktail || ""}
                            onChange={(event) =>
                              setGuestOption(
                                i,
                                "welcomeCocktail",
                                event.target.value,
                              )
                            }
                          >
                            <option value="">{t("select")}</option>
                            {cocktails.map((v) => (
                              <option key={id(v)} value={id(v)}>
                                {local(v.name, locale)} ·{" "}
                                {v.included
                                  ? t("includedLabel")
                                  : "+" + money(v.supplementPrice || 0)}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </Accordion>
                  ))}
                </div>
              </Accordion>
            )}
            {e.beverages.length > 0 && (
              <Accordion
                title={t("drinksWine")}
                summary={[
                  `${cocktailCount} ${t("cocktails")}`,
                  ...sharedDrinks
                    .filter((v) => selectedBeverages.includes(id(v)))
                    .map((v) => local(v.name, locale)),
                ].join(" · ")}
              >
                {cocktails.length > 0 && (
                  <>
                    <strong>{t("welcomeCocktail")}</strong>
                    <small>{t("cocktailHint")}</small>
                    {guestMenus.map((m, i) => (
                      <small key={i}>
                        {t("guest")} {i + 1}:{" "}
                        {local(
                          cocktails.find((v) => id(v) === m.welcomeCocktail)
                            ?.name,
                          locale,
                        ) || t("select")}
                      </small>
                    ))}
                  </>
                )}
                {sharedDrinks.length > 0 && <p>{t("wineSelection")}</p>}
                {sharedDrinks.map((v) => (
                  <label className="ec-check" key={id(v)}>
                    <input
                      type="checkbox"
                      checked={selectedBeverages.includes(id(v))}
                      onChange={(event) =>
                        setBeverages((old) =>
                          event.target.checked
                            ? [
                                ...old.filter(
                                  (key) =>
                                    !["wine", "sparkling"].includes(v.type) ||
                                    !["wine", "sparkling"].includes(
                                      e.beverages.find((b) => id(b) === key)
                                        ?.type || "",
                                    ),
                                ),
                                id(v),
                              ]
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
              </Accordion>
            )}
          </>
        )}
        {e.availableAddons.length > 0 && (
          <Accordion
            title={t("extras")}
            summary={
              extraNames.length
                ? `${extraNames.join(" · ")} · +${money(estimate?.lines.filter((l) => l.kind.startsWith("addon:")).reduce((sum, l) => sum + l.amount, 0) || 0)}${estimate?.quoteRequired ? " · " + t("quotePending") : ""}`
                : t("noExtras")
            }
          >
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
          </Accordion>
        )}
        <div className="ec-purchase">
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
          <Accordion title={t("priceDetails")}>
            {estimate && (
              <dl className="ec-breakdown">
                {[
                  ["baseExperience", "base"],
                  ["additionalGuests", "guests"],
                  ["menuSupplements", "menu:"],
                  ["drinkSupplements", "beverage:"],
                  ["extras", "addon:"],
                ].map(([key, prefix]) => {
                  const amount = estimate.lines
                    .filter((l) => l.kind.startsWith(prefix))
                    .reduce((sum, l) => sum + l.amount, 0);
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
          {!demo && !ready && <small>{t("completeHint")}</small>}
          <button
            className="ec-button"
            aria-expanded={availabilityOpen}
            disabled={demo || !ready}
            onClick={() => setAvailability(!availabilityOpen)}
          >
            {demo
              ? locale === "es"
                ? "Plantilla · no reservable"
                : "Template · not bookable"
              : t("availabilityButtonLabel")}
          </button>
        </div>
        {!demo && availabilityOpen && ready && (
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
