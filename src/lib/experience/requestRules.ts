// The request form's rules, shared by the form (to stop mistakes before
// sending) and the API (to reject anything that slipped past the form).

import type { Course, Selection } from "./types";

/** A visitor's input that breaks a rule; the API answers it with a 400. */
export class RequestValidationError extends Error {
  constructor(
    message: string,
    /** The form field to point the visitor at, when there is one. */
    readonly field?: RequestField,
  ) {
    super(message);
    this.name = "RequestValidationError";
  }
}

/** The longest text each contact field accepts, after trimming. */
export const FIELD_LIMITS = {
  fullName: 120,
  email: 254,
  phone: 80,
  hotel: 254,
  desiredDate: 10,
  alternativeDate: 10,
  fragranceSensitivity: 500,
  notes: 4000,
} as const;

export type RequestField = keyof typeof FIELD_LIMITS;

export const REQUEST_FIELDS = Object.keys(FIELD_LIMITS) as RequestField[];

/**
 * Digits, spaces and + ( ) - . only. Browsers compile an input's pattern
 * with the regex v flag, which needs ( ) . - escaped inside brackets.
 */
export const PHONE_PATTERN = "[0-9 +\\(\\)\\.\\-]+";

const PHONE_DIGITS = { min: 7, max: 20 };

export function isValidPhone(value: string) {
  if (!new RegExp(`^${PHONE_PATTERN}$`).test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= PHONE_DIGITS.min && digits <= PHONE_DIGITS.max;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Requests are for Punta Cana, so "today" is today there. */
const SITE_TIME_ZONE = "America/Santo_Domingo";

/** How far ahead a date can be requested. */
const MONTHS_AHEAD = 24;

/** The visitor must spend at least this long on the form (bots don't). */
export const MIN_FILL_MS = 3000;

/** The first and last day a date can be requested, as YYYY-MM-DD. */
export function requestDateWindow(now = new Date()) {
  // en-CA formats as YYYY-MM-DD.
  const first = new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIME_ZONE,
  }).format(now);
  const [year, month, day] = first.split("-").map(Number);
  const last = new Date(Date.UTC(year, month - 1 + MONTHS_AHEAD, day))
    .toISOString()
    .slice(0, 10);
  return { first, last };
}

/** A real calendar day written as YYYY-MM-DD. */
export function isCalendarDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}

/**
 * Checks the preferred and alternative dates (either may be empty): each is
 * inside the window, and the alternative comes after the preferred one.
 */
export function checkRequestDates(
  desiredDate: string,
  alternativeDate: string,
  now = new Date(),
) {
  const { first, last } = requestDateWindow(now);
  for (const field of ["desiredDate", "alternativeDate"] as const) {
    const date = field === "desiredDate" ? desiredDate : alternativeDate;
    if (date && !isCalendarDate(date))
      throw new RequestValidationError("date", field);
    // YYYY-MM-DD strings sort as dates.
    if (date && (date < first || date > last))
      throw new RequestValidationError("dateWindow", field);
  }
  if (desiredDate && alternativeDate && alternativeDate <= desiredDate)
    throw new RequestValidationError("dateOrder", "alternativeDate");
}

const MENU_KEYS: (Course | "welcomeCocktail")[] = [
  "starter",
  "main",
  "dessert",
  "welcomeCocktail",
];

const text = (value: unknown) =>
  typeof value === "string" && value ? value : undefined;

/**
 * The selection as it is stored: only the known keys, ids as strings.
 * Run it after pricing has accepted the selection.
 */
export function normalizeSelection(s: Selection): Selection {
  return {
    selectedStyleId: text(s.selectedStyleId),
    addons: Object.fromEntries(
      Object.entries(s.addons).map(([id, quantity]) => [
        String(id),
        Number(quantity),
      ]),
    ),
    guestCount: s.guestCount,
    guestMenus: s.guestMenus.map((menu) =>
      Object.fromEntries(
        MENU_KEYS.flatMap((key) => {
          const value = text(menu?.[key]);
          return value ? [[key, value]] : [];
        }),
      ),
    ),
    beverages: s.beverages.map(String),
    selectedOccasionId: text(s.selectedOccasionId),
    customOccasion: text(s.customOccasion)?.trim() || undefined,
  };
}
