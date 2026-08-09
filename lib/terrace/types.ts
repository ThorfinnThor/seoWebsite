import { z } from "zod";

export const TerraceInputSchema = z.object({
  terraceLengthM: z.number().min(1).max(30),
  terraceWidthM: z.number().min(1).max(30),
  layingDirection: z.enum(["length", "width"]),
  boardWidthMm: z.number().min(50).max(300),
  boardGapMm: z.number().min(3).max(15),
  boardLengthM: z.number().min(1).max(10),
  wastePercent: z.union([z.literal(5), z.literal(10), z.literal(15)]),
  maxSupportSpacingCm: z.number().min(20).max(80),
});

export type TerraceInput = z.infer<typeof TerraceInputSchema>;

export interface TerracePlan {
  areaM2: number;
  runLengthM: number;
  spanWidthM: number;
  courseCount: number;
  coveredWidthM: number;
  edgeAdjustmentMm: number;
  deckingLinearM: number;
  deckingLinearMWithWaste: number;
  fullBoardsToBuy: number;
  supportRowCount: number;
  supportLinearMWithWaste: number;
  fixingIntersections: number;
  fullLengthPossible: boolean;
  minimumJointsPerCourse: number;
  warnings: string[];
}
