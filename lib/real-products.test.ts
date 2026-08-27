import { describe, expect, it } from "vitest";
import { REAL_PLANNER_PRODUCTS } from "@/lib/real-products";

describe("real planner product samples", () => {
  it("provides a small German-market sample for every planner without a dedicated catalog", () => {
    for (const products of Object.values(REAL_PLANNER_PRODUCTS)) {
      expect(products.length).toBeGreaterThanOrEqual(3);
      for (const product of products) {
        expect(product.url.startsWith("https://")).toBe(true);
        expect(product.merchantName.length).toBeGreaterThan(2);
        expect(product.priceEur).toBeGreaterThan(0);
      }
    }
  });
});
