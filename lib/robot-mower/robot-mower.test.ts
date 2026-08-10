import { describe, expect, it } from "vitest";
import { calculateRobotMowerPlan } from "./rules";
import { RobotMowerInputSchema, type RobotMowerInput } from "./types";

const input: RobotMowerInput = {
  areas: [{ id: "area-1", label: "Hauptrasen", lengthM: 20, widthM: 15, excludedAreaM2: 25 }],
  complexity: "moderate",
  growth: "normal",
  mowingZones: 2,
  narrowestPassageCm: 90,
  maximumSlopePercent: 20,
  obstacleCount: 4,
  separatedAreas: false,
  boundarySystem: "wire",
  powerAtStation: true,
  reliableReception: true,
  rainShelteredStation: false,
};

describe("robot mower area planning", () => {
  it("validates a practical lawn setup", () => expect(RobotMowerInputSchema.safeParse(input).success).toBe(true));

  it("rejects an excluded area equal to its complete section", () => {
    expect(RobotMowerInputSchema.safeParse({ ...input, areas: [{ ...input.areas[0], excludedAreaM2: 300 }] }).success).toBe(false);
  });

  it("calculates gross and net lawn area", () => {
    const plan = calculateRobotMowerPlan(input);
    expect(plan.grossAreaM2).toBe(300);
    expect(plan.netAreaM2).toBe(275);
  });

  it("builds a conservative rated-area class and rounds to 50 square metres", () => {
    const plan = calculateRobotMowerPlan(input);
    expect(plan.capacityFactor).toBe(1.35);
    expect(plan.requiredRatedAreaM2).toBe(400);
  });

  it("adds explicit complexity, growth and separation buffers", () => {
    const plan = calculateRobotMowerPlan({ ...input, complexity: "complex", growth: "strong", separatedAreas: true });
    expect(plan.capacityFactor).toBe(1.7);
    expect(plan.requiredRatedAreaM2).toBe(500);
  });

  it("estimates only the rectangular outer-edge frame plus reserve", () => {
    const plan = calculateRobotMowerPlan(input);
    expect(plan.rectangularPerimeterM).toBe(70);
    expect(plan.boundaryWireFrameM).toBe(77);
  });

  it("classifies passages without asserting compatibility", () => {
    expect(calculateRobotMowerPlan({ ...input, narrowestPassageCm: 59 }).passageClass).toBe("tight");
    expect(calculateRobotMowerPlan({ ...input, narrowestPassageCm: 60 }).passageClass).toBe("narrow");
    expect(calculateRobotMowerPlan({ ...input, narrowestPassageCm: 100 }).passageClass).toBe("open");
  });

  it("keeps steep slopes and separated areas visible as warnings", () => {
    const plan = calculateRobotMowerPlan({ ...input, maximumSlopePercent: 42, separatedAreas: true });
    expect(plan.warnings.some((warning) => warning.includes("Steigung"))).toBe(true);
    expect(plan.warnings.some((warning) => warning.includes("Getrennte Rasenflächen"))).toBe(true);
  });

  it("flags wireless navigation when reception is unconfirmed", () => {
    const plan = calculateRobotMowerPlan({ ...input, boundarySystem: "wireless", reliableReception: false });
    expect(plan.warnings.some((warning) => warning.includes("ohne bestätigten Empfang"))).toBe(true);
    expect(plan.setupTasks.some((task) => task.includes("Referenzstation"))).toBe(true);
  });

  it("adds a station task when power is unavailable", () => {
    expect(calculateRobotMowerPlan({ ...input, powerAtStation: false }).setupTasks.some((task) => task.includes("Stromanschluss"))).toBe(true);
  });
});
