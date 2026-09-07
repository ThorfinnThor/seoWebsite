import { z } from "zod";
import { OfferBaseSchema, ProductBaseSchema, type MatchReason, type OfferBase } from "@/lib/catalog/types";

export const CameraPlacementSchema = z.enum(["indoor", "outdoor"]);
export const CameraConnectionSchema = z.enum(["wifi", "poe", "cellular"]);
export const CameraPowerSchema = z.enum(["battery", "solar", "mains", "poe"]);
export const CameraResolutionSchema = z.enum(["hd", "2k", "3k", "4k"]);

export const SecurityCameraInputSchema = z.object({
  placement: CameraPlacementSchema,
  coverageZones: z.number().int().min(1).max(12),
  connection: z.enum(["wifi", "poe", "cellular", "undecided"]),
  powerAvailable: z.boolean(),
  minimumResolution: CameraResolutionSchema,
  panTiltRequired: z.boolean(),
  integratedLightRequired: z.boolean(),
  preferredBrand: z.string().max(80),
  budgetMaxEur: z.number().min(40).max(20_000),
});

export const SecurityCameraProductSchema = ProductBaseSchema.extend({
  placement: CameraPlacementSchema,
  connection: CameraConnectionSchema,
  power: CameraPowerSchema,
  resolution: CameraResolutionSchema,
  cameraCount: z.number().int().min(1).max(20),
  panTilt: z.boolean(),
  integratedLight: z.boolean(),
});

export const SecurityCameraCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  vertical: z.literal("security-camera"),
  generatedAt: z.iso.datetime(),
  sourceUpdatedAt: z.iso.datetime().optional(),
  products: z.array(SecurityCameraProductSchema),
  offers: z.array(OfferBaseSchema),
}).superRefine((catalog, context) => {
  const productIds = new Set(catalog.products.map((product) => product.id));
  if (productIds.size !== catalog.products.length) context.addIssue({ code: "custom", path: ["products"], message: "Duplicate product ID" });
  const offerIds = new Set<string>();
  catalog.offers.forEach((offer, index) => {
    if (!productIds.has(offer.productId)) context.addIssue({ code: "custom", path: ["offers", index, "productId"], message: "Unknown product" });
    if (offerIds.has(offer.id)) context.addIssue({ code: "custom", path: ["offers", index, "id"], message: "Duplicate offer ID" });
    offerIds.add(offer.id);
  });
});

export const SecurityCameraOverrideSchema = SecurityCameraProductSchema.partial().extend({
  id: z.string().min(1),
  reviewNote: z.string().min(1).optional(),
});

export type SecurityCameraInput = z.infer<typeof SecurityCameraInputSchema>;
export type SecurityCameraProduct = z.infer<typeof SecurityCameraProductSchema>;
export type SecurityCameraCatalog = z.infer<typeof SecurityCameraCatalogSchema>;
export type SecurityCameraOverride = z.infer<typeof SecurityCameraOverrideSchema>;

export interface SecurityCameraMatch {
  product: SecurityCameraProduct;
  offer: OfferBase;
  score: number;
  requiredSets: number;
  estimatedTotalEur: number;
  reasons: MatchReason[];
}
