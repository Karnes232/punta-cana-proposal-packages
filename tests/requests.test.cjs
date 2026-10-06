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
let experienceError = null;
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
      getRequestExperience: async () => {
        if (experienceError) throw experienceError;
        return requestExperience;
      },
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
const rules = require("../src/lib/experience/requestRules.ts");
// Dates relative to today in Punta Cana, so the fixtures never expire.
const today = rules.requestDateWindow().first;
function day(offset) {
  const date = new Date(`${today}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}
const body = {
  locale: "en",
  contact: {
    fullName: "fixture",
    email: "fixture@example.invalid",
    phone: "+1 (809) 555-0100",
    notes: "fixture",
  },
};
function request(data = body, headers = {}) {
  return new NextRequest("http://localhost/api/experience-requests", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost",
      "x-forwarded-for": `fixture-${++requestNumber}`,
      ...headers,
    },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
}
const withContact = (contact) => ({
  ...body,
  contact: { ...body.contact, ...contact },
});
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
      desiredDate: day(30),
      alternativeDate: day(31),
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
      preferredDate: day(30),
      alternativeDate: day(31),
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

test("only the site's own pages can post", async () => {
  const noOrigin = request(body, { origin: "" });
  noOrigin.headers.delete("origin");
  assert.equal((await POST(noOrigin)).status, 403);
  const sameOrigin = request(body, { "sec-fetch-site": "same-origin" });
  sameOrigin.headers.delete("origin");
  assert.equal((await POST(sameOrigin)).status, 201);
});

test("forms sent faster than a person could are dropped quietly", async () => {
  stored = null;
  const fast = await POST(request({ ...body, fillMs: 800 }));
  assert.equal(fast.status, 200);
  assert.equal(stored, null);
  assert.equal((await POST(request({ ...body, fillMs: 9000 }))).status, 201);
});

test("wrong type, size, rate and body shape are refused", async () => {
  assert.equal(
    (await POST(request(body, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await POST(request(body, { "content-type": "application/jsonx" }))).status,
    415,
  );
  const huge = withContact({ notes: "x".repeat(40000) });
  assert.equal((await POST(request(huge))).status, 413);
  for (const raw of ["null", "[]", '"text"', "{"])
    assert.equal((await POST(request(raw))).status, 400, raw);
  const limited = { "x-nf-client-connection-ip": "203.0.113.9" };
  const statuses = [];
  for (let i = 0; i < 11; i++)
    statuses.push((await POST(request(body, limited))).status);
  assert.equal(statuses.at(-1), 429);
  assert.equal(statuses.filter((s) => s === 201).length, 10);
});

test("fields are trimmed, checked and pointed at", async () => {
  const cases = [
    [{ fullName: "   " }, "fullName", "required"],
    [{ fullName: "x".repeat(121) }, "fullName", "length"],
    [{ phone: "12" }, "phone", "phone"],
    [{ phone: "call me maybe" }, "phone", "phone"],
    [{ email: "no-at-sign" }, "email", "email"],
    [{ desiredDate: day(-1) }, "desiredDate", "dateWindow"],
    [{ desiredDate: day(800) }, "desiredDate", "dateWindow"],
    [
      { desiredDate: day(10), alternativeDate: day(10) },
      "alternativeDate",
      "dateOrder",
    ],
    [
      { desiredDate: day(10), alternativeDate: day(5) },
      "alternativeDate",
      "dateOrder",
    ],
  ];
  for (const [contact, field, error] of cases) {
    stored = null;
    const response = await POST(request(withContact(contact)));
    assert.equal(response.status, 400, JSON.stringify(contact));
    assert.deepEqual(await response.json(), { error, field });
    assert.equal(stored, null);
  }
  const response = await POST(
    request(
      withContact({
        fullName: "  Ana  ",
        email: " Ana@Example.COM ",
        desiredDate: today,
      }),
    ),
  );
  assert.equal(response.status, 201);
  assert.equal(stored.value.contact.fullName, "Ana");
  assert.equal(stored.value.contact.email, "ana@example.com");
});

test("an outage is a 503 even when its message says Invalid", async () => {
  experienceError = Error("Invalid API token");
  try {
    assert.equal(
      (await POST(request({ ...body, experienceId: "dinner" }))).status,
      503,
    );
  } finally {
    experienceError = null;
  }
});

test("a retried request is stored once and the selection as known keys", async () => {
  requestExperience = {
    _id: "proposal",
    _type: "proposalExperience",
    name: { en: "Proposal" },
    active: true,
    basePrice: 1000,
    currency: "USD",
    styles: [],
    availableAddons: [],
    beverages: [],
    occasions: [],
    menuItems: [],
  };
  const requestId = "0b6f6a2e-3c4d-4e5f-8a9b-1c2d3e4f5a6b";
  const data = {
    ...body,
    experienceId: "proposal",
    requestId,
    selection: {
      guestCount: 1,
      guestMenus: [],
      addons: {},
      beverages: [],
      injected: "x".repeat(1000),
    },
  };
  const writes = [];
  try {
    for (let i = 0; i < 2; i++) {
      const response = await POST(request(data));
      assert.equal(response.status, 201);
      assert.equal((await response.json()).id, requestId);
      writes.push(stored);
      // The store now holds the id: a second write is not new.
      mode = "unmodified";
    }
    assert.equal(writes[0].id, requestId);
    assert.equal(writes[0].value.snapshot.selection.injected, undefined);
    assert.deepEqual(Object.keys(writes[0].value.snapshot.selection).sort(), [
      "addons",
      "beverages",
      "customOccasion",
      "guestCount",
      "guestMenus",
      "selectedOccasionId",
      "selectedStyleId",
    ]);
    assert.equal(
      (await POST(request({ ...data, requestId: "not-a-uuid" }))).status,
      400,
    );
  } finally {
    mode = "ok";
    requestExperience = null;
  }
});

test("today is today in Punta Cana and dates reach two years ahead", () => {
  // 02:00 UTC is still the evening before in Punta Cana (UTC-4).
  assert.deepEqual(rules.requestDateWindow(new Date("2026-10-07T02:00:00Z")), {
    first: "2026-10-06",
    last: "2028-10-06",
  });
  assert.equal(rules.isValidPhone("+1 (809) 555-0100"), true);
  assert.equal(rules.isValidPhone("+44 20 7946 0958"), true);
  assert.equal(rules.isValidPhone("123456"), false);
  assert.equal(rules.isValidPhone("1".repeat(21)), false);
  assert.equal(rules.isValidPhone("809-555-0100 ext"), false);
});

test("the phone pattern compiles the way browsers compile it", () => {
  const browser = new RegExp(`^(?:${rules.PHONE_PATTERN})$`, "v");
  assert.equal(browser.test("+1 (809) 555-0100"), true);
  assert.equal(browser.test("809.555.0100"), true);
  assert.equal(browser.test("call me"), false);
});
