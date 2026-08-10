import { describe, expect, it } from "vitest";
import { calculateCarportPlan } from "./rules";
import { CarportInputSchema, type CarportInput } from "./types";

const input: CarportInput = {
  vehicleCount: 1,
  vehicleLengthM: 4.8,
  vehicleWidthM: 1.9,
  vehicleHeightM: 1.75,
  sideClearanceCm: 60,
  frontClearanceCm: 60,
  rearClearanceCm: 80,
  verticalClearanceCm: 30,
  storageDepthM: 0,
  approach: "straight",
  roofType: "flat",
  installation: "freestanding",
  siteSlope: "level",
  drainage: "cistern",
  electricityPlanned: false,
  evCharging: false,
  pvPlanned: false,
};

describe("carport space planning", () => {
  it("validates a practical single-car setup", () => expect(CarportInputSchema.safeParse(input).success).toBe(true));

  it("rejects dimensions outside the planning range", () => {
    expect(CarportInputSchema.safeParse({ ...input, vehicleWidthM: 1 }).success).toBe(false);
    expect(CarportInputSchema.safeParse({ ...input, verticalClearanceCm: 10 }).success).toBe(false);
  });

  it("calculates clear single-car dimensions", () => {
    const plan = calculateCarportPlan(input);
    expect(plan.clearWidthM).toBe(3.1);
    expect(plan.clearLengthM).toBe(6.2);
    expect(plan.clearHeightM).toBe(2.05);
  });

  it("adds a middle clearance for two vehicles", () => {
    expect(calculateCarportPlan({ ...input, vehicleCount: 2 }).clearWidthM).toBe(5.6);
  });

  it("separates parking, movement and optional storage area", () => {
    const plan = calculateCarportPlan(input);
    expect(plan.coveredPlanningAreaM2).toBe(19.22);
    expect(plan.vehicleParkingAreaM2).toBe(9.12);
    expect(plan.freeMovementAreaM2).toBe(10.1);
    const storagePlan = calculateCarportPlan({ ...input, storageDepthM: 2 });
    expect(storagePlan.storageAreaM2).toBe(6.2);
  });

  it("reports only theoretical rainwater geometry", () => {
    expect(calculateCarportPlan(input).theoreticalRainwaterPer10MmL).toBe(192);
  });

  it("warns when side and height reserves are tight", () => {
    const warnings = calculateCarportPlan({ ...input, sideClearanceCm: 30, verticalClearanceCm: 20 }).warnings;
    expect(warnings.some((warning) => warning.includes("Unter 50 cm"))).toBe(true);
    expect(warnings.some((warning) => warning.includes("unter 25 cm"))).toBe(true);
  });

  it("keeps turning access and sloped sites outside the result", () => {
    const warnings = calculateCarportPlan({ ...input, approach: "turn", siteSlope: "slope" }).warnings;
    expect(warnings.some((warning) => warning.includes("Schleppkurve"))).toBe(true);
    expect(warnings.some((warning) => warning.includes("nicht eben"))).toBe(true);
  });

  it("keeps attached construction and drainage visible", () => {
    const warnings = calculateCarportPlan({ ...input, installation: "attached", drainage: "undecided" }).warnings;
    expect(warnings.some((warning) => warning.includes("Hausanschluss"))).toBe(true);
    expect(warnings.some((warning) => warning.includes("Dachwasser"))).toBe(true);
  });

  it("requires specialist planning for charging and photovoltaic additions", () => {
    const warnings = calculateCarportPlan({ ...input, evCharging: true, pvPlanned: true }).warnings;
    expect(warnings.some((warning) => warning.includes("Ladeeinrichtung"))).toBe(true);
    expect(warnings.some((warning) => warning.includes("Photovoltaik"))).toBe(true);
  });
});
