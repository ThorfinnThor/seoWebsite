import { z } from "zod";

export const SCHEMA_VERSION = 1 as const;

export const DataQualitySchema = z.enum(["feed", "mixed", "curated"]);
export type DataQuality = z.infer<typeof DataQualitySchema>;

export const DeliveryCostStatusSchema = z.enum(["known", "free", "unknown"]);
export type DeliveryCostStatus = z.infer<typeof DeliveryCostStatusSchema>;

export const ProductBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1).optional(),
  gtin: z.string().min(8).optional(),
  mpn: z.string().min(1).optional(),
  reviewed: z.boolean(),
  dataQuality: DataQualitySchema,
  sourceUpdatedAt: z.iso.datetime().optional(),
});

export const OfferBaseSchema = z
  .object({
    id: z.string().min(1),
    productId: z.string().min(1),
    merchantId: z.string().min(1),
    merchantName: z.string().min(1),
    merchantProductId: z.string().min(1),
    priceEur: z.number().finite().positive(),
    deliveryCostEur: z.number().finite().nonnegative().optional(),
    deliveryCostStatus: DeliveryCostStatusSchema,
    available: z.boolean(),
    affiliateUrl: z.url().refine((url) => url.startsWith("https:"), "Affiliate URL must use HTTPS"),
    imageUrl: z.url().optional(),
    updatedAt: z.iso.datetime(),
  })
  .superRefine((offer, ctx) => {
    if (offer.deliveryCostStatus === "known" && offer.deliveryCostEur === undefined) {
      ctx.addIssue({ code: "custom", path: ["deliveryCostEur"], message: "Known delivery cost needs a value" });
    }
    if (offer.deliveryCostStatus === "free" && offer.deliveryCostEur !== undefined && offer.deliveryCostEur !== 0) {
      ctx.addIssue({ code: "custom", path: ["deliveryCostEur"], message: "Free delivery cannot have a positive cost" });
    }
  });

export interface ProductBase extends z.infer<typeof ProductBaseSchema> {}
export interface OfferBase extends z.infer<typeof OfferBaseSchema> {}

export interface StaticCatalog<TProduct extends ProductBase, TOffer extends OfferBase> {
  schemaVersion: number;
  vertical: string;
  generatedAt: string;
  sourceUpdatedAt?: string;
  products: TProduct[];
  offers: TOffer[];
}

export interface MatchReason {
  code: string;
  label: string;
  strength: "required" | "positive" | "warning";
}
