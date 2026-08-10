import { describe, expect, it } from "vitest";
import { calculateGreenhousePlan } from "./rules";
import { GreenhouseInputSchema, type GreenhouseInput } from "./types";

const input: GreenhouseInput = {
  lengthM: 4,
  widthM: 3,
  layout: "two-side",
  bedDepthCm: 60,
  aisleWidthCm: 80,
  endBedDepthCm: 60,
  doorWidthCm: 90,
  baseBarLengthM: 2.5,
  useCase: "vegetables",
  glazing: "polycarbonate",
  roofVentCount: 2,
  automaticOpeners: true,
  crossVentilation: true,
  waterAtSite: true,
  electricityPlanned: false,
};

describe("greenhouse layout planning", () => {
  it("validates a practical layout", () => expect(GreenhouseInputSchema.safeParse(input).success).toBe(true));

  it("rejects beds and an aisle that do not fit the width", () => {
    expect(GreenhouseInputSchema.safeParse({ ...input, widthM: 1.5, bedDepthCm: 50, aisleWidthCm: 80 }).success).toBe(false);
  });

  it("rejects automatic openers without a roof vent", () => {
    expect(GreenhouseInputSchema.safeParse({ ...input, roofVentCount: 0 }).success).toBe(false);
  });

  it("calculates a two-side bed and path layout", () => {
    const plan = calculateGreenhousePlan(input);
    expect(plan.footprintM2).toBe(12);
    expect(plan.growingAreaM2).toBe(4.8);
    expect(plan.pathAreaM2).toBe(3.2);
    expect(plan.flexibleFloorAreaM2).toBe(4);
    expect(plan.remainingWidthCm).toBe(100);
  });

  it("adds an end bed for a u-shaped layout without overlapping the side beds", () => {
    const plan = calculateGreenhousePlan({ ...input, layout: "u-shape" });
    expect(plan.sideBedAreaM2).toBe(4.8);
    expect(plan.endBedAreaM2).toBe(1.08);
    expect(plan.growingAreaM2).toBe(5.88);
    expect(plan.pathAreaM2).toBe(2.72);
    expect(plan.exposedBedEdgeM).toBe(9.8);
  });

  it("keeps container space separate from fixed growing beds", () => {
    const plan = calculateGreenhousePlan({ ...input, layout: "containers" });
    expect(plan.growingAreaM2).toBe(0);
    expect(plan.pathAreaM2).toBe(3.2);
    expect(plan.flexibleFloorAreaM2).toBe(8.8);
  });

  it("calculates base length with reserve and complete supplied bars", () => {
    const plan = calculateGreenhousePlan(input);
    expect(plan.basePerimeterM).toBe(14);
    expect(plan.baseLengthWithReserveM).toBe(14.7);
    expect(plan.baseBarCount).toBe(6);
  });

  it("reports theoretical rain collection without claiming storage yield", () => {
    expect(calculateGreenhousePlan(input).theoreticalRainwaterPer10MmL).toBe(120);
  });

  it("warns for narrow access and unplanned ventilation", () => {
    const plan = calculateGreenhousePlan({ ...input, doorWidthCm: 70, roofVentCount: 0, automaticOpeners: false, crossVentilation: false });
    expect(plan.warnings.some((warning) => warning.includes("Unter 80 cm"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("kein Dachfenster"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("Querlüftung"))).toBe(true);
  });

  it("keeps overwintering and electrical work outside the result", () => {
    const plan = calculateGreenhousePlan({ ...input, useCase: "overwintering", electricityPlanned: true });
    expect(plan.warnings.some((warning) => warning.includes("weder Heizleistung noch Frostschutz"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("fachgerecht"))).toBe(true);
  });
});
