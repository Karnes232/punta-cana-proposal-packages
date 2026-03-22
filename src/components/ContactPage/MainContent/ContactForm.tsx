"use client";

import { useState } from "react";
import ContactFormField from "./ContactFormField";
import ContactFormSuccess from "./ContactFormSuccess";
import { inputClass, selectClass, textareaClass } from "./inputStyles";
import {
  ContactFormState,
  EMPTY_FORM,
  // PACKAGE_OPTIONS,
  TIME_OPTIONS,
} from "./types";
import { useTranslations } from "next-intl";
import { PackageOptions } from "@/sanity/queries/ContactPage/PackageOptions";

// SVG chevron encoded for use as CSS background-image on <select>
const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23CFAE70' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;

interface ContactFormProps {
  locale: "en" | "es";
  packageOptions: PackageOptions["categories"];
}

export default function ContactForm({
  locale,
  packageOptions,
}: ContactFormProps) {
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("ContactPageForm");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: replace with real API call (e.g. POST /api/contact)
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <ContactFormSuccess
        heading={t("successHeading")}
        body={t("successBody")}
        cta={t("successCta")}
      />
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Row 1 — Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ContactFormField label={t("nameLabel")} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </ContactFormField>

        <ContactFormField label={t("emailLabel")} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </ContactFormField>
      </div>

      {/* Row 2 — Package */}
      <ContactFormField label={t("packageLabel")} htmlFor="package">
        <div className="relative">
          <select
            id="package"
            name="package"
            value={form.package}
            onChange={handleChange}
            className={selectClass}
            style={{}}
          >
            <option value="" disabled>
              {t("packageDefault")}
            </option>
            {packageOptions.map((opt) => (
              <option key={opt.title[locale]} value={opt.title[locale]}>
                {opt.title[locale]}
              </option>
            ))}
            <option value="not-sure">{t("notSure")}</option>
          </select>
        </div>
      </ContactFormField>

      {/* Row 3 — Date + Preferred Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ContactFormField label={t("dateLabel")} htmlFor="date">
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
            // Style the date picker caret to match brand
            style={{ colorScheme: "light" }}
          />
        </ContactFormField>

        <ContactFormField label={t("timeLabel")} htmlFor="time">
          <div className="relative">
            <select
              id="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className={selectClass}
              style={{}}
            >
              <option value="" disabled>
                {t("timeDefault")}
              </option>
              {TIME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {locale === "es" ? opt.labelEs : opt.labelEn}
                </option>
              ))}
            </select>
          </div>
        </ContactFormField>
      </div>

      {/* Row 4 — Message */}
      <ContactFormField label={t("messageLabel")} htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          value={form.message}
          onChange={handleChange}
          className={textareaClass}
        />
      </ContactFormField>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          self-start inline-flex items-center gap-3 mt-1
          text-[11px] font-body font-medium tracking-[0.18em] uppercase
          bg-gold text-black
          px-10 py-4
          transition-all duration-300
          hover:bg-gold/90 hover:shadow-[0_0_24px_rgba(207,174,112,0.2)]
          disabled:opacity-60 disabled:cursor-not-allowed
          group
        "
      >
        {isSubmitting ? (
          <>
            {/* Minimal spinner */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-spin"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submitLabel")}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
