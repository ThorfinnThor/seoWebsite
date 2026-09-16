import { describe, expect, it } from "vitest";
import { bestAvailablePriceByProduct, countDistinct, median, percent, quantile } from "./statistics";

describe("data report statistics", () => {
  it("calculates interpolated quantiles without mutating the input", () => {
    const values = [40, 10, 30, 20];
    expect(quantile(values, 0.25)).toBe(17.5);
    expect(median(values)).toBe(25);
    expect(values).toEqual([40, 10, 30, 20]);
  });

  it("handles empty values and percentages safely", () => {
    expect(median([])).toBeUndefined();
    expect(percent(3, 4)).toBe(75);
    expect(percent(0, 0)).toBe(0);
    expect(countDistinct(["A", "A", "B", undefined])).toBe(2);
  });

  it("keeps the cheapest available offer per product", () => {
    const catalog = {
      schemaVersion: 1,
      vertical: "test",
      generatedAt: "2026-09-16T00:00:00.000Z",
      products: [{ id: "a", name: "A", reviewed: true, dataQuality: "curated" as const }, { id: "b", name: "B", reviewed: true, dataQuality: "curated" as const }],
      offers: [
        { id: "a1", productId: "a", merchantId: "m", merchantName: "M", merchantProductId: "a1", priceEur: 90, deliveryCostStatus: "unknown" as const, available: true, affiliateUrl: "https://example.com/a1", updatedAt: "2026-09-16T00:00:00.000Z" },
        { id: "a2", productId: "a", merchantId: "m", merchantName: "M", merchantProductId: "a2", priceEur: 70, deliveryCostStatus: "unknown" as const, available: true, affiliateUrl: "https://example.com/a2", updatedAt: "2026-09-16T00:00:00.000Z" },
        { id: "b1", productId: "b", merchantId: "m", merchantName: "M", merchantProductId: "b1", priceEur: 50, deliveryCostStatus: "unknown" as const, available: false, affiliateUrl: "https://example.com/b1", updatedAt: "2026-09-16T00:00:00.000Z" },
      ],
    };
    expect([...bestAvailablePriceByProduct(catalog)]).toEqual([["a", 70]]);
  });
});
