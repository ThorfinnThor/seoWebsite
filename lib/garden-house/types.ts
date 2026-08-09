import { z } from "zod";
import { OfferBaseSchema, ProductBaseSchema, type MatchReason, type OfferBase } from "@/lib/catalog/types";

export const ToolStorageSchema = z.enum(["none", "small", "medium", "large"]);
export const FloorPreferenceSchema = z.enum(["irrelevant", "preferred", "required"]);
export const MaterialPreferenceSchema = z.enum(["any", "wood", "metal", "plastic"]);
export const RoofPreferenceSchema = z.enum(["any", "flat", "pent", "gable"]);

export const GardenHouseInputSchema = z.object({
  availableWidthCm: z.number().min(150).max(2000),
  availableDepthCm: z.number().min(150).max(2000),
  allowRotation: z.boolean(),
  budgetMaxEur: z.number().min(100).max(100000),
  bikes: z.number().int().min(0).max(12),
  toolStorage: ToolStorageSchema,
  lawnMower: z.boolean(),
  workbench: z.boolean(),
  shelving: z.boolean(),
  floorPreference: FloorPreferenceSchema,
  materialPreference: MaterialPreferenceSchema,
  roofPreference: RoofPreferenceSchema,
});

export const GardenHouseProductSchema = ProductBaseSchema.extend({
  widthCm: z.number().min(100).max(2000),
  depthCm: z.number().min(100).max(2000),
  heightCm: z.number().min(100).max(1000).optional(),
  footprintM2: z.number().positive().max(400),
  material: z.enum(["wood", "metal", "plastic"]),
  roofType: z.enum(["flat", "pent", "gable"]).optional(),
  wallThicknessMm: z.number().positive().max(500).optional(),
  doorWidthCm: z.number().positive().max(1000).optional(),
  floorIncluded: z.boolean().optional(),
  floorKitAvailable: z.boolean().optional(),
});

export const GardenHouseOfferSchema = OfferBaseSchema;

export const GardenHouseOverrideSchema = GardenHouseProductSchema.partial().extend({
  id: z.string().min(1),
  reviewNote: z.string().min(1).optional(),
});

export const GardenHouseCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    vertical: z.literal("garden-house"),
    generatedAt: z.iso.datetime(),
    sourceUpdatedAt: z.iso.datetime().optional(),
    products: z.array(GardenHouseProductSchema),
    offers: z.array(GardenHouseOfferSchema),
  })
  .superRefine((catalog, ctx) => {
    const productIds = new Set<string>();
    for (const [index, product] of catalog.products.entries()) {
      if (productIds.has(product.id)) ctx.addIssue({ code: "custom", path: ["products", index, "id"], message: "Duplicate product ID" });
      productIds.add(product.id);
    }
    const offerIds = new Set<string>();
    for (const [index, offer] of catalog.offers.entries()) {
      if (offerIds.has(offer.id)) ctx.addIssue({ code: "custom", path: ["offers", index, "id"], message: "Duplicate offer ID" });
      if (!productIds.has(offer.productId)) ctx.addIssue({ code: "custom", path: ["offers", index, "productId"], message: "Unknown product" });
      offerIds.add(offer.id);
    }
  });

export const GardenHouseRulesSchema = z.object({
  version: z.literal(1),
  status: z.literal("planning-heuristic"),
  note: z.string().min(1),
  areaM2: z.object({
    baseCirculation: z.number().nonnegative(),
    perBike: z.number().nonnegative(),
    toolStorage: z.object({
      none: z.number().nonnegative(),
      small: z.number().nonnegative(),
      medium: z.number().nonnegative(),
      large: z.number().nonnegative(),
    }),
    lawnMower: z.number().nonnegative(),
    workbench: z.number().nonnegative(),
    shelving: z.number().nonnegative(),
  }),
  circulationReserveFactor: z.number().min(1).max(3),
  minDoorWidthCm: z.object({ normal: z.number().positive(), bulky: z.number().positive() }),
});

export type GardenHouseInput = z.infer<typeof GardenHouseInputSchema>;
export type GardenHouseProduct = z.infer<typeof GardenHouseProductSchema>;
export type GardenHouseOffer = z.infer<typeof GardenHouseOfferSchema>;
export type GardenHouseCatalog = z.infer<typeof GardenHouseCatalogSchema>;
export type GardenHouseOverride = z.infer<typeof GardenHouseOverrideSchema>;
export type GardenHouseRules = z.infer<typeof GardenHouseRulesSchema>;
export type ToolStorage = z.infer<typeof ToolStorageSchema>;
export type FloorPreference = z.infer<typeof FloorPreferenceSchema>;
export type MaterialPreference = z.infer<typeof MaterialPreferenceSchema>;
export type RoofPreference = z.infer<typeof RoofPreferenceSchema>;

export interface GardenHouseRequirements {
  recommendedAreaM2: number;
  minDoorWidthCm: number;
  bulkyAccess: boolean;
}

export interface GardenHouseMatch {
  product: GardenHouseProduct;
  offer: OfferBase;
  alternativeOffers: OfferBase[];
  score: number;
  rotated: boolean;
  budgetStatus: "within" | "unknown";
  reasons: MatchReason[];
}

export interface NoMatchExplanation {
  code: string;
  label: string;
  suggestion: string;
  rejectedProducts: number;
}
