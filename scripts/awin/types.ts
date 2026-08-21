import type { GardenHouseOffer, GardenHouseOverride, GardenHouseProduct } from "@/lib/garden-house/types";
import type { OfferBase } from "@/lib/catalog/types";
import type { DehumidifierProduct } from "@/lib/dehumidifier/types";
import type { IrrigationProduct } from "@/lib/irrigation/types";
import type { FlooringProduct } from "@/lib/flooring/types";
import type { RobotMowerProduct } from "@/lib/robot-mower/types";

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

export interface AffiliateCandidate<TProduct> {
  id: string;
  name: string;
  brand?: string;
  gtin?: string;
  mpn?: string;
  candidateAttributes: Partial<TProduct>;
  product?: TProduct;
  offer?: OfferBase;
  merchantProductUrl?: string;
  imageUrl?: string;
  issues: string[];
}

export type DehumidifierCandidate = AffiliateCandidate<DehumidifierProduct>;
export type IrrigationCandidate = AffiliateCandidate<IrrigationProduct>;
export type RobotMowerCandidate = AffiliateCandidate<RobotMowerProduct>;
export type FlooringCandidate = AffiliateCandidate<FlooringProduct>;
