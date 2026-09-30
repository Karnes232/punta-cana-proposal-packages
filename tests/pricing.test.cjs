const { test } = require("node:test");
const assert = require("node:assert/strict");
const { calculate } = require("../work/pricing-tests/pricing.js");
// Isolated test fixtures. Never sent to Sanity or included in production catalog.
const addon = {
  _id: "a",
  active: true,
  applicableTo: ["proposal", "romanticDinner"],
  price: 10,
  pricingType: "fixed",
};
const proposal = {
  _id: "p",
  _type: "proposalExperience",
  active: true,
  basePrice: 100,
  currency: "USD",
  styles: [{ _key: "s", active: true, price: 150 }],
  availableAddons: [addon],
  menuItems: [],
  beverages: [],
  occasions: [],
};
const selection = {
  selectedStyleId: "s",
  addons: {},
  guestCount: 1,
  guestMenus: [],
  beverages: [],
};
const dinner = {
  ...proposal,
  _type: "romanticDinnerExperience",
  basePrice: 849,
  includedGuests: 2,
  maximumGuests: 4,
  additionalGuestPrice: 50,
  includedDurationMinutes: 120,
  maximumDurationMinutes: 180,
  menuItems: [
    { _id: "starter", active: true, courseType: "starter", included: true },
    { _id: "dessert", active: true, courseType: "dessert", included: true },
    { _id: "m", active: true, courseType: "main", supplementPrice: 12 },
  ],
  beverages: [{ _id: "b", active: true, supplementPrice: 20 }],
  occasions: [{ _id: "o", active: true, allowCustomMessage: false }],
};
const ds = { ...selection, guestCount: 2 };
test("proposal style replaces base price", () =>
  assert.equal(calculate(proposal, selection).estimatedTotal, 150));
test("no style falls back to base for estimate", () =>
  assert.equal(
    calculate(proposal, { ...selection, selectedStyleId: undefined })
      .estimatedTotal,
    100,
  ));
test("submission requires style when styles exist", () =>
  assert.throws(() =>
    calculate(proposal, { ...selection, selectedStyleId: undefined }, true),
  ));
test("extras stay included when style changes", () => {
  const e = {
    ...proposal,
    styles: [...proposal.styles, { _key: "s2", active: true, price: 200 }],
  };
  assert.equal(
    calculate(e, { ...selection, addons: { a: 1 }, selectedStyleId: "s2" })
      .estimatedTotal,
    210,
  );
});
test("dinner style never changes base", () =>
  assert.equal(calculate(dinner, ds).estimatedTotal, 849));
test("dinner guests, per guest supplements, beverages and addon", () =>
  assert.equal(
    calculate(
      dinner,
      {
        ...ds,
        guestCount: 3,
        guestMenus: Array.from({ length: 3 }, () => ({
          starter: "starter",
          main: "m",
          dessert: "dessert",
        })),
        beverages: ["b"],
        addons: { a: 1 },
      },
      true,
    ).estimatedTotal,
    965,
  ));
test("missing guest menu rejected on submission", () =>
  assert.throws(() => calculate(dinner, ds, true)));
test("inactive, foreign and fabricated IDs rejected", () => {
  for (const e of [
    proposal,
    { ...proposal, availableAddons: [{ ...addon, active: false }] },
    {
      ...proposal,
      availableAddons: [{ ...addon, applicableTo: ["romanticDinner"] }],
    },
  ])
    assert.throws(() => calculate(e, { ...selection, addons: { bad: 1 } }));
  assert.throws(() =>
    calculate(
      { ...proposal, availableAddons: [{ ...addon, active: false }] },
      { ...selection, addons: { a: 1 } },
    ),
  );
});
test("all quantity types", () => {
  for (const type of ["perUnit", "perHour", "per30Minutes"])
    assert.equal(
      calculate(
        { ...proposal, availableAddons: [{ ...addon, pricingType: type }] },
        { ...selection, addons: { a: 3 } },
      ).estimatedTotal,
      180,
    );
  assert.equal(
    calculate(
      { ...dinner, availableAddons: [{ ...addon, pricingType: "perPerson" }] },
      { ...ds, addons: { a: 1 } },
    ).estimatedTotal,
    869,
  );
});
test("invalid, fractional and excessive quantities rejected", () => {
  for (const q of [-1, 0, 1.5, 101, NaN, Infinity])
    assert.throws(() =>
      calculate(proposal, { ...selection, addons: { a: q } }),
    );
  assert.throws(() => calculate(proposal, { ...selection, addons: { a: 2 } }));
});
test("guest limits enforced", () => {
  for (const q of [1, 5, 2.5])
    assert.throws(() => calculate(dinner, { ...ds, guestCount: q }));
});
test("duration limit enforced across multiple extras", () => {
  const e = {
    ...dinner,
    availableAddons: [
      { ...addon, pricingType: "per30Minutes", durationMinutesPerUnit: 30 },
      { ...addon, _id: "a2", durationMinutesPerUnit: 30 },
    ],
  };
  assert.equal(calculate(e, { ...ds, addons: { a: 2 } }).durationMinutes, 180);
  assert.throws(() => calculate(e, { ...ds, addons: { a: 2, a2: 1 } }));
});
test("quote only flags unknown additional cost", () => {
  const r = calculate(
    {
      ...proposal,
      availableAddons: [
        { ...addon, pricingType: "quoteOnly", price: undefined },
      ],
    },
    { ...selection, addons: { a: 1 } },
  );
  assert.equal(r.estimatedTotal, 150);
  assert.equal(r.quoteRequired, true);
});
test("duplicate beverages and wrong courses rejected", () => {
  assert.throws(() => calculate(dinner, { ...ds, beverages: ["b", "b"] }));
  assert.throws(() =>
    calculate(dinner, { ...ds, guestMenus: [{ starter: "m" }] }),
  );
});
test("negative, missing and infinite prices rejected", () => {
  for (const price of [-1, undefined, Infinity])
    assert.throws(() =>
      calculate(
        { ...proposal, styles: [{ ...proposal.styles[0], price }] },
        selection,
      ),
    );
});
test("integer cents avoid fractional totals", () =>
  assert.equal(
    calculate(
      {
        ...proposal,
        styles: [{ ...proposal.styles[0], price: 0.1 }],
        availableAddons: [{ ...addon, price: 0.2 }],
      },
      { ...selection, addons: { a: 1 } },
    ).estimatedTotal,
    0.3,
  ));
test("browser total ignored", () =>
  assert.equal(
    calculate(proposal, { ...selection, estimatedTotal: 0 }).estimatedTotal,
    150,
  ));
test("custom occasion obeys CMS allowance", () =>
  assert.throws(() =>
    calculate(dinner, {
      ...ds,
      selectedOccasionId: "o",
      customOccasion: "text",
    }),
  ));

test("dinner requests require all three courses to be configured", () =>
  assert.throws(
    () =>
      calculate(
        {
          ...dinner,
          menuItems: dinner.menuItems.filter((x) => x.courseType !== "dessert"),
        },
        {
          ...ds,
          guestMenus: [
            { starter: "starter", main: "m" },
            { starter: "starter", main: "m" },
          ],
        },
        true,
      ),
    /Three-course/,
  ));

test("per-guest cocktails are charged per person and wine only once", () => {
  const e = {
    ...dinner,
    additionalGuestPrice: 100,
    beverages: [
      {
        _id: "cocktail",
        active: true,
        type: "welcomeDrink",
        supplementPrice: 5,
      },
      { _id: "wine", active: true, type: "wine", supplementPrice: 20 },
    ],
  };
  const s = {
    ...ds,
    guestCount: 3,
    guestMenus: Array.from({ length: 3 }, () => ({
      starter: "starter",
      main: "m",
      dessert: "dessert",
      welcomeCocktail: "cocktail",
    })),
    beverages: ["wine"],
  };
  assert.equal(calculate(e, s, true).estimatedTotal, 1020);
  assert.throws(
    () =>
      calculate(
        e,
        {
          ...s,
          guestMenus: s.guestMenus.map((m, i) =>
            i ? m : { ...m, welcomeCocktail: undefined },
          ),
        },
        true,
      ),
    /cocktail/,
  );
  assert.throws(
    () => calculate(e, { ...s, beverages: ["cocktail"] }),
    /beverage/,
  );
  assert.throws(
    () => calculate(e, { ...s, guestMenus: [{ welcomeCocktail: "wine" }] }),
    /cocktail/,
  );
});
test("one wine selection, inactive cocktail and minimum guests are enforced", () => {
  const e = {
    ...dinner,
    minimumGuests: 1,
    beverages: [
      { _id: "w1", active: true, type: "wine", included: true },
      { _id: "w2", active: true, type: "sparkling", included: true },
      { _id: "c", active: false, type: "welcomeDrink", included: true },
    ],
  };
  assert.equal(calculate(e, { ...ds, guestCount: 1 }).estimatedTotal, 849);
  assert.throws(
    () => calculate(e, { ...ds, beverages: ["w1", "w2"] }),
    /one wine/,
  );
  assert.throws(
    () => calculate(e, { ...ds, guestMenus: [{ welcomeCocktail: "c" }] }),
    /cocktail/,
  );
});
test("unconfirmed capacity allows base estimate but never additional guests or submission", () => {
  const e = {
    ...dinner,
    maximumGuests: undefined,
    maximumDurationMinutes: undefined,
  };
  assert.equal(calculate(e, ds).estimatedTotal, 849);
  assert.throws(() => calculate(e, { ...ds, guestCount: 3 }));
  assert.throws(() => calculate(e, ds, true));
});

test("inquiry pricing permits unconfirmed capacity without pretending it is confirmed", () => {
  const e = {
    ...dinner,
    maximumGuests: undefined,
    maximumDurationMinutes: undefined,
  };
  const s = {
    ...ds,
    guestCount: 3,
    guestMenus: Array.from({ length: 3 }, () => ({
      starter: "starter",
      main: "m",
      dessert: "dessert",
    })),
  };
  const result = calculate(e, s, true, true);
  assert.equal(result.quoteRequired, true);
  assert.equal(result.estimatedTotal, 935);
  assert.throws(
    () => calculate(e, { ...s, guestCount: 1000000000 }, true, true),
    /course/,
  );
  assert.throws(
    () => calculate({ ...e, maximumGuests: 2 }, s, true, true),
    /limit/,
  );
});

test("proposal premium extras cost 399/399/399/299 and require two complete dinner menus", () => {
  const {
    withProposalExtras,
    proposalDinnerId,
  } = require("../work/pricing-tests/proposalExtras.js");
  const menu = dinner.menuItems.map((m) => ({ ...m, included: true }));
  const e = withProposalExtras(proposal, menu);
  const menus = [0, 1].map(() => ({
    starter: "starter",
    main: "m",
    dessert: "dessert",
  }));
  const addons = Object.fromEntries(
    e.availableAddons.filter((a) => a._key).map((a) => [a._key, 1]),
  );
  assert.equal(
    calculate(e, { ...selection, addons, guestMenus: menus }, true)
      .estimatedTotal,
    1646,
  );
  assert.throws(() => calculate(e, { ...selection, addons }, true));
  assert.throws(() =>
    calculate(
      e,
      { ...selection, addons, guestMenus: [...menus, menus[0]] },
      true,
    ),
  );
  assert.throws(() =>
    calculate(
      e,
      {
        ...selection,
        addons,
        guestMenus: [{ ...menus[0], main: "forged" }, menus[1]],
      },
      true,
    ),
  );
  assert.throws(() => calculate(e, { ...selection, guestMenus: menus }, true));
  assert.equal(
    calculate(e, { ...selection, addons: { [proposalDinnerId]: 1 } })
      .estimatedTotal,
    449,
  );
});
