import { z } from "zod";
import { OfferBaseSchema, ProductBaseSchema, type MatchReason, type OfferBase } from "@/lib/catalog/types";

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

export const RobotMowerNavigationSchema = z.enum(["rtk", "lidar", "camera", "wire", "hybrid", "unknown"]);

export const RobotMowerProductSchema = ProductBaseSchema.extend({
  ratedAreaM2: z.number().positive().max(100_000).optional(),
  maxSlopePercent: z.number().min(0).max(200).optional(),
  minPassageCm: z.number().positive().max(500).optional(),
  navigation: RobotMowerNavigationSchema,
  minCutHeightCm: z.number().min(0).max(30).optional(),
  maxCutHeightCm: z.number().min(0).max(30).optional(),
  waterProtection: z.string().min(1).optional(),
  obstacleDetection: z.boolean().optional(),
});

export const RobotMowerCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  vertical: z.literal("robot-mower"),
  generatedAt: z.iso.datetime(),
  sourceUpdatedAt: z.iso.datetime().optional(),
  products: z.array(RobotMowerProductSchema),
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

export const RobotMowerOverrideSchema = RobotMowerProductSchema.partial().extend({ id: z.string().min(1), reviewNote: z.string().min(1).optional() });

export type RobotMowerProduct = z.infer<typeof RobotMowerProductSchema>;
export type RobotMowerCatalog = z.infer<typeof RobotMowerCatalogSchema>;
export type RobotMowerOverride = z.infer<typeof RobotMowerOverrideSchema>;
export interface RobotMowerMatch { product: RobotMowerProduct; offer: OfferBase; score: number; reasons: MatchReason[] }

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
