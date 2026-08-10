import { describe, expect, it } from "vitest";
import { calculateDrywallPlan } from "./rules";
import { DrywallInputSchema, type DrywallInput } from "./types";

const input: DrywallInput = {
  wallLengthM: 5,
  wallHeightM: 2.5,
  openingsAreaM2: 2,
  openingCount: 1,
  claddingSides: 2,
  layersPerSide: 1,
  boardLengthM: 2.5,
  boardWidthM: 1.25,
  wastePercent: 10,
  studSpacingCm: 62.5,
  trackBarLengthM: 3,
  includeInsulation: true,
  moistureExposure: false,
  fireOrAcousticRequirement: false,
  installationsPlanned: false,
};

describe("drywall quantity planning", () => {
  it("validates a practical partition wall", () => expect(DrywallInputSchema.safeParse(input).success).toBe(true));

  it("rejects openings that consume the complete wall", () => {
    expect(DrywallInputSchema.safeParse({ ...input, openingsAreaM2: 12.5 }).success).toBe(false);
  });

  it("requires an opening count for entered opening area", () => {
    expect(DrywallInputSchema.safeParse({ ...input, openingCount: 0 }).success).toBe(false);
  });

  it("calculates gross, net and two-sided cladding area", () => {
    const plan = calculateDrywallPlan(input);
    expect(plan.grossWallAreaM2).toBe(12.5);
    expect(plan.netFaceAreaM2).toBe(10.5);
    expect(plan.totalCladdingAreaM2).toBe(21);
  });

  it("applies reserve and rounds to full boards", () => {
    const plan = calculateDrywallPlan(input);
    expect(plan.purchaseAreaM2).toBe(23.1);
    expect(plan.boardAreaM2).toBe(3.13);
    expect(plan.boardCount).toBe(8);
    expect(plan.orderedBoardAreaM2).toBe(25);
  });

  it("doubles cladding for a second layer", () => {
    expect(calculateDrywallPlan({ ...input, layersPerSide: 2 }).totalCladdingAreaM2).toBe(42);
  });

  it("calculates only the uninterrupted baseline stud grid", () => {
    expect(calculateDrywallPlan(input).baselineStudCount).toBe(9);
  });

  it("adds reserve and full bars for floor and ceiling tracks", () => {
    const plan = calculateDrywallPlan(input);
    expect(plan.trackLengthWithReserveM).toBe(11);
    expect(plan.trackBarCount).toBe(4);
  });

  it("keeps opening reinforcement outside the baseline quantity", () => {
    expect(calculateDrywallPlan(input).warnings.some((warning) => warning.includes("Grundprofilzahl"))).toBe(true);
  });

  it("warns for tall, wet, fire-rated and installation-heavy walls", () => {
    const warnings = calculateDrywallPlan({ ...input, wallHeightM: 3.5, moistureExposure: true, fireOrAcousticRequirement: true, installationsPlanned: true }).warnings;
    expect(warnings.some((warning) => warning.includes("über 3 m"))).toBe(true);
    expect(warnings.some((warning) => warning.includes("feuchtebeanspruchte"))).toBe(true);
    expect(warnings.some((warning) => warning.includes("Brand- oder Schallschutz"))).toBe(true);
    expect(warnings.some((warning) => warning.includes("Installationen"))).toBe(true);
  });
});
