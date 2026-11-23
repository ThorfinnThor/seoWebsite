import { describe, expect, it } from "vitest";
import { calculateCarportPlan } from "@/lib/carport/rules";
import { calculateDehumidifierRequirements } from "@/lib/dehumidifier/rules";
import { calculateFlooringPlan } from "@/lib/flooring/rules";
import { calculateRequirements } from "@/lib/garden-house/rules";
import { calculateGreenhousePlan } from "@/lib/greenhouse/rules";
import { buildIrrigationPlan } from "@/lib/irrigation/rules";
import { calculatePrivacyScreenPlan } from "@/lib/privacy-screen/rules";
import { calculateRobotMowerPlan } from "@/lib/robot-mower/rules";
import { SEO_GUIDE_REWRITES } from "@/lib/seo-guide-rewrites";
import { SEO_GUIDES_SCENARIOS } from "@/lib/seo-guides-scenarios";
import { calculateTerracePlan } from "@/lib/terrace/rules";

const de = (value: number, digits = 0) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const rows = (slug: string) => SEO_GUIDE_REWRITES[slug].comparison!.rows;

describe("numbers in the rewritten guides follow the planner rules", () => {
  it("covers every scenario guide and never shows more than two questions", () => {
    for (const guide of SEO_GUIDES_SCENARIOS) expect(SEO_GUIDE_REWRITES[guide.slug], guide.slug).toBeDefined();
    for (const [slug, rewrite] of Object.entries(SEO_GUIDE_REWRITES)) expect(rewrite.faqs?.length ?? 0, slug).toBeLessThanOrEqual(2);
  });

  it("gartenhaus", () => {
    const area = (bikes: number, toolStorage: "none" | "small" | "medium" | "large", lawnMower: boolean, workbench: boolean, shelving: boolean) =>
      calculateRequirements({ bikes, toolStorage, lawnMower, workbench, shelving, availableWidthCm: 300, availableDepthCm: 300 } as Parameters<typeof calculateRequirements>[0]).recommendedAreaM2;
    expect([area(2, "none", false, false, false), area(2, "small", false, false, true), area(2, "small", true, false, true)]).toEqual([2.5, 4, 5]);
    expect([area(0, "none", true, false, false), area(0, "small", true, false, true), area(0, "medium", true, false, true)]).toEqual([2, 3.5, 4.5]);
    expect(rows("gartenhaus-mit-werkstatt").map((row) => row[1])).toEqual([area(0, "none", false, true, true), area(0, "medium", false, true, true), area(0, "medium", true, true, true), area(0, "large", false, true, true)].map((value) => `${de(value, 1)} m²`));
    expect(rows("gartenhaus-3x3-meter").map((row) => row[1])).toEqual([area(4, "medium", false, false, true), area(4, "medium", true, false, true), area(2, "medium", false, true, true), area(2, "medium", true, true, true), area(4, "medium", false, true, true)].map((value) => `${de(value, 1)} m²`));
    expect(rows("gartenhaus-3x4-meter").map((row) => row[1])).toEqual([area(2, "large", true, true, true), area(4, "medium", true, true, true), area(6, "large", true, false, true), area(6, "medium", true, true, true)].map((value) => `${de(value, 1)} m²`));
    expect([area(0, "small", true, false, false), area(1, "none", true, false, false), area(0, "medium", false, false, false), area(0, "small", false, false, true), area(0, "small", true, false, true), area(2, "none", false, false, true)]).toEqual([3, 3, 3, 2.5, 3.5, 3.5]);
    expect([area(3, "small", false, false, true), area(4, "small", false, false, true)]).toEqual([5, 5.5]);
  });

  it("maehroboter", () => {
    const rated = (areaM2: number, complexity: "simple" | "moderate" | "complex", mowingZones = 1, separatedAreas = false, growth = "normal") =>
      calculateRobotMowerPlan({ areas: [{ lengthM: areaM2 / 10, widthM: 10, excludedAreaM2: 0 }], complexity, growth, mowingZones, separatedAreas, obstacleCount: 0, narrowestPassageCm: 100, maximumSlopePercent: 0, boundarySystem: "wire", powerAtStation: true, rainShelteredStation: true, reliableReception: true } as unknown as Parameters<typeof calculateRobotMowerPlan>[0]).requiredRatedAreaM2;
    const label = (value: number) => `${de(value)} m²`;
    const ladder = (areaM2: number) => [rated(areaM2, "simple"), rated(areaM2, "moderate"), rated(areaM2, "moderate", 2), rated(areaM2, "complex"), rated(areaM2, "moderate", 2, true)].map(label);
    expect(rows("maehroboter-fuer-800-qm").map((row) => row[2])).toEqual([rated(800, "simple"), rated(800, "simple", 2), rated(800, "moderate", 2), rated(800, "simple", 2, true), rated(800, "moderate", 2, true)].map(label));
    expect(rated(700, "simple")).toBe(850);
    expect(rows("maehroboter-fuer-1000-qm").map((row) => row[2])).toEqual(ladder(1000));
    expect(rows("maehroboter-fuer-1500-qm").map((row) => row[2])).toEqual(ladder(1500));
    expect(rows("maehroboter-fuer-250-qm").map((row) => row[2])).toEqual(ladder(250).filter((_, index) => index !== 2));
    expect(rated(500, "complex", 4)).toBe(750);
    expect([rated(600, "moderate"), rated(600, "complex")]).toEqual([800, 850]);
    expect([rated(550, "simple", 3), rated(550, "simple", 3, true), rated(550, "moderate", 3, true), rated(350, "simple"), rated(200, "simple", 2)]).toEqual([700, 800, 850, 450, 250]);
    expect(rated(1000, "simple", 1, false, "strong")).toBe(1300);
  });

  it("terrasse", () => {
    const plan = (terraceLengthM: number, terraceWidthM: number, layingDirection: "length" | "width", boardLengthM: number, wastePercent: number) =>
      calculateTerracePlan({ terraceLengthM, terraceWidthM, layingDirection, boardWidthMm: 145, boardGapMm: 5, boardLengthM, maxSupportSpacingCm: 50, wastePercent } as Parameters<typeof calculateTerracePlan>[0]);
    const small = plan(4, 2.5, "length", 4, 5);
    expect([small.courseCount, small.fullBoardsToBuy, small.supportRowCount, small.fixingIntersections * 2, small.edgeAdjustmentMm]).toEqual([17, 18, 9, 306, 45]);
    const across = plan(4, 2.5, "width", 5, 5);
    expect([across.courseCount, across.supportRowCount, across.fixingIntersections * 2]).toEqual([27, 6, 324]);
    const medium = plan(6, 5, "width", 5, 5);
    const large = plan(8, 5, "width", 5, 5);
    expect([medium.courseCount, medium.fullBoardsToBuy, medium.supportRowCount, medium.fixingIntersections]).toEqual([41, 44, 11, 451]);
    expect([large.courseCount, large.fullBoardsToBuy, large.supportRowCount, large.fixingIntersections, large.edgeAdjustmentMm]).toEqual([54, 57, 11, 594, 95]);
    const along = plan(8, 5, "length", 4, 5);
    expect([along.courseCount, along.fullBoardsToBuy, along.supportRowCount, along.fixingIntersections * 2]).toEqual([34, 72, 17, 1156]);
    expect([plan(6, 5, "width", 4, 10).fullBoardsToBuy, plan(8, 5, "width", 4, 10).fullBoardsToBuy]).toEqual([57, 75]);
    const poolLong = plan(8, 1, "length", 4, 5);
    const poolShort = plan(3, 1, "length", 4, 5);
    expect([poolLong.courseCount, poolLong.supportRowCount, poolShort.courseCount, poolShort.supportRowCount]).toEqual([7, 17, 7, 7]);
  });

  it("bewaesserung, gewaechshaus und sichtschutz", () => {
    const irrigation = (lawnAreaM2: number, bedAreaM2: number, hedgeLengthM: number) =>
      buildIrrigationPlan({ lawnAreaM2, bedAreaM2, hedgeLengthM, automaticControl: true } as Parameters<typeof buildIrrigationPlan>[0]);
    expect(irrigation(80, 12, 10)).toMatchObject({ bedDriplineM: 18, hedgeDriplineM: 12, controllerZones: 4 });
    expect(irrigation(320, 100, 0)).toMatchObject({ bedDriplineM: 150, controllerZones: 3 });
    expect([irrigation(0, 28.8, 0).bedDriplineM, irrigation(0, 9, 0).bedDriplineM]).toEqual([44, 14]);
    expect(calculateGreenhousePlan({ lengthM: 4, widthM: 2.5, bedDepthCm: 75, aisleWidthCm: 80, endBedDepthCm: 60, layout: "side-beds", baseBarLengthM: 2 } as unknown as Parameters<typeof calculateGreenhousePlan>[0])).toMatchObject({ requiredLayoutWidthCm: 230, remainingWidthCm: 20, growingAreaM2: 6, pathAreaM2: 3.2 });
    const screen = (totalLengthM: number, gateCount: number) => calculatePrivacyScreenPlan({ totalLengthM, gateCount, gateModuleWidthCm: 130, systemFieldWidthCm: 180 } as Parameters<typeof calculatePrivacyScreenPlan>[0]);
    expect(screen(12, 0)).toMatchObject({ panelCount: 7, postCount: 8, lastFieldWidthCm: 120 });
    expect(screen(8, 1)).toMatchObject({ panelCount: 4, postCount: 6, endAdjustmentCm: 50, lastFieldWidthCm: 130 });
  });

  it("carport, bodenbelag und luftentfeuchter", () => {
    const carport = (vehicleCount: number, storageDepthM: number) => calculateCarportPlan({ vehicleCount, vehicleWidthM: 2, vehicleLengthM: 4.7, vehicleHeightM: 1.7, sideClearanceCm: 70, frontClearanceCm: 50, rearClearanceCm: 50, verticalClearanceCm: 30, storageDepthM } as Parameters<typeof calculateCarportPlan>[0]);
    expect(carport(1, 0)).toMatchObject({ clearWidthM: 3.4, clearLengthM: 5.7, coveredPlanningAreaM2: 19.38, theoreticalRainwaterPer10MmL: 194 });
    expect(carport(2, 0)).toMatchObject({ clearWidthM: 6.1, coveredPlanningAreaM2: 34.77, theoreticalRainwaterPer10MmL: 348 });
    for (const [index, depth] of [1.5, 2, 2.5].entries()) {
      expect(rows("carport-mit-abstellraum")[index][1]).toBe(`${de(carport(1, depth).clearLengthM, 2)} m`);
      expect(rows("carport-mit-abstellraum")[index][2]).toContain(`${de(carport(1, depth).storageAreaM2, 1)} m²`);
    }

    const floor = (rooms: { lengthM: number; widthM: number }[], excludedAreaM2: number, wastePercent: number, packageCoverageM2: number, totalDoorOpeningM = 0) =>
      calculateFlooringPlan({ rooms, excludedAreaM2, wastePercent, packageCoverageM2, plankLengthMm: 1285, plankWidthMm: 192, totalDoorOpeningM, includeSkirting: true, includeUnderlay: true, skirtingBarLengthM: 2.4, underlayRollCoverageM2: 10 } as Parameters<typeof calculateFlooringPlan>[0]);
    const flat = [{ lengthM: 5, widthM: 5 }, { lengthM: 4, widthM: 4 }, { lengthM: 3, widthM: 3 }];
    expect(floor(flat, 0, 5, 2.4, 2.7)).toMatchObject({ packageCount: 22, perimeterM: 45.3, skirtingBarCount: 21, underlayAreaWithReserveM2: 52.5, underlayRollCount: 6 });
    expect([floor(flat, 0, 10, 2.4).packageCount, ...flat.map((room) => floor([room], 0, 10, 2.4).packageCount)]).toEqual([23, 12, 8, 5]);
    const kitchen = [{ lengthM: 5, widthM: 3.2 }];
    expect(rows("bodenbelag-fuer-kueche").map((row) => Number(row[2]))).toEqual([floor(kitchen, 0, 5, 2.2), floor(kitchen, 0, 10, 2.2), floor(kitchen, 4.2, 5, 2.2), floor(kitchen, 4.2, 10, 2.2)].map((plan) => plan.packageCount));
    expect([floor([{ lengthM: 6, widthM: 5 }], 0, 5, 2.2).packageCount, floor([{ lengthM: 6, widthM: 5 }], 0, 5, 3.3).packageCount]).toEqual([15, 10]);

    for (const areaM2 of [20, 100]) {
      const need = (humiditySeverity: string, roomType = "living", approximateTemperatureC = 20, laundryDrying = false) =>
        `${de(calculateDehumidifierRequirements({ areaM2, ceilingHeightM: 2.5, humiditySeverity, roomType, approximateTemperatureC, laundryDrying } as Parameters<typeof calculateDehumidifierRequirements>[0]).requiredAreaM2)} m²`;
      expect(rows(`luftentfeuchter-fuer-${areaM2}-qm`).map((row) => row[2])).toEqual([need("mild"), need("moderate"), need("mild", "basement", 12), need("high")]);
      expect(need("mild", "living", 20, true)).toBe(need("high"));
    }
  });
});
