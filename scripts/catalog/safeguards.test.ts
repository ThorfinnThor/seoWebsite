import { describe, expect, it } from "vitest";
import { assertCatalogSafe } from "./safeguards";
import type { GardenHouseCatalog } from "@/lib/garden-house/types";

function catalog(productCount: number, offerCount: number): GardenHouseCatalog {
  const products = Array.from({ length: productCount }, (_, index) => ({ id: `p${index}`, name: `Haus ${index}`, reviewed: true, dataQuality: "curated" as const, widthCm: 300, depthCm: 300, footprintM2: 9, material: "wood" as const }));
  const offers = Array.from({ length: offerCount }, (_, index) => ({ id: `o${index}`, productId: `p${index % Math.max(1, productCount)}`, merchantId: "m", merchantName: "M", merchantProductId: `mp${index}`, priceEur: 1000, deliveryCostStatus: "unknown" as const, available: true, affiliateUrl: `https://example.com/${index}`, updatedAt: "2026-08-09T00:00:00.000Z" }));
  return { schemaVersion: 1, vertical: "garden-house", generatedAt: "2026-08-09T00:00:00.000Z", products, offers };
}

describe("catalog safeguards", () => {
  it("rejects a reviewed-product regression above 20 percent", () => expect(() => assertCatalogSafe(catalog(7, 7), catalog(10, 10))).toThrow(/Reviewed products regressed/));
  it("rejects an offer regression above 40 percent", () => expect(() => assertCatalogSafe(catalog(20, 11), catalog(20, 20))).toThrow(/Offers regressed/));
  it("rejects a configured feed URL in public output", () => { const next = catalog(1, 1); next.offers[0].affiliateUrl = "https://secret.example/feed.csv?token=abc"; expect(() => assertCatalogSafe(next, undefined, [next.offers[0].affiliateUrl])).toThrow(/configured feed URL/); });
});
