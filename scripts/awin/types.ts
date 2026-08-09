import type { GardenHouseOffer, GardenHouseOverride, GardenHouseProduct } from "@/lib/garden-house/types";

export type RawFeedRow = Record<string, string | undefined>;

export interface NormalizationIssue {
  code: string;
}

export interface GardenHouseCandidate {
  id: string;
  name: string;
  brand?: string;
  gtin?: string;
  mpn?: string;
  candidateAttributes: Partial<GardenHouseProduct>;
  product?: GardenHouseProduct;
  offer?: GardenHouseOffer;
  merchantProductUrl?: string;
  imageUrl?: string;
  issues: string[];
}

export type ProductOverride = GardenHouseOverride;
