import { describe, expect, it } from "vitest";
import { recommendSecurityCameras } from "./recommend";
import type { SecurityCameraCatalog, SecurityCameraInput } from "./types";

const input: SecurityCameraInput = { placement: "outdoor", coverageZones: 2, connection: "wifi", powerAvailable: false, minimumResolution: "2k", panTiltRequired: false, integratedLightRequired: false, preferredBrand: "", budgetMaxEur: 500 };
const catalog: SecurityCameraCatalog = {
  schemaVersion: 1, vertical: "security-camera", generatedAt: "2026-09-07T12:00:00.000Z",
  products: [{ id: "camera", name: "Solar Kamera Set", brand: "Test", reviewed: true, dataQuality: "curated", placement: "outdoor", connection: "wifi", power: "solar", resolution: "2k", cameraCount: 2, panTilt: false, integratedLight: false }],
  offers: [{ id: "offer", productId: "camera", merchantId: "tink", merchantName: "tink DE", merchantProductId: "1", priceEur: 220, deliveryCostStatus: "free", deliveryCostEur: 0, available: true, affiliateUrl: "https://example.com/affiliate", updatedAt: "2026-09-07T12:00:00.000Z", linkVerificationStatus: "verified" }],
};

describe("security camera recommendations", () => {
  it("matches coverage, installation and budget", () => {
    const matches = recommendSecurityCameras(catalog, input);
    expect(matches).toHaveLength(1);
    expect(matches[0].requiredSets).toBe(1);
    expect(matches[0].estimatedTotalEur).toBe(220);
  });

  it("rejects mains cameras when no power is available", () => {
    const mains = { ...catalog, products: [{ ...catalog.products[0], power: "mains" as const }] };
    expect(recommendSecurityCameras(mains, input)).toHaveLength(0);
  });
});
