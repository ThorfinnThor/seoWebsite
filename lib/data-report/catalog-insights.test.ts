import { describe, expect, it } from "vitest";
import { dehumidifierDataReport, flooringDataReport, gardenHouseDataReport, irrigationDataReport, robotMowerDataReport, securityCameraDataReport } from "./catalog-insights";

describe("catalog data reports", () => {
  it("accounts for every garden house in exclusive groupings", () => {
    expect(gardenHouseDataReport.materials.reduce((sum, row) => sum + row.count, 0)).toBe(gardenHouseDataReport.available);
    expect(gardenHouseDataReport.sizes.reduce((sum, row) => sum + row.count, 0)).toBe(gardenHouseDataReport.available);
    expect(gardenHouseDataReport.roofs.reduce((sum, row) => sum + row.count, 0)).toBe(gardenHouseDataReport.total);
  });

  it("keeps flooring scenarios tied to concrete products and packages", () => {
    expect(flooringDataReport.types.reduce((sum, row) => sum + row.count, 0)).toBe(flooringDataReport.total);
    for (const type of flooringDataReport.types) {
      expect(type.scenario.products).toBe(type.count);
      expect(type.scenario.medianPackages).toBeGreaterThan(0);
      expect(type.scenario.medianOrderedAreaM2).toBeGreaterThanOrEqual(22);
      expect(type.scenario.medianMaterialCostEur).toBeGreaterThan(0);
    }
  });

  it("does not turn missing dehumidifier specifications into zero values", () => {
    expect(dehumidifierDataReport.performanceBands.reduce((sum, row) => sum + row.count, 0)).toBe(dehumidifierDataReport.summary.extractionKnown);
    for (const field of dehumidifierDataReport.coverage) {
      expect(field.count).toBeLessThanOrEqual(dehumidifierDataReport.total);
    }
  });

  it("accounts for every mower in navigation and area groupings", () => {
    expect(robotMowerDataReport.navigation.reduce((sum, row) => sum + row.count, 0)).toBe(robotMowerDataReport.total);
    expect(robotMowerDataReport.areaBands.reduce((sum, row) => sum + row.count, 0)).toBe(robotMowerDataReport.coverage.ratedArea);
    expect(robotMowerDataReport.coverage.passage).toBeLessThan(robotMowerDataReport.total);
  });

  it("calculates complete four-zone camera scenarios from actual pack sizes", () => {
    expect(securityCameraDataReport.setSizes.reduce((sum, row) => sum + row.products, 0)).toBe(securityCameraDataReport.total);
    for (const setSize of securityCameraDataReport.setSizes) {
      expect(setSize.requiredSets * setSize.cameraCount).toBeGreaterThanOrEqual(4);
      expect(setSize.medianTotalEur).toBeGreaterThan(0);
    }
    expect(securityCameraDataReport.combinations.reduce((sum, row) => sum + row.count, 0)).toBe(securityCameraDataReport.total);
  });

  it("keeps irrigation categories complete while exposing specification gaps", () => {
    expect(irrigationDataReport.kinds.reduce((sum, row) => sum + row.count, 0)).toBe(irrigationDataReport.total);
    expect(irrigationDataReport.coverage.maxZones).toBeLessThan(irrigationDataReport.total);
    expect(irrigationDataReport.coverage.requiredAccessories).toBeLessThan(irrigationDataReport.total);
    expect(irrigationDataReport.coverage.smartCompatibleKnown).toBe(irrigationDataReport.coverage.smartCompatibleYes);
  });
});
