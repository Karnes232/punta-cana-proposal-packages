import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";
import {
  getRequestExperience,
  getCatalogContent,
} from "@/sanity/queries/ExperienceCatalog";
import { isSiteLocale } from "@/i18n/locales";
import { calculate } from "@/lib/experience/pricing";
import { dinnerDeposit } from "@/lib/experience/dinnerPolicy";
import {
  FIELD_LIMITS,
  MIN_FILL_MS,
  REQUEST_FIELDS,
  RequestValidationError,
  checkRequestDates,
  isValidEmail,
  isValidPhone,
  normalizeSelection,
} from "@/lib/experience/requestRules";
import type { Selection } from "@/lib/experience/types";
import { getRequestHost, isDeployPreviewHost } from "@/lib/requestHost";
export const runtime = "nodejs";

const MAX_BODY_BYTES = 32768;
const RATE_LIMIT = { requests: 10, windowMs: 60_000, maxClients: 5000 };
const recent = new Map<string, { count: number; until: number }>();

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const invalid = (message: string, field?: RequestValidationError["field"]) =>
  new RequestValidationError(message, field);

/**
 * Only the site's own pages may post: the browser's Origin must be this
 * host, or, without an Origin, the fetch must be marked same-origin.
 */
function fromThisSite(request: NextRequest, publicHost: string) {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") === "same-origin";
  try {
    const url = new URL(origin);
    return (
      ["http:", "https:"].includes(url.protocol) && url.host === publicHost
    );
  } catch {
    return false;
  }
}

/** Netlify's real client address, else the first forwarded one. */
function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "local"
  );
}

/** Counts a request; true when the client is over the limit. */
function overLimit(key: string, now: number) {
  for (const [k, v] of recent) if (v.until < now) recent.delete(k);
  // Under a flood of addresses, forget the oldest (Maps keep insertion order).
  while (recent.size >= RATE_LIMIT.maxClients)
    recent.delete(recent.keys().next().value as string);
  const bucket = recent.get(key) || {
    count: 0,
    until: now + RATE_LIMIT.windowMs,
  };
  bucket.count++;
  recent.set(key, bucket);
  return bucket.count > RATE_LIMIT.requests;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** The contact fields, trimmed and checked against the shared rules. */
function readContact(c: Record<string, unknown>, needsNotes: boolean) {
  const contact = {} as Record<(typeof REQUEST_FIELDS)[number], string>;
  for (const field of REQUEST_FIELDS) {
    const raw = c[field] ?? "";
    if (typeof raw !== "string") throw invalid("type", field);
    const value = raw.trim();
    const required =
      field === "fullName" ||
      field === "email" ||
      field === "phone" ||
      (field === "notes" && needsNotes);
    if (value.length > FIELD_LIMITS[field]) throw invalid("length", field);
    if (required && !value) throw invalid("required", field);
    contact[field] = value;
  }
  contact.email = contact.email.toLowerCase();
  if (!isValidEmail(contact.email)) throw invalid("email", "email");
  if (!isValidPhone(contact.phone)) throw invalid("phone", "phone");
  checkRequestDates(contact.desiredDate, contact.alternativeDate);
  return contact;
}

export async function POST(request: NextRequest) {
  // Netlify forwards the public host while the internal Next.js URL may differ.
  const publicHost = getRequestHost(request.headers, request.nextUrl.host);
  if (!fromThisSite(request, publicHost))
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  if (overLimit(clientKey(request), Date.now()))
    return NextResponse.json({ error: "Try later" }, { status: 429 });
  try {
    const mediaType = request.headers
      .get("content-type")
      ?.split(";")[0]
      .trim()
      .toLowerCase();
    if (mediaType !== "application/json")
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 415 },
      );
    const reader = request.body?.getReader();
    if (!reader)
      return NextResponse.json({ error: "Missing body" }, { status: 400 });
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.length;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: "Too large" }, { status: 413 });
      }
      chunks.push(part.value);
    }
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!isObject(body)) throw invalid("body");
    const c = body.contact;
    if (!isObject(c)) throw invalid("contact");
    // Bots fill the hidden field or send the form within seconds: pretend
    // it worked so they don't adapt.
    if (
      c.website ||
      (typeof body.fillMs === "number" && body.fillMs < MIN_FILL_MS)
    )
      return NextResponse.json({ ok: true });
    const locale = body.locale;
    if (typeof locale !== "string" || !isSiteLocale(locale))
      throw invalid("locale");
    if (c.datesFlexible !== undefined && typeof c.datesFlexible !== "boolean")
      throw invalid("datesFlexible");
    // The form sends one id per request, so a retry can't store it twice.
    if (
      body.requestId !== undefined &&
      (typeof body.requestId !== "string" || !UUID.test(body.requestId))
    )
      throw invalid("requestId");
    const experienceId = body.experienceId;
    if (
      experienceId !== undefined &&
      experienceId !== null &&
      experienceId !== "" &&
      (typeof experienceId !== "string" || experienceId.length > 200)
    )
      throw invalid("id");
    const contact = readContact(c, !experienceId);
    let snapshot: unknown = null;
    let paymentPolicy: unknown = null;
    if (experienceId) {
      const e = await getRequestExperience(experienceId as string);
      if (!e) throw invalid("experience");
      const dinner = e._type === "romanticDinnerExperience";
      if (dinner && !contact.desiredDate)
        throw invalid("required", "desiredDate");
      const selection = body.selection as Selection;
      const result = calculate(e, selection, true, dinner);
      if (dinner) {
        const content = await getCatalogContent(locale);
        paymentPolicy = {
          depositAmount: dinnerDeposit(content.settings),
          currency: "USD",
          depositStatus: "not_requested",
          balanceDue: "dinner_day",
          manualAvailabilityReview: true,
        };
      }
      snapshot = {
        experienceId: e._id,
        name: e.name,
        selection: normalizeSelection(selection),
        ...result,
      };
    }
    // Site-scoped storage survives deployments; no public read endpoint is exposed.
    // Netlify supplies credentials to the Next.js server function at runtime.
    const id =
      (body.requestId as string | undefined)?.toLowerCase() ?? randomUUID();
    const storeName = isDeployPreviewHost(publicHost)
      ? "experience-requests-preview"
      : "experience-requests";
    const saved = await getStore(storeName).setJSON(
      id,
      {
        receivedAt: new Date().toISOString(),
        locale,
        status: "new",
        contact,
        snapshot,
        datePreferences: {
          preferredDate: contact.desiredDate || null,
          alternativeDate: contact.alternativeDate || null,
          flexible: c.datesFlexible === true,
        },
        paymentPolicy,
      },
      { onlyIfNew: true },
    );
    // Not written because the id exists: the visitor's earlier try got
    // through, so this retry succeeds too. A new server id must be written.
    if (!saved.modified && !body.requestId) throw Error("Persistence failed");
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError)
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    if (error instanceof RequestValidationError)
      return NextResponse.json(
        { error: error.message, field: error.field },
        { status: 400 },
      );
    console.error(
      "Request persistence failed",
      error instanceof Error ? error.name : typeof error,
    );
    return NextResponse.json({ error: "Request unavailable" }, { status: 503 });
  }
}
