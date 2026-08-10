import { z } from "zod";

export const GreenhouseInputSchema = z.object({
  lengthM: z.number().min(1.5).max(30),
  widthM: z.number().min(1.2).max(12),
  layout: z.enum(["two-side", "u-shape", "containers"]),
  bedDepthCm: z.number().min(30).max(120),
  aisleWidthCm: z.number().min(50).max(180),
  endBedDepthCm: z.number().min(30).max(120),
  doorWidthCm: z.number().min(50).max(200),
  baseBarLengthM: z.number().min(1).max(6),
  useCase: z.enum(["seedlings", "vegetables", "overwintering", "mixed"]),
  glazing: z.enum(["glass", "polycarbonate", "foil", "undecided"]),
  roofVentCount: z.number().int().min(0).max(20),
  automaticOpeners: z.boolean(),
  crossVentilation: z.boolean(),
  waterAtSite: z.boolean(),
  electricityPlanned: z.boolean(),
}).superRefine((input, context) => {
  if (input.layout !== "containers" && 2 * input.bedDepthCm + input.aisleWidthCm > input.widthM * 100) {
    context.addIssue({ code: "custom", path: ["aisleWidthCm"], message: "Zwei Seitenbeete und der Mittelweg müssen zusammen in die Gewächshausbreite passen." });
  }
  if (input.layout === "containers" && input.aisleWidthCm >= input.widthM * 100) {
    context.addIssue({ code: "custom", path: ["aisleWidthCm"], message: "Der Mittelweg muss schmaler als das Gewächshaus sein." });
  }
  if (input.layout === "u-shape" && input.endBedDepthCm >= input.lengthM * 100) {
    context.addIssue({ code: "custom", path: ["endBedDepthCm"], message: "Das hintere Beet muss kürzer als das Gewächshaus sein." });
  }
  if (input.automaticOpeners && input.roofVentCount === 0) {
    context.addIssue({ code: "custom", path: ["roofVentCount"], message: "Automatische Öffner benötigen mindestens ein eingeplantes Dachfenster." });
  }
});

export type GreenhouseInput = z.infer<typeof GreenhouseInputSchema>;

export interface GreenhousePlan {
  footprintM2: number;
  requiredLayoutWidthCm: number;
  remainingWidthCm: number;
  sideBedAreaM2: number;
  endBedAreaM2: number;
  growingAreaM2: number;
  pathAreaM2: number;
  flexibleFloorAreaM2: number;
  exposedBedEdgeM: number;
  basePerimeterM: number;
  baseLengthWithReserveM: number;
  baseBarCount: number;
  theoreticalRainwaterPer10MmL: number;
  warnings: string[];
}
