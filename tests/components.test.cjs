const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const dom = new JSDOM('<!doctype html><div id="root"></div>', {
  url: "http://localhost",
});
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.IS_REACT_ACT_ENVIRONMENT = true;
const Module = require("node:module"),
  ts = require("typescript");
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(
    this,
    request.startsWith("@/") ? path.resolve("src", request.slice(2)) : request,
    parent,
    ...rest,
  );
};
for (const ext of [".ts", ".tsx"])
  require.extensions[ext] = (module, file) =>
    module._compile(
      ts.transpileModule(require("fs").readFileSync(file, "utf8"), {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          target: ts.ScriptTarget.ES2020,
          esModuleInterop: true,
        },
      }).outputText,
      file,
    );
const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");
const Card =
  require("../src/components/ExperienceCatalog/ExperienceCard.tsx").default;
const fixture = {
  _id: "fixture",
  _type: "proposalExperience",
  active: true,
  name: { en: "fixture", es: "fixture" },
  basePrice: 100,
  currency: "USD",
  styles: [
    {
      _key: "s1",
      name: { en: "variant-a", es: "variante-a" },
      active: true,
      price: 150,
      mainImage: { url: "https://example.invalid/a.jpg" },
    },
    {
      _key: "s2",
      name: { en: "variant-b", es: "variante-b" },
      active: true,
      price: 200,
      mainImage: { url: "https://example.invalid/b.jpg" },
    },
  ],
  gallery: [
    { _key: "g", image: { url: "https://example.invalid/gallery.jpg" } },
  ],
  inclusions: [],
  availableAddons: [
    {
      _id: "addon",
      active: true,
      name: { en: "fixture-extra", es: "fixture-extra" },
      applicableTo: ["proposal", "romanticDinner"],
      pricingType: "fixed",
      price: 10,
    },
  ],
  menuItems: [],
  beverages: [],
  occasions: [],
};
test("EN and ES: styles change image/price, keep extras, gallery keyboard and inline form work", async () => {
  for (const locale of ["en", "es"]) {
    const root = createRoot(document.getElementById("root"));
    await act(async () =>
      root.render(
        React.createElement(Card, {
          experience: fixture,
          locale,
          settings: {},
        }),
      ),
    );
    assert.match(document.querySelector(".ec-total strong").textContent, /150/);
    await act(async () =>
      document.querySelector("input[type=checkbox]").click(),
    );
    await act(async () =>
      document.querySelectorAll("input[type=radio]")[1].click(),
    );
    assert.equal(
      document.querySelector(".ec-gallery img").getAttribute("src"),
      "https://example.invalid/b.jpg",
    );
    assert.equal(document.querySelector("input[type=checkbox]").checked, true);
    assert.match(document.querySelector(".ec-total strong").textContent, /210/);
    await act(async () =>
      document.querySelector(".ec-gallery").dispatchEvent(
        new window.KeyboardEvent("keydown", {
          key: "ArrowRight",
          bubbles: true,
        }),
      ),
    );
    assert.match(document.querySelector(".ec-gallery img").src, /gallery/);
    await act(async () =>
      document.querySelector(".ec-card-body > button").click(),
    );
    assert.ok(document.querySelector("form"));
    assert.equal(document.querySelectorAll("form input[required]").length, 3);
    await act(async () => root.unmount());
  }
});
test("dinner renders a menu for every guest and style does not affect price", async () => {
  const e = {
    ...fixture,
    _type: "romanticDinnerExperience",
    basePrice: 849,
    includedGuests: 3,
    maximumGuests: 4,
    additionalGuestPrice: 50,
    includedDurationMinutes: 120,
    maximumDurationMinutes: 180,
    menuItems: [
      {
        _id: "starter",
        active: true,
        courseType: "starter",
        included: true,
        name: { en: "fixture-starter" },
      },
      {
        _id: "dessert",
        active: true,
        courseType: "dessert",
        included: true,
        name: { en: "fixture-dessert" },
      },
      {
        _id: "m",
        active: true,
        courseType: "main",
        included: true,
        name: { en: "fixture-course" },
      },
    ],
  };
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(Card, { experience: e, locale: "en", settings: {} }),
    ),
  );
  assert.equal(document.querySelectorAll("details select").length, 9);
  await act(async () =>
    document.querySelectorAll("input[type=radio]")[1].click(),
  );
  assert.match(document.querySelector(".ec-total strong").textContent, /849/);
  const menus = document.querySelectorAll("details select");
  await act(async () => {
    for (const el of menus) {
      el.value = el.options[1].value;
      el.dispatchEvent(new window.Event("change", { bubbles: true }));
    }
  });
  assert.equal(
    document.querySelector(".ec-card-body > button").disabled,
    false,
  );
  await act(async () => root.unmount());
});
test("empty media/styles/addons render without false options", async () => {
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(Card, {
        experience: {
          ...fixture,
          styles: [],
          gallery: [],
          availableAddons: [],
        },
        locale: "en",
        settings: {},
      }),
    ),
  );
  assert.equal(document.querySelectorAll("img").length, 0);
  assert.equal(document.querySelectorAll("input[type=radio]").length, 0);
  assert.match(document.querySelector(".ec-total strong").textContent, /100/);
  await act(async () => root.unmount());
});

test("dinner template has 3 setups, individual 3-course menus and quote-only extras, never a booking", async () => {
  const { dinnerPreview } = require("../src/lib/experience/dinnerTemplate.ts");
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(Card, {
        experience: dinnerPreview(),
        locale: "es",
        settings: {},
        demo: true,
      }),
    ),
  );
  assert.equal(document.querySelectorAll("input[type=radio]").length, 3);
  assert.equal(document.querySelectorAll(".ec-guest-menus select").length, 6);
  assert.equal(document.querySelectorAll("input[type=checkbox]").length, 4);
  const menus = document.querySelectorAll(".ec-guest-menus select");
  await act(async () => {
    menus[0].value = menus[0].options[1].value;
    menus[0].dispatchEvent(new window.Event("change", { bubbles: true }));
    document.querySelector("input[type=checkbox]").click();
    document.querySelectorAll("input[type=radio]")[2].click();
  });
  assert.equal(menus[3].value, "");
  assert.equal(document.querySelector("input[type=checkbox]").checked, true);
  assert.match(document.querySelector(".ec-total").textContent, /cotización/);
  assert.equal(document.querySelector(".ec-card-body > button").disabled, true);
  await act(async () => root.unmount());
});
