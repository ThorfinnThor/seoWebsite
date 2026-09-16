import { describe, expect, it } from "vitest";
import type { SecurityCameraCatalog } from "./types";
import { cameraOffersForCount } from "./storage-offers";

const timestamp = "2026-09-16T10:00:00.000Z";

const catalog: SecurityCameraCatalog = {
  schemaVersion: 1,
  vertical: "security-camera",
  generatedAt: timestamp,
  products: [
    { id: "single", name: "Einzelkamera", brand: "Test", reviewed: true, dataQuality: "curated", placement: "outdoor", connection: "wifi", power: "battery", resolution: "2k", cameraCount: 1, panTilt: false, integratedLight: false },
    { id: "double", name: "Zweier Set", brand: "Test", reviewed: true, dataQuality: "curated", placement: "outdoor", connection: "wifi", power: "battery", resolution: "2k", cameraCount: 2, panTilt: false, integratedLight: false },
    { id: "unreviewed", name: "Ungeprüft", brand: "Test", reviewed: false, dataQuality: "feed", placement: "outdoor", connection: "wifi", power: "battery", resolution: "2k", cameraCount: 4, panTilt: false, integratedLight: false },
  ],
  offers: [
    { id: "single-offer", productId: "single", merchantId: "13686", merchantName: "tink DE", merchantProductId: "1", priceEur: 60, deliveryCostStatus: "free", deliveryCostEur: 0, available: true, affiliateUrl: "https://www.awin1.com/single", updatedAt: timestamp, linkVerificationStatus: "verified" },
    { id: "double-offer", productId: "double", merchantId: "13686", merchantName: "tink DE", merchantProductId: "2", priceEur: 100, deliveryCostStatus: "free", deliveryCostEur: 0, available: true, affiliateUrl: "https://www.awin1.com/double", updatedAt: timestamp, linkVerificationStatus: "verified" },
    { id: "unreviewed-offer", productId: "unreviewed", merchantId: "13686", merchantName: "tink DE", merchantProductId: "3", priceEur: 150, deliveryCostStatus: "free", deliveryCostEur: 0, available: true, affiliateUrl: "https://www.awin1.com/unreviewed", updatedAt: timestamp, linkVerificationStatus: "verified" },
  ],
};

describe("camera offers for a requested count", () => {
  it("prioritizes the set with the smallest camera surplus", () => {
    const matches = cameraOffersForCount(catalog, 2);
    expect(matches.map((match) => match.product.id)).toEqual(["double", "single"]);
  });

  it("calculates required sets and their combined price", () => {
    const single = cameraOffersForCount(catalog, 3).find((match) => match.product.id === "single");
    expect(single).toMatchObject({ requiredSets: 3, resultingCameraCount: 3, estimatedTotalEur: 180 });
  });

  it("keeps unreviewed products and unverified offers out", () => {
    const modified = { ...catalog, offers: catalog.offers.map((offer) => offer.id === "single-offer" ? { ...offer, linkVerificationStatus: "identity-mismatch" as const } : offer) };
    expect(cameraOffersForCount(modified, 4).map((match) => match.product.id)).toEqual(["double"]);
  });
});
