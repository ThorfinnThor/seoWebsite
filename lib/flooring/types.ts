import { z } from "zod";

export const FlooringRoomSchema = z.object({
  id: z.string().min(1).max(80),
  label: z.string().min(1).max(40),
  lengthM: z.number().min(0.8).max(30),
  widthM: z.number().min(0.8).max(30),
});

export const FlooringInputSchema = z.object({
  rooms: z.array(FlooringRoomSchema).min(1).max(8),
  excludedAreaM2: z.number().min(0).max(200),
  flooringType: z.enum(["laminate", "vinyl-click", "parquet-floating"]),
  layingPattern: z.enum(["straight", "diagonal"]),
  wastePercent: z.union([z.literal(5), z.literal(10), z.literal(15)]),
  plankLengthMm: z.number().min(300).max(2500),
  plankWidthMm: z.number().min(80).max(500),
  packageCoverageM2: z.number().min(0.25).max(10),
  includeUnderlay: z.boolean(),
  underlayRollCoverageM2: z.number().min(1).max(100),
  includeSkirting: z.boolean(),
  totalDoorOpeningM: z.number().min(0).max(30),
  skirtingBarLengthM: z.number().min(1).max(5),
  floorHeating: z.boolean(),
  wetRoom: z.boolean(),
}).superRefine((input, context) => {
  const grossArea = input.rooms.reduce((total, room) => total + room.lengthM * room.widthM, 0);
  if (input.excludedAreaM2 >= grossArea) {
    context.addIssue({ code: "custom", path: ["excludedAreaM2"], message: "Die nicht belegte Fläche muss kleiner als die gesamte Raumfläche sein." });
  }

  const perimeter = input.rooms.reduce((total, room) => total + 2 * (room.lengthM + room.widthM), 0);
  if (input.totalDoorOpeningM > perimeter) {
    context.addIssue({ code: "custom", path: ["totalDoorOpeningM"], message: "Die Türöffnungen können nicht länger als der gesamte Raumumfang sein." });
  }
});

export type FlooringRoom = z.infer<typeof FlooringRoomSchema>;
export type FlooringInput = z.infer<typeof FlooringInputSchema>;

export interface FlooringPlan {
  roomCount: number;
  grossAreaM2: number;
  netAreaM2: number;
  purchaseAreaM2: number;
  plankAreaM2: number;
  estimatedPlankCount: number;
  packageCount: number;
  orderedAreaM2: number;
  areaSurplusM2: number;
  perimeterM: number;
  skirtingLengthWithReserveM: number;
  skirtingBarCount: number;
  underlayAreaWithReserveM2: number;
  underlayRollCount: number;
  warnings: string[];
}
