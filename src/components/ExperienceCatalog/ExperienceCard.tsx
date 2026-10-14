"use client";
import { FiArrowRight, FiCheck } from "react-icons/fi";
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
 * - `layout="split"` (full card only): photos on the left, kept in view on
 *   wide screens, and the configuration on the right. The page shows the
 *   name and price, so the card leaves them out.
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
  layout = "stacked",
}: {
  experience: Experience;
  locale: Locale;
  settings: Settings;
  demo?: boolean;
  contactOnly?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  layout?: "stacked" | "split";
}) {
  const split = layout === "split" && !selectable;
  const state = useExperienceSelection(experience, locale, demo);
  const { dinner, style, selectedStyleId, selectedAddons, guestMenus } = state;
  const t = (key: string) => label(settings, locale, key);
  const money = moneyFormatter(locale, settings, experience.currency || "USD");
  const section = { experience, locale, t, money, state };

  const price =
    demo &&
    !dinner &&
    // Missing values come back from Sanity as null, not undefined.
    style?.price == null &&
    experience.basePrice == null
      ? t("priceToBeDefined")
      : money(
          dinner
            ? experience.basePrice || 0
            : (style?.price ?? experience.basePrice ?? 0),
        );

  return (
    <article
      className={
        selectable
          ? // ec-proposal-card marks the grid cards, for the compact sizes of the
            // sections inside. Each card spans six rows of the grid and shares
            // them (subgrid) with its neighbour, so photo, heading, inclusions,
            // style, button and configuration line up across a row.
            `ec-proposal-card row-span-6 grid min-w-0 scroll-mt-[120px] grid-rows-subgrid gap-y-0 cursor-pointer border bg-white [transition:border-color_180ms] ${selected ? "border-[#9b773d]" : "border-(--ec-border) [&:hover]:border-[#9b773d]"}`
          : `scroll-mt-[100px] border-none ${split ? "lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start" : "bg-white"}`
      }
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
      <div className={split ? "lg:sticky lg:top-[112px]" : undefined}>
        {demo && !style?.mainImage?.url && (
          <div
            data-testid="template-media"
            className="grid min-h-[260px] place-content-center gap-3.5 border-b border-b-gold bg-[#151515] p-8 text-center text-ivory"
          >
            <span className="text-[0.7rem] tracking-[0.18em] text-gold uppercase">
              {t("setupTemplate")}
            </span>
            <strong className="font-display text-[2.4rem] font-normal">
              {local(style?.name, locale)}
            </strong>
            <small className="text-[#b7b1a6]">{t("photoPending")}</small>
          </div>
        )}
        <ExperienceGallery
          key={selectedStyleId}
          selectedStyleImage={style?.mainImage}
          gallery={experience.gallery}
          locale={locale}
          settings={settings}
        />
      </div>
      <div
        className={`min-w-0 p-7 upto800:p-[22px] upto390:px-3.5 upto390:py-[18px] ${selectable ? "row-span-5 grid grid-rows-subgrid gap-y-0" : ""} ${split ? "bg-white" : ""}`}
      >
        {!split && (
          <div
            data-testid="card-heading"
            className={`flex justify-between gap-5 ${selectable ? "[align-items:start]" : "items-baseline upto800:block"}`}
          >
            <h2
              className={
                selectable
                  ? "text-[clamp(1.5rem,2.2vw,2rem)] italic"
                  : "text-[clamp(1.75rem,2.6vw,2.25rem)] text-balance"
              }
            >
              {local(experience.name, locale)}
            </h2>
            <span
              className={`text-[0.9rem] font-medium ${selectable ? "max-w-[40%] shrink-0 text-right whitespace-normal text-[#8b672e]" : "mt-2 block text-[17px] whitespace-nowrap text-[#8b672e] tabular-nums"}`}
            >
              {selectable
                ? t("startingAtLabel")
                : local(experience.priceLabel, locale)}{" "}
              {price}
            </span>
          </div>
        )}
        {!selectable && (
          <p className="max-w-[65ch] text-[17px] text-[#3f3f44]">
            {local(experience.shortDescription, locale)}
          </p>
        )}
        {selectable && (
          <ul className="my-[22px] grid list-none content-start gap-1.5 p-0 text-[15px] text-[#3f3f44]">
            {experience.inclusions.map((inclusion) => (
              <li key={id(inclusion)} className="flex items-start gap-2.5">
                <FiCheck
                  aria-hidden="true"
                  className="mt-[5px] size-4 shrink-0 text-[#9b773d]"
                />
                <span>{local(inclusion.name, locale)}</span>
              </li>
            ))}
          </ul>
        )}
        {/* Always one element, even without styles: a grid card's rows. */}
        <div>
          <StylePicker
            {...section}
            compact={selectable}
            contactOnly={contactOnly}
          />
        </div>
        {!selectable && experience.inclusions.length > 0 && (
          <Accordion title={t("includedLabel")}>
            <ul className="flex list-none flex-wrap gap-x-7 gap-y-3.5 py-2">
              {experience.inclusions.map((inclusion) => (
                <li key={id(inclusion)} className="flex items-start gap-2">
                  <FiCheck
                    aria-hidden="true"
                    className="mt-[5px] size-4 shrink-0 text-[#9b773d]"
                  />
                  <span>
                    {local(inclusion.name, locale)}{" "}
                    {local(inclusion.description, locale)}
                  </span>
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
            className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 pt-6 pb-2 text-left text-[14px] font-semibold tracking-[0.1em] text-[#8b672e] uppercase"
            aria-pressed={selected}
            aria-controls={`configure-${experience._id}`}
            onClick={onSelect}
          >
            {t(selected ? "selectedPackage" : "selectPackage")}
            {selected ? (
              <FiCheck aria-hidden="true" className="size-5 shrink-0" />
            ) : (
              <FiArrowRight aria-hidden="true" className="size-5 shrink-0" />
            )}
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
