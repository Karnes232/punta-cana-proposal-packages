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
const imageDefaults =
  require("next/dist/shared/lib/image-config").imageConfigDefault;
imageDefaults.domains.push("cdn.sanity.io");
imageDefaults.qualities.push(80);
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
      mainImage: { url: "https://cdn.sanity.io/a.jpg" },
    },
    {
      _key: "s2",
      name: { en: "variant-b", es: "variante-b" },
      active: true,
      price: 200,
      mainImage: { url: "https://cdn.sanity.io/b.jpg" },
    },
  ],
  gallery: [{ _key: "g", image: { url: "https://cdn.sanity.io/gallery.jpg" } }],
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
    assert.match(
      document.querySelector(".ec-gallery img").getAttribute("src"),
      /b.jpg/,
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
      document.querySelector(".ec-purchase > button").click(),
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
  assert.equal(document.querySelectorAll(".ec-guest-menus select").length, 9);
  await act(async () =>
    document.querySelectorAll("input[type=radio]")[1].click(),
  );
  assert.match(document.querySelector(".ec-total strong").textContent, /849/);
  const menus = document.querySelectorAll(".ec-guest-menus select");
  await act(async () => {
    for (const el of menus) {
      el.value = el.options[1].value;
      el.dispatchEvent(new window.Event("change", { bubbles: true }));
    }
  });
  assert.equal(document.querySelector(".ec-purchase > button").disabled, false);
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
  assert.equal(document.querySelector(".ec-purchase > button").disabled, false);
  await act(async () => root.unmount());
});

test("proposal template keeps extras across styles, shows no invented price and cannot book", async () => {
  const {
    proposalPreview,
  } = require("../src/lib/experience/proposalTemplate.ts");
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(Card, {
        experience: proposalPreview(),
        locale: "es",
        settings: {},
        demo: true,
      }),
    ),
  );
  assert.equal(document.querySelectorAll("input[type=radio]").length, 3);
  assert.equal(document.querySelectorAll("input[type=checkbox]").length, 3);
  assert.match(
    document.querySelector(".ec-card-heading").textContent,
    /Precio por definir/,
  );
  assert.equal(document.querySelectorAll(".ec-guest-menus").length, 0);
  await act(async () => {
    document.querySelector("input[type=checkbox]").click();
    document.querySelectorAll("input[type=radio]")[1].click();
  });
  assert.equal(document.querySelector("input[type=checkbox]").checked, true);
  assert.match(
    document.querySelector(".ec-template-media").textContent,
    /Estilo B/,
  );
  assert.equal(document.querySelector(".ec-purchase > button").disabled, false);
  await act(async () => root.unmount());
});

test("EN/ES progressive menus preserve guests 1-N, cocktails and extras across collapse", async () => {
  for (const locale of ["en", "es"]) {
    const e = {
      ...fixture,
      _type: "romanticDinnerExperience",
      basePrice: 849,
      includedGuests: 2,
      minimumGuests: 2,
      maximumGuests: 7,
      additionalGuestPrice: 100,
      includedDurationMinutes: 120,
      maximumDurationMinutes: 120,
      menuItems: ["starter", "main", "dessert"].map((courseType) => ({
        _id: courseType,
        courseType,
        active: true,
        included: true,
        name: { en: courseType, es: courseType },
        dietaryType: "vegan",
      })),
      beverages: [
        {
          _id: "c",
          type: "welcomeDrink",
          active: true,
          supplementPrice: 5,
          name: { en: "Cocktail", es: "Cóctel" },
        },
      ],
    };
    const root = createRoot(document.getElementById("root"));
    await act(async () =>
      root.render(
        React.createElement(Card, { experience: e, locale, settings: {} }),
      ),
    );
    assert.ok(
      [...document.querySelectorAll(".ec-accordion > button")].every(
        (b) => b.getAttribute("aria-expanded") === "false",
      ),
    );
    const buttons = () => [...document.querySelectorAll("button")];
    const add = () =>
      buttons().find(
        (b) =>
          b.getAttribute("aria-label") ===
          (locale === "es" ? "Añadir invitado" : "Add guest"),
      );
    const minus = () =>
      buttons().find(
        (b) =>
          b.getAttribute("aria-label") ===
          (locale === "es" ? "Quitar invitado" : "Remove guest"),
      );
    await act(async () => add().click());
    assert.equal(
      document.querySelectorAll(".ec-guest-menus select").length,
      12,
    );
    await act(async () => {
      for (const el of document.querySelectorAll(".ec-guest-menus select")) {
        el.value = el.options[1].value;
        el.dispatchEvent(new window.Event("change", { bubbles: true }));
      }
    });
    assert.equal(
      document.querySelector(".ec-purchase > button").disabled,
      false,
    );
    assert.match(document.querySelector(".ec-total strong").textContent, /964/);
    await act(async () => minus().click());
    assert.equal(document.querySelectorAll(".ec-guest-menus select").length, 8);
    assert.ok(
      [...document.querySelectorAll(".ec-guest-menus select")].every(
        (el) => !!el.value,
      ),
    );
    const accordion = document.querySelector(
      ".ec-guest-menus .ec-accordion > button",
    );
    await act(async () => accordion.click());
    await act(async () => accordion.click());
    assert.ok(
      [...document.querySelectorAll(".ec-guest-menus select")].every(
        (el) => !!el.value,
      ),
    );
    await act(async () => add().click());
    assert.equal(
      document.querySelectorAll(".ec-guest-menus select")[8].value,
      "",
    );
    assert.ok(document.querySelector(".ec-dietary").textContent.includes("Ve"));
    await act(async () => root.unmount());
  }
});

test("demo opens the real inline form but cannot transmit a request", async () => {
  const root = createRoot(document.getElementById("root"));
  const previousFetch = global.fetch;
  let requests = 0;
  global.fetch = async () => {
    requests++;
    throw new Error("Demo must not send");
  };
  try {
    await act(async () =>
      root.render(
        React.createElement(Card, {
          experience: fixture,
          locale: "es",
          settings: {},
          demo: true,
        }),
      ),
    );
    await act(async () =>
      document.querySelector(".ec-purchase > button").click(),
    );
    const form = document.querySelector("form");
    assert.ok(form);
    assert.equal(form.querySelector("button").disabled, true);
    await act(async () =>
      form.dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      ),
    );
    assert.equal(requests, 0);
  } finally {
    global.fetch = previousFetch;
    await act(async () => root.unmount());
  }
});
