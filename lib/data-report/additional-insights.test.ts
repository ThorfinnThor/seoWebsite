import { describe, expect, it } from "vitest";
import { flooringFormatReport, flooringThicknessReport, gardenHouseDimensionReport, gardenHouseRoofReport, securityCameraFeatureReport } from "./additional-insights";

describe("additional catalog data reports", () => {
  it("partitions all garden houses into exclusive dimension and shape groups", () => {
    expect(gardenHouseDimensionReport.total).toBeGreaterThan(300);
    expect(gardenHouseDimensionReport.shortSideBands.reduce((sum, band) => sum + band.count, 0)).toBe(gardenHouseDimensionReport.total);
    expect(gardenHouseDimensionReport.shapes.reduce((sum, shape) => sum + shape.count, 0)).toBe(gardenHouseDimensionReport.total);
    expect(gardenHouseDimensionReport.fitThresholds.map((item) => item.count)).toEqual([...gardenHouseDimensionReport.fitThresholds.map((item) => item.count)].sort((a, b) => a - b));
  });

  it("uses only flooring products with complete format and package data", () => {
    expect(flooringFormatReport.total).toBeGreaterThan(90);
    expect(flooringFormatReport.types.reduce((sum, type) => sum + type.count, 0)).toBe(flooringFormatReport.total);
    expect(flooringFormatReport.widthBands.reduce((sum, band) => sum + band.count, 0)).toBe(flooringFormatReport.total);
    for (const scenario of flooringFormatReport.scenarios) {
      expect(scenario.products).toBe(flooringFormatReport.total);
      expect(scenario.medianOrderedAreaM2).toBeGreaterThanOrEqual(scenario.purchaseAreaM2);
    }
  });

  it("keeps known and missing garden-house roof data separate", () => {
    expect(gardenHouseRoofReport.classified + gardenHouseRoofReport.missing).toBe(gardenHouseRoofReport.total);
    expect(gardenHouseRoofReport.types.reduce((sum, type) => sum + type.count, 0)).toBe(gardenHouseRoofReport.classified);
    expect(gardenHouseRoofReport.sizeBands.reduce((sum, band) => sum + band.total, 0)).toBe(gardenHouseRoofReport.classified);
  });

  it("partitions flooring thickness without inventing total build height", () => {
    expect(flooringThicknessReport.total).toBeGreaterThan(90);
    expect(flooringThicknessReport.types.reduce((sum, type) => sum + type.count, 0)).toBe(flooringThicknessReport.total);
    expect(flooringThicknessReport.bands.reduce((sum, band) => sum + band.count, 0)).toBe(flooringThicknessReport.total);
    expect(flooringThicknessReport.thresholds.map((item) => item.count)).toEqual([...flooringThicknessReport.thresholds.map((item) => item.count)].sort((a, b) => a - b));
  });

  it("keeps camera feature profiles exclusive and the filter path monotonic", () => {
    expect(securityCameraFeatureReport.total).toBeGreaterThan(15);
    expect(securityCameraFeatureReport.featureProfiles.reduce((sum, profile) => sum + profile.count, 0)).toBe(securityCameraFeatureReport.total);
    expect(securityCameraFeatureReport.placements.reduce((sum, placement) => sum + placement.count, 0)).toBe(securityCameraFeatureReport.total);
    expect(securityCameraFeatureReport.filterPath.outdoor).toBeGreaterThanOrEqual(securityCameraFeatureReport.filterPath.outdoorWithLight);
    expect(securityCameraFeatureReport.filterPath.outdoorWithLight).toBeGreaterThanOrEqual(securityCameraFeatureReport.filterPath.outdoorWithLightAndMovement);
    expect(securityCameraFeatureReport.filterPath.outdoorWithLightAndMovement).toBeGreaterThanOrEqual(securityCameraFeatureReport.filterPath.outdoorWithLightMovementAnd4k);
  });
});
