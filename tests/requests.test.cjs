const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const Module = require("node:module"),
  ts = require("typescript");
const resolve = Module._resolveFilename,
  load = Module._load;
let mode = "ok",
  stored;
let requestExperience = null;
let requestNumber = 0;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(
    this,
    request.startsWith("@/") ? path.resolve("src", request.slice(2)) : request,
    parent,
    ...rest,
  );
};
Module._load = function (request, ...rest) {
  if (request === "@netlify/blobs")
    return {
      getStore: () => ({
        setJSON: async (id, value) => {
          if (mode === "fail") throw Error("network");
          stored = { id, value };
          return { modified: mode === "ok" };
        },
      }),
    };
  if (request === "@/sanity/queries/ExperienceCatalog")
    return {
      getRequestExperience: async () => requestExperience,
      getCatalogContent: async () => ({
        settings: { dinnerDepositAmount: 250 },
      }),
    };
  return load.call(this, request, ...rest);
};
require.extensions[".ts"] = (module, file) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    }).outputText,
    file,
  );
const fs = require("fs");
const { NextRequest } = require("next/server");
const { POST } = require("../src/app/api/experience-requests/route.ts");
const body = {
  locale: "en",
  contact: {
    fullName: "fixture",
    email: "fixture@example.invalid",
    phone: "000",
    notes: "fixture",
  },
};
function request(data = body) {
  return new NextRequest("http://localhost/api/experience-requests", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost",
      "x-forwarded-for": `fixture-${++requestNumber}`,
    },
    body: JSON.stringify(data),
  });
}
test("contact is acknowledged only after durable persistence", async () => {
  const response = await POST(request());
  assert.equal(response.status, 201);
  assert.equal((await response.json()).id, stored.id);
  assert.equal(stored.value.contact.email, body.contact.email);
  assert.equal(stored.value.snapshot, null);
});
test("requests are accepted in every site language and nothing else", async () => {
  for (const locale of ["en", "es", "fr", "pt"]) {
    const response = await POST(request({ ...body, locale }));
    assert.equal(response.status, 201, locale);
    assert.equal(stored.value.locale, locale);
  }
  stored = null;
  // Blog-only languages have no request form.
  for (const locale of ["de", "zz", ""])
    assert.equal((await POST(request({ ...body, locale }))).status, 400);
  assert.equal(stored, null);
});
test("failed or unmodified writes never report success", async () => {
  for (mode of ["fail", "unmodified"])
    assert.equal((await POST(request())).status, 503);
  mode = "ok";
});
test("invalid experience and contact are rejected before storage", async () => {
  stored = null;
  assert.equal(
    (await POST(request({ ...body, experienceId: "unknown" }))).status,
    400,
  );
  assert.equal(
    (
      await POST(
        request({ ...body, contact: { ...body.contact, email: "invalid" } }),
      )
    ).status,
    400,
  );
  assert.equal(stored, null);
});

test("accepts public host behind Netlify proxy and rejects foreign origin", async () => {
  const make = (origin) =>
    new NextRequest("http://internal/api/experience-requests", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-host": "preview.netlify.app",
        origin,
      },
      body: JSON.stringify(body),
    });
  assert.equal((await POST(make("https://preview.netlify.app"))).status, 201);
  assert.equal((await POST(make("https://foreign.invalid"))).status, 403);
});

test("dinner requests can share dates, preserve configuration and never reserve or collect a deposit", async () => {
  requestExperience = {
    _id: "dinner",
    _type: "romanticDinnerExperience",
    name: { en: "Dinner" },
    active: true,
    basePrice: 849,
    currency: "USD",
    includedGuests: 2,
    additionalGuestPrice: 100,
    includedDurationMinutes: 120,
    styles: [],
    availableAddons: [],
    beverages: [],
    occasions: [],
    menuItems: ["starter", "main", "dessert"].map((c) => ({
      _id: c,
      courseType: c,
      active: true,
      included: true,
    })),
  };
  const data = {
    ...body,
    experienceId: "dinner",
    contact: {
      ...body.contact,
      desiredDate: "2026-12-12",
      alternativeDate: "2026-12-13",
      datesFlexible: true,
      hotel: "Test hotel",
      fragranceSensitivity: "No fragrance",
    },
    selection: {
      guestCount: 3,
      guestMenus: Array.from({ length: 3 }, () => ({
        starter: "starter",
        main: "main",
        dessert: "dessert",
      })),
      addons: {},
      beverages: [],
      customOccasion: "Birthday",
    },
  };
  try {
    const first = await POST(request(data));
    assert.equal(first.status, 201);
    const id = (await first.json()).id;
    const second = await POST(request(data));
    assert.equal(second.status, 201);
    assert.notEqual((await second.json()).id, id);
    assert.equal(stored.value.status, "new");
    assert.equal(stored.value.snapshot.selection.customOccasion, "Birthday");
    assert.equal(stored.value.snapshot.estimatedTotal, 949);
    assert.equal(stored.value.snapshot.quoteRequired, true);
    assert.deepEqual(stored.value.datePreferences, {
      preferredDate: "2026-12-12",
      alternativeDate: "2026-12-13",
      flexible: true,
    });
    assert.equal(stored.value.paymentPolicy.depositAmount, 250);
    assert.equal(stored.value.paymentPolicy.depositStatus, "not_requested");
    assert.equal(stored.value.paymentPolicy.balanceDue, "dinner_day");
    assert.equal(stored.value.contact.fragranceSensitivity, "No fragrance");
    assert.ok(stored.value.receivedAt);
    assert.equal(stored.value.reservation, undefined);
    for (const contact of [
      { ...data.contact, desiredDate: "" },
      { ...data.contact, alternativeDate: "2026-02-30" },
      { ...data.contact, datesFlexible: "yes" },
    ]) {
      stored = null;
      assert.equal((await POST(request({ ...data, contact }))).status, 400);
      assert.equal(stored, null);
    }
  } finally {
    requestExperience = null;
  }
});
