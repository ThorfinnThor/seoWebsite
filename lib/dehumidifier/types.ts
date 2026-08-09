import { z } from "zod";
import { OfferBaseSchema, ProductBaseSchema, type MatchReason, type OfferBase } from "@/lib/catalog/types";

export const DehumidifierInputSchema = z.object({
  roomType: z.enum(["basement", "living", "bedroom", "bathroom", "laundry", "garage", "other"]),
  areaM2: z.number().min(4).max(500),
  ceilingHeightM: z.number().min(1.8).max(6),
  approximateTemperatureC: z.number().min(0).max(45).optional(),
  humiditySeverity: z.enum(["mild", "moderate", "high"]),
  laundryDrying: z.boolean(),
  continuousDrainPossible: z.boolean(),
  noisePriority: z.enum(["low", "medium", "high"]),
  budgetMaxEur: z.number().min(50).max(10000),
});

export const DehumidifierProductSchema = ProductBaseSchema.extend({
  maxRecommendedAreaM2: z.number().positive().max(2000).optional(),
  maxRecommendedVolumeM3: z.number().positive().max(10000).optional(),
  extractionLPerDay: z.number().positive().max(500).optional(),
  extractionTestCondition: z.string().min(1).optional(),
  minOperatingTempC: z.number().min(-30).max(40).optional(),
  maxOperatingTempC: z.number().min(0).max(70).optional(),
  continuousDrain: z.boolean(),
  laundryMode: z.boolean().optional(),
  noiseDb: z.number().positive().max(120).optional(),
  tankLiters: z.number().positive().max(100).optional(),
  powerW: z.number().positive().max(10000).optional(),
  refrigerantType: z.string().min(1).optional(),
});

export const DehumidifierCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  vertical: z.literal("dehumidifier"),
  generatedAt: z.iso.datetime(),
  sourceUpdatedAt: z.iso.datetime().optional(),
  products: z.array(DehumidifierProductSchema),
  offers: z.array(OfferBaseSchema),
}).superRefine((catalog, ctx) => {
  const products = new Set(catalog.products.map((product) => product.id));
  const offers = new Set<string>();
  catalog.offers.forEach((offer, index) => {
    if (!products.has(offer.productId)) ctx.addIssue({ code: "custom", path: ["offers", index, "productId"], message: "Unknown product" });
    if (offers.has(offer.id)) ctx.addIssue({ code: "custom", path: ["offers", index, "id"], message: "Duplicate offer ID" });
    offers.add(offer.id);
  });
});

export const DehumidifierRulesSchema = z.object({
  version: z.literal(1),
  status: z.literal("experimental-selection-margin"),
  areaMargin: z.object({ living_mild: z.number().min(1), living_moderate: z.number().min(1), high_humidity: z.number().min(1), cool_basement: z.number().min(1), laundry: z.number().min(1) }),
});

export type DehumidifierInput = z.infer<typeof DehumidifierInputSchema>;
export type DehumidifierProduct = z.infer<typeof DehumidifierProductSchema>;
export type DehumidifierCatalog = z.infer<typeof DehumidifierCatalogSchema>;
export type DehumidifierRules = z.infer<typeof DehumidifierRulesSchema>;

export interface DehumidifierRequirements { margin: number; requiredAreaM2: number; requiredVolumeM3: number; roomVolumeM3: number }
export interface DehumidifierMatch { product: DehumidifierProduct; offer: OfferBase; score: number; budgetStatus: "within" | "unknown"; reasons: MatchReason[] }
