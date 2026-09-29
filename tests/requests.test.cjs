const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const Module = require("node:module"),
  ts = require("typescript");
const resolve = Module._resolveFilename,
  load = Module._load;
let mode = "ok",
  stored;
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
    return { getExperience: async () => null };
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
    headers: { "content-type": "application/json", origin: "http://localhost" },
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
