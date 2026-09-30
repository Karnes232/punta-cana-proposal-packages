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
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = clearTimeout;
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

test("proposal grid selects one package inline, preserves each configuration and has no detail links", async () => {
  const Grid =
    require("../src/components/ExperienceCatalog/ProposalGrid.tsx").default;
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(Grid, {
        experiences: [
          fixture,
          { ...fixture, _id: "second", name: { en: "Second" } },
        ],
        locale: "en",
        settings: {},
      }),
    ),
  );
  const cards = document.querySelectorAll(".ec-proposal-card");
  assert.equal(cards.length, 2);
  assert.equal(document.querySelectorAll(".ec-proposal-card a").length, 0);
  assert.equal(
    document.querySelectorAll(".ec-select-package[aria-pressed=true]").length,
    0,
  );
  await act(async () => cards[0].querySelector(".ec-select-package").click());
  await act(async () => cards[0].querySelector("input[type=checkbox]").click());
  await act(async () => {
    const select = cards[0].querySelector("select");
    select.value = "s2";
    select.dispatchEvent(new window.Event("change", { bubbles: true }));
  });
  assert.match(cards[0].querySelector(".ec-total strong").textContent, /210/);
  await act(async () => cards[1].querySelector("h2").click());
  assert.equal(
    document.querySelectorAll(".ec-select-package[aria-pressed=true]").length,
    1,
  );
  assert.equal(cards[0].querySelector("[id^=configure-]").hidden, true);
  await act(async () => cards[0].querySelector(".ec-select-package").click());
  assert.equal(cards[0].querySelector("select").value, "s2");
  assert.equal(cards[0].querySelector("input[type=checkbox]").checked, true);
  assert.equal(window.location.pathname, "/");
  await act(async () => root.unmount());
});

test("date request form sends preferences and uses the editable deposit without confirming a booking", async () => {
  const Form =
    require("../src/components/ExperienceCatalog/AvailabilityForm.tsx").default;
  const oldFetch = global.fetch,
    oldFormData = global.FormData;
  global.FormData = window.FormData;
  let sent;
  global.fetch = async (url, options) => {
    sent = JSON.parse(options.body);
    return { ok: true };
  };
  try {
    for (const locale of ["en", "es"]) {
      const root = createRoot(document.getElementById("root"));
      await act(async () =>
        root.render(
          React.createElement(Form, {
            locale,
            settings: { dinnerDepositAmount: 250 },
            experienceId: "dinner",
            dinner: true,
            selection: {
              guestCount: 2,
              guestMenus: [],
              addons: {},
              beverages: [],
            },
          }),
        ),
      );
      const form = document.querySelector("form");
      assert.equal(form.querySelector("[name=desiredDate]").required, true);
      assert.equal(
        form.querySelector("[name=alternativeDate]").required,
        false,
      );
      for (const [name, value] of Object.entries({
        fullName: "Test",
        email: "test@example.invalid",
        phone: "000",
        desiredDate: "2026-12-12",
        alternativeDate: "2026-12-14",
        hotel: "Test hotel",
        fragranceSensitivity: "No fragrance",
      }))
        form.querySelector(`[name=${name}]`).value = value;
      form.querySelector("[name=datesFlexible]").checked = true;
      await act(async () =>
        form.dispatchEvent(
          new window.Event("submit", { bubbles: true, cancelable: true }),
        ),
      );
      assert.equal(sent.contact.datesFlexible, true);
      assert.equal(sent.contact.alternativeDate, "2026-12-14");
      assert.match(form.querySelector("[role=status]").textContent, /250/);
      assert.match(
        form.querySelector("[role=status]").textContent,
        locale === "es"
          ? /confirmar la disponibilidad/
          : /confirm availability/,
      );
      assert.doesNotMatch(
        form.querySelector("[role=status]").textContent,
        /reservation is confirmed|reserva confirmada/,
      );
      assert.equal(
        form.querySelector("[name=desiredDate]").value,
        "2026-12-12",
      );
      await act(async () => root.unmount());
    }
  } finally {
    global.fetch = oldFetch;
    global.FormData = oldFormData;
  }
});

test("proposal dinner opens two menus, retains choices across toggles and requires completion", async () => {
  const {
    withProposalExtras,
  } = require("../src/lib/experience/proposalExtras.ts");
  const e = withProposalExtras(
    fixture,
    ["starter", "main", "dessert"].map((course) => ({
      _id: course,
      active: true,
      included: true,
      courseType: course,
      name: { en: course, es: course },
    })),
  );
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(Card, {
        experience: e,
        locale: "es",
        settings: {},
        selectable: true,
        selected: true,
      }),
    ),
  );
  const dinner = () =>
    [...document.querySelectorAll(".ec-addon label")]
      .find((el) => el.textContent.includes("Cena romántica"))
      .querySelector("input");
  await act(async () => dinner().click());
  assert.equal(
    document.querySelectorAll(".ec-proposal-dinner select").length,
    6,
  );
  assert.equal(document.querySelector(".ec-purchase > button").disabled, true);
  await act(async () => {
    document.querySelectorAll(".ec-proposal-dinner select").forEach((el) => {
      el.value = el.options[1].value;
      el.dispatchEvent(new window.Event("change", { bubbles: true }));
    });
  });
  // Each event commits independently to model normal user input.
  for (const el of document.querySelectorAll(".ec-proposal-dinner select")) {
    await act(async () => {
      el.value = el.options[1].value;
      el.dispatchEvent(new window.Event("change", { bubbles: true }));
    });
  }
  assert.equal(document.querySelector(".ec-purchase > button").disabled, false);
  assert.match(document.querySelector(".ec-total").textContent, /449/);
  await act(async () => dinner().click());
  assert.equal(document.querySelector(".ec-proposal-dinner"), null);
  assert.match(document.querySelector(".ec-total").textContent, /150/);
  await act(async () => dinner().click());
  assert.equal(
    document.querySelector(".ec-proposal-dinner select").value,
    "starter",
  );
  assert.equal(document.querySelector(".ec-purchase > button").disabled, false);
  await act(async () => root.unmount());
});
