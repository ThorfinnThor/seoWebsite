import { describe, expect, it } from "vitest";
import { calculateEnergyCost, calculateFlowRate, calculateSecurityCameraStorage, calculateTerraceCost, EnergyCostInputSchema, FlowRateInputSchema, SecurityCameraStorageInputSchema, TerraceCostInputSchema } from "./rules";

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

describe("terrace cost calculator", () => {
  const input = {
    areaM2: 20,
    wastePercent: 10,
    deckingPricePerM2: 60,
    substructurePricePerM2: 25,
    foundationPricePerM2: 15,
    fasteningPricePerM2: 8,
    laborPricePerM2: 70,
    fixedCostsEur: 300,
  };

  it("applies the reserve only to the decking", () => {
    const result = calculateTerraceCost(input);
    expect(result.purchaseAreaM2).toBe(22);
    expect(result.deckingCostEur).toBe(1320);
    expect(result.materialCostEur).toBe(2280);
  });

  it("separates labor, fixed costs and the complete total", () => {
    const result = calculateTerraceCost(input);
    expect(result.laborCostEur).toBe(1400);
    expect(result.totalCostEur).toBe(3980);
    expect(result.totalCostPerM2Eur).toBe(199);
  });

  it("allows an empty offer without dividing incorrectly", () => {
    const result = calculateTerraceCost({ ...input, deckingPricePerM2: 0, substructurePricePerM2: 0, foundationPricePerM2: 0, fasteningPricePerM2: 0, laborPricePerM2: 0, fixedCostsEur: 0 });
    expect(result.totalCostEur).toBe(0);
    expect(result.laborSharePercent).toBe(0);
  });

  it("rejects an excessive reserve", () => expect(TerraceCostInputSchema.safeParse({ ...input, wastePercent: 40 }).success).toBe(false));
});

describe("security camera storage calculator", () => {
  const input = { cameraCount: 2, averageBitrateMbps: 2, recordingHoursPerDay: 24, retentionDays: 14, reservePercent: 15 };

  it("calculates storage from bitrate and active recording time", () => {
    const result = calculateSecurityCameraStorage(input);
    expect(result.gigabytesPerCameraDay).toBe(21.6);
    expect(result.baseStorageGb).toBe(604.8);
    expect(result.recommendedStorageGb).toBe(695.5);
    expect(result.recommendedStorageTb).toBe(0.7);
  });

  it("adds the bitrates of all cameras for a recorder connection", () => {
    expect(calculateSecurityCameraStorage(input).aggregateBitrateMbps).toBe(4);
  });

  it("rejects more than 24 recording hours per day", () => {
    expect(SecurityCameraStorageInputSchema.safeParse({ ...input, recordingHoursPerDay: 25 }).success).toBe(false);
  });
});
