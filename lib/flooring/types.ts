import { z } from "zod";
import { OfferBaseSchema, ProductBaseSchema, type MatchReason, type OfferBase } from "@/lib/catalog/types";

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

export const FlooringProductTypeSchema = z.enum(["laminate", "vinyl-click", "parquet-floating"]);
export const FlooringInstallationSchema = z.enum(["click", "glue", "unknown"]);
export const FlooringProductSchema = ProductBaseSchema.extend({
  flooringType: FlooringProductTypeSchema,
  installation: FlooringInstallationSchema,
  packageCoverageM2: z.number().positive().max(20).optional(),
  plankLengthMm: z.number().positive().max(3000).optional(),
  plankWidthMm: z.number().positive().max(800).optional(),
  thicknessMm: z.number().positive().max(100).optional(),
  wearLayerMm: z.number().positive().max(20).optional(),
  floorHeatingApproved: z.boolean().optional(),
  wetRoomApproved: z.boolean().optional(),
});

export const FlooringCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  vertical: z.literal("flooring"),
  generatedAt: z.iso.datetime(),
  sourceUpdatedAt: z.iso.datetime().optional(),
  products: z.array(FlooringProductSchema),
  offers: z.array(OfferBaseSchema),
}).superRefine((catalog, ctx) => {
  const products = new Set(catalog.products.map((product) => product.id));
  if (products.size !== catalog.products.length) ctx.addIssue({ code: "custom", path: ["products"], message: "Duplicate product ID" });
  const offers = new Set<string>();
  catalog.offers.forEach((offer, index) => {
    if (!products.has(offer.productId)) ctx.addIssue({ code: "custom", path: ["offers", index, "productId"], message: "Unknown product" });
    if (offers.has(offer.id)) ctx.addIssue({ code: "custom", path: ["offers", index, "id"], message: "Duplicate offer ID" });
    offers.add(offer.id);
  });
});

export const FlooringOverrideSchema = FlooringProductSchema.partial().extend({ id: z.string().min(1), reviewNote: z.string().min(1).optional() });

export type FlooringProduct = z.infer<typeof FlooringProductSchema>;
export type FlooringCatalog = z.infer<typeof FlooringCatalogSchema>;
export type FlooringOverride = z.infer<typeof FlooringOverrideSchema>;
export interface FlooringMatch { product: FlooringProduct; offer: OfferBase; score: number; reasons: MatchReason[] }

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
