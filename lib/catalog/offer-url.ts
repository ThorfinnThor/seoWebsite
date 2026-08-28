import type { OfferBase } from "@/lib/catalog/types";
import merchantRegistry from "@/data/manual/merchants.json";

const enabledAwinAdvertiserIds = new Set(
  merchantRegistry.merchants
    .filter((merchant) => merchant.network === "awin" && merchant.applicationStatus === "active" && merchant.enabled)
    .map((merchant) => String(merchant.awinAdvertiserId)),
);

/**
 * Uses tracking only for programmes explicitly marked active and enabled in
 * the reviewed merchant registry. Candidate or paused programmes keep their
 * canonical merchant URL.
 */
export function resolveOfferUrl(offer: OfferBase): string {
  return enabledAwinAdvertiserIds.has(offer.merchantId) || !offer.merchantUrl
    ? offer.affiliateUrl
    : offer.merchantUrl;
}
