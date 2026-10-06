"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useTranslations } from "next-intl";
import type { Locale, Settings, Selection } from "@/lib/experience/types";
import { label } from "@/lib/experience/labels";
import { depositText } from "@/lib/experience/dinnerPolicy";
import {
  FIELD_LIMITS,
  PHONE_PATTERN,
  REQUEST_FIELDS,
  requestDateWindow,
  type RequestField,
} from "@/lib/experience/requestRules";
import { buttonClass } from "./styles";

const TIMEOUT_MS = 15_000;

// Server error codes with a message of their own; anything else on a field
// reads "Please check this field".
const FIELD_MESSAGES = [
  "required",
  "email",
  "phone",
  "dateWindow",
  "dateOrder",
];

// Today in Punta Cana, read in the browser only: a cached page must not
// carry the day it was built.
const noSubscription = () => () => {};
const todayWindow = () => JSON.stringify(requestDateWindow());
const noWindow = () => "";

type Problem = { field?: RequestField; message: string };
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
  const [problem, setProblem] = useState<Problem | null>(null);
  const [desiredDate, setDesiredDate] = useState("");
  const noteId = useId();
  const errorId = useId();
  const openedAt = useRef(0);
  const requestId = useRef<string | undefined>(undefined);
  const tForm = useTranslations("RequestForm");
  // When the form appeared; the API ignores requests sent too fast.
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const dateWindow = useSyncExternalStore(
    noSubscription,
    todayWindow,
    noWindow,
  );
  const { first, last } = dateWindow
    ? (JSON.parse(dateWindow) as { first: string; last: string })
    : { first: undefined, last: undefined };
  // Props for a field that may hold the server's complaint.
  const fieldProps = (field: RequestField, describedBy?: string) => {
    const invalid = problem?.field === field;
    const ids = [describedBy, invalid ? errorId : undefined].filter(Boolean);
    return {
      name: field,
      maxLength: FIELD_LIMITS[field],
      "aria-invalid": invalid || undefined,
      "aria-describedby": ids.length ? ids.join(" ") : undefined,
    };
  };
  const fieldError = (field: RequestField) =>
    problem?.field === field ? (
      <span id={errorId} role="alert" className="ec-field-error">
        {problem.message}
      </span>
    ) : null;
  const t = (key: string) =>
    label(settings, locale, key).replaceAll(
      "{deposit}",
      depositText(settings, locale),
    );
  return (
    <form
      className="in-[.ec-proposal-card]:cursor-auto"
      // Editing the field that was flagged clears its message.
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        if (problem?.field && target.name === problem.field) setProblem(null);
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (demo || status === "sending" || status === "sent") return;
        const form = e.currentTarget;
        setStatus("sending");
        setProblem(null);
        // One id per request: if a slow answer is retried, it's stored once.
        requestId.current ??= globalThis.crypto?.randomUUID?.();
        try {
          const data = new FormData(form);
          const contact: Record<string, string | boolean> = {
            datesFlexible: data.get("datesFlexible") === "on",
          };
          for (const [key, value] of data)
            if (key !== "datesFlexible" && typeof value === "string")
              contact[key] = value.trim();
          const response = await fetch("/api/experience-requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              locale,
              contact,
              experienceId,
              selection,
              requestId: requestId.current,
              fillMs: openedAt.current ? Date.now() - openedAt.current : null,
            }),
            signal: AbortSignal.timeout(TIMEOUT_MS),
          });
          if (response.ok) {
            setStatus("sent");
            return;
          }
          setStatus("error");
          if (response.status === 429)
            return setProblem({ message: tForm("tooMany") });
          if (response.status === 413)
            return setProblem({ message: tForm("tooLarge") });
          if (response.status !== 400) return;
          const answer = (await response.json().catch(() => ({}))) as {
            error?: string;
            field?: string;
          };
          const field = REQUEST_FIELDS.find((f) => f === answer.field);
          const code = FIELD_MESSAGES.includes(answer.error ?? "")
            ? (answer.error as string)
            : "invalid";
          if (!field) return setProblem({ message: tForm("selection") });
          setProblem({ field, message: tForm(code) });
          (form.elements.namedItem(field) as HTMLElement | null)?.focus();
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
              {...fieldProps(key)}
              type={
                key === "email" ? "email" : key === "phone" ? "tel" : "text"
              }
              required={key !== "hotel"}
              pattern={key === "phone" ? PHONE_PATTERN : undefined}
              title={key === "phone" ? tForm("phone") : undefined}
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
            {fieldError(key)}
          </label>
        ))}
        <label>
          {t("preferredDate")}
          <input
            {...fieldProps("desiredDate", noteId)}
            type="date"
            required={dinner}
            min={first}
            max={last}
            onChange={(event) => setDesiredDate(event.target.value)}
          />
          {fieldError("desiredDate")}
        </label>
        <label>
          {t("alternativeDate")}
          <input
            {...fieldProps("alternativeDate", noteId)}
            type="date"
            // The alternative comes after the preferred date.
            min={
              desiredDate && first && desiredDate >= first
                ? nextDay(desiredDate)
                : first
            }
            max={last}
          />
          {fieldError("alternativeDate")}
        </label>
      </div>
      <label className="flex items-center">
        <input name="datesFlexible" type="checkbox" className="h-5 w-5" />
        {t("datesFlexible")}
      </label>
      <p id={noteId}>{t("datePreferenceNote")}</p>
      <label>
        {t("requestComments")}
        <textarea {...fieldProps("notes")} required={!experienceId} rows={4} />
        {fieldError("notes")}
      </label>
      <label>
        {t("fragranceSensitivity")}
        <input {...fieldProps("fragranceSensitivity")} type="text" />
        {fieldError("fragranceSensitivity")}
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
        className={buttonClass()}
        disabled={demo || status === "sending" || status === "sent"}
      >
        {status === "sending" ? "…" : t("send")}
      </button>
      <p role="status">
        {status === "sent"
          ? t(dinner ? "dinnerRequestSuccess" : "success")
          : status === "error"
            ? problem
              ? problem.field
                ? ""
                : problem.message
              : t("error")
            : ""}
      </p>
    </form>
  );
}

/** The day after a YYYY-MM-DD date. */
function nextDay(date: string) {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
}
