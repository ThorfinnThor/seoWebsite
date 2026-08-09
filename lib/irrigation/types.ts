import { z } from "zod";
import { OfferBaseSchema, ProductBaseSchema } from "@/lib/catalog/types";

export const IrrigationInputSchema = z.object({
  lawnAreaM2: z.number().min(0).max(10000),
  bedAreaM2: z.number().min(0).max(10000),
  hedgeLengthM: z.number().min(0).max(2000),
  waterFlowLMin: z.number().positive().max(1000).optional(),
  waterPressureBar: z.number().positive().max(20).optional(),
  automaticControl: z.boolean(),
  smartControl: z.boolean(),
  rainSensorWanted: z.boolean(),
  budgetMaxEur: z.number().min(50).max(100000),
}).refine((input) => input.lawnAreaM2 + input.bedAreaM2 + input.hedgeLengthM > 0, { message: "At least one area is required" });

export const IrrigationProductSchema = ProductBaseSchema.extend({
  kind: z.enum(["controller","valve","sprinkler","dripline","pipe","connector","filter","pressure-reducer","sensor"]),
  systemId: z.string().min(1).optional(),
  maxZones: z.number().int().positive().optional(),
  pipeDiameterMm: z.number().positive().optional(),
  driplineLengthM: z.number().positive().optional(),
  smartCompatible: z.boolean().optional(),
  requiredAccessories: z.array(z.string()).optional(),
});

export const IrrigationCatalogSchema = z.object({ schemaVersion:z.literal(1),vertical:z.literal("irrigation"),generatedAt:z.iso.datetime(),sourceUpdatedAt:z.iso.datetime().optional(),products:z.array(IrrigationProductSchema),offers:z.array(OfferBaseSchema) });
export const IrrigationRulesSchema = z.object({ version:z.literal(1),status:z.literal("planning-heuristic"),hedgeReserveFactor:z.number().min(1),bedDriplineMPerM2:z.number().positive(),controllerReserveZones:z.number().int().nonnegative() });
export type IrrigationInput=z.infer<typeof IrrigationInputSchema>;
export type IrrigationProduct=z.infer<typeof IrrigationProductSchema>;
export type IrrigationCatalog=z.infer<typeof IrrigationCatalogSchema>;
export type IrrigationRules=z.infer<typeof IrrigationRulesSchema>;
export interface IrrigationPlan { style:"drip"|"sprinkler"|"combined"; hedgeDriplineM:number; bedDriplineM:number; activeCategories:number; controllerZones:number; components:Array<{kind:string;label:string;quantity:string;note:string}>; warnings:string[] }
