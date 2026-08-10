import { z } from "zod";

export const LawnAreaSchema = z.object({
  id: z.string().min(1).max(80),
  label: z.string().min(1).max(40),
  lengthM: z.number().min(1).max(100),
  widthM: z.number().min(1).max(100),
  excludedAreaM2: z.number().min(0).max(1000),
}).superRefine((area, context) => {
  if (area.excludedAreaM2 >= area.lengthM * area.widthM) {
    context.addIssue({ code: "custom", path: ["excludedAreaM2"], message: "Die Abzugsfläche muss kleiner als die rechteckige Teilfläche sein." });
  }
});

export const RobotMowerInputSchema = z.object({
  areas: z.array(LawnAreaSchema).min(1).max(8),
  complexity: z.enum(["simple", "moderate", "complex"]),
  growth: z.enum(["slow", "normal", "strong"]),
  mowingZones: z.number().int().min(1).max(8),
  narrowestPassageCm: z.number().min(30).max(500),
  maximumSlopePercent: z.number().min(0).max(80),
  obstacleCount: z.number().int().min(0).max(100),
  separatedAreas: z.boolean(),
  boundarySystem: z.enum(["wire", "wireless", "undecided"]),
  powerAtStation: z.boolean(),
  reliableReception: z.boolean(),
  rainShelteredStation: z.boolean(),
});

export type LawnArea = z.infer<typeof LawnAreaSchema>;
export type RobotMowerInput = z.infer<typeof RobotMowerInputSchema>;

export interface RobotMowerPlan {
  areaCount: number;
  grossAreaM2: number;
  netAreaM2: number;
  capacityFactor: number;
  requiredRatedAreaM2: number;
  rectangularPerimeterM: number;
  boundaryWireFrameM: number;
  passageClass: "tight" | "narrow" | "open";
  setupTasks: string[];
  warnings: string[];
}
