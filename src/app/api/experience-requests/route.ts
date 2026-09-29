import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";
import { getExperience } from "@/sanity/queries/ExperienceCatalog";
import { calculate } from "@/lib/experience/pricing";
export const runtime = "nodejs";
const recent = new Map<string, { count: number; until: number }>();
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin)
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
    if (
      contact.desiredDate &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(contact.desiredDate) ||
        !Number.isFinite(Date.parse(contact.desiredDate)) ||
        new Date(contact.desiredDate).toISOString().slice(0, 10) !==
          contact.desiredDate)
    )
      throw Error("date");
    if (!["en", "es"].includes(body.locale)) throw Error("locale");
    let snapshot: unknown = null;
    if (body.experienceId) {
      if (
        typeof body.experienceId !== "string" ||
        body.experienceId.length > 200
      )
        throw Error("id");
      const e = await getExperience(body.experienceId);
      if (!e) throw Error("experience");
      const result = calculate(e, body.selection, true);
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
    const saved = await getStore("experience-requests").setJSON(
      id,
      {
        receivedAt: new Date().toISOString(),
        locale: body.locale,
        status: "new",
        contact,
        snapshot,
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
