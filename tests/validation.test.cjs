const { test } = require("node:test");
const assert = require("node:assert/strict");

const out = "../work/pricing-tests";
const v = require(`${out}/sanity/schemaTypes/shared/validation.js`);
const { structuredData } = require(`${out}/lib/seo/structuredData.js`);
const ok = (result) => result === true;

test("slugs and filter values are lowercase words joined by hyphens", () => {
  assert.ok(ok(v.slugFormat({ current: "lucia-and-marco" })));
  assert.ok(ok(v.slugFormat(undefined)));
  for (const bad of ["Lucia", "two  words", "trailing-", "a_b", "x".repeat(97)])
    assert.ok(!ok(v.slugFormat({ current: bad })), bad);
  assert.ok(ok(v.identifierFormat("planning-tips")));
  assert.ok(!ok(v.identifierFormat("Planning Tips")));
  assert.ok(!ok(v.notReserved("all")));
});

test("links must be a page path or an https, mailto or tel link", () => {
  for (const good of [
    "/proposals",
    "/",
    "https://x.com/a",
    "mailto:a@b.co",
    "tel:+18094929868",
  ])
    assert.ok(ok(v.linkFormat(good)), good);
  for (const bad of [
    "proposals",
    "http://x.com",
    "/two words",
    "javascript:alert(1)",
  ])
    assert.ok(!ok(v.linkFormat(bad)), bad);
});

test("an added image needs its file, and alt text when it has one", () => {
  assert.ok(ok(v.imageFileIfSet(undefined)));
  assert.ok(!ok(v.imageFileIfSet({ alt: "x" })));
  assert.ok(ok(v.imageFileIfSet({ asset: { _ref: "image-1" } })));
  assert.ok(!ok(v.altIfImage({ asset: { _ref: "image-1" } })));
  assert.ok(ok(v.altIfImage({ asset: { _ref: "image-1" }, alt: { en: "A" } })));
  assert.ok(ok(v.altIfImage({ alt: "" })));
});

test("localized texts need English; other languages only warn", () => {
  assert.ok(!ok(v.englishRequired({ es: "Hola" })));
  assert.ok(ok(v.englishRequired({ en: "Hi" })));
  assert.match(
    v.missingLanguages(["es", "fr"])({ en: "Hi", es: "Hola" }),
    /fr/,
  );
  assert.ok(ok(v.missingLanguages(["es"])({ es: "Hola" })));
});

test("repeated items are caught", () => {
  const byName = v.uniqueItems((c) => c.name);
  assert.ok(ok(byName([{ name: "A" }, { name: "B" }])));
  assert.ok(!ok(byName([{ name: "A" }, { name: "A" }])));
});

test("structured data text from the Studio becomes JSON-LD, invalid text is dropped", () => {
  assert.deepEqual(structuredData('{"@context":"https://schema.org"}'), {
    "@context": "https://schema.org",
  });
  assert.equal(structuredData("{not json"), null);
  assert.equal(structuredData(""), null);
  const object = { "@type": "Service" };
  assert.equal(structuredData(object), object);
});
