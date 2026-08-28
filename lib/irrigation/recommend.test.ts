import { describe, expect, it } from "vitest";
import { recommendIrrigation } from "./recommend";
import type { IrrigationCatalog, IrrigationInput } from "./types";
import { buildIrrigationPlan } from "./rules";

const input: IrrigationInput = { lawnAreaM2: 100, bedAreaM2: 20, hedgeLengthM: 10, automaticControl: true, smartControl: true, rainSensorWanted: true, budgetMaxEur: 500 };
const catalog: IrrigationCatalog = {
  schemaVersion: 1,
  vertical: "irrigation",
  generatedAt: "2026-08-28T00:00:00.000Z",
  products: [
    { id: "controller", name: "Smart Controller 4 Zonen", brand: "Test", reviewed: true, dataQuality: "curated", kind: "controller", maxZones: 4, smartCompatible: true, systemId: "TestSystem" },
    { id: "filter", name: "Wasserfilter", brand: "Test", reviewed: true, dataQuality: "curated", kind: "filter", systemId: "TestSystem" },
  ],
  offers: [
    { id: "offer-controller", productId: "controller", merchantId: "m", merchantName: "Händler", merchantProductId: "controller", priceEur: 100, deliveryCostStatus: "free", deliveryCostEur: 0, available: true, affiliateUrl: "https://www.awin1.com/pclick.php?p=1", updatedAt: "2026-08-28T00:00:00.000Z" },
    { id: "offer-filter", productId: "filter", merchantId: "m", merchantName: "Händler", merchantProductId: "filter", priceEur: 10, deliveryCostStatus: "free", deliveryCostEur: 0, available: true, affiliateUrl: "https://www.awin1.com/pclick.php?p=2", updatedAt: "2026-08-28T00:00:00.000Z" },
  ],
};

describe("irrigation recommendations", () => {
  it("ranks controller and system components for the calculated plan", () => {
    const matches = recommendIrrigation(catalog, input, buildIrrigationPlan(input));
    expect(matches[0].product.id).toBe("controller");
    expect(matches[0].reasons.map((reason) => reason.code)).toEqual(expect.arrayContaining(["component", "zones", "smart", "system"]));
  });

  it("only recommends available offers", () => {
    const matches = recommendIrrigation({ ...catalog, offers: catalog.offers.map((offer) => ({ ...offer, available: false })) }, input, buildIrrigationPlan(input));
    expect(matches).toHaveLength(0);
  });
});
