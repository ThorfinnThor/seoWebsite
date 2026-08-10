import { z } from "zod";

export const CarportInputSchema = z.object({
  vehicleCount: z.union([z.literal(1), z.literal(2)]),
  vehicleLengthM: z.number().min(3).max(8),
  vehicleWidthM: z.number().min(1.4).max(3),
  vehicleHeightM: z.number().min(1.2).max(4),
  sideClearanceCm: z.number().min(20).max(150),
  frontClearanceCm: z.number().min(20).max(200),
  rearClearanceCm: z.number().min(20).max(200),
  verticalClearanceCm: z.number().min(15).max(120),
  storageDepthM: z.number().min(0).max(4),
  approach: z.enum(["straight", "turn", "unknown"]),
  roofType: z.enum(["flat", "mono-pitch", "gable", "undecided"]),
  installation: z.enum(["freestanding", "attached"]),
  siteSlope: z.enum(["level", "slight", "slope"]),
  drainage: z.enum(["cistern", "infiltration", "connection", "undecided"]),
  electricityPlanned: z.boolean(),
  evCharging: z.boolean(),
  pvPlanned: z.boolean(),
});

export type CarportInput = z.infer<typeof CarportInputSchema>;

export interface CarportPlan {
  clearWidthM: number;
  clearLengthM: number;
  clearHeightM: number;
  coveredPlanningAreaM2: number;
  vehicleParkingAreaM2: number;
  storageAreaM2: number;
  freeMovementAreaM2: number;
  theoreticalRainwaterPer10MmL: number;
  warnings: string[];
}
