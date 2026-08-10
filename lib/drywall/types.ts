import { z } from "zod";

export const DrywallInputSchema = z.object({
  wallLengthM: z.number().min(1).max(50),
  wallHeightM: z.number().min(1.8).max(6),
  openingsAreaM2: z.number().min(0).max(50),
  openingCount: z.number().int().min(0).max(12),
  claddingSides: z.union([z.literal(1), z.literal(2)]),
  layersPerSide: z.union([z.literal(1), z.literal(2)]),
  boardLengthM: z.number().min(1.5).max(4),
  boardWidthM: z.number().min(0.5).max(1.5),
  wastePercent: z.union([z.literal(10), z.literal(15)]),
  studSpacingCm: z.union([z.literal(40), z.literal(50), z.literal(62.5)]),
  trackBarLengthM: z.number().min(2).max(6),
  includeInsulation: z.boolean(),
  moistureExposure: z.boolean(),
  fireOrAcousticRequirement: z.boolean(),
  installationsPlanned: z.boolean(),
}).superRefine((input, context) => {
  if (input.openingsAreaM2 >= input.wallLengthM * input.wallHeightM) {
    context.addIssue({ code: "custom", path: ["openingsAreaM2"], message: "Die Öffnungsfläche muss kleiner als die gesamte Wandfläche sein." });
  }
  if (input.openingCount === 0 && input.openingsAreaM2 > 0) {
    context.addIssue({ code: "custom", path: ["openingCount"], message: "Für eine Öffnungsfläche muss mindestens eine Öffnung eingetragen sein." });
  }
});

export type DrywallInput = z.infer<typeof DrywallInputSchema>;

export interface DrywallPlan {
  grossWallAreaM2: number;
  netFaceAreaM2: number;
  totalCladdingAreaM2: number;
  purchaseAreaM2: number;
  boardAreaM2: number;
  boardCount: number;
  orderedBoardAreaM2: number;
  baselineStudCount: number;
  trackLengthWithReserveM: number;
  trackBarCount: number;
  insulationAreaM2: number;
  warnings: string[];
}
