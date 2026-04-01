import type { ContactFormState } from "./types";

export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Field order used to focus the first invalid control on submit */
export const CONTACT_FORM_FIELD_ORDER: (keyof ContactFormState)[] = [
  "name",
  "email",
  "package",
  "date",
  "time",
  "message",
];

export function validateContactForm(
  form: ContactFormState,
  t: (key: string) => string,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = form.name.trim();
  if (!name) errors.name = t("validationNameRequired");
  else if (name.length < 2) errors.name = t("validationNameMin");

  const email = form.email.trim();
  if (!email) errors.email = t("validationEmailRequired");
  else if (!EMAIL_RE.test(email)) errors.email = t("validationEmailInvalid");

  if (!form.package) errors.package = t("validationPackageRequired");

  const dateRaw = form.date.trim();
  if (!dateRaw) {
    errors.date = t("validationDateRequired");
  } else {
    const picked = new Date(`${dateRaw}T12:00:00`);
    if (Number.isNaN(picked.getTime())) {
      errors.date = t("validationDateInvalid");
    } else {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      if (picked < startOfToday) errors.date = t("validationDatePast");
    }
  }

  if (!form.time) errors.time = t("validationTimeRequired");

  const message = form.message.trim();
  if (!message) errors.message = t("validationMessageRequired");
  else if (message.length < 15) errors.message = t("validationMessageMin");

  return errors;
}
