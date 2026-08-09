import { describe, expect, it } from "vitest";
import { calculateEnergyCost, calculateFlowRate, EnergyCostInputSchema, FlowRateInputSchema } from "./rules";

describe("flow rate calculator", () => {
  it("calculates 10 liters in 30 seconds", () => {
    expect(calculateFlowRate({ volumeLiters: 10, fillSeconds: 30 })).toEqual({ litersPerMinute: 20, litersPerHour: 1200, secondsPer10Liters: 30 });
  });

  it("keeps decimal measurements", () => expect(calculateFlowRate({ volumeLiters: 12, fillSeconds: 45 }).litersPerMinute).toBe(16));

  it("rejects zero seconds", () => expect(FlowRateInputSchema.safeParse({ volumeLiters: 10, fillSeconds: 0 }).success).toBe(false));
});

describe("energy cost calculator", () => {
  const input = { powerW: 300, hoursPerDay: 10, daysPerMonth: 30, electricityPriceCentsKwh: 35 };

  it("calculates monthly consumption", () => expect(calculateEnergyCost(input).monthlyKwh).toBe(90));

  it("calculates monthly and annual cost", () => {
    const result = calculateEnergyCost(input);
    expect(result.monthlyCostEur).toBe(31.5);
    expect(result.annualCostEur).toBe(378);
  });

  it("calculates the operating-hour price", () => expect(calculateEnergyCost(input).costPerOperatingHourEur).toBe(0.105));

  it("rejects impossible daily runtime", () => expect(EnergyCostInputSchema.safeParse({ ...input, hoursPerDay: 25 }).success).toBe(false));
});
