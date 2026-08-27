import { describe, expect, it } from "vitest";
import { REAL_PLANNER_PRODUCTS } from "@/lib/real-products";

describe("real planner product samples", () => {
  it("provides a small German-market sample for every planner without a dedicated catalog", () => {
    expect(Object.keys(REAL_PLANNER_PRODUCTS).sort()).toEqual([
      "carport",
      "drywall",
      "greenhouse",
      "irrigation",
      "privacy",
      "terrace",
    ]);

    for (const products of Object.values(REAL_PLANNER_PRODUCTS)) {
      expect(products.length).toBeGreaterThanOrEqual(3);
      for (const product of products) {
        const url = new URL(product.url);
        expect(url.protocol).toBe("https:");
        expect(["www.globus-baumarkt.de", "benz24.de"]).toContain(url.hostname);
        expect(product.merchantName.length).toBeGreaterThan(2);
        expect(product.priceEur).toBeGreaterThan(0);
        expect(Number.isNaN(Date.parse(product.updatedAt))).toBe(false);
      }
    }
  });
});
