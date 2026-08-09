import { describe, expect, it } from "vitest";
import { calculateTerracePlan } from "./rules";
import { TerraceInputSchema, type TerraceInput } from "./types";

const input: TerraceInput = {
  terraceLengthM: 5,
  terraceWidthM: 4,
  layingDirection: "length",
  boardWidthMm: 145,
  boardGapMm: 5,
  boardLengthM: 3,
  wastePercent: 10,
  maxSupportSpacingCm: 40,
};

describe("terrace material planning", () => {
  it("validates practical input ranges", () => {
    expect(TerraceInputSchema.safeParse(input).success).toBe(true);
    expect(TerraceInputSchema.safeParse({ ...input, boardGapMm: 0 }).success).toBe(false);
  });

  it("calculates the terrace area", () => expect(calculateTerracePlan(input).areaM2).toBe(20));

  it("uses the selected laying direction", () => {
    expect(calculateTerracePlan(input).runLengthM).toBe(5);
    expect(calculateTerracePlan(input).spanWidthM).toBe(4);
    const rotated = calculateTerracePlan({ ...input, layingDirection: "width" });
    expect(rotated.runLengthM).toBe(4);
    expect(rotated.spanWidthM).toBe(5);
  });

  it("includes board gaps in the course count", () => expect(calculateTerracePlan(input).courseCount).toBe(27));

  it("adds the selected waste reserve", () => {
    const plan = calculateTerracePlan(input);
    expect(plan.deckingLinearM).toBe(135);
    expect(plan.deckingLinearMWithWaste).toBe(148.5);
    expect(plan.fullBoardsToBuy).toBe(50);
  });

  it("keeps support spacing at or below the entered maximum", () => {
    const plan = calculateTerracePlan(input);
    expect(plan.supportRowCount).toBe(14);
    expect(plan.supportLinearMWithWaste).toBe(61.6);
  });

  it("calculates fixing intersections without prescribing a screw system", () => expect(calculateTerracePlan(input).fixingIntersections).toBe(378));

  it("flags required joints for short boards", () => {
    const plan = calculateTerracePlan(input);
    expect(plan.fullLengthPossible).toBe(false);
    expect(plan.minimumJointsPerCourse).toBe(1);
    expect(plan.warnings.some((warning) => warning.includes("Stoß- und Fugenplan"))).toBe(true);
  });

  it("recognizes full-length boards", () => {
    const plan = calculateTerracePlan({ ...input, boardLengthM: 6 });
    expect(plan.fullLengthPossible).toBe(true);
    expect(plan.minimumJointsPerCourse).toBe(0);
  });

  it("warns when a very small waste reserve is chosen", () => {
    const plan = calculateTerracePlan({ ...input, wastePercent: 5 });
    expect(plan.warnings.some((warning) => warning.startsWith("5 %"))).toBe(true);
  });
});
