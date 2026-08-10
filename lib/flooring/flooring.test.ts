import { describe, expect, it } from "vitest";
import { calculateFlooringPlan } from "./rules";
import { FlooringInputSchema, type FlooringInput } from "./types";

const input: FlooringInput = {
  rooms: [{ id: "room-1", label: "Wohnzimmer", lengthM: 5, widthM: 4 }],
  excludedAreaM2: 2,
  flooringType: "laminate",
  layingPattern: "straight",
  wastePercent: 10,
  plankLengthMm: 1285,
  plankWidthMm: 192,
  packageCoverageM2: 2.22,
  includeUnderlay: true,
  underlayRollCoverageM2: 10,
  includeSkirting: true,
  totalDoorOpeningM: 1,
  skirtingBarLengthM: 2.4,
  floorHeating: false,
  wetRoom: false,
};

describe("flooring quantity planning", () => {
  it("validates input ranges and rejects deductions equal to the floor", () => {
    expect(FlooringInputSchema.safeParse(input).success).toBe(true);
    expect(FlooringInputSchema.safeParse({ ...input, excludedAreaM2: 20 }).success).toBe(false);
  });

  it("calculates gross, net and purchase areas", () => {
    const plan = calculateFlooringPlan(input);
    expect(plan.grossAreaM2).toBe(20);
    expect(plan.netAreaM2).toBe(18);
    expect(plan.purchaseAreaM2).toBe(19.8);
  });

  it("rounds purchase area up to complete packages", () => {
    const plan = calculateFlooringPlan(input);
    expect(plan.packageCount).toBe(9);
    expect(plan.orderedAreaM2).toBe(19.98);
    expect(plan.areaSurplusM2).toBe(1.98);
  });

  it("estimates individual planks from their dimensions", () => {
    const plan = calculateFlooringPlan(input);
    expect(plan.plankAreaM2).toBe(0.2467);
    expect(plan.estimatedPlankCount).toBe(81);
  });

  it("subtracts door openings and adds skirting reserve", () => {
    const plan = calculateFlooringPlan(input);
    expect(plan.perimeterM).toBe(17);
    expect(plan.skirtingLengthWithReserveM).toBe(18.7);
    expect(plan.skirtingBarCount).toBe(8);
  });

  it("adds five percent reserve to underlay rolls", () => {
    const plan = calculateFlooringPlan(input);
    expect(plan.underlayAreaWithReserveM2).toBe(18.9);
    expect(plan.underlayRollCount).toBe(2);
  });

  it("omits optional accessories when deselected", () => {
    const plan = calculateFlooringPlan({ ...input, includeSkirting: false, includeUnderlay: false });
    expect(plan.skirtingBarCount).toBe(0);
    expect(plan.underlayRollCount).toBe(0);
  });

  it("warns for risky layout and use contexts", () => {
    const plan = calculateFlooringPlan({ ...input, layingPattern: "diagonal", wastePercent: 5, floorHeating: true, wetRoom: true });
    expect(plan.warnings.some((warning) => warning.includes("diagonale Verlegung"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("Fußbodenheizung"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("feuchtebelastete Räume"))).toBe(true);
  });

  it("flags double-counted inner edges across multiple rectangles", () => {
    const plan = calculateFlooringPlan({ ...input, rooms: [...input.rooms, { id: "room-2", label: "Essbereich", lengthM: 3, widthM: 2 }] });
    expect(plan.warnings.some((warning) => warning.includes("Innenkanten"))).toBe(true);
  });
});
