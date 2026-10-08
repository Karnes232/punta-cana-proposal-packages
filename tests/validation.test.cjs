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

test("JSON-LD text can't close its script tag and stays valid JSON", () => {
  const { jsonLdText } = require(`${out}/lib/seo/structuredData.js`);
  const data = { name: "</script><script>alert(1)</script> & co" };
  const text = jsonLdText(data);
  assert.ok(!/[<>&]/.test(text));
  assert.deepEqual(JSON.parse(text), data);
});

test("a Sanity date shows the calendar day it is, in any timezone", () => {
  const { formatSanityDate } = require(`${out}/lib/formatDate.js`);
  const day = { month: "long", day: "numeric", year: "numeric" };
  assert.equal(formatSanityDate("2024-12-01", "en", day), "December 1, 2024");
  assert.equal(
    formatSanityDate("2024-12-01", "es", day),
    "1 de diciembre de 2024",
  );
  assert.equal(
    formatSanityDate("2024-12-01", "es", { month: "long", year: "numeric" }),
    "Diciembre de 2024",
  );
  assert.equal(formatSanityDate("", "en", day), "");
  assert.equal(formatSanityDate(null, "en", day), "");
  assert.equal(formatSanityDate("not a date", "en", day), "");
});

test("the proxy runs for every language's URLs", () => {
  const { ALL_LOCALES } = require(`${out}/i18n/locales.js`);
  const proxy = require("node:fs").readFileSync("src/proxy.ts", "utf8");
  const listed = proxy.match(/"\/\(([a-z|]+)\)\/:path\*"/)[1].split("|");
  assert.deepEqual([...listed].sort(), [...ALL_LOCALES].sort());
});

test("the footer shows and dials phone numbers with their country code", () => {
  const contact = require(`${out}/components/Layout/Footer/contact.js`);
  assert.equal(contact.formatPhone("18094929868"), "+1 (809) 492-9868");
  assert.equal(contact.dialNumber("1 809-492-9868"), "+18094929868");
  assert.equal(contact.formatPhone("+44 20 7946 0958"), "+44 20 7946 0958");
  assert.equal(contact.dialNumber("+44 20 7946 0958"), "+442079460958");
  assert.equal(contact.isProfileLink("https://www.instagram.com/brand"), true);
  // An empty placeholder from the Studio is not a profile.
  assert.equal(contact.isProfileLink("https://x.com/"), false);
  assert.equal(contact.isProfileLink("javascript:alert(1)"), false);
});

test("the header finds the page and links it in every language", () => {
  const nav = require(`${out}/components/Layout/Navbar/navigation.js`);
  assert.deepEqual(nav.pagePath("/de/blog/ein-beitrag"), {
    path: "/blog/ein-beitrag",
    urlLanguage: "de",
  });
  assert.deepEqual(nav.pagePath("/proposals"), {
    path: "/proposals",
    urlLanguage: "en",
  });
  assert.equal(nav.pagePath("/fr").path, "/");
  assert.equal(
    nav.languageHref("fr", "/how-it-works", null),
    "/fr/how-it-works",
  );
  assert.equal(nav.languageHref("en", "/how-it-works", null), "/how-it-works");
  assert.equal(nav.languageHref("es", "/", null), "/es");
  assert.equal(nav.languageHref("de", "/blog", null), "/de/blog");
  // A post links to its translation's own slug, or that language's blog.
  const alternates = [{ language: "es", path: "/blog/una-entrada" }];
  assert.equal(
    nav.languageHref("es", "/blog/a-post", alternates),
    "/es/blog/una-entrada",
  );
  assert.equal(nav.languageHref("it", "/blog/a-post", alternates), "/it/blog");
  assert.equal(nav.inSection("/proposals/love-signature", "proposals"), true);
  assert.equal(nav.isPage("/proposals/love-signature", "proposals"), false);
  assert.equal(nav.inSection("/proposals", ""), false);
});

test("the home page fills empty photo slots from the packages", () => {
  const { homePhotos, startingPrice } = require(
    `${out}/components/HomePage/homeData.js`,
  );
  const photo = (url) => ({ url });
  const proposal = (urls, styles = []) => ({
    styles,
    gallery: urls.map((url) => ({ image: photo(url) })),
  });
  const proposals = [
    proposal(["a", "b", "a"], [{ mainImage: photo("style") }]),
    proposal(["c", "d", "e", "f", "g", "h", "i", "j"]),
  ];
  const dinner = proposal(["dinner"]);
  const empty = homePhotos(null, proposals, dinner);
  assert.equal(empty.proposalPhoto.url, "style");
  assert.equal(empty.hero.url, "style");
  assert.equal(empty.dinnerPhoto.url, "dinner");
  // No repeats, at most eight; the editorial photos are the first three.
  assert.deepEqual(
    empty.photos.map((p) => p.url),
    ["a", "b", "c", "d", "e", "f", "g", "h"],
  );
  assert.deepEqual(
    empty.editorial.map((p) => p.url),
    ["a", "b", "c"],
  );
  assert.deepEqual(
    empty.journey.map((p) => p?.url),
    [undefined, undefined, "style", "b", undefined],
  );
  // The Studio's choices come first.
  const chosen = homePhotos(
    { heroImage: photo("hero"), moments: [photo("m1"), photo("m1")] },
    proposals,
    dinner,
  );
  assert.equal(chosen.hero.url, "hero");
  assert.deepEqual(
    chosen.photos.map((p) => p.url),
    ["m1"],
  );
  assert.equal(
    startingPrice({
      basePrice: 900,
      styles: [{ price: 1200 }, { price: 1000 }],
    }),
    1000,
  );
  assert.equal(startingPrice({ basePrice: 900, styles: [{}] }), 900);
});

test("the business's structured data is built complete from Business info", () => {
  const { organizationSchema } = require(
    `${out}/components/seo/organization.js`,
  );
  const options = {
    locale: "fr",
    siteUrl: "https://example.com",
    homeUrl: "https://example.com/fr",
    languages: ["en", "es", "fr", "pt"],
  };
  const org = JSON.parse(
    JSON.stringify(
      organizationSchema(
        {
          companyName: "Brand",
          companyDescription: { en: "In English", fr: "En français" },
          companyLogo: { asset: { url: "https://cdn.example.com/logo.png" } },
          telephone: "18094929868",
          email: "info@example.com",
          socialLinks: {
            instagram: "https://instagram.com/brand",
            facebook: "https://facebook.com/",
          },
        },
        options,
      ),
    ),
  );
  assert.equal(org.name, "Brand");
  assert.equal(org.description, "En français");
  assert.equal(org.url, "https://example.com/fr");
  assert.equal(org["@id"], "https://example.com/#organization");
  assert.equal(org.telephone, "+18094929868");
  assert.equal(org.contactPoint.email, "info@example.com");
  // The empty Facebook placeholder isn't a profile.
  assert.deepEqual(org.sameAs, ["https://instagram.com/brand"]);
  // Nothing is printed as an empty string.
  const empty = JSON.parse(JSON.stringify(organizationSchema(null, options)));
  assert.equal(empty.name, "Punta Cana Proposal Packages");
  assert.ok(!JSON.stringify(empty).includes('""'));
  assert.equal(empty.contactPoint, undefined);
});

test("the Studio's empty Organization template is not printed", () => {
  const template =
    '{"@context":"https://schema.org","@type":"Organization","name":"","url":""}';
  assert.equal(structuredData(template), null);
  const faq = { "@context": "https://schema.org", "@type": "FAQPage" };
  assert.deepEqual(structuredData([JSON.parse(template), faq]), [faq]);
  const real = { "@type": "Organization", name: "Brand" };
  assert.deepEqual(structuredData(real), real);
});

test("the proposals and dinners heroes fall back to package photos", () => {
  const { proposalsHeroPhoto, dinnersHeroPhoto, ofType } = require(
    `${out}/components/ExperienceCatalog/catalogData.js`,
  );
  const photo = (url) => ({ url });
  const experience = (_type, slug, url) => ({
    _type,
    slug: { current: slug },
    styles: [],
    gallery: [{ image: photo(url) }],
  });
  const all = [
    experience("proposalExperience", "first", "first.jpg"),
    experience("proposalExperience", "love-signature", "love.jpg"),
    experience("romanticDinnerExperience", "dinner", "dinner.jpg"),
  ];
  assert.equal(ofType(all, "proposalExperience").length, 2);
  // The page's photo first, then Love Signature, then the first package.
  assert.equal(
    proposalsHeroPhoto({ image: photo("page.jpg") }, all).url,
    "page.jpg",
  );
  assert.equal(proposalsHeroPhoto({}, all).url, "love.jpg");
  assert.equal(proposalsHeroPhoto({}, [all[0]]).url, "first.jpg");
  assert.equal(proposalsHeroPhoto({}, []), undefined);
  // Dinners: the page, the first dinner, then the template's photos.
  const template = {
    styles: [{}, { mainImage: photo("style.jpg") }],
    gallery: [{ image: photo("template.jpg") }],
  };
  assert.equal(dinnersHeroPhoto({}, all, template).url, "dinner.jpg");
  assert.equal(dinnersHeroPhoto({}, [], template).url, "style.jpg");
  assert.equal(
    dinnersHeroPhoto({}, [], { styles: [], gallery: template.gallery }).url,
    "template.jpg",
  );
  assert.equal(dinnersHeroPhoto({}, [], null), undefined);
});
