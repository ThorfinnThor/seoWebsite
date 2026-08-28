import { z } from "zod";
import { OfferBaseSchema, ProductBaseSchema, type MatchReason, type OfferBase } from "@/lib/catalog/types";

export const ProjectVerticalSchema = z.enum(["carport", "greenhouse", "privacy-screen", "terrace", "drywall"]);
export const ProjectProductKindSchema = z.enum(["kit", "decking", "substructure", "fastening", "foundation", "roof", "drainage", "electric", "panel", "post", "gate", "cap", "bracket", "base", "ventilation", "irrigation", "bench", "shade", "board", "profile", "joint", "insulation", "sealing"]);

export const ProjectProductSchema = ProductBaseSchema.extend({
  vertical: ProjectVerticalSchema,
  kind: ProjectProductKindSchema,
  widthCm: z.number().positive().max(5000).optional(),
  depthCm: z.number().positive().max(5000).optional(),
  lengthCm: z.number().positive().max(5000).optional(),
  coverageM2: z.number().positive().max(10000).optional(),
  boardLengthMm: z.number().positive().max(20_000).optional(),
  boardWidthMm: z.number().positive().max(5_000).optional(),
  boardThicknessMm: z.number().positive().max(500).optional(),
  packageLinearM: z.number().positive().max(10_000).optional(),
  packageCoverageM2: z.number().positive().max(10_000).optional(),
  material: z.enum(["wood", "wpc", "composite", "stone", "metal", "plastic", "gypsum", "gypsum-fiber", "other"]).optional(),
  panelWidthCm: z.number().positive().max(2_000).optional(),
  panelHeightCm: z.number().positive().max(1_000).optional(),
  gateCompatible: z.boolean().optional(),
  postSystemId: z.string().min(1).optional(),
  mountingType: z.enum(["ground", "baseplate", "existing", "unknown"]).optional(),
  systemId: z.string().min(1).optional(),
  boardType: z.enum(["standard", "moisture", "fire-acoustic", "gypsum-fiber", "unknown"]).optional(),
  moistureApproved: z.boolean().optional(),
  fireClass: z.string().min(1).optional(),
  piecesPerPack: z.number().int().positive().max(10_000).optional(),
  profileType: z.enum(["cw", "uw", "other"]).optional(),
  profileLengthMm: z.number().positive().max(20_000).optional(),
  profileWidthMm: z.number().positive().max(1_000).optional(),
  externalWidthM: z.number().positive().max(100).optional(),
  externalLengthM: z.number().positive().max(100).optional(),
  clearWidthM: z.number().positive().max(100).optional(),
  clearLengthM: z.number().positive().max(100).optional(),
  clearHeightM: z.number().positive().max(20).optional(),
  vehicleCount: z.number().int().min(1).max(4).optional(),
  installationType: z.enum(["freestanding", "attached", "unknown"]).optional(),
  roofType: z.enum(["flat", "mono-pitch", "gable", "unknown"]).optional(),
  doorWidthCm: z.number().positive().max(1_000).optional(),
  roofVentCount: z.number().int().nonnegative().max(100).optional(),
  glazingType: z.enum(["glass", "polycarbonate", "foil", "mixed", "unknown"]).optional(),
  completeKit: z.boolean().optional(),
});

export const ProjectCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  vertical: z.literal("project-products"),
  generatedAt: z.iso.datetime(),
  sourceUpdatedAt: z.iso.datetime().optional(),
  products: z.array(ProjectProductSchema),
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

export const ProjectOverrideSchema = ProjectProductSchema.partial().extend({ id: z.string().min(1), reviewNote: z.string().min(1).optional() });

export type ProjectVertical = z.infer<typeof ProjectVerticalSchema>;
export type ProjectProductKind = z.infer<typeof ProjectProductKindSchema>;
export type ProjectProduct = z.infer<typeof ProjectProductSchema>;
export type ProjectCatalog = z.infer<typeof ProjectCatalogSchema>;
export type ProjectOverride = z.infer<typeof ProjectOverrideSchema>;
export type MatchConfidence = "exact" | "compatible" | "category" | "supplement";
export interface ProjectOrderEstimate {
  requiredUnits: number;
  packageCount: number;
  orderedUnits: number;
  overage: number;
  unitLabel: string;
  materialSubtotalEur: number;
  shippingEur?: number;
  estimatedTotalEur?: number;
}
export interface ProjectMatch { product: ProjectProduct; offer: OfferBase; score: number; reasons: MatchReason[]; confidence: MatchConfidence; orderEstimate?: ProjectOrderEstimate }
