import { describe, expect, it } from "vitest";
import { availability, isGardenHouseCandidate, normalizeGardenHouse, parseDimensions } from "./garden-house-normalizer";

const row = { product_name: "Gartenhaus Modell 300 x 400 cm", merchant_id: "12", merchant_name: "Garten Markt", merchant_product_id: "abc", brand_name: "HausCo", description: "Gartenhaus aus Holz mit Boden im Lieferumfang und Satteldach", search_price: "2.499,00", currency: "EUR", delivery_cost: "49,00", in_stock: "true", aw_deep_link: "https://www.awin1.com/cread.php?x=1", merchant_image_url: "https://img.example/haus.jpg", ean: "4012345678901", last_updated: "2026-08-08T10:00:00Z" };

describe("dimension parsing", () => {
  it.each([["3 x 4 m", { widthCm: 300, depthCm: 400 }], ["300 x 400 cm", { widthCm: 300, depthCm: 400 }], ["3000 x 4000 mm", { widthCm: 300, depthCm: 400 }], ["3,5 × 4,2 m", { widthCm: 350, depthCm: 420 }]])("parses %s", (raw, expected) => expect(parseDimensions(raw)).toEqual(expected));
  it("rejects ambiguous three-dimensional values", () => expect(parseDimensions("300 x 400 x 220 cm")).toBeUndefined());
  it("rejects implausible values", () => expect(parseDimensions("30 x 40 cm")).toBeUndefined());
});
describe("garden-house normalizer", () => {
  it("treats custom non-empty in_stock flags as available per Awin's feed contract", () => {
    expect(availability({ in_stock: "Y" })).toEqual({ available: true, ambiguous: false });
    expect(availability({ in_stock: "0" })).toEqual({ available: false, ambiguous: false });
  });
  it("detects broad category candidates", () => expect(isGardenHouseCandidate({ category_name: "Geräteschuppen" })).toBe(true));
  it("normalizes a valid EUR offer", () => { const result = normalizeGardenHouse(row); expect(result.product).toMatchObject({ id: "gtin:4012345678901", widthCm: 300, depthCm: 400, material: "wood", reviewed: false }); expect(result.offer).toMatchObject({ priceEur: 2499, deliveryCostEur: 49, available: true }); });
  it("deduplicates product identity by GTIN across merchants", () => expect(normalizeGardenHouse({ ...row, merchant_id: "99", merchant_product_id: "other" }).id).toBe(normalizeGardenHouse(row).id));
  it("flags missing material", () => { const result = normalizeGardenHouse({ ...row, description: "Gartenhaus mit Satteldach" }); expect(result.product).toBeUndefined(); expect(result.issues).toContain("missing-material"); });
  it("excludes non-EUR offers", () => { const result = normalizeGardenHouse({ ...row, currency: "GBP" }); expect(result.offer).toBeUndefined(); expect(result.issues).toContain("non-eur-currency"); });
  it("excludes missing affiliate links", () => expect(normalizeGardenHouse({ ...row, aw_deep_link: "" }).offer).toBeUndefined());
  it("keeps an out-of-stock offer unavailable", () => expect(normalizeGardenHouse({ ...row, in_stock: "false" }).offer?.available).toBe(false));
  it("interprets numeric in-stock flags without joining them to quantity", () => expect(availability({ in_stock: "1", stock_quantity: "68" })).toEqual({ available: true, ambiguous: false }));
  it("uses stock quantity when no explicit stock flag exists", () => expect(availability({ stock_quantity: "12" })).toEqual({ available: true, ambiguous: false }));
  it("falls back to standard availability and sale flags", () => {
    expect(availability({ availability: "in_stock" })).toEqual({ available: true, ambiguous: false });
    expect(availability({ is_for_sale: "1" })).toEqual({ available: true, ambiguous: false });
  });
  it("prefers an explicit out-of-stock flag over a stale quantity", () => expect(availability({ in_stock: "0", stock_quantity: "68" })).toEqual({ available: false, ambiguous: false }));
});
