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
export interface ProjectMatch { product: ProjectProduct; offer: OfferBase; score: number; reasons: MatchReason[] }
