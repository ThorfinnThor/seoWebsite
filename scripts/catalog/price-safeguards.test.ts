import { describe, expect, it } from "vitest";
import type { StaticCatalog, ProductBase, OfferBase } from "@/lib/catalog/types";
import { catalogPriceIssues, quarantineSuspiciousCatalogOffers } from "./price-safeguards";

function robotCatalog(prices: number[]): StaticCatalog<ProductBase, OfferBase> {
  return {
    schemaVersion: 1,
    vertical: "robot-mower",
    generatedAt: "2026-08-28T00:00:00.000Z",
    products: [{ id: "goat", name: "ECOVACS GOAT", gtin: "12345678", reviewed: true, dataQuality: "curated" }],
    offers: prices.map((priceEur, index) => ({ id: `o${index}`, productId: "goat", merchantId: `m${index}`, merchantName: `M${index}`, merchantProductId: `p${index}`, priceEur, deliveryCostStatus: "unknown", available: true, affiliateUrl: `https://example.com/${index}`, updatedAt: "2026-08-28T00:00:00.000Z" })),
  };
}

describe("catalog price safeguards", () => {
  it("flags a robot mower with a millions price", () => expect(catalogPriceIssues(robotCatalog([22_990_000]))[0]?.code).toBe("suspicious-price"));
  it("flags GTIN price outliers", () => expect(catalogPriceIssues(robotCatalog([2200, 2300, 22_990_000])).map((issue) => issue.offerId)).toContain("o2"));
  it("removes suspicious offers before publication", () => expect(quarantineSuspiciousCatalogOffers(robotCatalog([2200, 2300, 22_990_000])).offers.map((offer) => offer.priceEur)).toEqual([2200, 2300]));
});
