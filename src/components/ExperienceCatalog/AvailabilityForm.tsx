"use client";
import { useState } from "react";
import type { Locale, Settings, Selection } from "@/lib/experience/types";
import { label } from "@/lib/experience/labels";
export default function AvailabilityForm({
  locale,
  settings,
  experienceId,
  selection,
  demo = false,
}: {
  locale: Locale;
  settings: Settings;
  experienceId?: string;
  selection?: Selection;
  demo?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const t = (key: string) => label(settings, locale, key);
  return (
    <form
      className="ec-form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (demo || status === "sending") return;
        const form = e.currentTarget;
        setStatus("sending");
        try {
          const contact = Object.fromEntries(new FormData(form));
          const response = await fetch("/api/experience-requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale, contact, experienceId, selection }),
          });
          if (!response.ok) throw Error();
          setStatus("sent");
          form.reset();
        } catch {
          setStatus("error");
        }
      }}
    >
      {demo && <p role="note">{t("previewOnly")}</p>}
      <div className="ec-form-grid">
        {(["fullName", "email", "phone", "hotel", "desiredDate"] as const).map(
          (key) => (
            <label key={key}>
              {t(key)}
              <input
                name={key}
                type={
                  key === "email"
                    ? "email"
                    : key === "desiredDate"
                      ? "date"
                      : key === "phone"
                        ? "tel"
                        : "text"
                }
                required={["fullName", "email", "phone"].includes(key)}
                maxLength={key === "fullName" ? 120 : 254}
                autoComplete={
                  key === "fullName"
                    ? "name"
                    : key === "phone"
                      ? "tel"
                      : key === "email"
                        ? "email"
                        : "off"
                }
              />
            </label>
          ),
        )}
      </div>
      <label>
        {t("notes")}
        <textarea
          name="notes"
          required={!experienceId}
          maxLength={4000}
          rows={4}
        />
      </label>
      <label className="ec-honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        className="ec-button"
        disabled={demo || status === "sending" || status === "sent"}
      >
        {status === "sending" ? "…" : t("send")}
      </button>
      <p role="status">
        {status === "sent"
          ? t("success")
          : status === "error"
            ? t("error")
            : ""}
      </p>
    </form>
  );
}
