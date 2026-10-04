import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";
import {
  getRequestExperience,
  getCatalogContent,
} from "@/sanity/queries/ExperienceCatalog";
import { calculate } from "@/lib/experience/pricing";
import { dinnerDeposit } from "@/lib/experience/dinnerPolicy";
import { getRequestHost, isDeployPreviewHost } from "@/lib/requestHost";
export const runtime = "nodejs";
const recent = new Map<string, { count: number; until: number }>();
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  // Netlify forwards the public host while the internal Next.js URL may differ.
  const publicHost = getRequestHost(request.headers, request.nextUrl.host);
  let validOrigin = !origin;
  try {
    if (origin) {
      const url = new URL(origin);
      validOrigin =
        ["http:", "https:"].includes(url.protocol) && url.host === publicHost;
    }
  } catch {
    validOrigin = false;
  }
  if (!validOrigin)
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const key = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  for (const [k, v] of recent) if (v.until < now) recent.delete(k);
  const bucket = recent.get(key) || { count: 0, until: now + 60_000 };
  bucket.count++;
  recent.set(key, bucket);
  if (bucket.count > 10)
    return NextResponse.json({ error: "Try later" }, { status: 429 });
  try {
    if (!request.headers.get("content-type")?.includes("application/json"))
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
      if (bytes > 32768) {
        await reader.cancel();
        return NextResponse.json({ error: "Too large" }, { status: 413 });
      }
      chunks.push(part.value);
    }
    const raw = Buffer.concat(chunks);
    const body = JSON.parse(raw.toString("utf8"));
    const c = body.contact;
    if (!c || typeof c !== "object") throw Error("contact");
    if (c.website) return NextResponse.json({ ok: true });
    const contact: Record<string, string> = {};
    for (const [field, max, required] of [
      ["fullName", 120, true],
      ["email", 254, true],
      ["phone", 80, true],
      ["hotel", 254, false],
      ["desiredDate", 10, false],
      ["alternativeDate", 10, false],
      ["fragranceSensitivity", 500, false],
      ["notes", 4000, !body.experienceId],
    ] as const) {
      const value = c[field] ?? "";
      if (
        typeof value !== "string" ||
        value.length > max ||
        (required && !value.trim())
      )
        throw Error(field);
      contact[field] = value.trim();
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) throw Error("email");
    for (const date of [contact.desiredDate, contact.alternativeDate])
      if (
        date &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
          !Number.isFinite(Date.parse(date)) ||
          new Date(date).toISOString().slice(0, 10) !== date)
      )
        throw Error("date");
    if (!["en", "es"].includes(body.locale)) throw Error("locale");
    if (c.datesFlexible !== undefined && typeof c.datesFlexible !== "boolean")
      throw Error("datesFlexible");
    let snapshot: unknown = null;
    let paymentPolicy: unknown = null;
    if (body.experienceId) {
      if (
        typeof body.experienceId !== "string" ||
        body.experienceId.length > 200
      )
        throw Error("id");
      const e = await getRequestExperience(body.experienceId);
      if (!e) throw Error("experience");
      const dinner = e._type === "romanticDinnerExperience";
      if (dinner && !contact.desiredDate) throw Error("desiredDate");
      const result = calculate(e, body.selection, true, dinner);
      if (dinner) {
        const content = await getCatalogContent();
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
        selection: body.selection,
        ...result,
      };
    }
    // Site-scoped storage survives deployments; no public read endpoint is exposed.
    // Netlify supplies credentials to the Next.js server function at runtime.
    const id = randomUUID();
    const storeName = isDeployPreviewHost(publicHost)
      ? "experience-requests-preview"
      : "experience-requests";
    const saved = await getStore(storeName).setJSON(
      id,
      {
        receivedAt: new Date().toISOString(),
        locale: body.locale,
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
    if (!saved.modified) throw Error("Persistence failed");
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error &&
        [
          "contact",
          "fullName",
          "email",
          "phone",
          "hotel",
          "desiredDate",
          "alternativeDate",
          "fragranceSensitivity",
          "datesFlexible",
          "notes",
          "date",
          "locale",
          "id",
          "experience",
        ].includes(error.message))
    )
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    if (
      error instanceof Error &&
      /Invalid|Select|limit|inactive|unavailable|configuration|Duplicate|range/.test(
        error.message,
      )
    )
      return NextResponse.json(
        { error: "Invalid configuration" },
        { status: 400 },
      );
    console.error("Request persistence failed");
    return NextResponse.json({ error: "Request unavailable" }, { status: 503 });
  }
}
