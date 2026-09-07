import { describe, expect, it } from "vitest";
import { createReadStream } from "node:fs";
import { normalizeGardenHouse } from "./garden-house-normalizer";
import { normalizeSecurityCamera } from "./security-camera-normalizer";
import { assembleGardenHouseCatalog, assembleSecurityCameraCatalog, parseFeedJobs, reviewPriority, substantiveEqual } from "./sync-products";
import { parseFeedStream } from "./source";

const row = { product_name: "Holz Gartenhaus 300 x 400 cm", merchant_id: "12", merchant_name: "Garten Markt", merchant_product_id: "abc", description: "Holzhaus Satteldach inklusive Boden", search_price: "2499", currency: "EUR", delivery_cost: "kostenlos", in_stock: "true", aw_deep_link: "https://www.awin1.com/cread.php?x=1", ean: "4012345678901", last_updated: "2026-08-08T10:00:00Z" };
describe("feed pipeline assembly", () => {
  it("prioritizes semantic risks ahead of parser completeness", () => expect(reviewPriority(["semantic-kind-mismatch"], 0)).toBeGreaterThan(reviewPriority(["missing-product-kind"], 20, 1000)));
  it("streams the local CSV fixture through parse, normalize, override and public assembly", async () => {
    const candidates = [];
    for await (const fixtureRow of parseFeedStream(createReadStream("tests/fixtures/awin/garden-house.csv"))) candidates.push(normalizeGardenHouse(fixtureRow));
    const catalog = assembleGardenHouseCatalog(candidates, [{ id: "gtin:4012345678901", reviewed: true, dataQuality: "curated" }], "2026-08-09T00:00:00.000Z");
    expect(candidates).toHaveLength(2);
    expect(catalog.products).toHaveLength(2);
    expect(catalog.offers[0]).toMatchObject({ productId: "gtin:4012345678901", available: true });
  });
  it("publishes complete feed products as mixed", () => expect(assembleGardenHouseCatalog([normalizeGardenHouse(row)], [], "2026-08-09T00:00:00.000Z").products[0]).toMatchObject({ reviewed: true, dataQuality: "mixed" }));
  it("keeps incomplete feed products out of the public catalog", () => expect(assembleGardenHouseCatalog([normalizeGardenHouse({ ...row, product_name: "Gartenhaus 300 x 400 cm", description: "Gartenhaus" })], [], "2026-08-09T00:00:00.000Z").products).toHaveLength(0));
  it("publishes product and offer only after a curated override", () => { const catalog = assembleGardenHouseCatalog([normalizeGardenHouse(row)], [{ id: "gtin:4012345678901", reviewed: true, dataQuality: "curated" }], "2026-08-09T00:00:00.000Z"); expect(catalog.products).toHaveLength(1); expect(catalog.offers).toHaveLength(1); });
  it("allows a curated camera override to complete an otherwise incomplete feed product", () => {
    const candidate = normalizeSecurityCamera({ product_name: "eufy Indoor Cam C220 2K Innenkamera", merchant_id: "99", merchant_name: "tink", merchant_product_id: "cam", search_price: "79.99", currency: "EUR", in_stock: "true", aw_deep_link: "https://www.awin1.com/cread.php?x=1", ean: "194644176136" });
    const catalog = assembleSecurityCameraCatalog([candidate], [{ id: candidate.id, connection: "wifi", power: "mains", reviewed: true, dataQuality: "curated", reviewNote: "Verified against the merchant product page." }], "2026-08-09T00:00:00.000Z");
    expect(catalog.products[0]).toMatchObject({ placement: "indoor", connection: "wifi", power: "mains", resolution: "2k" });
    expect(catalog.offers).toHaveLength(1);
  });
  it("ignores volatile timestamps when detecting no-change output", () => expect(substantiveEqual({ generatedAt: "a", products: [{ id: "1", updatedAt: "a" }] }, { generatedAt: "b", products: [{ id: "1", updatedAt: "b" }] })).toBe(true));
  it("keeps direct grouped configurations scoped to their requested verticals", () => {
    const jobs = parseFeedJobs(JSON.stringify({ "garden-house": [], dehumidifier: [], irrigation: [], "robot-mower": [], flooring: ["https://example.com/woodstore.csv"] }));
    expect(jobs).toHaveLength(1);
    expect([...jobs[0].verticals]).toEqual(["flooring"]);
  });
});
