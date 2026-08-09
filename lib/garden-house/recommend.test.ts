import { describe, expect, it } from "vitest";
import type { GardenHouseCatalog, GardenHouseInput, GardenHouseProduct } from "./types";
import { calculateRequirements } from "./rules";
import { recommendGardenHouses } from "./recommend";

const input: GardenHouseInput = { availableWidthCm: 400, availableDepthCm: 350, allowRotation: false, budgetMaxEur: 3000, bikes: 2, toolStorage: "medium", lawnMower: false, workbench: false, shelving: false, floorPreference: "irrelevant", materialPreference: "any", roofPreference: "any" };
const product: GardenHouseProduct = { id: "gtin:12345678", name: "Testhaus", reviewed: true, dataQuality: "curated", widthCm: 300, depthCm: 300, footprintM2: 9, material: "wood", roofType: "gable", doorWidthCm: 120, floorIncluded: true };

function catalog(productPatch: Partial<GardenHouseProduct> = {}, offerPatch: Record<string, unknown> = {}): GardenHouseCatalog {
  const selected = { ...product, ...productPatch };
  return { schemaVersion: 1, vertical: "garden-house", generatedAt: "2026-08-09T00:00:00.000Z", products: [selected], offers: [{ id: "offer:1", productId: selected.id, merchantId: "m1", merchantName: "Händler", merchantProductId: "p1", priceEur: 2000, deliveryCostEur: 50, deliveryCostStatus: "known", available: true, affiliateUrl: "https://www.awin1.com/cread.php?x=1", updatedAt: "2026-08-09T00:00:00.000Z", ...offerPatch }] } as GardenHouseCatalog;
}

describe("garden-house requirements", () => {
  it("rounds the planning area up to 0.5 m²", () => { expect(calculateRequirements(input)).toEqual({ recommendedAreaM2: 4.5, minDoorWidthCm: 80, bulkyAccess: true }); });
});

describe("garden-house hard filters", () => {
  it("accepts a normal fit", () => expect(recommendGardenHouses(catalog(), input)).toHaveLength(1));
  it("accepts only a rotated fit when rotation is allowed", () => { const rotatedInput = { ...input, availableWidthCm: 350, availableDepthCm: 250, allowRotation: true }; const matches = recommendGardenHouses(catalog({ widthCm: 240, depthCm: 340, footprintM2: 8.16 }), rotatedInput); expect(matches[0]?.rotated).toBe(true); });
  it("rejects a product outside the usable footprint", () => expect(recommendGardenHouses(catalog({ widthCm: 500 }), input)).toHaveLength(0));
  it("rejects insufficient floor area", () => expect(recommendGardenHouses(catalog({ footprintM2: 3 }), input)).toHaveLength(0));
  it("rejects a required unavailable floor", () => expect(recommendGardenHouses(catalog({ floorIncluded: false, floorKitAvailable: false }), { ...input, floorPreference: "required" })).toHaveLength(0));
  it("accepts a separately available floor kit", () => expect(recommendGardenHouses(catalog({ floorIncluded: false, floorKitAvailable: true }), { ...input, floorPreference: "required" })).toHaveLength(1));
  it("rejects a material mismatch", () => expect(recommendGardenHouses(catalog(), { ...input, materialPreference: "metal" })).toHaveLength(0));
  it("rejects a roof mismatch", () => expect(recommendGardenHouses(catalog(), { ...input, roofPreference: "flat" })).toHaveLength(0));
  it("rejects a known narrow door", () => expect(recommendGardenHouses(catalog({ doorWidthCm: 70 }), input)).toHaveLength(0));
  it("warns but does not reject an unknown door", () => { const match = recommendGardenHouses(catalog({ doorWidthCm: undefined }), input)[0]; expect(match).toBeDefined(); expect(match.reasons.some((reason) => reason.code === "door-unknown")).toBe(true); });
  it("ignores an unavailable offer", () => expect(recommendGardenHouses(catalog({}, { available: false }), input)).toHaveLength(0));
  it("excludes a known landed price over budget", () => expect(recommendGardenHouses(catalog({}, { priceEur: 2900, deliveryCostEur: 200 }), input)).toHaveLength(0));
  it("marks unknown shipping as an unknown budget status", () => { const match = recommendGardenHouses(catalog({}, { priceEur: 2900, deliveryCostEur: undefined, deliveryCostStatus: "unknown" }), input)[0]; expect(match.budgetStatus).toBe("unknown"); });
  it("never recommends an unreviewed product", () => expect(recommendGardenHouses(catalog({ reviewed: false }), input)).toHaveLength(0));
  it("gives curated data a confidence bonus", () => { const curated = recommendGardenHouses(catalog({ dataQuality: "curated" }), input)[0]; const mixed = recommendGardenHouses(catalog({ dataQuality: "mixed" }), input)[0]; expect(curated.score).toBeGreaterThan(mixed.score); });
  it("does not use an injected commission value in scoring", () => { const base = recommendGardenHouses(catalog(), input)[0].score; const withCommission = recommendGardenHouses(catalog({}, { commission: 9999 }), input)[0].score; expect(withCommission).toBe(base); });
});
