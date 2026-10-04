"use client";
import { useId, useState } from "react";
import type { Locale, Settings, Selection } from "@/lib/experience/types";
import { label } from "@/lib/experience/labels";
import { depositText } from "@/lib/experience/dinnerPolicy";
export default function AvailabilityForm({
  locale,
  settings,
  experienceId,
  selection,
  demo = false,
  dinner = false,
}: {
  locale: Locale;
  settings: Settings;
  experienceId?: string;
  selection?: Selection;
  demo?: boolean;
  dinner?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const noteId = useId();
  const t = (key: string) =>
    label(settings, locale, key).replaceAll(
      "{deposit}",
      depositText(settings, locale),
    );
  return (
    <form
      className="in-[.ec-proposal-card]:cursor-auto"
      onSubmit={async (e) => {
        e.preventDefault();
        if (demo || status === "sending" || status === "sent") return;
        const form = e.currentTarget;
        setStatus("sending");
        try {
          const data = new FormData(form);
          const contact = {
            ...Object.fromEntries(data),
            datesFlexible: data.get("datesFlexible") === "on",
          };
          const response = await fetch("/api/experience-requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale, contact, experienceId, selection }),
          });
          if (!response.ok) throw Error();
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      {demo && <p role="note">{t("previewOnly")}</p>}
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-0 upto800:grid-cols-[1fr]">
        {(["fullName", "email", "phone", "hotel"] as const).map((key) => (
          <label key={key}>
            {t(key === "hotel" ? "hotelAccommodation" : key)}
            <input
              name={key}
              type={
                key === "email" ? "email" : key === "phone" ? "tel" : "text"
              }
              required={key !== "hotel"}
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
        ))}
        <label>
          {t("preferredDate")}
          <input
            name="desiredDate"
            type="date"
            required={dinner}
            aria-describedby={noteId}
          />
        </label>
        <label>
          {t("alternativeDate")}
          <input name="alternativeDate" type="date" aria-describedby={noteId} />
        </label>
      </div>
      <label className="flex items-center">
        <input name="datesFlexible" type="checkbox" className="h-5 w-5" />
        {t("datesFlexible")}
      </label>
      <p id={noteId}>{t("datePreferenceNote")}</p>
      <label>
        {t("requestComments")}
        <textarea
          name="notes"
          required={!experienceId}
          maxLength={4000}
          rows={4}
        />
      </label>
      <label>
        {t("fragranceSensitivity")}
        <input name="fragranceSensitivity" type="text" maxLength={500} />
      </label>
      {dinner && (
        <div className="my-6 border-y border-y-(--ec-border) py-2">
          <p>{t("dinnerRequestNote")}</p>
          <p>{t("dinnerPaymentNote")}</p>
        </div>
      )}
      <label
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
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
          ? t(dinner ? "dinnerRequestSuccess" : "success")
          : status === "error"
            ? t("error")
            : ""}
      </p>
    </form>
  );
}
