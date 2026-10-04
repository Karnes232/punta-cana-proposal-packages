"use client";
import { id, local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
import { proposalDinnerId } from "@/lib/experience/proposalExtras";
import type { Experience, Locale, Settings } from "@/lib/experience/types";

import Accordion from "./Accordion";
import AddonsSection from "./ExperienceCard/AddonsSection";
import DinnerDrinksSection from "./ExperienceCard/DinnerDrinksSection";
import DinnerGuestsSection from "./ExperienceCard/DinnerGuestsSection";
import DinnerMenuSection from "./ExperienceCard/DinnerMenuSection";
import { moneyFormatter } from "./ExperienceCard/money";
import PurchaseSummary from "./ExperienceCard/PurchaseSummary";
import StylePicker from "./ExperienceCard/StylePicker";
import { useExperienceSelection } from "./ExperienceCard/useExperienceSelection";
import ExperienceGallery from "./ExperienceGallery";
import ProposalDinnerMenu from "./ProposalDinnerMenu";

/**
 * A proposal or romantic dinner a visitor can configure and request.
 *
 * - `selectable`: compact card in the /proposals grid; its configuration
 *   opens when the card is selected, and the request form opens in a dialog.
 * - otherwise: the full card used on detail pages and for dinners.
 * - `demo`: example content (preview hosts); requests are not sent.
 * - `contactOnly`: the dinner example that only takes inquiries.
 */
export default function ExperienceCard({
  experience,
  locale,
  settings,
  demo = false,
  contactOnly = false,
  selectable = false,
  selected = false,
  onSelect,
}: {
  experience: Experience;
  locale: Locale;
  settings: Settings;
  demo?: boolean;
  contactOnly?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const state = useExperienceSelection(experience, locale, demo);
  const { dinner, style, selectedStyleId, selectedAddons, guestMenus } = state;
  const t = (key: string) => label(settings, locale, key);
  const money = moneyFormatter(locale, settings, experience.currency || "USD");
  const section = { experience, locale, t, money, state };

  const price =
    demo &&
    !dinner &&
    style?.price === undefined &&
    experience.basePrice === undefined
      ? locale === "es"
        ? "Precio por definir"
        : "Price to be defined"
      : money(
          dinner
            ? experience.basePrice || 0
            : (style?.price ?? experience.basePrice ?? 0),
        );

  return (
    <article
      className={`ec-card ${selectable ? "ec-proposal-card" : ""} ${selected ? "is-selected" : ""}`}
      id={experience.slug?.current || experience._id}
      onClick={
        selectable
          ? (event) => {
              // Clicking the card selects it, except on its own controls.
              if (
                !(event.target as HTMLElement).closest(
                  "button, input, select, textarea, label, a",
                )
              )
                onSelect?.();
            }
          : undefined
      }
    >
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
        gallery={experience.gallery}
        locale={locale}
        settings={settings}
      />
      <div className="ec-card-body">
        <div className="ec-card-heading">
          <h2>{local(experience.name, locale)}</h2>
          <span>
            {selectable
              ? t("startingAtLabel")
              : local(experience.priceLabel, locale)}{" "}
            {price}
          </span>
        </div>
        {!selectable && <p>{local(experience.shortDescription, locale)}</p>}
        {selectable && (
          <ul className="ec-proposal-inclusions">
            {experience.inclusions.map((inclusion) => (
              <li key={id(inclusion)}>{local(inclusion.name, locale)}</li>
            ))}
          </ul>
        )}
        <StylePicker
          {...section}
          compact={selectable}
          contactOnly={contactOnly}
        />
        {!selectable && experience.inclusions.length > 0 && (
          <Accordion className="ec-inclusions" title={t("includedLabel")}>
            <ul>
              {experience.inclusions.map((inclusion) => (
                <li key={id(inclusion)}>
                  {local(inclusion.name, locale)}{" "}
                  {local(inclusion.description, locale)}
                </li>
              ))}
            </ul>
          </Accordion>
        )}
        {dinner && (
          <>
            <DinnerGuestsSection {...section} />
            <DinnerMenuSection {...section} />
            {experience.beverages.length > 0 && (
              <DinnerDrinksSection {...section} />
            )}
          </>
        )}
        {selectable && (
          <button
            type="button"
            className="ec-select-package"
            aria-pressed={selected}
            aria-controls={`configure-${experience._id}`}
            onClick={onSelect}
          >
            {t(selected ? "selectedPackage" : "selectPackage")}{" "}
            <span aria-hidden="true">{selected ? "✓" : "→"}</span>
          </button>
        )}
        <div
          id={`configure-${experience._id}`}
          hidden={selectable && !selected}
        >
          {experience.availableAddons.length > 0 && (
            <AddonsSection {...section} />
          )}
          {!dinner && !!selectedAddons[proposalDinnerId] && (
            <ProposalDinnerMenu
              experience={experience}
              locale={locale}
              settings={settings}
              menus={guestMenus}
              onChange={state.setGuestMenus}
            />
          )}
          <PurchaseSummary
            {...section}
            settings={settings}
            demo={demo}
            inDialog={selectable}
          />
        </div>
        {!selectable && local(experience.longDescription, locale) && (
          <p>{local(experience.longDescription, locale)}</p>
        )}
      </div>
    </article>
  );
}
