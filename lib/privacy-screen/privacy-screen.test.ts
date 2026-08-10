import { describe, expect, it } from "vitest";
import { calculatePrivacyScreenPlan } from "./rules";
import { PrivacyScreenInputSchema, type PrivacyScreenInput } from "./types";

const input: PrivacyScreenInput = {
  totalLengthM: 10,
  fenceHeightCm: 180,
  systemFieldWidthCm: 180,
  gateCount: 0,
  gateModuleWidthCm: 100,
  reservePanel: false,
  mountingType: "ground",
  terrain: "level",
  windExposure: "normal",
};

describe("privacy screen system planning", () => {
  it("validates practical ranges and rejects gates that fill the complete run", () => {
    expect(PrivacyScreenInputSchema.safeParse(input).success).toBe(true);
    expect(PrivacyScreenInputSchema.safeParse({ ...input, gateCount: 2, gateModuleWidthCm: 150, totalLengthM: 3 }).success).toBe(false);
  });

  it("rounds a 10 m run up to complete 180 cm system fields", () => {
    const plan = calculatePrivacyScreenPlan(input);
    expect(plan.panelCount).toBe(6);
    expect(plan.postCount).toBe(7);
    expect(plan.fullSystemLengthCm).toBe(1080);
    expect(plan.endAdjustmentCm).toBe(80);
    expect(plan.lastFieldWidthCm).toBe(100);
  });

  it("includes a gate as its own system module", () => {
    const plan = calculatePrivacyScreenPlan({ ...input, gateCount: 1 });
    expect(plan.panelCount).toBe(5);
    expect(plan.bayCount).toBe(6);
    expect(plan.postCount).toBe(7);
    expect(plan.fullSystemLengthCm).toBe(1000);
    expect(plan.adjustmentRequired).toBe(false);
  });

  it("adds an optional reserve panel only to the order quantity", () => {
    const plan = calculatePrivacyScreenPlan({ ...input, reservePanel: true });
    expect(plan.panelCount).toBe(6);
    expect(plan.orderPanelCount).toBe(7);
    expect(plan.postCount).toBe(7);
  });

  it("flags slope, exposed wind and the selected mounting context", () => {
    const plan = calculatePrivacyScreenPlan({ ...input, terrain: "sloped", windExposure: "exposed", mountingType: "baseplate" });
    expect(plan.warnings.some((warning) => warning.includes("Gefälle"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("windexponiert"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("Fußplatten"))).toBe(true);
  });

  it("does not invent foundation dimensions", () => {
    const plan = calculatePrivacyScreenPlan(input);
    expect(plan.warnings.some((warning) => warning.includes("weder Fundamentdurchmesser noch Fundamenttiefe"))).toBe(true);
  });

  it("flags tall screens without inventing a structural rating", () => {
    const plan = calculatePrivacyScreenPlan({ ...input, fenceHeightCm: 200 });
    expect(plan.warnings.some((warning) => warning.includes("Windangriffsfläche und Hebelwirkung"))).toBe(true);
  });
});
