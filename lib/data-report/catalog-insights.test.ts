import { describe, expect, it } from "vitest";
import { dehumidifierDataReport, flooringDataReport, gardenHouseDataReport } from "./catalog-insights";

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
});
