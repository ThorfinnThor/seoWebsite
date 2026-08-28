import { describe, expect, it } from "vitest";
import { addAwinClickRefs } from "./tracking";
import { resolveOfferUrl } from "./offer-url";
import { budgetStatus, compareOffers, landedPrice } from "./price";
import type { OfferBase } from "./types";

const offer: OfferBase = { id: "o", productId: "p", merchantId: "m", merchantName: "M", merchantProductId: "mp", priceEur: 100, deliveryCostStatus: "known", deliveryCostEur: 10, available: true, affiliateUrl: "https://example.com/path?existing=yes", updatedAt: "2026-08-09T00:00:00.000Z" };

describe("offer URL resolution", () => {
  it("uses the canonical merchant URL for an unapproved merchant", () => {
    expect(resolveOfferUrl({ ...offer, merchantUrl: "https://shop.example/product" })).toBe("https://shop.example/product");
  });

  it("uses the affiliate URL for an active advertiser", () => {
    expect(resolveOfferUrl({ ...offer, merchantId: "14288", merchantUrl: "https://de.trotec.com/product" })).toBe(offer.affiliateUrl);
  });

  it("falls back to the affiliate URL when no merchant URL exists", () => {
    expect(resolveOfferUrl(offer)).toBe(offer.affiliateUrl);
  });
});
describe("offer pricing", () => {
  it("calculates landed price only when delivery is known", () => { expect(landedPrice(offer)).toBe(110); expect(landedPrice({ ...offer, deliveryCostStatus: "unknown", deliveryCostEur: undefined })).toBeUndefined(); });
  it("does not show unknown delivery as within budget", () => expect(budgetStatus({ ...offer, deliveryCostStatus: "unknown", deliveryCostEur: undefined }, 150)).toBe("unknown"));
  it("prefers a known landed total to an unknown delivery price", () => expect(compareOffers(offer, { ...offer, id: "b", priceEur: 90, deliveryCostStatus: "unknown", deliveryCostEur: undefined })).toBeLessThan(0));
});
describe("Awin refs", () => {
  it("preserves query parameters and appends non-sensitive refs", () => { const url = new URL(addAwinClickRefs(offer.affiliateUrl, { clickref: "gardenhouse", clickref2: "planner-result", clickref3: "abc" })); expect(url.searchParams.get("existing")).toBe("yes"); expect(url.searchParams.get("clickref2")).toBe("planner-result"); });
  it("rejects unsafe reference text", () => expect(() => addAwinClickRefs(offer.affiliateUrl, { clickref: "email@example.com" })).toThrow());
});
