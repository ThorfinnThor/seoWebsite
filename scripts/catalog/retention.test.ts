import { describe, expect, it } from "vitest";
import type { OfferBase, ProductBase, StaticCatalog } from "@/lib/catalog/types";
import type { AffiliateCandidate } from "@/scripts/awin/types";
import { ABSENCE_DAYS, MASS_ABSENCE_DAYS, retainMissingOffers, type AbsenceState, type FeedEvidence } from "./retention";

type Catalog = StaticCatalog<ProductBase, OfferBase>;
type Absences = AbsenceState["verticals"][string];
const TODAY = "2026-11-24";

const product = (index: number): ProductBase => ({ id: `p${index}`, name: `Mähroboter ${index}`, reviewed: true, dataQuality: "curated" });
const offer = (index: number, merchantId = "tink", priceEur = 500): OfferBase => ({ id: `o${index}`, productId: `p${index}`, merchantId, merchantName: merchantId, merchantProductId: `m${index}`, priceEur, deliveryCostStatus: "unknown", available: true, affiliateUrl: `https://example.com/${index}`, updatedAt: "2026-09-18T00:00:00.000Z" });
const range = (from: number, to: number) => Array.from({ length: to - from }, (_, index) => from + index);
const catalog = (indexes: number[], merchantOf: (index: number) => string = () => "tink", price = 500): Catalog => ({ schemaVersion: 1, vertical: "robot-mower", generatedAt: "2026-11-24T00:00:00.000Z", products: indexes.map(product), offers: indexes.map((index) => offer(index, merchantOf(index), price)) });
const evidence = (extra: Partial<FeedEvidence> = {}): FeedEvidence => ({ rowsByMerchant: new Map([["tink", 126], ["globus", 92000]]), failedMerchants: new Set(), seenOfferKeys: new Set(), disabledMerchants: new Set(), ...extra });
const candidate = (index: number, issues: string[], withOffer = true): AffiliateCandidate<ProductBase> => ({ id: `p${index}`, name: `Mähroboter ${index}`, candidateAttributes: {}, product: product(index), offer: withOffer ? offer(index, "tink", 399) : undefined, issues });
const missedFor = (indexes: number[], days: number, lastSeenMissing = "2026-11-23"): Absences => Object.fromEntries(indexes.map((index) => [`o${index}`, { since: "2026-11-01", lastSeenMissing, days }]));
const run = (next: Catalog, previous: Catalog, extra: Partial<Parameters<typeof retainMissingOffers<ProductBase, Catalog>>[0]> = {}) => retainMissingOffers<ProductBase, Catalog>({ next, previous, candidates: [], withheldProductIds: new Set(), evidence: evidence(), absences: {}, today: TODAY, ...extra });

describe("retaining offers that are briefly missing from a feed", () => {
  it("passes a small decline through unchanged", () => {
    const next = catalog(range(0, 13));
    const result = run(next, catalog(range(0, 15)));
    expect(result.catalog).toBe(next);
    expect(result.critical).toBe(false);
  });

  it("updates the remaining prices and keeps the missing products on the first day (15 to 10)", () => {
    const result = run(catalog(range(0, 10), undefined, 450), catalog(range(0, 15)));
    expect(result.regression).toBe("Reviewed products regressed from 15 to 10");
    expect(result.catalog.products).toHaveLength(15);
    expect(result.catalog.offers.find((item) => item.id === "o0")?.priceEur).toBe(450);
    expect(result.catalog.offers.find((item) => item.id === "o12")).toMatchObject({ priceEur: 500, updatedAt: "2026-09-18T00:00:00.000Z" });
    expect(result.retained.map((item) => item.reason)).toEqual(Array(5).fill("absent"));
    expect(result.absences.o12).toEqual({ since: TODAY, lastSeenMissing: TODAY, days: 1 });
    expect(result.critical).toBe(false);
  });

  it("drops offers once they have been absent for several days", () => {
    const result = run(catalog(range(0, 10)), catalog(range(0, 15)), { absences: missedFor(range(10, 15), ABSENCE_DAYS - 1) });
    expect(result.catalog.products).toHaveLength(10);
    expect(result.dropped).toHaveLength(5);
    expect(result.absences).toEqual({});
  });

  it("counts several runs on one day as a single day", () => {
    const result = run(catalog(range(0, 10)), catalog(range(0, 15)), { absences: missedFor(range(10, 15), ABSENCE_DAYS - 1, TODAY) });
    expect(result.dropped).toHaveLength(0);
    expect(result.absences.o12.days).toBe(ABSENCE_DAYS - 1);
  });

  it("forgets the absence of a product that returned", () => {
    const result = run(catalog([...range(0, 10), 14]), catalog(range(0, 15)), { absences: missedFor(range(10, 15), 1) });
    expect(result.absences.o14).toBeUndefined();
    expect(result.absences.o13.days).toBe(2);
  });

  it("flags a mass loss and waits longer", () => {
    const early = run(catalog(range(0, 6)), catalog(range(0, 15)), { absences: missedFor(range(6, 15), ABSENCE_DAYS) });
    expect(early.critical).toBe(true);
    expect(early.dropped).toHaveLength(0);
    const late = run(catalog(range(0, 6)), catalog(range(0, 15)), { absences: missedFor(range(6, 15), MASS_ABSENCE_DAYS - 1) });
    expect(late.catalog.products).toHaveLength(6);
    expect(late.critical).toBe(true);
  });

  it("never drops anything because a feed could not be read", () => {
    const merchantOf = (index: number) => index >= 10 ? "tink" : "globus";
    const previous = catalog(range(0, 15), merchantOf);
    for (const broken of [evidence({ rowsByMerchant: new Map([["globus", 92000]]) }), evidence({ failedMerchants: new Set(["tink"]) })]) {
      const result = run(catalog(range(0, 10), merchantOf), previous, { evidence: broken, absences: missedFor(range(10, 15), 99) });
      expect(result.catalog.products).toHaveLength(15);
      expect(result.retained.every((item) => item.reason === "feed-unavailable")).toBe(true);
      expect(result.absences.o12.days).toBe(99);
      expect(result.critical).toBe(true);
    }
  });

  it("keeps a product our importer rejects, with the current price, and flags it", () => {
    const result = run(catalog(range(0, 10)), catalog(range(0, 15)), { candidates: range(10, 15).map((index) => candidate(index, ["missing-package-coverage"])), absences: missedFor(range(10, 15), 99) });
    expect(result.catalog.products).toHaveLength(15);
    expect(result.catalog.offers.find((item) => item.id === "o12")?.priceEur).toBe(399);
    expect(result.retained.every((item) => item.reason === "rejected")).toBe(true);
    expect(result.critical).toBe(true);
  });

  it("recognises a listed product that no importer rule picked up", () => {
    const result = run(catalog(range(0, 10)), catalog(range(0, 15)), { evidence: evidence({ seenOfferKeys: new Set(["tink:m12"]) }) });
    expect(result.retained.find((item) => item.offerId === "o12")?.reason).toBe("rejected");
    expect(result.retained.find((item) => item.offerId === "o13")?.reason).toBe("absent");
  });

  it("does not carry over products that were removed on purpose", () => {
    const merchantOf = (index: number) => index === 11 ? "laminatdepot" : "tink";
    const result = run(catalog(range(0, 10), merchantOf), catalog(range(0, 15), merchantOf), {
      withheldProductIds: new Set(["p10"]),
      evidence: evidence({ disabledMerchants: new Set(["laminatdepot"]) }),
      candidates: [candidate(12, []), candidate(13, ["suspicious-price"], false)],
    });
    expect(result.retained.map((item) => item.offerId)).toEqual(["o14"]);
  });

  it("does not duplicate a product that moved to a new article number", () => {
    const next = catalog(range(0, 10));
    next.products.push(product(12));
    next.offers.push({ ...offer(12), id: "o12-new", merchantProductId: "m12-new" });
    const result = run(next, catalog(range(0, 15)));
    expect(result.catalog.offers.filter((item) => item.productId === "p12").map((item) => item.id)).toEqual(["o12-new"]);
  });

  it("never empties a catalog by itself", () => {
    const result = run(catalog([]), catalog(range(0, 5)), { absences: missedFor(range(0, 5), 99) });
    expect(result.catalog.products).toHaveLength(5);
    expect(result.critical).toBe(true);
  });

  it("keeps a ranked catalog's order and appends carried products", () => {
    const previous = catalog([3, 1, ...range(4, 17)]);
    expect(run(catalog([3, 1, ...range(4, 12)]), previous).catalog.products.map((item) => item.id).slice(0, 2)).toEqual(["p3", "p1"]);
  });

  it("applies current overrides to carried products", () => {
    const result = run(catalog(range(0, 10)), catalog(range(0, 15)), { refresh: (item) => ({ ...item, name: `${item.name} (korrigiert)` }) });
    expect(result.catalog.products.find((item) => item.id === "p12")?.name).toBe("Mähroboter 12 (korrigiert)");
    expect(result.catalog.products.find((item) => item.id === "p1")?.name).toBe("Mähroboter 1");
  });
});
