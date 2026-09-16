import { z } from "zod";

export const FlowRateInputSchema = z.object({
  volumeLiters: z.number().min(0.5).max(1000),
  fillSeconds: z.number().min(0.5).max(3600),
});

export const EnergyCostInputSchema = z.object({
  powerW: z.number().min(10).max(5000),
  hoursPerDay: z.number().min(0.1).max(24),
  daysPerMonth: z.number().int().min(1).max(31),
  electricityPriceCentsKwh: z.number().min(1).max(200),
});

export const TerraceCostInputSchema = z.object({
  areaM2: z.number().min(1).max(1000),
  wastePercent: z.number().min(0).max(30),
  deckingPricePerM2: z.number().min(0).max(5000),
  substructurePricePerM2: z.number().min(0).max(5000),
  foundationPricePerM2: z.number().min(0).max(5000),
  fasteningPricePerM2: z.number().min(0).max(5000),
  laborPricePerM2: z.number().min(0).max(5000),
  fixedCostsEur: z.number().min(0).max(1_000_000),
});

export const SecurityCameraStorageInputSchema = z.object({
  cameraCount: z.number().int().min(1).max(64),
  averageBitrateMbps: z.number().min(0.1).max(100),
  recordingHoursPerDay: z.number().min(0.1).max(24),
  retentionDays: z.number().int().min(1).max(365),
  reservePercent: z.number().min(0).max(50),
});

const round = (value: number, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateFlowRate(input: z.infer<typeof FlowRateInputSchema>) {
  const litersPerMinute = input.volumeLiters * 60 / input.fillSeconds;
  return {
    litersPerMinute: round(litersPerMinute, 1),
    litersPerHour: Math.round(litersPerMinute * 60),
    secondsPer10Liters: round(10 / litersPerMinute * 60, 1),
  };
}

export function calculateEnergyCost(input: z.infer<typeof EnergyCostInputSchema>) {
  const powerKw = input.powerW / 1000;
  const dailyKwh = powerKw * input.hoursPerDay;
  const monthlyKwh = dailyKwh * input.daysPerMonth;
  const priceEurKwh = input.electricityPriceCentsKwh / 100;
  return {
    costPerOperatingHourEur: round(powerKw * priceEurKwh, 3),
    dailyKwh: round(dailyKwh, 2),
    monthlyKwh: round(monthlyKwh, 1),
    monthlyCostEur: round(monthlyKwh * priceEurKwh, 2),
    annualCostEur: round(monthlyKwh * priceEurKwh * 12, 2),
  };
}

export function calculateTerraceCost(input: z.infer<typeof TerraceCostInputSchema>) {
  const purchaseAreaM2 = input.areaM2 * (1 + input.wastePercent / 100);
  const deckingCostEur = purchaseAreaM2 * input.deckingPricePerM2;
  const substructureCostEur = input.areaM2 * input.substructurePricePerM2;
  const foundationCostEur = input.areaM2 * input.foundationPricePerM2;
  const fasteningCostEur = input.areaM2 * input.fasteningPricePerM2;
  const laborCostEur = input.areaM2 * input.laborPricePerM2;
  const materialCostEur = deckingCostEur + substructureCostEur + foundationCostEur + fasteningCostEur;
  const totalCostEur = materialCostEur + laborCostEur + input.fixedCostsEur;

  return {
    purchaseAreaM2: round(purchaseAreaM2, 1),
    deckingCostEur: round(deckingCostEur),
    materialCostEur: round(materialCostEur),
    laborCostEur: round(laborCostEur),
    fixedCostsEur: round(input.fixedCostsEur),
    totalCostEur: round(totalCostEur),
    totalCostPerM2Eur: round(totalCostEur / input.areaM2),
    laborSharePercent: totalCostEur > 0 ? round(laborCostEur / totalCostEur * 100, 1) : 0,
  };
}

export function calculateSecurityCameraStorage(input: z.infer<typeof SecurityCameraStorageInputSchema>) {
  const gigabytesPerCameraHour = input.averageBitrateMbps * 0.45;
  const gigabytesPerCameraDay = gigabytesPerCameraHour * input.recordingHoursPerDay;
  const baseStorageGb = gigabytesPerCameraDay * input.retentionDays * input.cameraCount;
  const recommendedStorageGb = baseStorageGb * (1 + input.reservePercent / 100);

  return {
    gigabytesPerCameraDay: round(gigabytesPerCameraDay, 1),
    baseStorageGb: round(baseStorageGb, 1),
    recommendedStorageGb: round(recommendedStorageGb, 1),
    recommendedStorageTb: round(recommendedStorageGb / 1000, 2),
    aggregateBitrateMbps: round(input.averageBitrateMbps * input.cameraCount, 1),
  };
}
