import { describe, expect, it } from "vitest";
import { REFERENCE_PRODUCTS } from "@/lib/reference-products";

describe("reference product basis", () => {
  it("covers every non-feed planner with a complete, unique selection basis", () => {
    for (const products of Object.values(REFERENCE_PRODUCTS)) {
      expect(products.length).toBeGreaterThanOrEqual(6);
      expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
      for (const product of products) {
        expect(product.name.length).toBeGreaterThan(5);
        expect(product.description.length).toBeGreaterThan(20);
        expect(product.planningNote.length).toBeGreaterThan(15);
      }
    }
  });

  it("does not publish unreviewed prices or outbound links", () => {
    const serialized = JSON.stringify(REFERENCE_PRODUCTS);
    expect(serialized).not.toMatch(/affiliateUrl|priceEur|https?:\/\//i);
  });
});
