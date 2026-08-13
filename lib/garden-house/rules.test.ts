import { describe, expect, it } from "vitest";
import { calculateRequirements } from "./rules";
import type { GardenHouseInput } from "./types";

const input: GardenHouseInput = {
  availableWidthCm: 400,
  availableDepthCm: 350,
  allowRotation: true,
  budgetMaxEur: 3500,
  bikes: 2,
  toolStorage: "medium",
  lawnMower: true,
  workbench: false,
  shelving: true,
  floorPreference: "preferred",
  materialPreference: "any",
  roofPreference: "any",
};

describe("garden-house requirements", () => {
  it("flags a footprint that is smaller than the calculated storage requirement", () => {
    expect(calculateRequirements({ ...input, availableWidthCm: 150, availableDepthCm: 150 })).toMatchObject({
      recommendedAreaM2: 6,
      availableAreaM2: 2.25,
      hasSufficientArea: false,
    });
  });

  it("accepts a footprint with enough area", () => {
    expect(calculateRequirements(input)).toMatchObject({ availableAreaM2: 14, hasSufficientArea: true });
  });
});
