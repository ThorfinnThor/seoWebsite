import { describe, expect, it } from "vitest";
import { carportProjectReport, drywallProjectReport, greenhouseProjectReport, privacyProjectReport, terraceProjectReport } from "./project-catalog-insights";

describe("project catalog data reports", () => {
  it("keeps carport kits and accessory groups separate", () => {
    expect(carportProjectReport.kinds.reduce((sum, item) => sum + item.count, 0)).toBe(carportProjectReport.total);
    expect(carportProjectReport.vehicleGroups.reduce((sum, item) => sum + item.count, 0)).toBe(carportProjectReport.kits.count);
    expect(carportProjectReport.footprintBands.reduce((sum, item) => sum + item.count, 0)).toBe(carportProjectReport.kits.count);
  });

  it("accounts for greenhouse sizes and glazing without filling unknown values", () => {
    expect(greenhouseProjectReport.areaBands.reduce((sum, item) => sum + item.count, 0)).toBe(greenhouseProjectReport.coverage.area);
    expect(greenhouseProjectReport.glazing.reduce((sum, item) => sum + item.count, 0)).toBe(greenhouseProjectReport.kits.count);
    expect(greenhouseProjectReport.coverage.roofVents).toBe(0);
  });

  it("calculates privacy screen scenarios only from dimensioned panels", () => {
    expect(privacyProjectReport.widthBands.reduce((sum, item) => sum + item.count, 0)).toBe(privacyProjectReport.panels.count);
    expect(privacyProjectReport.heightBands.reduce((sum, item) => sum + item.count, 0)).toBe(privacyProjectReport.panels.count);
    expect(privacyProjectReport.panels.medianTenMeterCostEur).toBeGreaterThan(0);
  });

  it("does not invent terrace package coverage", () => {
    expect(terraceProjectReport.materials.reduce((sum, item) => sum + item.count, 0)).toBe(terraceProjectReport.decking.count);
    expect(terraceProjectReport.kinds.reduce((sum, item) => sum + item.count, 0)).toBe(terraceProjectReport.total);
    expect(terraceProjectReport.coverage.packageCoverage).toBe(0);
    expect(terraceProjectReport.coverage.systemId).toBe(0);
  });

  it("keeps drywall product types complete and technical gaps visible", () => {
    expect(drywallProjectReport.boardTypes.reduce((sum, item) => sum + item.count, 0)).toBe(drywallProjectReport.boards.count);
    expect(drywallProjectReport.kinds.reduce((sum, item) => sum + item.count, 0)).toBe(drywallProjectReport.total);
    expect(drywallProjectReport.profileWidths.reduce((sum, item) => sum + item.count, 0)).toBe(drywallProjectReport.coverage.profileWidth);
    expect(drywallProjectReport.coverage.fireClass).toBe(0);
  });
});
