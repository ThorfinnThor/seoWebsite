import { afterEach, describe, expect, it, vi } from "vitest";
import { RobotMowerCatalogSchema, type RobotMowerCatalog } from "@/lib/robot-mower/types";
import type { RobotMowerCandidate } from "./types";
import { createReadStream } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { normalizeGardenHouse } from "./garden-house-normalizer";
import { normalizeSecurityCamera } from "./security-camera-normalizer";
import { assembleGardenHouseCatalog, assembleSecurityCameraCatalog, parseFeedJobs, reviewPriority, substantiveEqual, summarizeOffers, syncVertical } from "./sync-products";
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
  it("limits a curated camera product to the verified merchant variation", () => {
    const base = { product_name: "eufy Indoor Cam C220 2K Innenkamera", merchant_id: "99", merchant_name: "tink", search_price: "79.99", currency: "EUR", in_stock: "true", aw_deep_link: "https://www.awin1.com/cread.php?x=1", ean: "194644176136" };
    const candidates = [normalizeSecurityCamera({ ...base, merchant_product_id: "single" }), normalizeSecurityCamera({ ...base, product_name: "eufy Indoor Cam C220 2K Innenkamera 2er Set", merchant_product_id: "bundle" })];
    const catalog = assembleSecurityCameraCatalog(candidates, [{ id: candidates[0].id, connection: "wifi", power: "mains", reviewed: true, dataQuality: "curated", includedMerchantProductIds: ["single"], reviewNote: "Verified single camera variation." }], "2026-08-09T00:00:00.000Z");
    expect(catalog.offers).toHaveLength(1);
    expect(catalog.offers[0].merchantProductId).toBe("single");
  });
  it("ignores volatile timestamps when detecting no-change output", () => expect(substantiveEqual({ generatedAt: "a", products: [{ id: "1", updatedAt: "a" }] }, { generatedAt: "b", products: [{ id: "1", updatedAt: "b" }] })).toBe(true));
  it("keeps direct grouped configurations scoped to their requested verticals", () => {
    const jobs = parseFeedJobs(JSON.stringify({ "garden-house": [], dehumidifier: [], irrigation: [], "robot-mower": [], flooring: ["https://example.com/woodstore.csv"] }));
    expect(jobs).toHaveLength(1);
    expect([...jobs[0].verticals]).toEqual(["flooring"]);
  });
});

describe("syncing one catalog", () => {
  let root = "";
  afterEach(async () => { vi.restoreAllMocks(); if (root) await rm(root, { recursive: true, force: true }); });

  const mowers = (count: number, priceEur = 800): RobotMowerCatalog => RobotMowerCatalogSchema.parse({
    schemaVersion: 1, vertical: "robot-mower", generatedAt: "2026-09-18T07:24:48.576Z",
    products: Array.from({ length: count }, (_, index) => ({ id: `p${index}`, name: `Mähroboter ${index}`, reviewed: true, dataQuality: "curated", navigation: "rtk" })),
    offers: Array.from({ length: count }, (_, index) => ({ id: `o${index}`, productId: `p${index}`, merchantId: "13686", merchantName: "tink DE", merchantProductId: `m${index}`, priceEur, deliveryCostStatus: "unknown", available: true, affiliateUrl: `https://www.awin1.com/pclick.php?p=${index}`, updatedAt: "2026-09-18T00:00:00.000Z", linkVerificationStatus: "verified" })),
  });

  async function sync(assemble: () => RobotMowerCatalog, previous = mowers(15)) {
    root = await mkdtemp(path.join(tmpdir(), "sync-"));
    vi.spyOn(process, "cwd").mockReturnValue(root);
    const files = { "public/data/robot-mower/catalog.json": previous, "public/data/robot-mower/feed-report.json": {}, "data/review/robot-mower.json": {} };
    for (const [file, content] of Object.entries(files)) {
      await mkdir(path.dirname(path.join(root, file)), { recursive: true });
      await writeFile(path.join(root, file), JSON.stringify(content));
    }
    const candidates: RobotMowerCandidate[] = [{ id: "p0", name: "Mähroboter 0", candidateAttributes: {}, issues: [] }];
    return syncVertical({ vertical: "robot-mower", schema: RobotMowerCatalogSchema, candidates, loadOverrides: async () => [], assemble, applyOverride: (product) => product }, {
      generatedAt: "2026-11-24T04:17:00.000Z", today: "2026-11-24", secretUrls: ["https://secret.example/feed.csv"],
      metrics: { sourceFeeds: 1, successfulFeeds: 1, failedFeeds: 0, rows: 126 }, state: { schemaVersion: 1, verticals: {} },
      evidence: { rowsByMerchant: new Map([["13686", 126]]), failedMerchants: new Set(), seenOfferKeys: new Set(), disabledMerchants: new Set() },
    });
  }

  it("publishes fresh prices although the catalog declined from 15 to 10", async () => {
    const outcome = await sync(() => mowers(10, 700));
    const catalog = outcome.files["public/data/robot-mower/catalog.json"] as RobotMowerCatalog;
    expect(outcome.error).toBeUndefined();
    expect(outcome.regression).toMatch(/from 15 to 10/);
    expect(catalog.products).toHaveLength(15);
    expect(catalog.offers.find((offer) => offer.id === "o3")?.priceEur).toBe(700);
    expect(catalog.offers.find((offer) => offer.id === "o12")?.priceEur).toBe(800);
  });

  it("leaves an unsafe catalog untouched and reports it instead of aborting the run", async () => {
    const leaking = mowers(15);
    leaking.offers[0].affiliateUrl = "https://secret.example/feed.csv";
    const outcome = await sync(() => leaking);
    expect(outcome).toMatchObject({ vertical: "robot-mower", files: {}, critical: true });
    expect(outcome.error).toMatch(/configured feed URL/);
    expect(outcome.error).not.toContain("secret.example");
  });

  it("names merchant, reason and products in the run log", () => {
    expect(summarizeOffers([{ offerId: "o1", productName: "eufy C15", merchantName: "tink DE", reason: "absent", days: 2 }])).toEqual(["tink DE, absent: 1 (eufy C15, Tag 2)"]);
  });
});
